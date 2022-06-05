import { EX_KEYS, DATA_KEY, DEFAULT_CLASS, SELECTED_FORMAT, DEFAULTS } from './vars'
import { hf } from './helpers'
import { DICT_DEFAULTS, i18n } from './i18n'

/**
 * Date picker class
 */
class _duDatePicker {
	/**
	 * Default configurations
	 */
	static default_configs = null;
	/**
	 * Creates date picker
	 * @param {HTMLInputElement} el Input element
	 * @param {Object} options Date picker options
	 */
	constructor(el, options) {
		let _ = this , i18n = options.i18n

		if (typeof i18n === 'string')
			options.i18n = duDatepicker.i18n[i18n]

		this.config = hf.extend(_duDatePicker.default_configs || DEFAULTS, options)

		if (this.config.multiple && this.config.format.indexOf(',') >= 0)
			throw new Error('For multiple dates mode, comma (,) should not be used in the format configuration.')

		let dp_root = this.config.root

		if (typeof dp_root === 'string')
			this.config.root = document.querySelector(dp_root)
		else if (!hf.isElement(dp_root))
			delete this.config.root

		/**
		 * Determines if date picker is animating
		 */
		this.animating = false
		/**
		 * Determines if date picker is displayed/shown
		 */
		this.visible = false
		/**
		 * Input element
		 * @type {HTMLInputElement}
		 */
		this.input = el
		this.input.readOnly = true
		this.fromEl = document.querySelector(this.config.fromTarget)
		this.toEl = document.querySelector(this.config.toTarget)
		this.input.hidden = this.config.range && (this.fromEl || this.toEl)
		this.viewMode = 'calendar'
		this.dict = hf.extend(DICT_DEFAULTS, this.config.i18n.dict)

		/**
		 * Date picker elements holder
		 * @type {Object}
		 */
		this.datepicker = {
			container: hf.createElem('div', { class: 'dcalendarpicker' }),
			wrapper: hf.createElem('div', { class: 'dudp__wrapper', tabindex: 0 }),
			header: {
				wrapper: hf.createElem('section', { class: 'dudp__calendar-header' }),
				selectedYear: hf.createElem('span', { class: 'dudp__sel-year' }),
				selectedDate: hf.createElem('span', { class: 'dcp_sel-date' }),
			},
			calendarHolder: {
				wrapper: hf.createElem('section', { class: 'dudp__cal-container' }),
				btnPrev: hf.createElem('span', { class: 'dudp__btn-cal-prev', role: 'button' }, '&lsaquo;', true),
				btnNext: hf.createElem('span', { class: 'dudp__btn-cal-next', role: 'button' }, '&rsaquo;', true),
				calendarViews: {
					wrapper: hf.createElem('div', { class: 'dudp__calendar-views' }),
					calendars: []
				},
				yearsView: hf.createElem('div', { class: 'dudp__years-view dp__hidden' }),
				monthsView: hf.createElem('div', { class: 'dudp__months-view dp__hidden' }),
				buttons: {
					wrapper: hf.createElem('div', { class: 'dudp__buttons' }),
					btnClear: hf.createElem('span', { class: 'dudp__button clear', role: 'button' }, _.dict.btnClear),
					btnCancel: hf.createElem('span', { class: 'dudp__button cancel', role: 'button' }, _.dict.btnCancel),
					btnOk: hf.createElem('span', { class: 'dudp__button ok', role: 'button' }, _.dict.btnOk),
				}
			}
		}

		// set default value
		if (_.config.value && (!_.config.range && !_.config.multiple)) {
			_.input.value = _.config.value
			_.input.setAttribute('value', _.config.value)
		}

		this.minDate = _.input.dataset.mindate || _.config.minDate
		this.maxDate = _.input.dataset.maxdate || _.config.maxDate

		// current selected date, default is today if no value given
		let _date = new Date()

		if (_.config.range) {
			let value = (_.input.value || _.config.value) || '', _range = value ? value.split(_.config.rangeDelim) : []

			if (value !== '' && _range.length < 2)
				throw new Error('Invalid date range value.')

			let _from = value === '' ? null : hf.parseDate.call(_, _range[0]).date,
				_to = value === '' ? null : hf.parseDate.call(_, _range[1]).date

			let canSet = _._canSetValue('range', { from: _from, to: _to })
			if (!canSet.canSet) {
				throw new Error(canSet.remarks)
			}

			this.dateFrom = _from
			this.dateTo = _to
			this.rangeFrom = null
			this.rangeTo = null

			this.viewMonth = (_from ? _from : _date).getMonth()
			this.viewYear = (_from ? _from : _date).getFullYear()

			// set default value
			if (value) {
				let valueDisp = _.config.events && _.config.events.onRangeFormat ? _.formatRange(_from, _to) : value,
					formattedFrom = hf.formatDate.call(_, _from, _.config.format),
					outFrom = hf.formatDate.call(_, _from, _.config.outFormat || _.config.format),
					formattedTo = hf.formatDate.call(_, _to, _.config.format),
					outTo = hf.formatDate.call(_, _to, _.config.outFormat || _.config.format)

				_.input.value = valueDisp
				_.rangeFrom = hf.dateToJson(_from)
				_.rangeTo = hf.dateToJson(_to)
				hf.setAttributes(_.input, {
					'value': valueDisp,
					'data-range-from': outFrom,
					'data-range-to': outTo
				})

				if (_.fromEl) {
					_.fromEl.value = formattedFrom
					hf.setAttributes(_.fromEl, {
						'value': formattedFrom,
						'data-value': outFrom
					})
				}

				if (_.toEl) {
					_.toEl.value = formattedTo
					hf.setAttributes(_.toEl, {
						'value': formattedFrom,
						'data-value': outTo
					})
				}
			}
		} else if (_.config.multiple) {
			let dates = []
			if (_.input.value) {
				 _.input.value.split(',').forEach(v => {
					 dates.push(hf.parseDate.call(_, v).date)
				 })
			} else if (_.config.value){
				let isArray = Array.isArray(_.config.value),
					values = isArray ? _.config.value : _.config.value.split(',')
				
				values.forEach(v => {
					dates.push(hf.parseDate.call(_, v).date)
				})
			}
			
			dates = dates.sort((a, b) => { return a > b ? 1 : a < b ? -1 : 0 })
			
			let canSet = _._canSetValue('multiple', dates)
			if (!canSet.canSet) {
				throw new Error(canSet.remarks)
			}

			let starting = dates.length > 0 ? dates.reduce((a, b) => { return a < b ? a : b; }) : new Date()

			this.dates = [...dates]
			this.selectedDates = [...dates]
			this.viewYear = starting.getFullYear()
			this.viewMonth = starting.getMonth()

			hf.setAttributes(_.input, { 'value': dates.map(d => hf.formatDate.call(_, d, _.config.outFormat || _.config.format)).join(',') })
		} else {
			let date = _.input.value === '' ? _date : hf.parseDate.call(_, _.input.value).date
			
			let canSet = _._canSetValue('default', date)
			if (!canSet.canSet) {
				throw new Error(canSet.remarks)
			}

			this.date = date
			this.selected = hf.dateToJson(_.date)

			this.viewMonth = _.selected.month
			this.viewYear = _.selected.year
		}

		/* input event handlers */
		function _inputClick() {
			_.showInFromEl = _.config.inline && _.fromEl && this === _.fromEl
			_.showInToEl = _.config.inline && _.toEl && this === _.toEl
			_.show()
		}

		function _inputKeydown(e) {
			if (e.keyCode === 13) {
				_.showInFromEl = _.config.inline && _.fromEl && this === _.fromEl
				_.showInToEl = _.config.inline && _.toEl && this === _.toEl
				_.show()
			}
			return !(EX_KEYS.indexOf(e.which) < 0)
		}

		/**
		 * Unbinds input `click` and `keydown` event handlers
		 */
		this._unbindInput = function () {
			_.input.readOnly = false
			_.input.removeEventListener('click', _inputClick)
			_.input.removeEventListener('keydown', _inputKeydown)

			if (_.fromEl) {
				_.fromEl.readOnly = false
				_.fromEl.removeEventListener('click', _inputClick)
				_.fromEl.removeEventListener('keydown', _inputKeydown)
			}

			if (_.toEl) {
				_.toEl.readOnly = false
				_.toEl.removeEventListener('click', _inputClick)
				_.toEl.removeEventListener('keydown', _inputKeydown)
			}
		}

		hf.addEvent(_.input, 'click', _inputClick)
		hf.addEvent(_.input, 'keydown', _inputKeydown)

		if (_.fromEl) {
			_.fromEl.readOnly = true
			hf.addEvent(_.fromEl, 'click', _inputClick)
			hf.addEvent(_.fromEl, 'keydown', _inputKeydown)
		}

		if (_.toEl) {
			_.toEl.readOnly = true
			hf.addEvent(_.toEl, 'click', _inputClick)
			hf.addEvent(_.toEl, 'keydown', _inputKeydown)
		}

		// initialize
		this._init()
		this._setSelection()
	}
	/**
	 * Initializes the date picker
	 */
	_init() {
		let _ = this,
			picker = _.datepicker,
			header = picker.header,
			calendarHolder = picker.calendarHolder,
			buttons = calendarHolder.buttons

		// Setup header
		if (!_.config.inline) {
			hf.appendTo([header.selectedYear, header.selectedDate], header.wrapper)
			hf.appendTo(header.wrapper, picker.wrapper)

			hf.addEvent(header.selectedYear, 'click', function () {
				if (_.viewMode !== 'years')
					_._switchView('years')
			})

			hf.addEvent(header.selectedDate, 'click', function () {
				let now = new Date(),
					_month = _.config.range ? now.getMonth() : _.selected.month,
					_year = _.config.range ? now.getFullYear() : _.selected.year

				if ((_.viewMonth !== _month || _.viewYear !== _year) || _.viewMode !== 'calendar') {
					_.viewMonth = _month
					_.viewYear = _year
					_._setupCalendar()
					_._switchView('calendar')
				}
			})
		}

		// Setup months view
		_._setupMonths()

		// Setup years view
		hf.appendTo(_._getYears(), calendarHolder.yearsView)

		if (_.config.clearBtn)
			hf.appendTo(buttons.btnClear, buttons.wrapper)
		if (_.config.cancelBtn)
			hf.appendTo(buttons.btnCancel, buttons.wrapper)

		if (!_.config.auto || _.config.range || _.config.multiple)
			hf.appendTo(buttons.btnOk, buttons.wrapper)

		hf.appendTo([
			calendarHolder.btnPrev,
			calendarHolder.btnNext,
			calendarHolder.calendarViews.wrapper,
			calendarHolder.monthsView,
			calendarHolder.yearsView,
			buttons.wrapper
		], calendarHolder.wrapper)
		hf.appendTo(calendarHolder.wrapper, picker.wrapper)

		hf.appendTo(picker.wrapper, picker.container)
		hf.appendTo(picker.container, _.config.root)

		if (_.config.inline)
			picker.container.setAttribute('inline', true)

		// Setup theme
		picker.wrapper.dataset.theme = _.input.dataset.theme || _.config.theme

		hf.addEvent(picker.wrapper, 'keydown', function (e) {
			if (e.keyCode === 27)
				_.hide() // esc
			else if (e.keyCode === 37)
				_._move('prev') // arrow left
			else if (e.keyCode === 39)
				_._move('next') // arrow right
		})

		if (_.config.inline)
			hf.addEvent(picker.wrapper, 'blur', function () { _.hide() })

		// arrows click event
		hf.addEvent(calendarHolder.btnPrev, 'click', function () { _._move('prev') })
		hf.addEvent(calendarHolder.btnNext, 'click', function () { _._move('next') })

		// month & year click events
		hf.addEvent(calendarHolder.calendarViews.wrapper, 'click', function (e) {
			if (e.target.classList.contains('cal-year')) {
				_._switchView('years')
			} else if (e.target.classList.contains('cal-month')) {
				_._switchView('months')
			}
		})

		// clear button event
		if (_.config.clearBtn)
			hf.addEvent(buttons.btnClear, 'click', function () {
				_.setValue('')
				_.hide()
			})

		// overlay events
		if (_.config.overlayClose) {
			hf.addEvent(picker.container, 'click', function () { _.hide() })
			hf.addEvent(picker.wrapper, 'click', function (e) { e.stopPropagation() })
		}

		// cancel button event
		if (_.config.cancelBtn) {
			hf.addEvent(buttons.btnCancel, 'click', function () { _.hide() })
		}

		// ok button event
		hf.addEvent(buttons.btnOk, 'click', function () {
			if (_.config.range) {
				if (!_.rangeFrom || !_.rangeTo)
					return

				let _from = hf.jsonToDate(_.rangeFrom),
					_to = hf.jsonToDate(_.rangeTo)

				if (_._rangeHasDisabled()) return

				_.dateFrom = _from
				_.dateTo = _to
				_.setValue([hf.formatDate.call(_, _from, _.config.format), hf.formatDate.call(_, _to, _.config.format)].join(_.config.rangeDelim))
			} else if (_.config.multiple) {
				_.dates = [..._.selectedDates]
				_.setValue(_.dates.map(d => hf.formatDate.call(_, d, _.config.format)))
			} else {
				let _date = hf.jsonToDate(_.selected)

				if (_._dateDisabled(_date))
					return

				_.date = _date
				_.setValue(_.date)
			}

			_.hide()
		})

		if (_.config.events && _.config.events.ready)
			_.config.events.ready.call(_, _)
	}
	/**
	 * Gets the current date
	 */
	_getToday() {
		let now = new Date()
		return new Date(now.getFullYear(), now.getMonth(), now.getDate())
	}
	/**
	 * Determines if date is in the selected date range
	 * @param {Date} date Date object
	 */
	_inRange(date) {
		if (!this.config.range)
			return false

		let _ = this,
			_from = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
			_to = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null

		return (_from && date > _from) && (_to && date < _to)
	}
	/**
	 * Determines if date is beyond the minDate, maxDate, minYear or maxYear configurations (if any)
	 * @param {Date} date Date object
	 */
	_beyondMinMax(date) {
		let _ = this, config = _.config,
			min = null, max = null,
			dateYear = date.getFullYear(),
			today = _._getToday(),
			minYearCap = config.minYear && dateYear < config.minYear,
			maxYearCap = config.maxYear && dateYear > config.maxYear

		if (_.minDate)
			min = _.minDate === "today" ? today : new Date(_.minDate)
		if (_.maxDate)
			max = _.maxDate === "today" ? today : new Date(_.maxDate)

		return (min && date < min) || (max && date > max) || minYearCap || maxYearCap
	}
	/**
	 * Determines if date is disabled
	 * @param {Date} date Date object
	 * @returns {Boolean} `true` if specified date should be disabled, `false` otherwise
	 */
	_dateDisabled(date) {
		let _ = this,
			_dates = _.config.disabledDates,
			_days = _.config.disabledDays,
			_inDates = _dates.filter(function (x) {
				if (x.indexOf('-') >= 0)
					return (date >= hf.parseDate.call(_, x.split('-')[0]).date && date <= hf.parseDate.call(_, x.split('-')[1]).date)
				else
					return hf.parseDate.call(_, x).date.getTime() === date.getTime()
			}).length > 0,
			day = date.getDay(),
			dayName = _.config.i18n.days[day],
			dayNameShort = _.config.i18n.shortDays[day],
			dayNameShorter = _.config.i18n.shorterDays[day],
			_inDays = _days.indexOf(dayName) >= 0 ||
				_days.indexOf(dayNameShort) >= 0 ||
				_days.indexOf(dayNameShorter) >= 0

		return (_inDates || _inDays) || _._beyondMinMax(date)
	}
	/**
	 * Determines if selected date range has a disabled date
	 */
	_rangeHasDisabled() {
		let _ = this,
			_from = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
			_to = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null

		if (_from == null || _to == null) return false

		let _start = hf.jsonToDate(_.rangeFrom)
		while (_start <= _to) {
			if (_._dateDisabled(_start)) return true

			_start.setDate(_start.getDate() + 1)
		}
		return false
	}
	/**
	 * @param {number} year Year
	 * @param {number} month Month
	 * @returns {HTMLSpanElement[]} Returns the dates of the specified month and year
	 */
	_getDates(year, month) {
		let _ = this, day = 1, 
			today = _._getToday(),
			selected = _.config.range || _.config.multiple ? null : hf.jsonToDate(_.selected),
			rangeFrom = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
			rangeTo = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null,
			date = new Date(year, month, day), totalDays = hf.getDaysCount(date), nmStartDay = 1,
			weeks = [], 
			firstDay = _.config.firstDay || _.config.i18n.firstDay,
            lastDay = (firstDay + 6) % 7,
			addClassToDayEl = (dayEl, date) => {
				if (_._dateDisabled(date))
					dayEl.classList.add('disabled')

				if (_._inRange(date))
					dayEl.classList.add('in-range')

				if (date.getTime() === today.getTime())
					dayEl.classList.add('current')

				if ((!_.config.range && !_.config.multiple && date.getTime() === selected.getTime()) ||
					(_.config.multiple && _.dates.find(x => x.getTime() === date.getTime()))) {
					dayEl.classList.add('selected')
				}

				if (_.config.range && rangeFrom && date.getTime() === rangeFrom.getTime())
					dayEl.classList.add('range-from')

				if (_.config.range && rangeTo && date.getTime() === rangeTo.getTime())
					dayEl.classList.add('range-to')
			}

		for (let week = 1; week <= 6; week++) {
			let daysOfWeek = []

			for (let idx = 0, dow = firstDay; idx < 7; idx++, dow++) {
				daysOfWeek.push(hf.createElem('span', { class: 'dudp__date', 'data-dow': dow % 7 }))
			}

			while (day <= totalDays) {
				date.setDate(day)
				let dayOfWeek = date.getDay(),
					dayEl = daysOfWeek.find(d => parseInt(d.dataset.dow) === dayOfWeek)

				dayEl.dataset.date = day
				dayEl.dataset.month = month
				dayEl.dataset.year = year

				if (week === 1 && dayOfWeek === firstDay % 7) {
					break
				} else if (dayOfWeek !== lastDay) {
					addClassToDayEl(dayEl, date)
					dayEl.innerText = day++
				} else {
					addClassToDayEl(dayEl, date)
					dayEl.innerText = day++
					break
				}
			}

			/* For days of previous and next month */
			if (week === 1 || week > 4) {
				// First week
				if (week === 1) {
					let pm = new Date(year, month - 1, 1), pmDays = hf.getDaysCount(pm)

					for (let a = 1; a <= 7; a++) {
						pm.setDate(pmDays)

						let dayEl = daysOfWeek.find(d => parseInt(d.dataset.dow) === pm.getDay())

						if (dayEl.innerText !== '')
							continue

						pmDays--
						dayEl.dataset.date = pm.getDate()
						dayEl.dataset.month = pm.getMonth()
						dayEl.dataset.year = pm.getFullYear()
						dayEl.innerText = pm.getDate()
						dayEl.classList.add('dudp__pm')
						
						addClassToDayEl(dayEl, pm)
					}
				}
				// Last week
				else if (week > 4) {
					let nm = new Date(year, month + 1, 1)

					for (let a = 1; a <= 7; a++) {
						nm.setDate(nmStartDay)

						let dayEl = daysOfWeek.find(d => parseInt(d.dataset.dow) === nm.getDay())

						if (dayEl.innerText !== '')
							continue

						nmStartDay++
						dayEl.dataset.date = nm.getDate()
						dayEl.dataset.month = nm.getMonth()
						dayEl.dataset.year = nm.getFullYear()
						dayEl.innerText = nm.getDate()
						dayEl.classList.add('dudp__nm')

						addClassToDayEl(dayEl, nm)
					}
				}
			}
			weeks.push(daysOfWeek)
		}

		let datesDOM = []
		weeks.forEach(function (datesEl) {
			let weekDOM = hf.createElem('div', { class: 'dudp__cal-week' })

			for (let i = 0; i < datesEl.length; i++) {
				let dateElem = datesEl[i]

				// Attach click handler for dates
				hf.addEvent(dateElem, 'click', function () {
					let _this = this, _year = _this.dataset.year, _month = _this.dataset.month, _date = _this.dataset.date,
						_selected = new Date(_year, _month, _date),
						isFrom = false

					if (_._dateDisabled(_selected))
						return

					if (_.config.range) {
						let rangeFrom = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
							rangeTo = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null

						if (!_.rangeFrom || (_.rangeFrom && _selected < rangeFrom) ||
							(_.rangeFrom && _.rangeTo && hf.dateDiff(rangeFrom, _selected) <= hf.dateDiff(_selected, rangeTo) && hf.dateDiff(rangeFrom, _selected) !== 0) ||
							(_.rangeFrom && _.rangeTo && rangeTo.getTime() === _selected.getTime())) {
							_.rangeFrom = { year: _year, month: _month, date: _date }
							isFrom = true
						} else if (!_.rangeTo || (_.rangeTo && _selected > rangeTo) ||
							(_.rangeFrom && _.rangeTo && hf.dateDiff(_selected, rangeTo) < hf.dateDiff(rangeFrom, _selected) && hf.dateDiff(_selected, rangeTo) !== 0) ||
							(_.rangeFrom && _.rangeTo && rangeFrom.getTime() === _selected.getTime())) {
							_.rangeTo = { year: _year, month: _month, date: _date }
							isFrom = false
						}

						_.datepicker.calendarHolder.calendarViews.wrapper.querySelectorAll('.dudp__date').forEach(function (delem) {
							let _deYear = delem.dataset.year, _deMonth = delem.dataset.month, _deDate = delem.dataset.date,
								_inRange = _._inRange(new Date(_deYear, _deMonth, _deDate))

							delem.classList[(_year === _deYear && _month === _deMonth && _date === _deDate) ? 'add' : 'remove'](isFrom ? 'range-from' : 'range-to')
							delem.classList[_inRange ? 'add' : 'remove']('in-range')
						})
					} else {
						if (_.config.multiple) {
							let isSelected = _this.classList.contains('selected')

							_.datepicker.calendarHolder.calendarViews.wrapper
								.querySelectorAll('.dudp__date[data-date="' + _date + '"][data-month="'+ _month +'"][data-year="'+ _year +'"]')
								.forEach(function (delem) {
									delem.classList[isSelected ? 'remove' : 'add']('selected')
								})

							if (isSelected) _.selectedDates = _.selectedDates.filter(sd => sd.getTime() !== _selected.getTime())
							else _.selectedDates.push(_selected)
							_._setSelection()
						} else {
							_.datepicker.calendarHolder.calendarViews.wrapper.querySelectorAll('.dudp__date').forEach(function (delem) {
								let _deYear = delem.dataset.year,
									_deMonth = delem.dataset.month,
									_deDate = delem.dataset.date

								delem.classList[(_year === _deYear && _month === _deMonth && _date === _deDate) ? 'add' : 'remove']('selected')
							})

							_.selected = { year: _year, month: _month, date: _date }
							_._setSelection()

							if (_.config.auto) {
								_.date = _selected
								_.setValue(_.date)
								_.hide()
							}
						}
					}

					_.datepicker.calendarHolder.wrapper.querySelectorAll('.dudp__month').forEach(function (melem) {
						let _meMonth = melem.dataset.month

						melem.classList[_meMonth === _month ? 'add' : 'remove']('selected')
					})
				})

				hf.appendTo(dateElem, weekDOM)
			}

			datesDOM.push(weekDOM)
		})

		return datesDOM
	}
	/**
	 * Gets the year limits (min and max)
	 * @param {boolean} yearsView Determines limits will be used for years selection view
	 */
	_getYearLimits(yearsView = false) {
		let _ = this, 
			minDate = null, maxDate = null,
			today = _._getToday()

		if (_.minDate) minDate = _.minDate === "today" ? today : new Date(_.minDate)
		if (_.maxDate) maxDate = _.maxDate === "today" ? today : new Date(_.maxDate)
		
		let _minCandidates = [yearsView ? _.viewYear - _.config.priorYears : null, _.config.minYear, minDate ? minDate.getFullYear() : null].filter(x => x != null),
			_maxCandidates = [yearsView ? _.viewYear + _.config.laterYears : null, _.config.maxYear, maxDate ? maxDate.getFullYear() : null].filter(x => x != null),
			minYear = _minCandidates.length > 0 ? Math.max(..._minCandidates) : null,
			maxYear = _maxCandidates.length > 0 ? Math.min(..._maxCandidates) : null

		return { minYear, maxYear }
	}
	/**
	 * @returns {HTMLSpanElement[]} Returns years range for the years view
	 */
	_getYears() {
		let _ = this,
			limits = _._getYearLimits(true),
			_minYear = limits.minYear,
			_maxYear = limits.maxYear,
			_years = []

		for (let y = _minYear; y <= _maxYear; y++) {
			let yearElem = hf.createElem('span', { class: 'dudp__year' })

			if (y === _.viewYear)
				yearElem.classList.add('selected')

			yearElem.innerText = y
			yearElem.dataset.year = y
			hf.addEvent(yearElem, 'click', function () {
				let _this = this, _data = parseInt(_this.dataset.year)

				_.viewYear = _data
				if (!_.config.range && !_.config.multiple)
					_.selected.year = _data
				_._setSelection()
				_._setupCalendar()
				_._switchView('calendar')
			})

			_years.push(yearElem)
		}

		return _years
	}
	/**
	 * Sets up the months DOM
	 */
	_setupMonths() {
		let _ = this,
			calendarHolder = _.datepicker.calendarHolder,
			_month = 0,
			_selected = _.selected ? _.selected : new Date()

		hf.empty(calendarHolder.monthsView)

		for (let r = 1; r < 4; r++) {
			let monthRow = hf.createElem('div', { class: 'dudp__month-row' })

			for (let i = 0; i < 4; i++) {
				let monthElem = hf.createElem('span', { class: 'dudp__month' })

				if (_month === _selected.month)
					monthElem.classList.add('selected')

				monthElem.innerText = _.config.i18n.shortMonths[_month]
				monthElem.dataset.month = _month
				hf.appendTo(monthElem, monthRow)
				hf.addEvent(monthElem, 'click', function (e) {
					let _this = this, _data = parseInt(_this.dataset.month)

					_.viewMonth = _data

					_._setupCalendar()
					_._switchView('calendar')
				})

				_month++
			}
			hf.appendTo(monthRow, calendarHolder.monthsView)
		}
	}
	/**
	 * Sets up the calendar views
	 */
	_setupCalendar() {
		let _ = this, viewsHolder = _.datepicker.calendarHolder.calendarViews, _year = +_.viewYear, _month = +_.viewMonth

		viewsHolder.calendars.length = 0

		let inView = {
			wrapper: hf.createElem('div', { class: 'dudp__calendar' }),
			header: hf.createElem('div', { class: 'dudp__cal-month-year' }),
			weekDays: hf.createElem('div', { class: 'dudp__weekdays' }, hf.daysOfWeekDOM.call(_), true),
			datesHolder: hf.createElem('div', { class: 'dudp__dates-holder' })
		}, prev = {
			wrapper: hf.createElem('div', { class: 'dudp__calendar' }),
			header: hf.createElem('div', { class: 'dudp__cal-month-year' }),
			weekDays: hf.createElem('div', { class: 'dudp__weekdays' }, hf.daysOfWeekDOM.call(_), true),
			datesHolder: hf.createElem('div', { class: 'dudp__dates-holder' })
		}, next = {
			wrapper: hf.createElem('div', { class: 'dudp__calendar' }),
			header: hf.createElem('div', { class: 'dudp__cal-month-year' }),
			weekDays: hf.createElem('div', { class: 'dudp__weekdays' }, hf.daysOfWeekDOM.call(_), true),
			datesHolder: hf.createElem('div', { class: 'dudp__dates-holder' })
		}, prevMonth = _month == 0 ? 11 : _month - 1,
			nextMonth = _month == 11 ? 0 : _month + 1,
			prevYear = _month == 0 ? _year - 1 : _year,
			nextYear = _month == 11 ? _year + 1 : _year

		hf.appendTo([
			hf.createElem('span', { class: 'cal-month' }, _.config.i18n.months[prevMonth]),
			hf.createElem('span', { class: 'cal-year' }, prevYear)
		], prev.header)
		hf.appendTo(_._getDates(prevYear, prevMonth), prev.datesHolder)
		hf.appendTo([prev.header, prev.weekDays, prev.datesHolder], prev.wrapper)
		viewsHolder.calendars.push(prev)

		hf.appendTo([
			hf.createElem('span', { class: 'cal-month' }, _.config.i18n.months[_month]),
			hf.createElem('span', { class: 'cal-year' }, _year)
		], inView.header)
		hf.appendTo(_._getDates(_year, _month), inView.datesHolder)
		hf.appendTo([inView.header, inView.weekDays, inView.datesHolder], inView.wrapper)
		viewsHolder.calendars.push(inView)

		hf.appendTo([
			hf.createElem('span', { class: 'cal-month' }, _.config.i18n.months[nextMonth]),
			hf.createElem('span', { class: 'cal-year' }, nextYear)
		], next.header)
		hf.appendTo(_._getDates(nextYear, nextMonth), next.datesHolder)
		hf.appendTo([next.header, next.weekDays, next.datesHolder], next.wrapper)
		viewsHolder.calendars.push(next)

		hf.empty(viewsHolder.wrapper)

		hf.appendTo([
			prev.wrapper,
			inView.wrapper,
			next.wrapper
		], viewsHolder.wrapper)
	}
	/**
	 * Switches view of date picker (calendar, months, years)
	 * @param {string} view View name
	 */
	_switchView(view) {
		if (view !== 'calendar' && view !== 'months' && view !== 'years')
			return

		let _ = this, picker = _.datepicker,
			monthsView = picker.calendarHolder.monthsView,
			yearsView = picker.calendarHolder.yearsView,
			calViews = picker.calendarHolder.calendarViews.wrapper,
			buttons = picker.calendarHolder.buttons.wrapper,
			_animDuration = 250,
			_oldView = _.viewMode,
			hc = 'dp__hidden' // hidden class

		_.viewMode = view

		switch (_.viewMode) {
			case 'calendar':
				let _calendar = calViews.querySelector('.dudp__calendar:nth-child(2)') // current month in view

				calViews.classList.add('dp__animate-out')
				calViews.classList.remove(hc)
				if (_oldView !== 'calendar')
					_calendar.classList.add('dp__zooming', 'dp__animate-zoom')
				picker.calendarHolder.btnPrev.classList.remove(hc)
				picker.calendarHolder.btnNext.classList.remove(hc)
				buttons.classList.remove(hc)

				setTimeout(() => {
					calViews.classList.remove('dp__animate-out')
					if (_oldView !== 'calendar')
						_calendar.classList.remove('dp__animate-zoom')
				}, 10)
				monthsView.classList.add('dp__animate-out')
				yearsView.classList.add(hc)

				setTimeout(() => {
					if (_oldView !== 'calendar')
						_calendar.classList.remove('dp__zooming')
					monthsView.classList.add(hc)
					monthsView.classList.remove('dp__animate-out')
				}, _animDuration)
				break
			case 'months':
				picker.calendarHolder.btnPrev.classList.add(hc)
				picker.calendarHolder.btnNext.classList.add(hc)
				buttons.classList.add(hc)
				calViews.classList.add('dp__animate-out')
				monthsView.classList.add('dp__animate-out')
				monthsView.classList.remove(hc)

				setTimeout(() => {
					monthsView.classList.remove('dp__animate-out')
				}, 10)
				setTimeout(() => {
					calViews.classList.add(hc)
					calViews.classList.remove('dp__animate-out')
				}, _animDuration)
				break
			case 'years':
				hf.empty(yearsView)
				hf.appendTo(_._getYears(), yearsView)

				let _selYear = yearsView.querySelector('.dudp__year.selected')

				yearsView.scrollTop = _selYear.offsetTop - 120

				picker.calendarHolder.btnPrev.classList.add(hc)
				picker.calendarHolder.btnNext.classList.add(hc)
				buttons.classList.add(hc)

				monthsView.classList.add('dp__animate-out')
				calViews.classList.add('dp__animate-out')
				yearsView.classList.remove(hc)

				setTimeout(() => {
					calViews.classList.add(hc)
					calViews.classList.remove('dp__animate-out')
					monthsView.classList.add(hc)
					monthsView.classList.remove('dp__animate-out')
				}, _animDuration)
				break
		}
	}
	/**
	 * Moves the calendar to specified direction (previous or next)
	 * @param {string} direction Movement direction
	 */
	_move(direction) {
		if (direction !== 'next' && direction !== 'prev')
			return

		let _ = this

		if (_.animating)
			return

		let picker = _.datepicker, 
			viewsHolder = picker.calendarHolder.calendarViews, 
			_animDuration = 250, 
			_isNext = direction === 'next'

		let viewYear = parseInt(_.viewYear)
		let viewMonth = parseInt(_.viewMonth)

		if (_isNext ? viewMonth + 1 > 11 : viewMonth - 1 < 0)
			viewYear += (_isNext ? 1 : -1)
		viewMonth = _isNext ? (viewMonth + 1 > 11 ? 0 : viewMonth + 1) : (viewMonth - 1 < 0 ? 11 : viewMonth - 1)
		
		// Check min/max year
		let yearLimits = _._getYearLimits()
		let minYear = yearLimits.minYear
		let maxYear = yearLimits.maxYear
		if (_isNext && maxYear && viewYear > maxYear) return
		else if (!_isNext && minYear && viewYear < minYear) return

		_.viewYear = viewYear
		_.viewMonth = viewMonth
		_.animating = true

		//Start animation
		let animateClass = 'dp__animate-' + (_isNext ? 'left' : 'right')

		viewsHolder.wrapper.querySelectorAll('.dudp__calendar').forEach(function (cal) {
			cal.classList.add(animateClass)
		})

		//Setup new (previous or next) month calendar
		let _year = _.viewYear, _month = _isNext ? _.viewMonth + 1 : _.viewMonth - 1

		if (_isNext ? _month > 11 : _month < 0) {
			_month = _isNext ? 0 : 11
			_year += _isNext ? 1 : -1
		}

		let newCalDates = _._getDates(_year, _month),
			newCalEl = {
				wrapper: hf.createElem('div', { class: 'dudp__calendar' }),
				header: hf.createElem('div', { class: 'dudp__cal-month-year' }),
				weekDays: hf.createElem('div', { class: 'dudp__weekdays' }, hf.daysOfWeekDOM.call(_), true),
				datesHolder: hf.createElem('div', { class: 'dudp__dates-holder' })
			}

		hf.appendTo([
			hf.createElem('span', { class: 'cal-month' }, _.config.i18n.months[_month]),
			hf.createElem('span', { class: 'cal-year' }, _year)
		], newCalEl.header)
		hf.appendTo(newCalDates, newCalEl.datesHolder)
		hf.appendTo([newCalEl.header, newCalEl.weekDays, newCalEl.datesHolder], newCalEl.wrapper)

		setTimeout(() => {
			hf.appendTo(newCalEl.wrapper, viewsHolder.wrapper, _isNext ? undefined : 0)
			viewsHolder.wrapper.querySelectorAll('.dudp__calendar').forEach(function (cal) {
				cal.classList.remove(animateClass)
			})
			viewsHolder.wrapper.removeChild(viewsHolder.calendars[_isNext ? 0 : 2].wrapper)
			viewsHolder.calendars[_isNext ? 'shift' : 'pop']()
			viewsHolder.calendars[_isNext ? 'push' : 'unshift'](newCalEl)

			_.animating = false
		}, _animDuration)
	}
	/**
	 * Resets the selection to the date value of the input
	 */
	_resetSelection() {
		let _ = this

		if (_.config.range) {
			let _date = _.dateFrom ? _.dateFrom : new Date()

			_.rangeFrom = hf.dateToJson(_.dateFrom)
			_.rangeTo = hf.dateToJson(_.dateTo)

			_.viewYear = _date.getFullYear()
			_.viewMonth = _date.getMonth()
		} else if (_.config.multiple) {
			let starting = _.dates.length > 0 ? _.dates.reduce((a, b) => { return a < b ? a : b; }) : new Date()

			_.selectedDates = [..._.dates]
			_.viewYear = starting.getFullYear()
			_.viewMonth = starting.getMonth()
		} else {
			_.selected = hf.dateToJson(_.date)
			_.viewYear = _.selected.year
			_.viewMonth = _.selected.month
		}

		_.datepicker.calendarHolder.monthsView.querySelectorAll('.dudp__month').forEach(function (melem) {
			let _meMonth = parseInt(melem.dataset.month),
				_month = _.config.range ? (_.dateFrom ? _.dateFrom.getMonth() : null) : 
					_.config.multiple ? (_.dates.length > 0 ? _.dates.reduce((a, b) => { return a < b ? a : b; }) : null) :
					_.selected.month

			melem.classList[_meMonth === _month ? 'add' : 'remove']('selected')
		})
	}
	/**
	 * Sets the section display (datepicker header)
	 */
	_setSelection() {
		let _ = this, picker = _.datepicker,
			selected = _.config.range ? new Date() : 
				_.config.multiple ? (_.selectedDates.length > 0 ? _.selectedDates.reduce((a, b) => { return a < b ? a : b; }) : new Date()) :
				hf.jsonToDate(_.selected)

		picker.header.selectedYear.innerText = selected.getFullYear()
		picker.header.selectedDate.innerText = hf.formatDate.call(_, selected, SELECTED_FORMAT)
	}
	/**
	 * Determines if the value(s) given can be set as the date picker's value (constraint check on minDate, maxDate, minYear, maxYear)
	 * @param {string} mode Mode of the date picker (i.e. range, multiple)
	 * @param {(Date|Date[]|Object)} value Value to be set
	 * @param {Date} value.from Date from value (for range mode)
	 * * @param {Date} value.to Date to value (for range mode)
	 */
	_canSetValue(mode, value) {
		if (mode != 'range' && mode != 'multiple' && mode != 'default') return false

		let _ = this, config = _.config,
			canSet = true,
			invalidDate = ''

		if (mode == 'range' && value.from && value.to) {
			if (_._beyondMinMax(value.from)) {
				canSet = false
				invalidDate = hf.formatDate.call(_, value.from, config.format)
			}
			else if (_._beyondMinMax(value.to)) {
				canSet = false
				invalidDate = hf.formatDate.call(_, value.to, config.format)
			}
		}
		else if (mode == 'multiple') {
			for (let i = 0; i < value.length; i++) {
				const date = value[i]
				
				if (_._beyondMinMax(date)) {
					canSet = false
					invalidDate = hf.formatDate.call(_, date, config.format)
					break;
				}
			}
		}
		else if (mode == 'default' && _._beyondMinMax(value)) {
			canSet = false
			invalidDate = hf.formatDate.call(_, value, config.format)
		}

		return {
			canSet,
			remarks: `"${invalidDate}" is beyond the selectable date(s). Kindly check minDate, maxDate, minYear or maxYear configurations.`
		}
	}
	/**
	 * Sets the value of the input
	 * @param {(string|Date|string[])} value The new input value. If the value specified is a string, it will be parsed using `config.format`.
	 * @param {Boolean} triggerEvt Determines if change events should be triggered
	 */
	setValue(value, triggerEvt = true) {
		if (typeof value === 'undefined')
			throw new Error('Expecting a value.')
		let _ = this, _empty = typeof value === 'string' && value === '', changeData = null

		if (_.config.range) {
			let _range = _empty ? [] : value.split(_.config.rangeDelim)

			if (value !== '' && _range.length < 2)
				throw new Error('Invalid date range value.')

			let now = new Date(),
				_from = _empty ? null : hf.parseDate.call(_, _range[0]).date,
				_to = _empty ? null : hf.parseDate.call(_, _range[1]).date,
				formattedFrom = _empty ? '' : hf.formatDate.call(_, _from, _.config.format),
				outFrom = _empty ? '' : hf.formatDate.call(_, _from, _.config.outFormat || _.config.format),
				formattedTo = _empty ? '' : hf.formatDate.call(_, _to, _.config.format),
				outTo = _empty ? '' : hf.formatDate.call(_, _to, _.config.outFormat || _.config.format),
				valueDisp = _empty ? '' : (_.config.events && _.config.events.onRangeFormat ? _.formatRange(_from, _to) : _range[0] === _range[1] ? _range[0] : value)

			let canSet = _._canSetValue('range', { from: _from, to: _to })
			if (!canSet.canSet) {
				throw new Error(canSet.remarks)
			}

			_.dateFrom = _from
			_.dateTo = _to
			_.viewYear = (_from ? _from : now).getFullYear()
			_.viewMonth = (_from ? _from : now).getMonth()
			_.input.value = valueDisp
			hf.setAttributes(_.input, {
				'value': valueDisp,
				'data-range-from': outFrom,
				'data-range-to': outTo
			})

			if (_.fromEl) {
				_.fromEl.value = formattedFrom
				hf.setAttributes(_.fromEl, {
					'value': formattedFrom,
					'data-value': outFrom
				})
			}

			if (_.toEl) {
				_.toEl.value = formattedTo
				hf.setAttributes(_.toEl, {
					'value': formattedTo,
					'data-value': outTo
				})
			}

			changeData = {
				_dateFrom: _from, dateFrom: _empty ? null : formattedFrom,
				_dateTo: _to, dateTo: _empty ? null : formattedTo,
				value: valueDisp
			}
		} else if (_.config.multiple) {
			let dates = [],
				isArray = Array.isArray(value),
				values = isArray ? value : value.split(',')

			values.forEach(v => dates.push(hf.parseDate.call(_, v).date))

			let starting = dates.length > 0 ? dates.reduce((a, b) => { return a < b ? a : b; }) : new Date()

			if (dates.length > 0) dates = dates.sort((a, b) => { return a > b ? 1 : a < b ? -1 : 0 })

			let canSet = _._canSetValue('multiple', dates)
			if (!canSet.canSet) {
				throw new Error(canSet.remarks)
			}

			_.dates = [...dates]
			_.viewYear = starting.getFullYear()
			_.viewMonth = starting.getMonth()

			hf.setAttributes(_.input, { 'value': dates.map(d => hf.formatDate.call(_, d, _.config.outFormat || _.config.format)).join(',') })

			changeData = {
				_dates: _empty ? [] : _.dates,
				dates: _empty ? [] : _.dates.map(d => hf.formatDate.call(_, d, _.config.outFormat || _.config.format))
			}
		} else {
			let date = typeof value === 'string' ? (_empty ? new Date() : hf.parseDate.call(_, value, _.config.format).date) : value,
				formatted = _empty ? '' : hf.formatDate.call(_, date, _.config.format)
			
			let canSet = _._canSetValue('default', date)
			if (!canSet.canSet) {
				throw new Error(canSet.remarks)
			}

			_.date = date
			_.viewYear = date.getFullYear()
			_.viewMonth = date.getMonth()
			_.input.value = formatted
			_.input.setAttribute('value', formatted)

			changeData = {
				_date: _empty ? null : _.date,
				date: _empty ? null : hf.formatDate.call(_, _.date, _.config.outFormat || _.config.format)
			}
		}

		if (triggerEvt) {
			hf.triggerChange(_.input, changeData)

			if (_.config.events && _.config.events.dateChanged)
				_.config.events.dateChanged.call(_, changeData, _)
		}
	}
	/**
	 * Returns formatted string representation of specified date
	 * @param {Date} date Date object
	 * @param {string} format Date format
	 */
	formatDate(date, format) { return hf.formatDate.call(this, date, format) }
	/**
	 * Formats specified date range to string (for display)
	 * @param {Date} from Date from
	 * @param {Date} to Date to
	 * @returns {string} Formatted date range
	 */
	formatRange(from, to) { return this.config.events.onRangeFormat.call(this, from, to, this) }
	/**
	 * Sets the minimum date configuration
	 * @param {string} date Minimum selectable date
	 */
	setMinDate(date) { this.config.minDate = date }
	/**
	 * Sets the maximum date configuration
	 * @param {string} date Maximum selectable date
	 */
	setMaxDate(date) { this.config.maxDate = date }
	/**
	 * Sets the minimum year configuration
	 * @param {Number} year Minimum year
	 */
	setMinYear(year) { this.config.minYear = year }
	/**
	 * Sets the maximum year configuration
	 * @param {Number} year Maximum year
	 */
	setMaxYear(year) { this.config.maxYear = year }
	/**
	 * Sets the prior years configuration
	 * @param {Number} years Number of years
	 */
	setPriorYears(years) { this.config.priorYears = years }
	/**
	 * Sets the later years configuration
	 * @param {Number} years Number of years
	 */
	setLaterYears(years) { this.config.laterYears = years }
	/**
	 * Sets the date picker theme configuration
	 * @param {string} theme Theme name
	 */
	setTheme(theme) { this.config.theme = theme }
	/**
	 * Sets the disabled dates configuration
	 * @param {string[]} dates List of disabled dates
	 */
	setDisabled(dates) { this.config.disabledDates = dates }
	/**
	 * Sets the disabled days configuration
	 * @param {string[]} days List of disabled days
	 */
	setDisabledDays(days) { this.config.disabledDays = days }
	/**
	 * Sets the internationalization configuration
	 * @param {(string|Object)} i18n Internationalization name or instance
	 */
	setI18n(i18n) {
		let _ = this

		if (typeof i18n === 'string')
			_.config.i18n = duDatepicker.i18n[i18n]
		else if (typeof i18n == 'object') 
			_.config.i18n = i18n

		// refresh UI
		let i18nConfig = _.config.i18n,
			picker = _.datepicker

		if (i18nConfig.dict) {
			_.dict = hf.extend(_.dict, i18nConfig.dict)

			picker.calendarHolder.buttons.btnClear.innerText = _.dict.btnClear
			picker.calendarHolder.buttons.btnOk.innerText = _.dict.btnOk
			picker.calendarHolder.buttons.btnCancel.innerText = _.dict.btnCancel
		}

		// reset selected value
		let format = _.config.format

		if (_.config.range && _.rangeFrom && _.input.value) {
			let rangeFrom = hf.jsonToDate(_.rangeFrom),
				rangeTo = hf.jsonToDate(_.rangeTo)

			_.setValue([hf.formatDate.call(_, rangeFrom, format), hf.formatDate.call(_, rangeTo, format)].join(_.config.rangeDelim), false)
		}
		else if (_.config.multiple && _.selectedDates.length > 0 && _.input.value) {
			_.setValue(_.selectedDates.map(sd => hf.formatDate.call(_, sd, format)), false)
		}
		else if (_.selected && _.input.value) {
			let sd = _.selected
			_.setValue(new Date(sd.year, sd.month, sd.date), false)
		}

		_._setupMonths()
		_._setupCalendar()
	}
	/**
	 * Shows the date picker
	 */
	show() {
		let _ = this

		// refresh config
		_.minDate = _.input.dataset.mindate || _.config.minDate
		_.maxDate = _.input.dataset.maxdate || _.config.maxDate
		_.datepicker.wrapper.dataset.theme = _.input.dataset.theme || _.config.theme

		setTimeout(() => {
			document.body.setAttribute('datepicker-display', 'on')
			_._resetSelection()
			_._setSelection()
			_._setupCalendar()
			_.datepicker.container.classList.add('dp__open')

			if (_.config.inline) {
				let inputRef = _.showInFromEl ? _.fromEl : _.showInToEl ? _.toEl : _.input,
					offset = hf.calcOffset(inputRef),
					picker_dim = {
						height: _.datepicker.wrapper.offsetHeight,
						width: _.datepicker.wrapper.offsetWidth
					},
					screen_dim = hf.screenDim(),
					below = offset.top + picker_dim.height < screen_dim.height,
					left_side = offset.left + picker_dim.width < screen_dim.width,
					offsetCss = {},
					scroll = {
						y: window.scrollY,
						x: window.scrollX
					}

				offsetCss[below ? 'top' : 'bottom'] = `${below ? offset.top - scroll.y : offset.bottom}px`
				offsetCss[left_side ? 'left' : 'right'] = `${left_side ? offset.left - scroll.x : offset.right}px`

				_.datepicker.container.removeAttribute('style')
				hf.setStyles(_.datepicker.container, offsetCss)
			}

			_.datepicker.wrapper.focus()
			_.visible = true
			_.input.blur()

			if (_.config.events && _.config.events.shown)
				_.config.events.shown.call(_, _)
		}, 0)
	}
	/**
	 * Hides the date picker
	 */
	hide() {
		let _ = this

		_.datepicker.container.classList.add('dp__closing')
		_.visible = false
		_.input.focus()
		document.body.removeAttribute('datepicker-display')
		setTimeout(() => {
			_._switchView('calendar') // Reset view to calendar
			hf.removeClass(_.datepicker.container, ['dp__closing', 'dp__open'])

			if (_.config.events && _.config.events.hidden)
				_.config.events.hidden.call(_, _)
		}, 200)
	}
	/**
	 * Destroys the date picker plugin
	 */
	destroy() {
		this._unbindInput()
		this.config.root.removeChild(this.datepicker.container)
		delete this.input[DATA_KEY]
	}
}

