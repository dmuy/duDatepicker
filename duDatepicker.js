/* -- DO NOT REMOVE --
 * jQuery duDatePicker v1.2.2 plugin
 * https://github.com/dmuy/duDatepicker
 *
 * Author: Dionlee Uy
 * Email: dionleeuy@gmail.com
 *
 * @requires jQuery
 * -- DO NOT REMOVE --
 */
if (typeof jQuery === 'undefined') throw new Error('duDatePicker: This plugin requires jQuery');

+function ($) {

    Date.prototype.getDaysCount = function () { return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate() }

    function datediff(from, to) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((to - from) / (1000 * 60 * 60 * 24));
    }

    var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        SHORT_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        SHORT_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        WEEK_DAYS_HTML = "<span>" + SHORT_DAYS.map(function (x) { return x.substr(0, 2) }).join("</span><span>") + "</span>",
        EX_KEYS = [9, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123],
        DCAL_DATA = '_duDatepicker', SELECTED_FORMAT = 'D, mmm d', MONTH_HEAD_FORMAT = 'mmmm yyyy',
        DUDatePicker = function (elem, options) {
            var _ = this;
            _.animating = false;
            _.visible = false;
            _.input = $(elem);
            _.config = options;
            _.viewMode = 'calendar';
            _.datepicker = {
                container: $('<div class="dcalendarpicker"></div>'),
                wrapper: $('<div class="dudp__wrapper"></div>'),
                header: {
                    wrapper: $('<section class="dudp__calendar-header"></section>'),
                    selectedYear: $('<span class="dudp__sel-year"></span>'),
                    selectedDate: $('<span class="dcp_sel-date"></span>')
                },
                calendarHolder: {
                    wrapper: $('<section class="dudp__cal-container"></section>'),
                    btnPrev: $('<span class="dudp__btn-cal-prev">&lsaquo;</span>'),
                    btnNext: $('<span class="dudp__btn-cal-next">&rsaquo;</span>'),
                    calendarViews: {
                        wrapper: $('<div class="dudp__calendar-views"></div>'),
                        calendars: []
                    },
                    yearsView: $('<div class="dudp__years-view dp__hidden"></div>'),
                    monthsView: $('<div class="dudp__months-view dp__hidden"></div>'),
                    buttons: {
                        wrapper: $('<div class="dudp__buttons"></div>'),
                        btnClear: $('<span class="dudp__button clear">Clear</span>'),
                        btnCancel: $('<span class="dudp__button cancel">Cancel</span>'),
                        btnOk: $('<span class="dudp__button ok">Ok</span>')
                    }
                }
            };

            // set default value
            if (_.config.value)
                _.input.val(_.config.value)
                    .attr('value', _.config.value);

            _.minDate = _.input.data('mindate') || _.config.minDate;
            _.maxDate = _.input.data('maxdate') || _.config.maxDate;

            // current selected date, default is today if no value given
            var _date = new Date();

            if (_.config.range) {
                var value = _.input.val(),
                    _range = value.split(_.config.rangeDelim);

                if (value !== '' && _range.length < 2) throw new Error('duDatePicker: Invalid date range value');

                var _from = value === '' ? null : _.parseDate(_range[0]).date,
                    _to = value === '' ? null : _.parseDate(_range[1]).date;

                _.dateFrom = _from;
                _.dateTo = _to;
                _.rangeFrom = null;
                _.rangeTo = null;

                _.viewMonth = (_from ? _from : _date).getMonth();
                _.viewYear = (_from ? _from : _date).getFullYear();

                // set default value
                if (value) {
                    var valueDisp = _.config.rangeFormatter ? _.config.rangeFormatter.call(_, _from, _to) : value

                    _.input.val(valueDisp).attr('value', valueDisp)
                        .attr('data-range-from', _.formatDate(_from, _.config.outFormat || _.config.format))
                        .attr('data-range-to', _.formatDate(_to, _.config.outFormat || _.config.format));
                }
            } else {
                _.date = _.input.val() === '' ? _date : _.parseDate(_.input.val()).date;
                _.selected = { year: _.date.getFullYear(), month: _.date.getMonth(), date: _.date.getDate() };

                _.viewMonth = _.date.getMonth();
                _.viewYear = _.date.getFullYear();
            }

            _.setupPicker();
            _.setSelection();
        };

    DUDatePicker.prototype = {
        constructor: DUDatePicker,

        /**
         * Initializes the date picker
         */
        setupPicker: function () {
            var _ = this,
                picker = _.datepicker,
                header = picker.header,
                calendarHolder = picker.calendarHolder,
                buttons = calendarHolder.buttons,
                _selected = _.selected ? _.selected : new Date();

            // Setup header
            header.wrapper.append(header.selectedYear)
                .append(header.selectedDate)
                .appendTo(picker.wrapper);

            // Setup months view
            var _month = 0;
            for (var r = 1; r < 4; r++) {
                var monthRow = $('<div class="dudp__month-row"></div>');
                for (var i = 0; i < 4; i++) {
                    var monthElem = $('<span class="dudp__month"></span>');

                    if (_month === _selected.month) monthElem.addClass('selected');

                    monthElem.text(SHORT_MONTHS[_month])
                        .data('month', _month)
                        .appendTo(monthRow)
                        .on('click', function (e) {
                            var _this = $(this), _data = _this.data('month');

                            _.viewMonth = _data;
                            _.setupCalendar();
                            _.switchView('calendar');
                        });
                    _month++;
                }
                calendarHolder.monthsView.append(monthRow);
            }

            // Setup years view
            calendarHolder.yearsView.html(_.getYears());

            if (_.config.clearBtn) buttons.wrapper.append(buttons.btnClear);
            if (_.config.cancelBtn) buttons.wrapper.append(buttons.btnCancel);

            if (!_.config.auto || _.config.range)
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
            picker.wrapper.attr('data-theme', _.config.theme || $.fn.duDatepicker.defaults.theme);

            /* ------------------------ Setup actions ------------------------ */
            _.input.on('click', function () { _.show() })
                .on('keydown', function (e) {
                    if (e.keyCode === 13) _.show();
                    return !(EX_KEYS.indexOf(e.which) < 0);
                }).prop('readonly', true);

            // Switch to years view
            header.selectedYear.click(function (e) {
                if (_.viewMode !== 'years') _.switchView('years');
            });

            // Switch to calendar view (of the selected date)
            header.selectedDate.click(function (e) {
                var now = new Date(),
                    _month = _.config.range ? now.getMonth() : _.selected.month,
                    _year = _.config.range ? now.getFullYear() : _.selected.year;

                if ((_.viewMonth !== _month || _.viewYear !== _year) || _.viewMode !== 'calendar') {
                    _.viewMonth = _month;
                    _.viewYear = _year;
                    _.setupCalendar();
                    _.switchView('calendar');
                }
            });

            calendarHolder.btnPrev.click(function (e) { _.move('prev') });
            calendarHolder.btnNext.click(function (e) { _.move('next') });

            // Switch view to months view
            calendarHolder.calendarViews.wrapper
                .on('click', '.dudp__cal-month-year', function (e) {
                    if (_.viewMode !== 'months') _.switchView('months');
                });

            // clear button click
            if (_.config.clearBtn)
                buttons.btnClear.click(function () {
                    if (_.config.range) {
                        _.dateFrom = null;
                        _.dateTo = null;
                        _.input.val('').attr('value', '')
                            .attr('data-range-from', null).attr('data-range-to', null);
                        _.triggerChange($.Event('datechanged', { _dateFrom: null, _dateTo: null, dateFrom: null, dateTo: null, value: '' }));
                    } else {
                        var now = new Date();

                        _.date = now;
                        _.input.val('').attr('value', '');
                        _.triggerChange($.Event('datechanged', { _date: null, date: null }));
                    }
                    _.hide();
                });

            // overlay click
            if (_.config.overlayClose) {
                picker.container.click(function (e) { _.hide() });
                picker.wrapper.click(function (e) { e.stopPropagation() });
            }

            if (_.config.cancelBtn) buttons.btnCancel.click(function () { _.hide() });

            // OK button click
            buttons.btnOk.click(function () {
                if (_.config.range) {
                    if (!_.rangeFrom || !_.rangeTo) return;

                    var _from = new Date(_.rangeFrom.year, _.rangeFrom.month, _.rangeFrom.date),
                        _to = new Date(_.rangeTo.year, _.rangeTo.month, _.rangeTo.date);

                    if (_.disabledDate(_from) || _.disabledDate(_to)) return;

                    _.dateFrom = _from;
                    _.dateTo = _to;
                    _.setValue([_.formatDate(_from, _.config.format), _.formatDate(_to, _.config.format)].join(_.config.rangeDelim));
                } else {
                    var _date = new Date(_.selected.year, _.selected.month, _.selected.date);

                    if (_.disabledDate(_date)) return;

                    _.date = _date;
                    _.setValue(_.date);
                }

                _.hide();
            });
        },

        /**
         * Determines if date is in the selected date range
         * @param {Date} date Date object
         */
        inRange: function (date) {
            if (!this.config.range) return false;

            var _ = this,
                _from = _.rangeFrom ? new Date(_.rangeFrom.year, _.rangeFrom.month, _.rangeFrom.date) : null,
                _to = _.rangeTo ? new Date(_.rangeTo.year, _.rangeTo.month, _.rangeTo.date) : null;

            return (_from && date > _from) && (_to && date < _to);
        },

        /**
         * Determines if date is disabled
         * @param {Date} date Date object
         */
        disabledDate: function (date) {
            var _ = this, min = null, max = null,
                now = new Date(), today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                dsabldDates = _.config.disabledDates,
                dsabldDays = _.config.disabledDays,
                inDsabldDates = dsabldDates.filter(function (x) {
                    if (x.indexOf('-') >= 0)
                        return (date >= _.parseDate(x.split('-')[0]).date && date <= _.parseDate(x.split('-')[1]).date)
                    else
                        return _.parseDate(x).date.getTime() === date.getTime()
                }).length > 0,
                inDsabledDays = dsabldDays.indexOf(DAYS_OF_WEEK[date.getDay()]) >= 0 ||
                    dsabldDays.indexOf(SHORT_DAYS[date.getDay()]) >= 0 ||
                    dsabldDays.indexOf(SHORT_DAYS.map(function (x) { return x.substr(0, 2) })[date.getDay()]) >= 0;

            if (_.minDate) min = _.minDate === "today" ? today : new Date(_.minDate);
            if (_.maxDate) max = _.maxDate === "today" ? today : new Date(_.maxDate);

            return (min && date < min) || (max && date > max) || 
                (inDsabldDates || inDsabledDays);
        },

        /**
         * Returns the dates (DOM) of the specified month and year
         * @param {number} year Year value
         * @param {number} month Month value
         */
        getDates: function (year, month) {
            var _ = this, day = 1, now = new Date(),
                today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
                selected = _.config.range ? null : new Date(_.selected.year, _.selected.month, _.selected.date),
                rangeFrom = _.rangeFrom ? new Date(_.rangeFrom.year, _.rangeFrom.month, _.rangeFrom.date) : null,
                rangeTo = _.rangeTo ? new Date(_.rangeTo.year, _.rangeTo.month, _.rangeTo.date) : null,
                date = new Date(year, month, day), totalDays = date.getDaysCount(), nmStartDay = 1,
                weeks = [];

            for (var week = 1; week <= 6; week++) {
                var daysOfWeek = [$('<span class="dudp__date"></span>'), $('<span class="dudp__date"></span>'), $('<span class="dudp__date"></span>'),
                $('<span class="dudp__date"></span>'), $('<span class="dudp__date"></span>'), $('<span class="dudp__date"></span>'),
                $('<span class="dudp__date"></span>')];

                while (day <= totalDays) {
                    date.setDate(day);
                    var dayOfWeek = date.getDay();

                    daysOfWeek[dayOfWeek].data('date', day).data('month', month).data('year', year);

                    if (date.getTime() === today.getTime()) daysOfWeek[dayOfWeek].addClass('current').attr('title', 'Today');

                    if (_.disabledDate(date)) daysOfWeek[dayOfWeek].addClass('disabled');
                    if (_.inRange(date)) daysOfWeek[dayOfWeek].addClass('in-range');

                    if (week === 1 && dayOfWeek === 0) {
                        break;
                    } else if (dayOfWeek < 6) {
                        if (!_.config.range && date.getTime() === selected.getTime()) daysOfWeek[dayOfWeek].addClass('selected');
                        if (_.config.range && rangeFrom && date.getTime() === rangeFrom.getTime()) daysOfWeek[dayOfWeek].addClass('range-from');
                        if (_.config.range && rangeTo && date.getTime() === rangeTo.getTime()) daysOfWeek[dayOfWeek].addClass('range-to');

                        daysOfWeek[dayOfWeek].text(day++);
                    } else {
                        if (!_.config.range && date.getTime() === selected.getTime()) daysOfWeek[dayOfWeek].addClass('selected');
                        if (_.config.range && rangeFrom && date.getTime() === rangeFrom.getTime()) daysOfWeek[dayOfWeek].addClass('range-from');
                        if (_.config.range && rangeTo && date.getTime() === rangeTo.getTime()) daysOfWeek[dayOfWeek].addClass('range-to');

                        daysOfWeek[dayOfWeek].text(day++);
                        break;
                    }
                }

                /* For days of previous and next month */
                if (week === 1 || week > 4) {
                    // First week
                    if (week === 1) {
                        var prevMonth = new Date(year, month - 1, 1), prevMonthDays = prevMonth.getDaysCount();

                        for (var a = 6; a >= 0; a--) {
                            if (daysOfWeek[a].text() !== '') continue;

                            daysOfWeek[a].data('date', prevMonthDays).data('month', month - 1).data('year', year);
                            prevMonth.setDate(prevMonthDays);
                            daysOfWeek[a].text((prevMonthDays--)).addClass('dudp__pm');

                            if (_.disabledDate(prevMonth)) daysOfWeek[a].addClass('disabled');
                            if (_.inRange(prevMonth)) daysOfWeek[a].addClass('in-range');

                            if (prevMonth.getTime() === today.getTime()) daysOfWeek[a].addClass('current').attr('title', 'Today');
                            if (!_.config.range && prevMonth.getTime() === selected.getTime()) daysOfWeek[a].addClass('selected');
                            if (_.config.range && rangeFrom && prevMonth.getTime() === rangeFrom.getTime()) daysOfWeek[a].addClass('range-from');
                            if (_.config.range && rangeTo && prevMonth.getTime() === rangeTo.getTime()) daysOfWeek[a].addClass('range-to');
                        }
                    }
                    // Last week
                    else if (week > 4) {
                        var nextMonth = new Date(year, month + 1, 1);
                        for (var a = 0; a <= 6; a++) {
                            if (daysOfWeek[a].text() !== '') continue;

                            daysOfWeek[a].data('date', nmStartDay).data('month', month + 1).data('year', year);
                            nextMonth.setDate(nmStartDay);
                            daysOfWeek[a].text((nmStartDay++)).addClass('dudp__nm');

                            if (_.disabledDate(nextMonth)) daysOfWeek[a].addClass('disabled');
                            if (_.inRange(nextMonth)) daysOfWeek[a].addClass('in-range');

                            if (nextMonth.getTime() === today.getTime()) daysOfWeek[a].addClass('current').attr('title', 'Today');
                            if (!_.config.range && nextMonth.getTime() === selected.getTime()) daysOfWeek[a].addClass('selected');
                            if (_.config.range && rangeFrom && nextMonth.getTime() === rangeFrom.getTime()) daysOfWeek[a].addClass('range-from');
                            if (_.config.range && rangeTo && nextMonth.getTime() === rangeTo.getTime()) daysOfWeek[a].addClass('range-to');
                        }
                    }
                }
                weeks.push(daysOfWeek);
            }

            var calDates = [];
            $.each(weeks, function (idx, dow) {
                var calWeek = $('<div class="dudp__cal-week"></div>');

                for (var i = 0; i < dow.length; i++) {
                    var dateElem = dow[i];

                    // Attach click handler for dates
                    dateElem.click(function (e) {
                        var _this = $(this), _year = _this.data('year'), _month = _this.data('month'),
                            _date = _this.data('date'),
                            _selected = new Date(_year, _month, _date),
                            isFrom = false;

                        if (_.disabledDate(_selected)) return;

                        if (_.config.range) {
                            var rangeFrom = _.rangeFrom ? new Date(_.rangeFrom.year, _.rangeFrom.month, _.rangeFrom.date) : null,
                                rangeTo = _.rangeTo ? new Date(_.rangeTo.year, _.rangeTo.month, _.rangeTo.date) : null;

                            if (!_.rangeFrom || (_.rangeFrom && _selected < rangeFrom) ||
                                (_.rangeFrom && _.rangeTo && datediff(rangeFrom, _selected) <= datediff(_selected, rangeTo) && datediff(rangeFrom, _selected) !== 0) ||
                                (_.rangeFrom && _.rangeTo && rangeTo.getTime() === _selected.getTime())) {
                                _.rangeFrom = { year: _year, month: _month, date: _date };
                                isFrom = true;
                            } else if (!_.rangeTo || (_.rangeTo && _selected > rangeTo) ||
                                (_.rangeFrom && _.rangeTo && datediff(_selected, rangeTo) < datediff(rangeFrom, _selected) && datediff(_selected, rangeTo) !== 0) ||
                                (_.rangeFrom && _.rangeTo && rangeFrom.getTime() === _selected.getTime())) {
                                _.rangeTo = { year: _year, month: _month, date: _date };
                                isFrom = false;
                            }

                            _this.parents('.dudp__calendar-views').find('.dudp__date').each(function (idx, delem) {
                                var _elem = $(delem), _deYear = _elem.data('year'), _deMonth = _elem.data('month'), _deDate = _elem.data('date'),
                                    _inRange = _.inRange(new Date(_deYear, _deMonth, _deDate));

                                _elem[(_year === _deYear && _month === _deMonth && _date === _deDate) ? 'addClass' : 'removeClass'](isFrom ? 'range-from' : 'range-to');
                                if (_inRange) _elem.addClass('in-range');
                                else _elem.removeClass('in-range');
                            });
                        } else {
                            _this.parents('.dudp__calendar-views').find('.dudp__date').each(function (idx, delem) {
                                var _deYear = $(delem).data('year'), _deMonth = $(delem).data('month'), _deDate = $(delem).data('date');

                                $(delem)[(_year === _deYear && _month === _deMonth && _date === _deDate) ? 'addClass' : 'removeClass']('selected');
                            });

                            _.selected = { year: _year, month: _month, date: _date };
                            _.setSelection();

                            if (_.config.auto) {
                                _.date = _selected;
                                _.setValue(_.date);
                                _.hide();
                            }
                        }

                        _this.parents('.dudp__cal-container').find('.dudp__month').each(function (idx, melem) {
                            var _meMonth = $(melem).data('month');

                            $(melem)[_meMonth === _month ? 'addClass' : 'removeClass']('selected');
                        });
                    });

                    calWeek.append(dateElem);
                }

                calDates.push(calWeek);
            });
            return calDates;
        },

        /**
         * Returns years (DOM) range for the years view
         */
        getYears: function () {
            var _ = this, _minYear = _.viewYear - 50, _maxYear = _.viewYear + 50,
                _years = [];

            for (var y = _minYear; y <= _maxYear; y++) {
                var yearElem = $('<span class="dudp__year"></span>');

                if (y === _.viewYear) yearElem.addClass('selected');

                yearElem.text(y)
                    .data('year', y)
                    .on('click', function (e) {
                        var _this = $(this), _data = _this.data('year');

                        _.viewYear = _data;
                        if (!_.config.range) _.selected.year = _data;
                        _.setSelection();
                        _.setupCalendar();
                        _.switchView('calendar');
                    });

                _years.push(yearElem);
            }

            return _years;
        },

        /**
         * Sets up the calendar views
         */
        setupCalendar: function () {
            var _ = this, viewsHolder = _.datepicker.calendarHolder.calendarViews, _year = _.viewYear, _month = _.viewMonth;

            viewsHolder.calendars.length = 0;

            var inView = {
                wrapper: $('<div class="dudp__calendar"></div>'),
                header: $('<div class="dudp__cal-month-year"></div>'),
                weekDays: $('<div class="dudp__weekdays">' + WEEK_DAYS_HTML + '</div>'),
                datesHolder: $('<div class="dudp__dates-holder"></div>')
            }, prev = {
                wrapper: $('<div class="dudp__calendar"></div>'),
                header: $('<div class="dudp__cal-month-year"></div>'),
                weekDays: $('<div class="dudp__weekdays">' + WEEK_DAYS_HTML + '</div>'),
                datesHolder: $('<div class="dudp__dates-holder"></div>')
            }, next = {
                wrapper: $('<div class="dudp__calendar"></div>'),
                header: $('<div class="dudp__cal-month-year"></div>'),
                weekDays: $('<div class="dudp__weekdays">' + WEEK_DAYS_HTML + '</div>'),
                datesHolder: $('<div class="dudp__dates-holder"></div>')
            };

            prev.header.text(_.formatDate(new Date(_year, _month - 1, 1), MONTH_HEAD_FORMAT)).appendTo(prev.wrapper);
            prev.wrapper.append(prev.weekDays);
            prev.datesHolder.html(_.getDates(_year, _month - 1)).appendTo(prev.wrapper);
            viewsHolder.calendars.push(prev);

            inView.header.text(_.formatDate(new Date(_year, _month, 1), MONTH_HEAD_FORMAT)).appendTo(inView.wrapper);
            inView.wrapper.append(inView.weekDays);
            inView.datesHolder.html(_.getDates(_year, _month)).appendTo(inView.wrapper);
            viewsHolder.calendars.push(inView);

            next.header.text(_.formatDate(new Date(_year, _month + 1, 1), MONTH_HEAD_FORMAT)).appendTo(next.wrapper);
            next.wrapper.append(next.weekDays);
            next.datesHolder.html(_.getDates(_year, _month + 1)).appendTo(next.wrapper);
            viewsHolder.calendars.push(next);

            viewsHolder.wrapper.empty()
                .append(prev.wrapper)
                .append(inView.wrapper)
                .append(next.wrapper);
        },

        /**
         * Moves the calendar to specified direction (previous or next)
         * @param {string} direction Move direction (next | prev)
         */
        move: function (direction) {
            if (direction !== 'next' && direction !== 'prev') return;

            if (this.animating) return;

            var _ = this, picker = _.datepicker, viewsHolder = picker.calendarHolder.calendarViews, _animDuration = 250, _isNext = direction === 'next';

            if (_isNext ? _.viewMonth + 1 > 11 : _.viewMonth - 1 < 0) _.viewYear += (_isNext ? 1 : -1);
            _.viewMonth = _isNext ? (_.viewMonth + 1 > 11 ? 0 : _.viewMonth + 1) : (_.viewMonth - 1 < 0 ? 11 : _.viewMonth - 1);

            _.animating = true;

            //Start animation
            var animateClass = 'dp__animate-' + (_isNext ? 'left' : 'right');

            viewsHolder.wrapper.find('.dudp__calendar').addClass(animateClass);

            //Setup new (previos or next) month calendar
            var _year = _.viewYear, _month = _isNext ? _.viewMonth + 1 : _.viewMonth - 1;

            if (_isNext ? _month > 11 : _month < 0) {
                _month = _isNext ? 0 : 11;
                _year += _isNext ? 1 : -1;
            }
            var newCalDates = _.getDates(_year, _month),
                newCalEl = {
                    wrapper: $('<div class="dudp__calendar"></div>'),
                    header: $('<div class="dudp__cal-month-year"></div>'),
                    weekDays: $('<div class="dudp__weekdays">' + WEEK_DAYS_HTML + '</div>'),
                    datesHolder: $('<div class="dudp__dates-holder"></div>')
                };

            newCalEl.header.text(_.formatDate(new Date(_year, _month, 1), MONTH_HEAD_FORMAT)).appendTo(newCalEl.wrapper);
            newCalEl.wrapper.append(newCalEl.weekDays);
            newCalEl.datesHolder.html(newCalDates).appendTo(newCalEl.wrapper);

            setTimeout(function () {
                viewsHolder.wrapper[_isNext ? 'append' : 'prepend'](newCalEl.wrapper);
                viewsHolder.wrapper.find('.dudp__calendar').removeClass(animateClass);

                viewsHolder.calendars[_isNext ? 0 : 2].wrapper.remove();
                viewsHolder.calendars[_isNext ? 'shift' : 'pop']();
                viewsHolder.calendars[_isNext ? 'push' : 'unshift'](newCalEl);

                _.animating = false;
            }, _animDuration);
        },

        /**
         * Switches view of picker (calendar, months, years)
         * @param {string} view View name
         */
        switchView: function (view) {
            if (view !== 'calendar' && view !== 'months' && view !== 'years') return;

            var _ = this, picker = _.datepicker, monthsView = picker.calendarHolder.monthsView,
                yearsView = picker.calendarHolder.yearsView,
                calViews = picker.calendarHolder.calendarViews.wrapper,
                _animDuration = 250;

            _.viewMode = view;
            switch (view) {
                case 'calendar':
                    calViews.addClass('dp__animate-out').removeClass('dp__hidden');
                    picker.calendarHolder.btnPrev.removeClass('dp__hidden');
                    picker.calendarHolder.btnNext.removeClass('dp__hidden');

                    setTimeout(function () {
                        calViews.removeClass('dp__animate-out');
                    }, 10);
                    monthsView.addClass('dp__animate-out');
                    yearsView.addClass('dp__hidden');

                    setTimeout(function () {
                        monthsView.addClass('dp__hidden').removeClass('dp__animate-out');
                    }, _animDuration);
                    break;
                case 'months':
                    picker.calendarHolder.btnPrev.addClass('dp__hidden');
                    picker.calendarHolder.btnNext.addClass('dp__hidden');
                    calViews.addClass('dp__animate-out');
                    monthsView.addClass('dp__animate-out').removeClass('dp__hidden');

                    setTimeout(function () {
                        monthsView.removeClass('dp__animate-out');
                    }, 10);
                    setTimeout(function () {
                        calViews.addClass('dp__hidden').removeClass('dp__animate-out');
                    }, _animDuration);
                    break;
                case 'years':
                    yearsView.html(_.getYears());

                    var _selYear = yearsView.find('.dudp__year.selected');

                    yearsView.scrollTop(_selYear[0].offsetTop - 120);

                    picker.calendarHolder.btnPrev.addClass('dp__hidden');
                    picker.calendarHolder.btnNext.addClass('dp__hidden');

                    monthsView.addClass('dp__animate-out');
                    calViews.addClass('dp__animate-out');
                    yearsView.removeClass('dp__hidden');

                    setTimeout(function () {
                        calViews.addClass('dp__hidden').removeClass('dp__animate-out');
                        monthsView.addClass('dp__hidden').removeClass('dp__animate-out');
                    }, _animDuration);
                    break;
            }
        },

        /**
         * Resets the selection to the date value of the input
         */
        resetSelection: function () {
            var _ = this;

            if (_.config.range) {
                var _date = _.dateFrom ? _.dateFrom : new Date();

                _.rangeFrom = _.dateFrom ? { year: _.dateFrom.getFullYear(), month: _.dateFrom.getMonth(), date: _.dateFrom.getDate() } : null;
                _.rangeTo = _.dateTo ? { year: _.dateTo.getFullYear(), month: _.dateTo.getMonth(), date: _.dateTo.getDate() } : null;

                _.viewYear = _date.getFullYear();
                _.viewMonth = _date.getMonth();
            } else {
                _.selected = { year: _.date.getFullYear(), month: _.date.getMonth(), date: _.date.getDate() };
                _.viewYear = _.selected.year;
                _.viewMonth = _.selected.month;
            }

            _.datepicker.calendarHolder.monthsView.find('.dudp__month').each(function (idx, melem) {
                var _meMonth = $(melem).data('month'),
                    _month = _.config.range ? _.dateFrom ? _.dateFrom.getMonth() : null : _.selected.month;

                $(melem)[_meMonth === _month ? 'addClass' : 'removeClass']('selected');
            });
        },

        /* Sets the selection display (datepicker header) */
        setSelection: function () {
            var _ = this, picker = _.datepicker,
                selected = _.config.range ? new Date() :
                    new Date(_.selected.year, _.selected.month, _.selected.date);

            picker.header.selectedYear.text(selected.getFullYear());
            picker.header.selectedDate.text(_.formatDate(selected, SELECTED_FORMAT));
        },

        /**
         * Sets the value of the input (either Date object or string)
         * @param {string|Date} value Date picker value
         */
        setValue: function (value) {
            if (typeof value === 'undefined') throw new Error('Expecting a value.');

            var _ = this, changeData = null;

            if (_.config.range) {
                var _range = value.split(_.config.rangeDelim);

                if (value !== '' && _range.length < 2) throw new Error('duDatePicker: Invalid date range value');

                var _from = value === '' ? _date : _.parseDate(_range[0]).date,
                    _to = value === '' ? _date : _.parseDate(_range[1]).date,
                    formattedFrom = _.formatDate(_from, _.config.outFormat || _.config.format),
                    formattedTo = _.formatDate(_to, _.config.outFormat || _.config.format),
                    valueDisp = _.config.rangeFormatter ? _.config.rangeFormatter.call(_, _from, _to) :
                        _range[0] === _range[1] ? _range[0] : value;

                _.dateFrom = _from;
                _.dateTo = _to;
                _.viewYear = _from.getFullYear();
                _.viewMonth = _from.getMonth();
                _.input.val(valueDisp).attr('value', valueDisp)
                    .attr('data-range-from', formattedFrom).attr('data-range-to', formattedTo);

                changeData = {
                    _dateFrom: _from, _dateTo: _to,
                    dateFrom: formattedFrom, dateTo: formattedTo,
                    value: valueDisp
                };
            } else {
                var date = typeof value === 'string' ? _.parseDate(value, _.config.format).date : value,
                    formatted = _.formatDate(date, _.config.format);

                _.date = date;
                _.viewYear = date.getFullYear();
                _.viewMonth = date.getMonth();
                _.input.val(formatted)
                    .attr('value', formatted);

                changeData = {
                    _date: date,
                    date: _.formatDate(_.date, _.config.outFormat || _.config.format)
                };
            }

            _.triggerChange($.Event('datechanged', changeData));
        },

        /**
         * Triggers the datechanged and onchange (for asp.net) events
         * @param {Event} evt Event object
         */
        triggerChange: function (evt) {
            this.input.trigger(evt).trigger('onchange').trigger('change');
        },

        /**
         * Parses date string using default or specified format
         * @param {string} date Date string
         * @param {string} dateFormat Date format
         */
        parseDate: function (date, dateFormat) {
            var _ = this, format = typeof dateFormat === 'undefined' ? _.config.format : dateFormat,
                dayLength = (format.match(/d/g) || []).length,
                monthLength = (format.match(/m/g) || []).length,
                yearLength = (format.match(/y/g) || []).length,
                isFullMonth = monthLength === 4,
                isMonthNoPadding = monthLength === 1,
                isDayNoPadding = dayLength === 1,
                lastIndex = date.length,
                firstM = format.indexOf('m'), firstD = format.indexOf('d'), firstY = format.indexOf('y'),
                month = '', day = '', year = '';

            if (date === '') return { m: null, d: null, y: null, date: new Date('') };

            // Get month on given date string using the format (default or specified)
            if (isFullMonth) {
                var monthIdx = -1;
                $.each(MONTHS, function (i, m) {
                    if (date.indexOf(m) >= 0) monthIdx = i;
                });
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

                if (lastIndexM === format.length - 1) {
                    month = date.substring(date.indexOf(before, firstM - 1) + 1, lastIndex);
                } else if (firstM === 0) {
                    month = date.substring(0, date.indexOf(after, firstM));
                } else {
                    month = date.substring(date.indexOf(before, firstM - 1) + 1, date.indexOf(after, firstM + 1));
                }
            }

            // Get date on given date string using the format (default or specified)
            if (!isDayNoPadding && !isMonthNoPadding || (!isDayNoPadding && isMonthNoPadding && firstD < firstM)) {
                day = date.substr(firstD, dayLength);
            } else {
                var lastIndexD = format.lastIndexOf('d'),
                    before = format.substring(firstD - 1, firstD),
                    after = format.substring(lastIndexD + 1, lastIndexD + 2);

                if (lastIndexD === format.length - 1) {
                    day = date.substring(date.indexOf(before, firstD - 1) + 1, lastIndex);
                } else if (firstD === 0) {
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
                before = format.substring(firstY - 1, firstY);
                year = date.substr(date.indexOf(before, firstY - 1) + 1, yearLength);
            }

            return {
                m: month,
                d: day,
                y: year,
                date: isNaN(parseInt(month)) ? new Date(month + " " + day + ", " + year) : new Date(year, month - 1, day)
            };
        },

        /**
         * Returns formatted string representation of specified date
         * @param {Date} date Date object
         * @param {string} format Date format
         */
        formatDate: function (date, format) {
            var d = new Date(date), day = d.getDate(), m = d.getMonth(), y = d.getFullYear();
            return format.replace(/(yyyy|yy|mmmm|mmm|mm|m|DD|D|dd|d)/g, function (e) {
                switch (e) {
                    case 'd':
                        return day;
                    case 'dd':
                        return (day < 10 ? "0" + day : day);
                    case 'D':
                        return SHORT_DAYS[d.getDay()];
                    case 'DD':
                        return DAYS_OF_WEEK[d.getDay()];
                    case 'm':
                        return m + 1;
                    case 'mm':
                        return (m + 1 < 10 ? "0" + (m + 1) : (m + 1));
                    case 'mmm':
                        return SHORT_MONTHS[m];
                    case 'mmmm':
                        return MONTHS[m];
                    case 'yy':
                        return y.toString().substr(2, 2);
                    case 'yyyy':
                        return y;
                }
            });
        },

        /**
         * Shows the date picker
         */
        show: function () {
            var _ = this;

            $('body').attr('datepicker-display', 'on');
            _.resetSelection();
            _.setSelection();
            _.setupCalendar();
            _.datepicker.container.addClass('dp__open');
            _.visible = true;
            _.input.blur();
        },

        /**
         * Hides the date picker
         */
        hide: function () {
            var _ = this;

            _.datepicker.container.addClass('dp__closing');
            _.visible = false;
            _.input.focus();
            $('body').removeAttr('datepicker-display');
            setTimeout(function () {
                _.switchView('calendar'); // Reset view to calendar
                _.datepicker.container.removeClass('dp__closing dp__open');
            }, 200);
        },

        /**
         * Destroys the date picker plugin
         */
        destroy: function () {
            var _ = this;

            _.input.removeData(DCAL_DATA)
                .unbind('keydown').unbind('click')
                .removeProp('readonly');
            _.datepicker.container.remove();
        }
    };

    /**
     * Date picker definition
     */
    $.fn.duDatepicker = function () {
        var dudp_args = arguments,
            arg0 = dudp_args[0];

        return $(this).each(function (idx, el) {
            var that = this,
                $that = $(this),
                picker = $(this).data(DCAL_DATA),
                options = $.extend({}, $.fn.duDatepicker.defaults, $that.data(), typeof arg0 === 'object' && arg0);

            if (!picker) {
                $that.data(DCAL_DATA, (picker = new DUDatePicker(that, options)));
            }

            if (typeof arg0 === 'string')
                picker[arg0].apply(picker, Array.prototype.slice.call(dudp_args).slice(1));

            $(document).on('keydown', function (e) {
                if (e.keyCode !== 27) return;

                if (picker.visible) picker.hide();
            });
        });
    };

    /**
     * Date picker default configurations
     */
    $.fn.duDatepicker.defaults = {
        value: null,             // Default input value (should be formatted as specified in the 'format' configuration)
        format: 'mm/dd/yyyy',    // Determines the date format
        outFormat: null,         // Determines the date format of the 'datechanged' callback; 'format' config will be used by default
        theme: 'blue',           // Determines the color theme of the date picker
        auto: false,             // Determines if clicking the date will automatically select it; OK button will not be displayed if true
        clearBtn: false,         // Determines if Clear button is displayed
        cancelBtn: false,        // Determines if Cancel button is displayed
        overlayClose: true,      // Determines if clicking the overlay will close the date picker
        disabledDates: [],       // Array of dates to be disabled (format should be the same as the specified format)
        disabledDays: [],        // Array of days of the week to be disabled (i.e. Monday, Tuesday, Mon, Tue, Mo, Tu)
        range: false,            // Determines if date picker is range mode
        rangeDelim: '-',         // Range string delimiter
        rangeFormatter: null     // Function call to execute custom date range format (displayed on the input)
    };
}(jQuery);