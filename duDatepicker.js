/* -- DO NOT REMOVE --
 * jQuery DUDatePicker v1.0 plugin
 * 
 * Author: Dionlee Uy
 * Email: dionleeuy@gmail.com
 *
 * Date: Monday, Sept 4 2017
 *
 * @requires jQuery
 * -- DO NOT REMOVE --
 */
if (typeof jQuery === 'undefined') { throw new Error('DUDatePicker: This plugin requires jQuery'); }
+function ($) {

	Date.prototype.getDays = function() { return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate(); };
	Date.prototype.getDaysCount = function() { return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate(); };

	var MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'],
		SHORT_MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
		DAYS_OF_WEEK = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
		SHORT_DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
		EX_KEYS = [9,112,113,114,115,116,117,118,119,120,121,122,123],
		DCAL_DATA = '_duDatepicker',
		SELECTED_FORMAT = 'D, mmm d', MONTH_HEAD_FORMAT = 'mmmm yyyy',

		DUDatePicker = function(elem, options) {
			var that = this;
			this.dateAnimTimeout = null;
			this.animating = false;

			this.visible = false;
			this.input = $(elem);
			this.config = options;
			this.viewMode = 'calendar';
			this.datepicker = {
				container: $('<div class="dcalendarpicker hidden"></div>'),
				wrapper: $('<div class="dcp__wrapper"></div>'),
				header: {
					wrapper: $('<section class="dcp__calendar-header"></section>'),
					selectedYear: $('<span class="dcp__sel-year"></span>'),
					selectedDate: $('<span class="dcp_sel-date"></span>')
				},
				calendarHolder: {
					wrapper: $('<section class="dcp__cal-container"></section>'),
					btnPrev: $('<span class="dcp__btn-cal-prev">&lsaquo;</span>'),
					btnNext: $('<span class="dcp__btn-cal-next">&rsaquo;</span>'),
					calendarViews: {
						wrapper: $('<div class="dcp__calendar-views"></div>'),
						calendars: []
					},
					yearsView: $('<div class="dcp__years-view hidden"></div>'),
					monthsView: $('<div class="dcp__months-view hidden"></div>'),
					buttons: {
						wrapper: $('<div class="dcp__buttons"></div>'),
						btnClear: $('<span class="dcp__button clear">Clear</span>'),
						btnCancel: $('<span class="dcp__button cancel">Cancel</span>'),
						btnOk: $('<span class="dcp__button ok">Ok</span>')
					}
				}
			};

			//current selected date, default is today if no value given
			this.date = this.input.val() === '' ? new Date() : this.parseDate(this.input.val()).date;
			this.selected = { year: that.date.getFullYear(), month: that.date.getMonth(), date: that.date.getDate() };
			this.viewMonth = this.selected.month;
			this.viewYear = this.selected.year;

			this.minDate = this.input.data('mindate');
			this.maxDate = this.input.data('maxdate');
			this.rangeFromEl = this.input.data('rangefrom');
			this.rangeToEl = this.input.data('rangeto');

			that.setupPicker();
			that.setSelection();
		};

	DUDatePicker.prototype = {
		constructor : DUDatePicker,

		/* Initializes the date picker */
		setupPicker: function () {
			var that = this,
				picker = that.datepicker;
				header = picker.header,
				calendarHolder = picker.calendarHolder,
				buttons = calendarHolder.buttons;

			// Setup header
			header.wrapper.append(header.selectedYear)
				.append(header.selectedDate)
				.appendTo(picker.wrapper);

			// Setup months view
			var _month = 0;
			for (var r = 1; r < 4; r++) {
				var monthRow = $('<div class="dcp__month-row"></div>');
				for (var i = 0; i < 4; i++) {
					var monthElem = $('<span class="dcp__month"></span>');

					if (_month === that.selected.month) monthElem.addClass('selected');

					monthElem.text(SHORT_MONTHS[_month])
						.data('month', _month)
						.appendTo(monthRow)
						.on('click', function (e) {
							var _this = $(this), _data = _this.data('month');

							that.viewMonth = _data;
							that.setupCalendar();
							that.switchView('calendar');
						});
					_month++;
				}
				calendarHolder.monthsView.append(monthRow);
			}

			// Setup years view
			calendarHolder.yearsView.html(that.getYears());

			if(that.config.clearBtn) buttons.wrapper.append(buttons.btnClear);
			if(that.config.cancelBtn) buttons.wrapper.append(buttons.btnCancel);
			buttons.wrapper.append(buttons.btnOk);

			calendarHolder.wrapper.append(calendarHolder.btnPrev)
				.append(calendarHolder.btnNext)
				.append(calendarHolder.calendarViews.wrapper)
				.append(calendarHolder.monthsView)
				.append(calendarHolder.yearsView)
				.append(buttons.wrapper)
				.appendTo(picker.wrapper);

			picker.container.append(picker.wrapper)
				.appendTo('body');

			// Setup theme
			switch(that.config.theme) {
				case 'red':
				case 'blue':
				case 'green':
				case 'purple':
				case 'indigo':
				case 'teal':
					picker.wrapper.attr('data-theme', that.config.theme);
				break;
				default:
					picker.wrapper.attr('data-theme', $.fn.duDatepicker.defaults.theme);
				break;
			}

			/* ------------------------ Setup actions ------------------------ */
			that.input.click(function () { that.show(); })
				.on('keydown', function (e) { return !(EX_KEYS.indexOf(e.which) < 0 && that.config.readOnly); })
				.keydown(function (e) { if (e.keyCode === 13) that.show(); });

			// Switch to years view
			header.selectedYear.click(function (e) { if (that.viewMode !== 'years') that.switchView('years'); });
			// Switch to calendar view (of the selected date)
			header.selectedDate.click(function (e) { 
				if (that.viewMode !== 'calendar') {
					that.viewMonth = that.selected.month;
					that.setupCalendar();
					that.switchView('calendar');
				}
			});

			calendarHolder.btnPrev.click(function (e) { that.move('prev'); });
			calendarHolder.btnNext.click(function (e) { that.move('next'); });

			// Switch view to months view
			calendarHolder.calendarViews.wrapper
				.on('click', '.dcp__cal-month-year', function (e) { if (that.viewMode !== 'months') that.switchView('months'); });

		    if (that.config.clearBtn)
			    buttons.btnClear.click(function () {
			    	var now = new Date();

			    	that.date = now;
			    	that.input.val('').attr('value', '');
			    	that.triggerChange($.Event('datechanged', { date: null }));
			    	that.hide();
			    });

			if (that.config.overlayClose) {
				picker.container.click(function (e) { that.hide(); });
				picker.wrapper.click(function (e) { e.stopPropagation(); });
			}

			if (that.config.cancelBtn) buttons.btnCancel.click(function () { that.hide(); });
			buttons.btnOk.click(function () {
				var _date = new Date(that.selected.year, that.selected.month, that.selected.date);

				if (that.disabledDate(_date)) return;

				that.date = _date;
				that.setValue(that.date);
				that.hide();
			});
		},

		/* Returns the dates of the specified month and year */
		getDates: function (year, month) {
			var that = this, day = 1, now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
				selected = new Date(that.selected.year, that.selected.month, that.selected.date),
				date = new Date(year, month, day), totalDays = date.getDaysCount(), nmStartDay = 1,
				weeks = [];

			for(var week = 1; week <= 6; week++) {
				var daysOfWeek = [$('<span class="dcp__date"></span>'), $('<span class="dcp__date"></span>'), $('<span class="dcp__date"></span>'), 
						$('<span class="dcp__date"></span>'), $('<span class="dcp__date"></span>'), $('<span class="dcp__date"></span>'),
						$('<span class="dcp__date"></span>')];

				while(day <= totalDays) {
					date.setDate(day);
					var dayOfWeek = date.getDay();

					daysOfWeek[dayOfWeek].data('date', day).data('month', month).data('year', year);

					if (date.getTime() == today.getTime()) daysOfWeek[dayOfWeek].addClass('current');

                    if (that.disabledDate(date)) daysOfWeek[dayOfWeek].addClass('disabled');

					if(week === 1 && dayOfWeek === 0){
						break;
					} else if (dayOfWeek < 6) {
					    if (date.getTime() == selected.getTime()) daysOfWeek[dayOfWeek].addClass('selected');

						daysOfWeek[dayOfWeek].text(day++);
					} else {
					    if (date.getTime() == selected.getTime()) daysOfWeek[dayOfWeek].addClass('selected');

						daysOfWeek[dayOfWeek].text(day++);
						break;
					}
				}

				// if (!that.config.exceedingDates) continue;

				/* For days of previous and next month */
				if (week === 1 || week > 4) {
					// First week
				    if (week === 1) {
				        var prevMonth = new Date(year, month - 1, 1), prevMonthDays = prevMonth.getDaysCount();

						for (var a = 6; a >= 0; a--) {
						    if (daysOfWeek[a].text() !== '') continue;

						    daysOfWeek[a].data('date', prevMonthDays).data('month', month - 1).data('year', year);
						    prevMonth.setDate(prevMonthDays);
						    daysOfWeek[a].text((prevMonthDays--)).addClass('dcp__pm');

							if (that.disabledDate(prevMonth)) daysOfWeek[a].addClass('disabled');

							if (prevMonth.getTime() == selected.getTime()) daysOfWeek[a].addClass('selected');
							if (prevMonth.getTime() == today.getTime()) daysOfWeek[a].addClass('current');
						}
					} 
					// Last week
					else if (week > 4) {
					    var nextMonth = new Date(year, month + 1, 1);
						for (var a = 0; a <= 6; a++) {
						    if (daysOfWeek[a].text() !== '') continue;

						    daysOfWeek[a].data('date', nmStartDay).data('month', month + 1).data('year', year);
						    nextMonth.setDate(nmStartDay);
						    daysOfWeek[a].text((nmStartDay++)).addClass('dcp__nm');

							if (that.disabledDate(nextMonth)) daysOfWeek[a].addClass('disabled');

							if (nextMonth.getTime() == selected.getTime()) daysOfWeek[a].addClass('selected');
							if (nextMonth.getTime() == today.getTime()) daysOfWeek[a].addClass('current');
						}
					}
				}
				weeks.push(daysOfWeek);
			}
			var calDates = [];
			$.each(weeks, function (idx, dow) {
				var calWeek = $('<div class="dcp__cal-week"></div>');

				for(var i = 0; i < dow.length; i++) {
					var dateElem = dow[i];

					// Attach click handler for dates
					dateElem.click(function (e) {
						var _this = $(this), _year = _this.data('year'), _month = _this.data('month'), _date = _this.data('date'),
							_selected = new Date(_year, _month, _date);

						if (that.disabledDate(_selected)) return;

						_this.parents('.dcp__calendar-views').find('.dcp__date').each(function (idx, delem) {
							var _deYear = $(delem).data('year'), _deMonth = $(delem).data('month'), _deDate = $(delem).data('date');

							$(delem)[(_year === _deYear && _month === _deMonth && _date === _deDate) ? 'addClass' : 'removeClass']('selected');
						});
						_this.parents('.dcp__cal-container').find('.dcp__month').each(function (idx, melem) {
							var _meMonth = $(melem).data('month');

							$(melem)[_meMonth === _month ? 'addClass' : 'removeClass']('selected');
						});
						_this.addClass('selected');

						that.selected = { year: _year, month: _month, date: _date };

						that.setSelection();
					});

					calWeek.append(dateElem);
				}

				calDates.push(calWeek);
			});
			return calDates;
		},

		/* Returns years range for the years view */
		getYears: function () {
			var that = this, _minYear = that.viewYear - 100, _maxYear = that.viewYear + 100,
				_years = [];

			for (var y = _minYear; y <= _maxYear; y++) {
				var yearElem = $('<span class="dcp__year"></span>');

				if (y === that.viewYear) yearElem.addClass('selected');

				yearElem.text(y)
					.data('year', y)
					.on('click', function (e) {
						var _this = $(this), _data = _this.data('year');

						that.viewYear = _data;
						that.selected.year = _data;
						that.setSelection();
						that.setupCalendar();
						that.switchView('calendar');
					});

				_years.push(yearElem);
			}

			return _years;
		},

		/* Sets up the calendar views */
		setupCalendar: function () {
			var that = this, viewsHolder = that.datepicker.calendarHolder.calendarViews,
				// _year = that.date.getFullYear(), _month = that.date.getMonth(), _date = that.date.getDate();
				_year = that.viewYear, _month = that.viewMonth;

			viewsHolder.calendars.length = 0;

			var inView = {
				wrapper: $('<div class="dcp__calendar"></div>'),
				header: $('<div class="dcp__cal-month-year"></div>'),
				weekDays: $('<div class="dcp__weekdays"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>'),
				datesHolder: $('<div class="dcp__dates-holder"></div>')
			},prev = {
				wrapper: $('<div class="dcp__calendar"></div>'),
				header: $('<div class="dcp__cal-month-year"></div>'),
				weekDays: $('<div class="dcp__weekdays"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>'),
				datesHolder: $('<div class="dcp__dates-holder"></div>')
			},next = {
				wrapper: $('<div class="dcp__calendar"></div>'),
				header: $('<div class="dcp__cal-month-year"></div>'),
				weekDays: $('<div class="dcp__weekdays"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>'),
				datesHolder: $('<div class="dcp__dates-holder"></div>')
			};

			prev.header.text(that.formatDate(new Date(_year, _month - 1, 1), MONTH_HEAD_FORMAT)).appendTo(prev.wrapper);
			prev.wrapper.append(prev.weekDays);
			prev.datesHolder.html(that.getDates(_year, _month - 1)).appendTo(prev.wrapper);
			viewsHolder.calendars.push(prev);

			inView.header.text(that.formatDate(new Date(_year, _month, 1), MONTH_HEAD_FORMAT)).appendTo(inView.wrapper);
			inView.wrapper.append(inView.weekDays);
			inView.datesHolder.html(that.getDates(_year, _month)).appendTo(inView.wrapper);
			viewsHolder.calendars.push(inView);

			next.header.text(that.formatDate(new Date(_year, _month + 1, 1), MONTH_HEAD_FORMAT)).appendTo(next.wrapper);
			next.wrapper.append(next.weekDays);
			next.datesHolder.html(that.getDates(_year, _month + 1)).appendTo(next.wrapper);
			viewsHolder.calendars.push(next);

			viewsHolder.wrapper.empty()
				.append(prev.wrapper)
				.append(inView.wrapper)
				.append(next.wrapper);
		},

		/* Moves the calendar to specified direction (previous or next) */
		move: function (direction) {
			var that = this, picker = that.datepicker, viewsHolder = picker.calendarHolder.calendarViews, _animDuration = 250;

			if (direction !== 'next' && direction !== 'prev') return;

			if (that.animating) return;

			if (direction === 'next') {
				if (that.viewMonth + 1 > 11) that.viewYear += 1;
				that.viewMonth = that.viewMonth + 1 > 11 ? 0 : that.viewMonth + 1;
			} else {
				if (that.viewMonth - 1 < 0) that.viewYear -= 1;
				that.viewMonth = that.viewMonth - 1 < 0 ? 11 : that.viewMonth - 1;
			}

			that.animating = true;

			//Start animation
			var animateClass = 'dcp__animate-' + (direction === 'next' ? 'left' : 'right');

			viewsHolder.wrapper.find('.dcp__calendar').addClass(animateClass);

			//Setup new next month
			if (direction === 'next') {
				var _year = that.viewYear, _month = that.viewMonth + 1;

				if (_month > 11) {
					_month = 0;
					_year += 1;
				}

				var nextDates = that.getDates(_year, _month),
					newNext = {
						wrapper: $('<div class="dcp__calendar"></div>'),
						header: $('<div class="dcp__cal-month-year"></div>'),
						weekDays: $('<div class="dcp__weekdays"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>'),
						datesHolder: $('<div class="dcp__dates-holder"></div>')
					};

					newNext.header.text(that.formatDate(new Date(_year, _month, 1), MONTH_HEAD_FORMAT)).appendTo(newNext.wrapper);
					newNext.wrapper.append(newNext.weekDays);
					newNext.datesHolder.html(nextDates).appendTo(newNext.wrapper);

					setTimeout(function(){
						viewsHolder.wrapper.append(newNext.wrapper);
						viewsHolder.wrapper.find('.dcp__calendar').removeClass(animateClass);

						viewsHolder.calendars[0].wrapper.remove();
						viewsHolder.calendars.shift();
						viewsHolder.calendars.push(newNext);

						that.animating = false;
					}, _animDuration);

			} else {
				var _year = that.viewYear, _month = that.viewMonth - 1;

				if (_month < 0) {
					_month = 11;
					_year -= 1;
				}

				var prevDates = that.getDates(_year, _month),
					newPrev = {
						wrapper: $('<div class="dcp__calendar"></div>'),
						header: $('<div class="dcp__cal-month-year"></div>'),
						weekDays: $('<div class="dcp__weekdays"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>'),
						datesHolder: $('<div class="dcp__dates-holder"></div>')
					};

					newPrev.header.text(that.formatDate(new Date(_year, _month, 1), MONTH_HEAD_FORMAT)).appendTo(newPrev.wrapper);
					newPrev.wrapper.append(newPrev.weekDays);
					newPrev.datesHolder.html(prevDates).appendTo(newPrev.wrapper);

					setTimeout(function(){
						viewsHolder.wrapper.prepend(newPrev.wrapper);
						viewsHolder.wrapper.find('.dcp__calendar').removeClass(animateClass);

						viewsHolder.calendars[2].wrapper.remove();
						viewsHolder.calendars.pop();
						viewsHolder.calendars.unshift(newPrev);

						that.animating = false;
					}, _animDuration);
			}
		},

		/* Switches view of picker (calendar, months, years) */
		switchView: function (view) {
			if (view !== 'calendar' && view !== 'months' && view !== 'years') return;

			var that = this, picker = that.datepicker, monthsView = picker.calendarHolder.monthsView, yearsView = picker.calendarHolder.yearsView,
				calViews = picker.calendarHolder.calendarViews.wrapper
				_animDuration = 250;

			that.viewMode = view;
			switch (view) {
				case 'calendar': 
					calViews.addClass('animate-out').removeClass('hidden');
					picker.calendarHolder.btnPrev.removeClass('hidden');
					picker.calendarHolder.btnNext.removeClass('hidden');

					setTimeout(function() { calViews.removeClass('animate-out'); }, 10);
					monthsView.addClass('animate-out');
					yearsView.addClass('hidden');

					setTimeout(function() {
						monthsView.addClass('hidden').removeClass('animate-out');
					}, _animDuration);
				break;
				case 'months':
					picker.calendarHolder.btnPrev.addClass('hidden');
					picker.calendarHolder.btnNext.addClass('hidden');
					calViews.addClass('animate-out');
					monthsView.addClass('animate-out').removeClass('hidden');

					setTimeout(function() { monthsView.removeClass('animate-out'); }, 10);
					setTimeout(function() {
						calViews.addClass('hidden').removeClass('animate-out');
					}, _animDuration);
				break;
				case 'years':
					yearsView.html(that.getYears());

					var _selYear = yearsView.find('.dcp__year.selected');

					yearsView.scrollTop(_selYear[0].offsetTop - 120);

					picker.calendarHolder.btnPrev.addClass('hidden');
					picker.calendarHolder.btnNext.addClass('hidden');

					monthsView.addClass('animate-out');
					calViews.addClass('animate-out');
					yearsView.removeClass('hidden');

					setTimeout(function() {
						calViews.addClass('hidden').removeClass('animate-out');
						monthsView.addClass('hidden').removeClass('animate-out');
					}, _animDuration);
				break;
			}
		},

		/* Resets the selection to the date value of the input */
		resetSelection: function () {
			var that = this;

			that.selected = { year: that.date.getFullYear(), month: that.date.getMonth(), date: that.date.getDate() };
			that.viewYear = that.selected.year;
			that.viewMonth = that.selected.month;

			that.datepicker.calendarHolder.monthsView.find('.dcp__month').each(function (idx, melem) {
				var _meMonth = $(melem).data('month');

				$(melem)[_meMonth === that.selected.month ? 'addClass' : 'removeClass']('selected');
			});
		},

		/* Sets the section display (datepicker header) */
		setSelection: function () {
			var that = this, picker = that.datepicker, selected = new Date(that.selected.year, that.selected.month, that.selected.date);

			picker.header.selectedYear.text(selected.getFullYear());
			picker.header.selectedDate.text(that.formatDate(selected, SELECTED_FORMAT));
		},

		/* Sets the value of the input (either Date object or string) */
		setValue: function (value) {
			if (typeof value === 'undefined') throw new Error('Expecting a value.');

			var date = typeof value === 'string' ? this.parseDate(value, this.config.format) : value,
				formatted = this.formatDate(date, this.config.format);

			this.date = date;
			this.viewYear = date.getFullYear();
			this.viewMonth = date.getMonth();
			this.input.val(formatted)
				.attr('value', formatted);

			this.triggerChange($.Event('datechanged', { date: this.formatDate(this.date, this.config.format) }));
		},

		/* Triggers the datechanged and onchange (for asp.net) events */
		triggerChange: function (evt) { this.input.trigger(evt).trigger('onchange'); },

		/* Parses date string using default or specified format. */
		parseDate : function (date, dateFormat) {
			var that = this,
				format = typeof dateFormat === 'undefined' ? that.config.format : dateFormat,
				dayLength = (format.match(/d/g) || []).length,
				monthLength = (format.match(/m/g) || []).length,
				yearLength = (format.match(/y/g) || []).length,
				isFullMonth = monthLength == 4,
				isMonthNoPadding = monthLength == 1,
				isDayNoPadding = dayLength == 1,
				lastIndex = date.length,
				firstM = format.indexOf('m'), firstD = format.indexOf('d'), firstY = format.indexOf('y'),
				month = '', day = '', year = '';

			// Get month on given date string using the format (default or specified)
			if(isFullMonth) {
				var monthIdx = -1;
				$.each(MONTHS, function (i, m) { if (date.indexOf(m) >= 0) monthIdx = i; });
				month = MONTHS[monthIdx];
				format = format.replace('mmmm', month);
				firstD = format.indexOf('d');
				firstY = firstY < firstM ? format.indexOf('y') : format.indexOf('y', format.indexOf(month) + month.length);
			} else if (!isDayNoPadding && !isMonthNoPadding || (isDayNoPadding && !isMonthNoPadding && firstM < firstD)) {
				month = date.substr(firstM, monthLength);
			} else {
				var lastIndexM = format.lastIndexOf('m'),
					before = format.substring(firstM - 1, firstM),
					after = format.substring(lastIndexM + 1, lastIndexM + 2);

				if (lastIndexM == format.length - 1) {
					month = date.substring(date.indexOf(before, firstM - 1) + 1, lastIndex);
				} else if (firstM == 0) {
					month = date.substring(0, date.indexOf(after, firstM));
				} else {
					month = date.substring(date.indexOf(before, firstM - 1) + 1, date.indexOf(after, firstM + 1));
				}
			}

			// Get date on given date string using the format (default or specified)
			if (!isDayNoPadding && !isMonthNoPadding || (!isDayNoPadding && isMonthNoPadding && firstD < firstM)) {
				day = date.substr(firstD, dayLength);
			} else {
				var lastIndexD = format.lastIndexOf('d');
					before = format.substring(firstD - 1, firstD),
					after = format.substring(lastIndexD + 1, lastIndexD + 2);

				if (lastIndexD == format.length - 1) {
					day = date.substring(date.indexOf(before, firstD - 1) + 1, lastIndex);
				} else if (firstD == 0) {
					day = date.substring(0, date.indexOf(after, firstD));
				} else {
					day = date.substring(date.indexOf(before, firstD - 1) + 1, date.indexOf(after, firstD + 1));
				}
			}

			// Get year on given date string using the format (default or specified)
			if (!isMonthNoPadding && !isDayNoPadding || (isMonthNoPadding && isDayNoPadding && firstY < firstM && firstY < firstD)
				|| (!isMonthNoPadding && isDayNoPadding && firstY < firstD) || (isMonthNoPadding && !isDayNoPadding && firstY < firstM)) {
				year = date.substr(firstY, yearLength);
			} else {
				var before = format.substring(firstY - 1, firstY);
				year = date.substr(date.indexOf(before, firstY - 1) + 1, yearLength);
			}

			return { m: month, d: day, y: year, date: isNaN(parseInt(month)) ? new Date(month + " " + day + ", " + year) : new Date(year, month - 1, day) };
		},

		/* Returns formatted string representation of specified date */
		formatDate : function (date, format) {
			var d = new Date(date), day = d.getDate(), m = d.getMonth(), y = d.getFullYear();
			return format.replace(/(yyyy|yy|mmmm|mmm|mm|m|DD|D|dd|d)/g, function (e) {
				switch(e) {
					case 'd': return day;
					case 'dd': return (day < 10 ? "0" + day : day);
					case 'D' : return SHORT_DAYS[d.getDay()];
					case 'DD' : return DAYS_OF_WEEK[d.getDay()];
					case 'm': return m + 1;
					case 'mm': return (m + 1 < 10 ? "0" + (m + 1): (m + 1));
					case 'mmm': return SHORT_MONTHS[m];
					case 'mmmm': return MONTHS[m];
					case 'yy': return y.toString().substr(2,2);
					case 'yyyy': return y;
				}
			});
		},

		/* Determines if date is disabled */
		disabledDate: function (date) {
			var that = this, rangeFrom = null, rangeTo = null, rangeMin = null, rangeMax = null, min = null, max = null, today = new Date();

			if (that.minDate) min = that.minDate === "today" ? today : new Date(that.minDate);
			if (that.maxDate) max = that.maxDate === "today" ? today : new Date(that.maxDate);

			if (that.rangeFromEl) {
				var fromEl = $(that.rangeFromEl),
					fromData = fromEl.data(DCAL_DATA);
					fromFormat = fromData.config.format,
					fromVal = fromEl.val();

				rangeFrom = that.parseDate(fromVal, fromFormat).date;
				rangeMin = fromData.minDate === "today" ? today : new Date(fromData.minDate);
			}

			if (that.rangeToEl) {
				var toEl = $(that.rangeToEl),
					toData = toEl.data(DCAL_DATA);
					toFormat = toData.config.format,
					toVal = toEl.val();

				rangeTo = that.parseDate(toVal, toFormat).date;
				rangeMax = toData.maxDate === "today" ? today : new Date(toData.maxDate);
			}

			return (min && date < min) || (max && date > max) || (rangeFrom && date < rangeFrom) || (rangeTo && date > rangeTo) ||
				(rangeMin && date < rangeMin) || (rangeMax && date > rangeMax);
		},

		/* Shows the date picker */
		show: function () {
			var that = this;

			that.resetSelection();
			that.setSelection();
			that.setupCalendar();

			$('body').attr('datepicker-display', 'on');

			that.datepicker.wrapper.addClass('animate');
			that.datepicker.container.removeClass('hidden').addClass('animate');
			setTimeout(function() {
				that.datepicker.container.removeClass('animate');
				that.datepicker.wrapper.removeClass('animate');

				that.visible = true;
				that.input.blur();
			}, 10);
		},

		/* Hides the date picker */
		hide: function () {
			var that = this;

			that.datepicker.container.addClass('animate');
			that.datepicker.wrapper.addClass('animate');
			setTimeout(function() {
				that.datepicker.container.addClass('hidden').removeClass('animate');
				that.datepicker.wrapper.removeClass('animate');

				// Reset view to calendar
				that.switchView('calendar');

				$('body').removeAttr('datepicker-display');

				that.visible = false;
				that.input.focus();
			}, 300);
		}
	};

	/* Date picker definition */
	$.fn.duDatepicker = function (config) {
		return $(this).each(function (idx, el) {
			var that = this,
				$that = $(this),
				picker = $(this).data(DCAL_DATA);
				options = $.extend({}, $.fn.duDatepicker.defaults, $that.data(), typeof config === 'object' && config);

			if (!picker) {
				$that.data(DCAL_DATA, (picker = new DUDatePicker(that, options)));
			}
			if(typeof config === 'string') picker[config]();

			$(document).on('keydown', function (e) {
				if(e.keyCode !== 27) return;

				if (picker.visible) picker.hide();
			});
		});
	}

	$.fn.duDatepicker.defaults = {
		format: 'mm/dd/yyyy',
		theme: 'blue',
		readOnly: true,
		clearBtn: false,
		cancelBtn: false,
		overlayClose: true
	};

	// $.fn.duDatepicker.Constructor = DUDatePicker;
}(jQuery);