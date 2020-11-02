import { EX_KEYS, DATA_KEY, DEFAULT_CLASS, SELECTED_FORMAT, DEFAULTS } from './vars'
import { hf } from './helpers'
import { DICT_DEFAULTS, i18n } from './i18n'

/**
 * Date picker class
 */
class _duDatePicker {
	/**
	 * Creates date picker
	 * @param {HTMLInputElement} el Input element
	 * @param {Object} options Date picker options
	 */
	constructor(el, options) {
		let _ = this , i18n = options.i18n

		if (typeof i18n === 'string')
			options.i18n = duDatepicker.i18n[i18n]

		this.config = hf.extend(DEFAULTS, options)

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
		if (_.config.value) {
			_.input.value = _.config.value
			_.input.setAttribute('value', _.config.value)
		}

		this.minDate = _.input.dataset.mindate || _.config.minDate
		this.maxDate = _.input.dataset.maxdate || _.config.maxDate

		// current selected date, default is today if no value given
		let _date = new Date()

		if (_.config.range) {
			let value = _.input.value, _range = value.split(_.config.rangeDelim)

			if (value !== '' && _range.length < 2)
				throw new Error('duDatePicker: Invalid date range value')

			let _from = value === '' ? null : hf.parseDate.call(_, _range[0]).date,
				_to = value === '' ? null : hf.parseDate.call(_, _range[1]).date

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
		} else {
			this.date = _.input.value === '' ? _date : hf.parseDate.call(_, _.input.value).date
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
			buttons = calendarHolder.buttons,
			_selected = _.selected ? _.selected : new Date()

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
		let _month = 0
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
					let _this = this, _data = _this.dataset.month

					_.viewMonth = _data

					_._setupCalendar()
					_._switchView('calendar')
				})