/**
 * Creates date picker
 */
function duDatepicker() {
	let args = arguments,
		arg0 = args[0], arg0IsList = arg0 instanceof NodeList || Array.isArray(arg0), arg0IsElem = hf.isElement(arg0),
		inputs = typeof arg0 === 'string' ? document.querySelectorAll(arg0) :
			(arg0IsList ? arg0 : (arg0IsElem ? [arg0] : document.querySelectorAll(DEFAULT_CLASS))),
		options = typeof arg0 === 'object' && !(arg0IsList) && !(arg0IsElem) ? arg0 : args[1] && typeof args[1] === 'object' ? args[1] : {}

	Array.from(inputs).forEach(function (el) {
		let picker = el[DATA_KEY]

		if (!picker)
			el[DATA_KEY] = (picker = new _duDatePicker(el, options))

		if ((typeof arg0 === 'string' || arg0IsList || arg0IsElem) && (args[1] && typeof args[1] === 'string' && args[1] != 'set')) {
			let params = Array.prototype.slice.call(args).slice(2)
			picker[args[1]].apply(picker, params)
		}
		else if ((typeof arg0 === 'string' || arg0IsList || arg0IsElem) && args[1] == 'set' && (args[2] && typeof args[2] === 'object' && !Array.isArray(args[2]))) {
			Object.keys(args[2]).forEach(key => {
				let params = args[2][key]
				picker[key].apply(picker, [params])
			})
		}
	})
}

Object.defineProperty(duDatepicker, 'i18n', {
	value: i18n
})

duDatepicker.defaults = function (configs) {
	_duDatePicker.default_configs = hf.extend(DEFAULTS, configs)
}

export default duDatepicker