				_month++
			}
			hf.appendTo(monthRow, calendarHolder.monthsView)
		}

		// Setup years view
		hf.appendTo(_._getYears(), calendarHolder.yearsView)

		if (_.config.clearBtn)
			hf.appendTo(buttons.btnClear, buttons.wrapper)
		if (_.config.cancelBtn)
			hf.appendTo(buttons.btnCancel, buttons.wrapper)

		if (!_.config.auto || _.config.range)
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

		hf.addEvent(calendarHolder.btnPrev, 'click', function () { _._move('prev') })
		hf.addEvent(calendarHolder.btnNext, 'click', function () { _._move('next') })

		hf.addEvent(calendarHolder.calendarViews.wrapper, 'click', function (e) {
			if (e.target.classList.contains('cal-year')) {
				_._switchView('years')
			} else if (e.target.classList.contains('cal-month')) {
				_._switchView('months')
			}
		})

		if (_.config.clearBtn)
			hf.addEvent(buttons.btnClear, 'click', function () {
				_.setValue('')
				_.hide()
			})

		if (_.config.overlayClose) {
			hf.addEvent(picker.container, 'click', function () { _.hide() })
			hf.addEvent(picker.wrapper, 'click', function (e) { e.stopPropagation() })
		}

		if (_.config.cancelBtn) {
			hf.addEvent(buttons.btnCancel, 'click', function () { _.hide() })
		}

		hf.addEvent(buttons.btnOk, 'click', function () {
			if (_.config.range) {
				if (!_.rangeFrom || !_.rangeTo)
					return

				let _from = hf.jsonToDate(_.rangeFrom),
					_to = hf.jsonToDate(_.rangeTo)

				if (_._dateDisabled(_from) || _._dateDisabled(_to))
					return

				_.dateFrom = _from
				_.dateTo = _to
				_.setValue([hf.formatDate.call(_, _from, _.config.format), hf.formatDate.call(_, _to, _.config.format)].join(_.config.rangeDelim))
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
	 * Determines if date is disabled
	 * @param {Date} date Date object
	 * @returns {Boolean} `true` if specified date should be disabled, `false` otherwise
	 */
	_dateDisabled(date) {
		let _ = this, min = null, max = null,
			now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
			_dates = _.config.disabledDates,
			_days = _.config.disabledDays,
			_inDates = _dates.filter(function (x) {
				if (x.indexOf('-') >= 0)
					return (date >= hf.parseDate.call(_, x.split('-')[0]).date && date <= hf.parseDate.call(_, x.split('-')[1]).date)

				else
					return hf.parseDate.call(_, x).date.getTime() === date.getTime()
			}).length > 0,
			_inDays = _days.indexOf(_.config.i18n.days[date.getDay()]) >= 0 ||
				_days.indexOf(_.config.i18n.shortDays[date.getDay()]) >= 0 ||
				_days.indexOf(_.config.i18n.shorterDays[date.getDay()]) >= 0

		if (_.minDate)
			min = _.minDate === "today" ? today : new Date(_.minDate)
		if (_.maxDate)
			max = _.maxDate === "today" ? today : new Date(_.maxDate)

		return (min && date < min) || (max && date > max) || (_inDates || _inDays)
	}
	/**
	 * @param {number} year Year
	 * @param {number} month Month
	 * @returns {HTMLSpanElement[]} Returns the dates of the specified month and year
	 */
	_getDates(year, month) {
		let _ = this, day = 1, now = new Date(),
			today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
			selected = _.config.range ? null : hf.jsonToDate(_.selected),
			rangeFrom = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
			rangeTo = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null,
			date = new Date(year, month, day), totalDays = hf.getDaysCount(date), nmStartDay = 1,
			weeks = [], 
			firstDay = _.config.firstDay || _.config.i18n.firstDay,
            lastDay = (firstDay + 6) % 7

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

				if (date.getTime() === today.getTime())
					dayEl.classList.add('current')

				if (_._dateDisabled(date))
					dayEl.classList.add('disabled')
				if (_._inRange(date))
					dayEl.classList.add('in-range')

				if (!_.config.range && date.getTime() === selected.getTime())
					dayEl.classList.add('selected')
				if (_.config.range && rangeFrom && date.getTime() === rangeFrom.getTime())
					dayEl.classList.add('range-from')
				if (_.config.range && rangeTo && date.getTime() === rangeTo.getTime())
					dayEl.classList.add('range-to')

				if (week === 1 && dayOfWeek === firstDay % 7) {
					break
				} else if (dayOfWeek !== lastDay) {
					dayEl.innerText = day++
				} else {
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
						pm.setDate(pmDays--)

						let dayEl = daysOfWeek.find(d => parseInt(d.dataset.dow) === pm.getDay())

						if (dayEl.innerText !== '')
							continue

						dayEl.dataset.date = pm.getDate()
						dayEl.dataset.month = pm.getMonth()
						dayEl.dataset.year = pm.getFullYear()
						dayEl.innerText = pm.getDate()
						dayEl.classList.add('dudp__pm')

						if (_._dateDisabled(pm))
							dayEl.classList.add('disabled')
						if (_._inRange(pm))
							dayEl.classList.add('in-range')

						if (pm.getTime() === today.getTime())
							dayEl.classList.add('current')
						if (!_.config.range && pm.getTime() === selected.getTime())
							dayEl.classList.add('selected')
						if (_.config.range && rangeFrom && pm.getTime() === rangeFrom.getTime())
							dayEl.classList.add('range-from')
						if (_.config.range && rangeTo && pm.getTime() === rangeTo.getTime())
							dayEl.classList.add('range-to')
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

						if (_._dateDisabled(nm))
							dayEl.classList.add('disabled')
						if (_._inRange(nm))
							dayEl.classList.add('in-range')

						if (nm.getTime() === today.getTime())
							dayEl.classList.add('current')
						if (!_.config.range && nm.getTime() === selected.getTime())
							dayEl.classList.add('selected')
						if (_.config.range && rangeFrom && nm.getTime() === rangeFrom.getTime())
							dayEl.classList.add('range-from')
						if (_.config.range && rangeTo && nm.getTime() === rangeTo.getTime())
							dayEl.classList.add('range-to')
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
					let _this = this, _year = _this.dataset.year, _month = _this.dataset.month,
						_date = _this.dataset.date,
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
						_.datepicker.calendarHolder.calendarViews.wrapper.querySelectorAll('.dudp__date').forEach(function (delem) {
							let _deYear = delem.dataset.year,
								_deMonth = delem.dataset.month,
								_deDate = delem.dataset.date

							delem.classList[(_year === _deYear && _month === _deMonth && _date === _deDate) ? 'add' : 'remove']('selected')
						})


						_this.classList.add('selected')
						_.selected = { year: _year, month: _month, date: _date }
						_._setSelection()

						if (_.config.auto) {
							_.date = _selected
							_.setValue(_.date)
							_.hide()
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
	 * @returns {HTMLSpanElement[]} Returns years range for the years view
	 */
	_getYears() {
		let _ = this, _minYear = _.viewYear - 50, _maxYear = _.viewYear + 25,
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
				if (!_.config.range)
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
		}, prevMonth = _month === 0 ? 11 : _month - 1,
			nextMonth = _month === 11 ? 0 : _month + 1,
			prevYear = _month === 0 ? _year - 1 : _year,
			nextYear = _month === 11 ? _year + 1 : _year

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

		let picker = _.datepicker, viewsHolder = picker.calendarHolder.calendarViews, _animDuration = 250, _isNext = direction === 'next'

		if (_isNext ? _.viewMonth + 1 > 11 : _.viewMonth - 1 < 0)
			_.viewYear += (_isNext ? 1 : -1)
		_.viewMonth = _isNext ? (_.viewMonth + 1 > 11 ? 0 : _.viewMonth + 1) : (_.viewMonth - 1 < 0 ? 11 : _.viewMonth - 1)

		_.animating = true

		//Start animation
		let animateClass = 'dp__animate-' + (_isNext ? 'left' : 'right')

		viewsHolder.wrapper.querySelectorAll('.dudp__calendar').forEach(function (cal) {
			cal.classList.add(animateClass)
		})

		//Setup new (previos or next) month calendar
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
		} else {
			_.selected = hf.dateToJson(_.date)
			_.viewYear = _.selected.year
			_.viewMonth = _.selected.month
		}

		_.datepicker.calendarHolder.monthsView.querySelectorAll('.dudp__month').forEach(function (melem) {
			let _meMonth = parseInt(melem.dataset.month),
				_month = _.config.range ? _.dateFrom ? _.dateFrom.getMonth() : null : _.selected.month

			melem.classList[_meMonth === _month ? 'add' : 'remove']('selected')
		})
	}
	/**
	 * Sets the section display (datepicker header)
	 */
	_setSelection() {
		let _ = this, picker = _.datepicker,
			selected = _.config.range ? new Date() : hf.jsonToDate(_.selected)

		picker.header.selectedYear.innerText = selected.getFullYear()
		picker.header.selectedDate.innerText = hf.formatDate.call(_, selected, SELECTED_FORMAT)
	}
	/**
	 * Sets the value of the input
	 * @param {(string|Date)} value The new input value. If the value specified is a string, it will be parsed using `config.format`.
	 */
	setValue(value) {
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
				valueDisp = _empty ? '' : (
					_.config.events && _.config.events.onRangeFormat ? _.formatRange(_from, _to) : _range[0] === _range[1] ? _range[0] : value)

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
		} else {
			let date = typeof value === 'string' ? (
				_empty ? new Date() : hf.parseDate.call(_, value, _.config.format).date) : value,
				formatted = _empty ? '' : hf.formatDate.call(_, date, _.config.format)

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

		hf.triggerChange(_.input, changeData)

		if (_.config.events && _.config.events.dateChanged)
			_.config.events.dateChanged.call(_, changeData, _)
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
	 * Shows the date picker
	 */
	show() {
		let _ = this
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
			_.datepicker.container.classList.remove('dp__closing', 'dp__open')

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

		if ((typeof arg0 === 'string' || arg0IsList || arg0IsElem) && (args[1] && typeof args[1] === 'string')) {
			picker[args[1]].apply(picker, Array.prototype.slice.call(args).slice(2))
		}
	})
}

Object.defineProperty(duDatepicker, 'i18n', {
	value: i18n
})

export default duDatepicker

