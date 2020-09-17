/*!Don't remove this!
 * duDatePicker v2.0 plugin (Vanilla JS)
 * https://github.com/dmuy/duDatepicker
 *
 * Author: Dionlee Uy
 * Email: dionleeuy@gmail.com
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.duDatepicker = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  /**
   * Month names (i.e. `January`, `February`, etc)
   */
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  /**
   * Shortened month names (i.e. `Jan`, `Feb`, etc)
   */

  var SHORT_MONTHS = MONTHS.map(function (x) {
    return x.substr(0, 3);
  });
  /**
   * Days of the week (i.e. `Monday`, `Tuesday`, etc)
   */

  var DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  /**
   * Shortened days of the week (i.e. `Mon`, `Tue`, etc)
   */

  var SHORT_DAYS = DAYS_OF_WEEK.map(function (x) {
    return x.substr(0, 3);
  });
  /**
   * Days of the week HTML (displaying `Mo`, `Tu`, `We`, etc)
   */

  var WEEK_DAYS_HTML = "<span>".concat(SHORT_DAYS.map(function (x) {
    return x.substr(0, 2);
  }).join('</span><span>'), "</span>");
  /**
   * Keydown excluded key codes
   */

  var EX_KEYS = [9, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123];
  /**
   * Key name for the date picker data
   */

  var DATA_KEY = '_duDatepicker';
  /**
   * Default date picker query selector class
   */

  var DEFAULT_CLASS = '.duDatepicker-input';
  /**
   * Header selected date format
   */

  var SELECTED_FORMAT = 'D, mmm d';
  /**
   * Default date picker configurations
   */

  var DEFAULTS = {
    // Default input value (should be formatted as specified in the 'format' configuration)
    value: null,
    // Determines the date format
    format: 'mm/dd/yyyy',
    // Determines the date format of the 'datechanged' callback; 'format' config will be used by default
    outFormat: null,
    // Determines the color theme of the date picker
    theme: 'blue',
    // Determines if clicking the date will automatically select it; OK button will not be displayed if true
    auto: false,
    // Determines if date picker will be inline (popover) with the input (and not a dialog)
    inline: false,
    // Determines if Clear button is displayed
    clearBtn: false,
    // Determines if Cancel button is displayed
    cancelBtn: false,
    // Determines if clicking the overlay will close the date picker
    overlayClose: true,
    // Array of dates to be disabled (format should be the same as the specified format)
    disabledDates: [],
    // Array of days of the week to be disabled (i.e. Monday, Tuesday, Mon, Tue, Mo, Tu)
    disabledDays: [],
    // Determines if date picker range mode is on
    range: false,
    // Range string delimiter
    rangeDelim: '-',
    // Date from target input element (range mode)
    fromTarget: null,
    // Date to target input element (range mode)
    toTarget: null,
    events: {
      // Callback function on date selection
      dateChanged: null,
      // Function call to execute custom date range format (displayed on the input) upon selection
      onRangeFormat: null,
      // Callback function when date picker is initialized
      ready: null,
      // Callback function when date picker is shown
      shown: null,
      // Callback function when date picker is hidden
      hidden: null
    }
  };

  /**
   * Helper functions
   */

  var hf = {
    /**
     * Appends element(s) to parent
     * @param {Element|Element[]} elem Element(s) to append to parent
     * @param {Element} to Parent element
     */
    appendTo: function appendTo(elem, to, idx) {
      if (Array.isArray(elem)) {
        elem.forEach(function (el) {
          if (idx === 0) to.insertBefore(el, to.childNodes[idx] || null);else to.appendChild(el);
        });
      } else {
        if (idx === 0) to.insertBefore(elem, to.childNodes[idx] || null);else to.appendChild(elem);
      }
    },

    /**
     * Adds event listener to element(s)
     * @param {Element|Element[]} elem Element(s) to add event
     * @param {string} event Event name
     * @param {Function} handler Event handler
     */
    addEvent: function addEvent(elem, event, handler) {
      function listenEvent(el, evt, fn) {
        el.addEventListener(evt, fn, false);
      }

      if (Array.isArray(elem)) {
        elem.forEach(function (e) {
          listenEvent(e, event, handler);
        });
      } else listenEvent(elem, event, handler);
    },

    /**
     * Removes event listener to element(s)
     * @param {Element|Element[]} elem Element(s) to remove event
     * @param {string} event Event name
     * @param {Function} handler Event handler
     */
    removeEvent: function removeEvent(elem, event, handler) {
      function delEvent(el, evt, fn) {
        el.removeEventListener(evt, fn, false);
      }

      if (Array.isArray(elem)) {
        elem.forEach(function (e) {
          delEvent(e, event, handler);
        });
      } else delEvent(elem, event, handler);
    },

    /**
     * Removes child nodes
     * @param {Element} elem Html element to empty
     */
    empty: function empty(elem) {
      while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
      }
    },

    /**
     * Creates an HTML element; `document.createElement` helper function
     * @see {@link http://jsfiddle.net/andr3ww/pvuzgfg6/13/}
     * @param {string} tag HTML tag name (i.e. `div`, `span`, `a`)
     * @param {Object} attributes Attribute object
     * @param {string|Element} content Element content: text or HTML element(s)
     * @param {Boolean} isHtml Determines if `content` specified should added as an html element
     */
    createElem: function createElem(tag, attributes, content, isHtml) {
      var el = document.createElement(tag);
      if (typeof content !== 'undefined') el[isHtml || false ? 'innerHTML' : 'innerText'] = content;
      if (typeof attributes !== 'undefined') hf.setAttributes(el, attributes);
      return el;
    },

    /**
     * Sets the attribute(s) of the element
     * @param {Element} el Html element
     * @param {Object} attrs Attribute object
     */
    setAttributes: function setAttributes(el, attrs) {
      for (var attr in attrs) {
        el.setAttribute(attr, attrs[attr]);
      }
    },

    /**
     * Sets the inline style(s) of the element
     * @param {Element} el HTML element
     * @param {Object} styles Styles object
     */
    setStyles: function setStyles(el, styles) {
      for (var style in styles) {
        el.style[style] = styles[style];
      }
    },

    /**
     * Gets the number of days based on the month of the given date
     * @param {Date} date Date object
     */
    getDaysCount: function getDaysCount(date) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    },

    /**
     * Calculates date difference
     * @param {Date} from Date from
     * @param {Date} to Date to
     */
    dateDiff: function dateDiff(from, to) {
      // Take the difference between the dates and divide by milliseconds per day.
      // Round to nearest whole number to deal with DST.
      return Math.round((to - from) / (1000 * 60 * 60 * 24));
    },

    /**
     * Returns the document width and height
     */
    screenDim: function screenDim() {
      var doc = document.documentElement;
      return {
        height: Math.max(doc.offsetHeight, doc.clientHeight),
        width: Math.max(doc.offsetWidth, doc.clientWidth)
      };
    },

    /**
     * Calculates the offset of the given html element
     * @param {Element} el HTML element
     */
    calcOffset: function calcOffset(el) {
      var doc = document.documentElement || document.body,
          rect = el.getBoundingClientRect(),
          offset = {
        top: rect.top + doc.scrollTop,
        left: rect.left + doc.scrollLeft
      },
          dim = {
        height: el.offsetHeight,
        width: el.offsetWidth
      },
          screen = hf.screenDim();
      return {
        top: offset.top + dim.height,
        left: offset.left,
        right: screen.width - (offset.left + dim.width),
        bottom: screen.height - offset.top
      };
    },

    /**
    * Vanilla JavaScript version of jQuery.extend()
    * @see {@link https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/}
    */
    extend: function extend() {
      // Variables
      var extended = {};
      var deep = false;
      var i = 0;
      var length = arguments.length; // Check if a deep merge

      if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
        deep = arguments[0];
        i++;
      } // Merge the object into the extended object


      var merge = function merge(obj) {
        for (var prop in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            // If deep merge and property is an object, merge properties
            if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
              extended[prop] = hf.extend(true, extended[prop], obj[prop]);
            } else {
              extended[prop] = obj[prop];
            }
          }
        }
      }; // Loop through each object and conduct a merge


      for (; i < length; i++) {
        var obj = arguments[i];
        merge(obj);
      }

      return extended;
    },

    /**
     * Returns formatted string representation of specified date
     * @param {Date} date Date to format
     * @param {string} format Date format pattern
     */
    formatDate: function formatDate(date, format) {
      var d = new Date(date),
          day = d.getDate(),
          m = d.getMonth(),
          y = d.getFullYear();
      return format.replace(/(yyyy|yy|mmmm|mmm|mm|m|DD|D|dd|d)/g, function (e) {
        switch (e) {
          case 'd':
            return day;

          case 'dd':
            return day < 10 ? "0" + day : day;

          case 'D':
            return SHORT_DAYS[d.getDay()];

          case 'DD':
            return DAYS_OF_WEEK[d.getDay()];

          case 'm':
            return m + 1;

          case 'mm':
            return m + 1 < 10 ? "0" + (m + 1) : m + 1;

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
     * Parses date string using default or specified format
     * @param {string} date Date string to parse
     * @param {string=} dateFormat Format of the date string; `config.format` will be used if not specified
     */
    parseDate: function parseDate(date, dateFormat) {
      var _ = this,
          format = typeof dateFormat === 'undefined' ? _.config.format : dateFormat,
          dayLength = (format.match(/d/g) || []).length,
          monthLength = (format.match(/m/g) || []).length,
          yearLength = (format.match(/y/g) || []).length,
          isFullMonth = monthLength === 4,
          isMonthNoPadding = monthLength === 1,
          isDayNoPadding = dayLength === 1,
          lastIndex = date.length,
          firstM = format.indexOf('m'),
          firstD = format.indexOf('d'),
          firstY = format.indexOf('y'),
          month = '',
          day = '',
          year = '';

      if (date === '') return {
        m: null,
        d: null,
        y: null,
        date: new Date('')
      }; // Get month on given date string using the format (default or specified)

      if (isFullMonth) {
        var monthIdx = -1;
        MONTHS.forEach(function (m, i) {
          if (date.indexOf(m) >= 0) monthIdx = i;
        });
        month = MONTHS[monthIdx];
        format = format.replace('mmmm', month);
        firstD = format.indexOf('d');
        firstY = firstY < firstM ? format.indexOf('y') : format.indexOf('y', format.indexOf(month) + month.length);
      } else if (!isDayNoPadding && !isMonthNoPadding || isDayNoPadding && !isMonthNoPadding && firstM < firstD) {
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
      } // Get date on given date string using the format (default or specified)


      if (!isDayNoPadding && !isMonthNoPadding || !isDayNoPadding && isMonthNoPadding && firstD < firstM) {
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
      } // Get year on given date string using the format (default or specified)


      if (!isMonthNoPadding && !isDayNoPadding || isMonthNoPadding && isDayNoPadding && firstY < firstM && firstY < firstD || !isMonthNoPadding && isDayNoPadding && firstY < firstD || isMonthNoPadding && !isDayNoPadding && firstY < firstM) {
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
     * Triggers the `change`, `onchange`, `datechanged` event on the specified input element
     * @param {HTMLInputElement} el HTML input element
     * @param {Object} data Event data
     */
    triggerChange: function triggerChange(el, data) {
      el.dispatchEvent(new Event('change'));
      el.dispatchEvent(new Event('onchange'));

      function CustomEvent(data) {
        var changeEvt = document.createEvent('CustomEvent');
        changeEvt.initCustomEvent('datechanged', false, false);
        changeEvt.data = data;
        return changeEvt;
      }

      el.dispatchEvent(new CustomEvent(data));
    }
  };

  /**
   * Date picker class
   */

  var _duDatePicker = /*#__PURE__*/function () {
    /**
     * Creates date picker
     * @param {HTMLInputElement} el Input element
     * @param {Object} options Date picker options
     */
    function _duDatePicker(el, options) {
      _classCallCheck(this, _duDatePicker);

      var _ = this;

      this.config = hf.extend(DEFAULTS, options);
      /**
       * Determines if date picker is animating
       */

      this.animating = false;
      /**
       * Determines if date picker is displayed/shown
       */

      this.visible = false;
      /**
       * Input element
       * @type {HTMLInputElement}
       */

      this.input = el;
      this.input.readonly = true;
      this.fromEl = document.querySelector(this.config.fromTarget);
      this.toEl = document.querySelector(this.config.toTarget);
      this.input.hidden = this.config.range && (this.fromEl || this.toEl);
      this.viewMode = 'calendar';
      /**
       * Date picker elements holder
       * @type {Object}
       */

      this.datepicker = {
        container: hf.createElem('div', {
          class: 'dcalendarpicker'
        }),
        wrapper: hf.createElem('div', {
          class: 'dudp__wrapper',
          tabindex: 0
        }),
        header: {
          wrapper: hf.createElem('section', {
            class: 'dudp__calendar-header'
          }),
          selectedYear: hf.createElem('span', {
            class: 'dudp__sel-year'
          }),
          selectedDate: hf.createElem('span', {
            class: 'dcp_sel-date'
          })
        },
        calendarHolder: {
          wrapper: hf.createElem('section', {
            class: 'dudp__cal-container'
          }),
          btnPrev: hf.createElem('span', {
            class: 'dudp__btn-cal-prev',
            role: 'button'
          }, '&lsaquo;', true),
          btnNext: hf.createElem('span', {
            class: 'dudp__btn-cal-next',
            role: 'button'
          }, '&rsaquo;', true),
          calendarViews: {
            wrapper: hf.createElem('div', {
              class: 'dudp__calendar-views'
            }),
            calendars: []
          },
          yearsView: hf.createElem('div', {
            class: 'dudp__years-view dp__hidden'
          }),
          monthsView: hf.createElem('div', {
            class: 'dudp__months-view dp__hidden'
          }),
          buttons: {
            wrapper: hf.createElem('div', {
              class: 'dudp__buttons'
            }),
            btnClear: hf.createElem('span', {
              class: 'dudp__button clear',
              role: 'button'
            }, 'Clear'),
            btnCancel: hf.createElem('span', {
              class: 'dudp__button cancel',
              role: 'button'
            }, 'Cancel'),
            btnOk: hf.createElem('span', {
              class: 'dudp__button ok',
              role: 'button'
            }, 'Ok')
          }
        }
      }; // set default value

      if (_.config.value) {
        _.input.value = _.config.value;

        _.input.setAttribute('value', _.config.value);
      }

      this.minDate = _.input.dataset.mindate || _.config.minDate;
      this.maxDate = _.input.dataset.maxdate || _.config.maxDate; // current selected date, default is today if no value given

      var _date = new Date();

      if (_.config.range) {
        var value = _.input.value,
            _range = value.split(_.config.rangeDelim);

        if (value !== '' && _range.length < 2) throw new Error('duDatePicker: Invalid date range value');

        var _from = value === '' ? null : hf.parseDate.call(_, _range[0]).date,
            _to = value === '' ? null : hf.parseDate.call(_, _range[1]).date;

        this.dateFrom = _from;
        this.dateTo = _to;
        this.rangeFrom = null;
        this.rangeTo = null;
        this.viewMonth = (_from ? _from : _date).getMonth();
        this.viewYear = (_from ? _from : _date).getFullYear(); // set default value

        if (value) {
          var valueDisp = _.config.events && _.config.events.onRangeFormat ? _.formatRange(_from, _to) : value,
              formattedFrom = hf.formatDate(_from, _.config.format),
              outFrom = hf.formatDate(_from, _.config.outFormat || _.config.format),
              formattedTo = hf.formatDate(_to, _.config.format),
              outTo = hf.formatDate(_to, _.config.outFormat || _.config.format);
          _.input.value = valueDisp;
          hf.setAttributes(_.input, {
            'value': valueDisp,
            'data-range-from': outFrom,
            'data-range-to': outTo
          });

          if (_.fromEl) {
            _.fromEl.value = formattedFrom;
            hf.setAttributes(_.fromEl, {
              'value': formattedFrom,
              'data-value': outFrom
            });
          }

          if (_.toEl) {
            _.toEl.value = formattedTo;
            hf.setAttributes(_.toEl, {
              'value': formattedFrom,
              'data-value': outTo
            });
          }
        }
      } else {
        this.date = _.input.value === '' ? _date : hf.parseDate.call(_, _.input.value).date;
        this.selected = {
          year: _.date.getFullYear(),
          month: _.date.getMonth(),
          date: _.date.getDate()
        };
        this.viewMonth = _.selected.month;
        this.viewYear = _.selected.year;
      }
      /* input event handlers */


      function _inputClick() {
        _.showInFromEl = _.config.inline && _.fromEl && this === _.fromEl;
        _.showInToEl = _.config.inline && _.toEl && this === _.toEl;

        _.show();
      }

      function _inputKeydown(e) {
        if (e.keyCode === 13) {
          _.showInFromEl = _.config.inline && _.fromEl && this === _.fromEl;
          _.showInToEl = _.config.inline && _.toEl && this === _.toEl;

          _.show();
        }

        return !(EX_KEYS.indexOf(e.which) < 0);
      }
      /**
       * Unbinds input `click` and `keydown` event handlers
       */


      this._unbindInput = function () {
        _.input.readonly = false;

        _.input.removeEventListener('click', _inputClick);

        _.input.removeEventListener('keydown', _inputKeydown);

        if (_.fromEl) {
          _.fromEl.readonly = false;

          _.fromEl.removeEventListener('click', _inputClick);

          _.fromEl.removeEventListener('keydown', _inputKeydown);
        }

        if (_.toEl) {
          _.toEl.readonly = false;

          _.toEl.removeEventListener('click', _inputClick);

          _.toEl.removeEventListener('keydown', _inputKeydown);
        }
      };

      hf.addEvent(_.input, 'click', _inputClick);
      hf.addEvent(_.input, 'keydown', _inputKeydown);

      if (_.fromEl) {
        _.fromEl.readonly = true;
        hf.addEvent(_.fromEl, 'click', _inputClick);
        hf.addEvent(_.fromEl, 'keydown', _inputKeydown);
      }

      if (_.toEl) {
        _.toEl.readonly = true;
        hf.addEvent(_.toEl, 'click', _inputClick);
        hf.addEvent(_.toEl, 'keydown', _inputKeydown);
      } // initialize


      this._init();

      this._setSelection();
    }
    /**
     * Initializes the date picker
     */


    _createClass(_duDatePicker, [{
      key: "_init",
      value: function _init() {
        var _ = this,
            picker = _.datepicker,
            header = picker.header,
            calendarHolder = picker.calendarHolder,
            buttons = calendarHolder.buttons,
            _selected = _.selected ? _.selected : new Date(); // Setup header


        if (!_.config.inline) {
          hf.appendTo([header.selectedYear, header.selectedDate], header.wrapper);
          hf.appendTo(header.wrapper, picker.wrapper);
          hf.addEvent(header.selectedYear, 'click', function () {
            if (_.viewMode !== 'years') _._switchView('years');
          });
          hf.addEvent(header.selectedDate, 'click', function () {
            var now = new Date(),
                _month = _.config.range ? now.getMonth() : _.selected.month,
                _year = _.config.range ? now.getFullYear() : _.selected.year;

            if (_.viewMonth !== _month || _.viewYear !== _year || _.viewMode !== 'calendar') {
              _.viewMonth = _month;
              _.viewYear = _year;

              _._setupCalendar();

              _._switchView('calendar');
            }
          });
        } // Setup months view


        var _month = 0;

        for (var r = 1; r < 4; r++) {
          var monthRow = hf.createElem('div', {
            class: 'dudp__month-row'
          });

          for (var i = 0; i < 4; i++) {
            var monthElem = hf.createElem('span', {
              class: 'dudp__month'
            });
            if (_month === _selected.month) monthElem.classList.add('selected');
            monthElem.innerText = SHORT_MONTHS[_month];
            monthElem.dataset.month = _month;
            hf.appendTo(monthElem, monthRow);
            hf.addEvent(monthElem, 'click', function (e) {
              var _this = this,
                  _data = _this.dataset.month;

              _.viewMonth = _data;

              _._setupCalendar();

              _._switchView('calendar');
            });
            _month++;
          }

          hf.appendTo(monthRow, calendarHolder.monthsView);
        } // Setup years view


        hf.appendTo(_._getYears(), calendarHolder.yearsView);
        if (_.config.clearBtn) hf.appendTo(buttons.btnClear, buttons.wrapper);
        if (_.config.cancelBtn) hf.appendTo(buttons.btnCancel, buttons.wrapper);
        if (!_.config.auto || _.config.range) hf.appendTo(buttons.btnOk, buttons.wrapper);
        hf.appendTo([calendarHolder.btnPrev, calendarHolder.btnNext, calendarHolder.calendarViews.wrapper, calendarHolder.monthsView, calendarHolder.yearsView, buttons.wrapper], calendarHolder.wrapper);
        hf.appendTo(calendarHolder.wrapper, picker.wrapper);
        hf.appendTo(picker.wrapper, picker.container);
        hf.appendTo(picker.container, document.body);
        if (_.config.inline) picker.container.setAttribute('inline', true); // Setup theme

        picker.wrapper.dataset.theme = _.input.dataset.theme || _.config.theme;
        hf.addEvent(picker.wrapper, 'keydown', function (e) {
          if (e.keyCode === 27) _.hide(); // esc
          else if (e.keyCode === 37) _._move('prev'); // arrow left
            else if (e.keyCode === 39) _._move('next'); // arrow right
        });
        if (_.config.inline) hf.addEvent(picker.wrapper, 'blur', function () {
          _.hide();
        });
        hf.addEvent(calendarHolder.btnPrev, 'click', function () {
          _._move('prev');
        });
        hf.addEvent(calendarHolder.btnNext, 'click', function () {
          _._move('next');
        });
        hf.addEvent(calendarHolder.calendarViews.wrapper, 'click', function (e) {
          if (e.target.classList.contains('cal-year')) {
            _._switchView('years');
          } else if (e.target.classList.contains('cal-month')) {
            _._switchView('months');
          }
        });
        if (_.config.clearBtn) hf.addEvent(buttons.btnClear, 'click', function () {
          _.setValue('');

          _.hide();
        });

        if (_.config.overlayClose) {
          hf.addEvent(picker.container, 'click', function () {
            _.hide();
          });
          hf.addEvent(picker.wrapper, 'click', function (e) {
            e.stopPropagation();
          });
        }

        if (_.config.cancelBtn) {
          hf.addEvent(buttons.btnCancel, 'click', function () {
            _.hide();
          });
        }

        hf.addEvent(buttons.btnOk, 'click', function () {
          if (_.config.range) {
            if (!_.rangeFrom || !_.rangeTo) return;

            var _from = new Date(_.rangeFrom.year, _.rangeFrom.month, _.rangeFrom.date),
                _to = new Date(_.rangeTo.year, _.rangeTo.month, _.rangeTo.date);

            if (_._dateDisabled(_from) || _._dateDisabled(_to)) return;
            _.dateFrom = _from;
            _.dateTo = _to;

            _.setValue([hf.formatDate(_from, _.config.format), hf.formatDate(_to, _.config.format)].join(_.config.rangeDelim));
          } else {
            var _date = new Date(_.selected.year, _.selected.month, _.selected.date);

            if (_._dateDisabled(_date)) return;
            _.date = _date;

            _.setValue(_.date);
          }

          _.hide();
        });
        if (_.config.events && _.config.events.ready) _.config.events.ready.call(_, _);
      }
      /**
       * Determines if date is in the selected date range
       * @param {Date} date Date object
       */

    }, {
      key: "_inRange",
      value: function _inRange(date) {
        if (!this.config.range) return false;

        var _ = this,
            _from = _.rangeFrom ? new Date(_.rangeFrom.year, _.rangeFrom.month, _.rangeFrom.date) : null,
            _to = _.rangeTo ? new Date(_.rangeTo.year, _.rangeTo.month, _.rangeTo.date) : null;

        return _from && date > _from && _to && date < _to;
      }
      /**
       * Determines if date is disabled
       * @param {Date} date Date object
       * @returns {Boolean} `true` if specified date should be disabled, `false` otherwise
       */

    }, {
      key: "_dateDisabled",
      value: function _dateDisabled(date) {
        var _ = this,
            min = null,
            max = null,
            now = new Date(),
            today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            _dates = _.config.disabledDates,
            _days = _.config.disabledDays,
            _inDates = _dates.filter(function (x) {
          if (x.indexOf('-') >= 0) return date >= hf.parseDate.call(_, x.split('-')[0]).date && date <= hf.parseDate.call(_, x.split('-')[1]).date;else return hf.parseDate.call(_, x).date.getTime() === date.getTime();
        }).length > 0,
            _inDays = _days.indexOf(DAYS_OF_WEEK[date.getDay()]) >= 0 || _days.indexOf(SHORT_DAYS[date.getDay()]) >= 0 || _days.indexOf(SHORT_DAYS.map(function (x) {
          return x.substr(0, 2);
        })[date.getDay()]) >= 0;

        if (_.minDate) min = _.minDate === "today" ? today : new Date(_.minDate);
        if (_.maxDate) max = _.maxDate === "today" ? today : new Date(_.maxDate);
        return min && date < min || max && date > max || _inDates || _inDays;
      }
      /**
       * @param {number} year Year
       * @param {number} month Month
       * @returns {HTMLSpanElement[]} Returns the dates of the specified month and year
       */

    }, {
      key: "_getDates",
      value: function _getDates(year, month) {
        var _ = this,
            day = 1,
            now = new Date(),
            today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
            selected = _.config.range ? null : new Date(_.selected.year, _.selected.month, _.selected.date),
            rangeFrom = _.rangeFrom ? new Date(_.rangeFrom.year, _.rangeFrom.month, _.rangeFrom.date) : null,
            rangeTo = _.rangeTo ? new Date(_.rangeTo.year, _.rangeTo.month, _.rangeTo.date) : null,
            date = new Date(year, month, day),
            totalDays = hf.getDaysCount(date),
            nmStartDay = 1,
            weeks = [];

        for (var week = 1; week <= 6; week++) {
          var daysOfWeek = [];

          for (var idx = 0; idx < 7; idx++) {
            daysOfWeek.push(hf.createElem('span', {
              class: 'dudp__date'
            }));
          }

          while (day <= totalDays) {
            date.setDate(day);
            var dayOfWeek = date.getDay();
            daysOfWeek[dayOfWeek].dataset.date = day;
            daysOfWeek[dayOfWeek].dataset.month = month;
            daysOfWeek[dayOfWeek].dataset.year = year;
            if (date.getTime() === today.getTime()) daysOfWeek[dayOfWeek].classList.add('current');
            if (_._dateDisabled(date)) daysOfWeek[dayOfWeek].classList.add('disabled');
            if (_._inRange(date)) daysOfWeek[dayOfWeek].classList.add('in-range');

            if (week === 1 && dayOfWeek === 0) {
              break;
            } else if (dayOfWeek < 6) {
              if (!_.config.range && date.getTime() === selected.getTime()) daysOfWeek[dayOfWeek].classList.add('selected');
              if (_.config.range && rangeFrom && date.getTime() === rangeFrom.getTime()) daysOfWeek[dayOfWeek].classList.add('range-from');
              if (_.config.range && rangeTo && date.getTime() === rangeTo.getTime()) daysOfWeek[dayOfWeek].classList.add('range-to');
              daysOfWeek[dayOfWeek].innerText = day++;
            } else {
              if (!_.config.range && date.getTime() === selected.getTime()) daysOfWeek[dayOfWeek].classList.add('selected');
              if (_.config.range && rangeFrom && date.getTime() === rangeFrom.getTime()) daysOfWeek[dayOfWeek].classList.add('range-from');
              if (_.config.range && rangeTo && date.getTime() === rangeTo.getTime()) daysOfWeek[dayOfWeek].classList.add('range-to');
              daysOfWeek[dayOfWeek].innerText = day++;
              break;
            }
          }
          /* For days of previous and next month */


          if (week === 1 || week > 4) {
            // First week
            if (week === 1) {
              var prevMonth = new Date(year, month - 1, 1),
                  prevMonthDays = hf.getDaysCount(prevMonth);

              for (var a = 6; a >= 0; a--) {
                if (daysOfWeek[a].innerText !== '') continue;
                daysOfWeek[a].dataset.date = prevMonthDays;
                daysOfWeek[a].dataset.month = month - 1;
                daysOfWeek[a].dataset.year = year;
                prevMonth.setDate(prevMonthDays);
                daysOfWeek[a].innerText = prevMonthDays--;
                daysOfWeek[a].classList.add('dudp__pm');
                if (_._dateDisabled(prevMonth)) daysOfWeek[a].classList.add('disabled');
                if (_._inRange(prevMonth)) daysOfWeek[a].classList.add('in-range');
                if (prevMonth.getTime() === today.getTime()) daysOfWeek[a].classList.add('current');
                if (!_.config.range && prevMonth.getTime() === selected.getTime()) daysOfWeek[a].classList.add('selected');
                if (_.config.range && rangeFrom && prevMonth.getTime() === rangeFrom.getTime()) daysOfWeek[a].classList.add('range-from');
                if (_.config.range && rangeTo && prevMonth.getTime() === rangeTo.getTime()) daysOfWeek[a].classList.add('range-to');
              }
            } // Last week
            else if (week > 4) {
                var nextMonth = new Date(year, month + 1, 1);

                for (var a = 0; a <= 6; a++) {
                  if (daysOfWeek[a].innerText !== '') continue;
                  daysOfWeek[a].dataset.date = nmStartDay;
                  daysOfWeek[a].dataset.month = month + 1;
                  daysOfWeek[a].dataset.year = year;
                  nextMonth.setDate(nmStartDay);
                  daysOfWeek[a].innerText = nmStartDay++;
                  daysOfWeek[a].classList.add('dudp__nm');
                  if (_._dateDisabled(nextMonth)) daysOfWeek[a].classList.add('disabled');
                  if (_._inRange(nextMonth)) daysOfWeek[a].classList.add('in-range');
                  if (nextMonth.getTime() === today.getTime()) daysOfWeek[a].classList.add('current');
                  if (!_.config.range && nextMonth.getTime() === selected.getTime()) daysOfWeek[a].classList.add('selected');
                  if (_.config.range && rangeFrom && nextMonth.getTime() === rangeFrom.getTime()) daysOfWeek[a].classList.add('range-from');
                  if (_.config.range && rangeTo && nextMonth.getTime() === rangeTo.getTime()) daysOfWeek[a].classList.add('range-to');
                }
              }
          }

          weeks.push(daysOfWeek);
        }

        var calDates = [];
        weeks.forEach(function (dow) {
          var calWeek = hf.createElem('div', {
            class: 'dudp__cal-week'
          });

          for (var i = 0; i < dow.length; i++) {
            var dateElem = dow[i]; // Attach click handler for dates

            hf.addEvent(dateElem, 'click', function () {
              var _this = this,
                  _year = _this.dataset.year,
                  _month = _this.dataset.month,
                  _date = _this.dataset.date,
                  _selected = new Date(_year, _month, _date),
                  isFrom = false;

              if (_._dateDisabled(_selected)) return;

              if (_.config.range) {
                var rangeFrom = _.rangeFrom ? new Date(_.rangeFrom.year, _.rangeFrom.month, _.rangeFrom.date) : null,
                    rangeTo = _.rangeTo ? new Date(_.rangeTo.year, _.rangeTo.month, _.rangeTo.date) : null;

                if (!_.rangeFrom || _.rangeFrom && _selected < rangeFrom || _.rangeFrom && _.rangeTo && hf.dateDiff(rangeFrom, _selected) <= hf.dateDiff(_selected, rangeTo) && hf.dateDiff(rangeFrom, _selected) !== 0 || _.rangeFrom && _.rangeTo && rangeTo.getTime() === _selected.getTime()) {
                  _.rangeFrom = {
                    year: _year,
                    month: _month,
                    date: _date
                  };
                  isFrom = true;
                } else if (!_.rangeTo || _.rangeTo && _selected > rangeTo || _.rangeFrom && _.rangeTo && hf.dateDiff(_selected, rangeTo) < hf.dateDiff(rangeFrom, _selected) && hf.dateDiff(_selected, rangeTo) !== 0 || _.rangeFrom && _.rangeTo && rangeFrom.getTime() === _selected.getTime()) {
                  _.rangeTo = {
                    year: _year,
                    month: _month,
                    date: _date
                  };
                  isFrom = false;
                }

                _.datepicker.calendarHolder.calendarViews.wrapper.querySelectorAll('.dudp__date').forEach(function (delem) {
                  var _deYear = delem.dataset.year,
                      _deMonth = delem.dataset.month,
                      _deDate = delem.dataset.date,
                      _inRange = _._inRange(new Date(_deYear, _deMonth, _deDate));

                  delem.classList[_year === _deYear && _month === _deMonth && _date === _deDate ? 'add' : 'remove'](isFrom ? 'range-from' : 'range-to');
                  delem.classList[_inRange ? 'add' : 'remove']('in-range');
                });
              } else {
                _.datepicker.calendarHolder.calendarViews.wrapper.querySelectorAll('.dudp__date').forEach(function (delem) {
                  var _deYear = delem.dataset.year,
                      _deMonth = delem.dataset.month,
                      _deDate = delem.dataset.date;
                  delem.classList[_year === _deYear && _month === _deMonth && _date === _deDate ? 'add' : 'remove']('selected');
                });

                _this.classList.add('selected');

                _.selected = {
                  year: _year,
                  month: _month,
                  date: _date
                };

                _._setSelection();

                if (_.config.auto) {
                  _.date = _selected;

                  _.setValue(_.date);

                  _.hide();
                }
              }

              _.datepicker.calendarHolder.wrapper.querySelectorAll('.dudp__month').forEach(function (melem) {
                var _meMonth = melem.dataset.month;
                melem.classList[_meMonth === _month ? 'add' : 'remove']('selected');
              });
            });
            hf.appendTo(dateElem, calWeek);
          }

          calDates.push(calWeek);
        });
        return calDates;
      }
      /**
       * @returns {HTMLSpanElement[]} Returns years range for the years view
       */

    }, {
      key: "_getYears",
      value: function _getYears() {
        var _ = this,
            _minYear = _.viewYear - 50,
            _maxYear = _.viewYear + 25,
            _years = [];

        for (var y = _minYear; y <= _maxYear; y++) {
          var yearElem = hf.createElem('span', {
            class: 'dudp__year'
          });
          if (y === _.viewYear) yearElem.classList.add('selected');
          yearElem.innerText = y;
          yearElem.dataset.year = y;
          hf.addEvent(yearElem, 'click', function () {
            var _this = this,
                _data = parseInt(_this.dataset.year);

            _.viewYear = _data;
            if (!_.config.range) _.selected.year = _data;

            _._setSelection();

            _._setupCalendar();

            _._switchView('calendar');
          });

          _years.push(yearElem);
        }

        return _years;
      }
      /**
       * Sets up the calendar views
       */

    }, {
      key: "_setupCalendar",
      value: function _setupCalendar() {
        var _ = this,
            viewsHolder = _.datepicker.calendarHolder.calendarViews,
            _year = +_.viewYear,
            _month = +_.viewMonth;

        viewsHolder.calendars.length = 0;
        var inView = {
          wrapper: hf.createElem('div', {
            class: 'dudp__calendar'
          }),
          header: hf.createElem('div', {
            class: 'dudp__cal-month-year'
          }),
          weekDays: hf.createElem('div', {
            class: 'dudp__weekdays'
          }, WEEK_DAYS_HTML, true),
          datesHolder: hf.createElem('div', {
            class: 'dudp__dates-holder'
          })
        },
            prev = {
          wrapper: hf.createElem('div', {
            class: 'dudp__calendar'
          }),
          header: hf.createElem('div', {
            class: 'dudp__cal-month-year'
          }),
          weekDays: hf.createElem('div', {
            class: 'dudp__weekdays'
          }, WEEK_DAYS_HTML, true),
          datesHolder: hf.createElem('div', {
            class: 'dudp__dates-holder'
          })
        },
            next = {
          wrapper: hf.createElem('div', {
            class: 'dudp__calendar'
          }),
          header: hf.createElem('div', {
            class: 'dudp__cal-month-year'
          }),
          weekDays: hf.createElem('div', {
            class: 'dudp__weekdays'
          }, WEEK_DAYS_HTML, true),
          datesHolder: hf.createElem('div', {
            class: 'dudp__dates-holder'
          })
        },
            prevMonth = _month === 0 ? 11 : _month - 1,
            nextMonth = _month === 11 ? 0 : _month + 1,
            prevYear = _month === 0 ? _year - 1 : _year,
            nextYear = _month === 11 ? _year + 1 : _year;
        hf.appendTo([hf.createElem('span', {
          class: 'cal-month'
        }, MONTHS[prevMonth]), hf.createElem('span', {
          class: 'cal-year'
        }, prevYear)], prev.header);
        hf.appendTo(_._getDates(prevYear, prevMonth), prev.datesHolder);
        hf.appendTo([prev.header, prev.weekDays, prev.datesHolder], prev.wrapper);
        viewsHolder.calendars.push(prev);
        hf.appendTo([hf.createElem('span', {
          class: 'cal-month'
        }, MONTHS[_month]), hf.createElem('span', {
          class: 'cal-year'
        }, _year)], inView.header);
        hf.appendTo(_._getDates(_year, _month), inView.datesHolder);
        hf.appendTo([inView.header, inView.weekDays, inView.datesHolder], inView.wrapper);
        viewsHolder.calendars.push(inView);
        hf.appendTo([hf.createElem('span', {
          class: 'cal-month'
        }, MONTHS[nextMonth]), hf.createElem('span', {
          class: 'cal-year'
        }, nextYear)], next.header);
        hf.appendTo(_._getDates(nextYear, nextMonth), next.datesHolder);
        hf.appendTo([next.header, next.weekDays, next.datesHolder], next.wrapper);
        viewsHolder.calendars.push(next);
        hf.empty(viewsHolder.wrapper);
        hf.appendTo([prev.wrapper, inView.wrapper, next.wrapper], viewsHolder.wrapper);
      }
      /**
       * Switches view of date picker (calendar, months, years)
       * @param {string} view View name
       */

    }, {
      key: "_switchView",
      value: function _switchView(view) {
        if (view !== 'calendar' && view !== 'months' && view !== 'years') return;

        var _ = this,
            picker = _.datepicker,
            monthsView = picker.calendarHolder.monthsView,
            yearsView = picker.calendarHolder.yearsView,
            calViews = picker.calendarHolder.calendarViews.wrapper,
            _animDuration = 250,
            _oldView = _.viewMode;

        _.viewMode = view;

        switch (_.viewMode) {
          case 'calendar':
            var _calendar = calViews.querySelector('.dudp__calendar:nth-child(2)'); // current month in view


            calViews.classList.add('dp__animate-out');
            calViews.classList.remove('dp__hidden');
            if (_oldView !== 'calendar') _calendar.classList.add('dp__zooming', 'dp__animate-zoom');
            picker.calendarHolder.btnPrev.classList.remove('dp__hidden');
            picker.calendarHolder.btnNext.classList.remove('dp__hidden');
            setTimeout(function () {
              calViews.classList.remove('dp__animate-out');
              if (_oldView !== 'calendar') _calendar.classList.remove('dp__animate-zoom');
            }, 10);
            monthsView.classList.add('dp__animate-out');
            yearsView.classList.add('dp__hidden');
            setTimeout(function () {
              if (_oldView !== 'calendar') _calendar.classList.remove('dp__zooming');
              monthsView.classList.add('dp__hidden');
              monthsView.classList.remove('dp__animate-out');
            }, _animDuration);
            break;

          case 'months':
            picker.calendarHolder.btnPrev.classList.add('dp__hidden');
            picker.calendarHolder.btnNext.classList.add('dp__hidden');
            calViews.classList.add('dp__animate-out');
            monthsView.classList.add('dp__animate-out');
            monthsView.classList.remove('dp__hidden');
            setTimeout(function () {
              monthsView.classList.remove('dp__animate-out');
            }, 10);
            setTimeout(function () {
              calViews.classList.add('dp__hidden');
              calViews.classList.remove('dp__animate-out');
            }, _animDuration);
            break;

          case 'years':
            hf.empty(yearsView);
            hf.appendTo(_._getYears(), yearsView);

            var _selYear = yearsView.querySelector('.dudp__year.selected');

            yearsView.scrollTop = _selYear.offsetTop - 120;
            picker.calendarHolder.btnPrev.classList.add('dp__hidden');
            picker.calendarHolder.btnNext.classList.add('dp__hidden');
            monthsView.classList.add('dp__animate-out');
            calViews.classList.add('dp__animate-out');
            yearsView.classList.remove('dp__hidden');
            setTimeout(function () {
              calViews.classList.add('dp__hidden');
              calViews.classList.remove('dp__animate-out');
              monthsView.classList.add('dp__hidden');
              monthsView.classList.remove('dp__animate-out');
            }, _animDuration);
            break;
        }
      }
      /**
       * Moves the calendar to specified direction (previous or next)
       * @param {string} direction Movement direction
       */

    }, {
      key: "_move",
      value: function _move(direction) {
        if (direction !== 'next' && direction !== 'prev') return;

        var _ = this;

        if (_.animating) return;

        var picker = _.datepicker,
            viewsHolder = picker.calendarHolder.calendarViews,
            _animDuration = 250,
            _isNext = direction === 'next';

        if (_isNext ? _.viewMonth + 1 > 11 : _.viewMonth - 1 < 0) _.viewYear += _isNext ? 1 : -1;
        _.viewMonth = _isNext ? _.viewMonth + 1 > 11 ? 0 : _.viewMonth + 1 : _.viewMonth - 1 < 0 ? 11 : _.viewMonth - 1;
        _.animating = true; //Start animation

        var animateClass = 'dp__animate-' + (_isNext ? 'left' : 'right');
        viewsHolder.wrapper.querySelectorAll('.dudp__calendar').forEach(function (cal) {
          cal.classList.add(animateClass);
        }); //Setup new (previos or next) month calendar

        var _year = _.viewYear,
            _month = _isNext ? _.viewMonth + 1 : _.viewMonth - 1;

        if (_isNext ? _month > 11 : _month < 0) {
          _month = _isNext ? 0 : 11;
          _year += _isNext ? 1 : -1;
        }

        var newCalDates = _._getDates(_year, _month),
            newCalEl = {
          wrapper: hf.createElem('div', {
            class: 'dudp__calendar'
          }),
          header: hf.createElem('div', {
            class: 'dudp__cal-month-year'
          }),
          weekDays: hf.createElem('div', {
            class: 'dudp__weekdays'
          }, WEEK_DAYS_HTML, true),
          datesHolder: hf.createElem('div', {
            class: 'dudp__dates-holder'
          })
        }; // newCalEl.header.innerText = fns.formatDate(new Date(_year, _month, 1), MONTH_HEAD_FORMAT)


        hf.appendTo([hf.createElem('span', {
          class: 'cal-month'
        }, MONTHS[_month]), hf.createElem('span', {
          class: 'cal-year'
        }, _year)], newCalEl.header);
        hf.appendTo(newCalDates, newCalEl.datesHolder);
        hf.appendTo([newCalEl.header, newCalEl.weekDays, newCalEl.datesHolder], newCalEl.wrapper);
        setTimeout(function () {
          hf.appendTo(newCalEl.wrapper, viewsHolder.wrapper, _isNext ? undefined : 0);
          viewsHolder.wrapper.querySelectorAll('.dudp__calendar').forEach(function (cal) {
            cal.classList.remove(animateClass);
          });
          viewsHolder.wrapper.removeChild(viewsHolder.calendars[_isNext ? 0 : 2].wrapper);
          viewsHolder.calendars[_isNext ? 'shift' : 'pop']();
          viewsHolder.calendars[_isNext ? 'push' : 'unshift'](newCalEl);
          _.animating = false;
        }, _animDuration);
      }
      /**
       * Resets the selection to the date value of the input
       */

    }, {
      key: "_resetSelection",
      value: function _resetSelection() {
        var _ = this;

        if (_.config.range) {
          var _date = _.dateFrom ? _.dateFrom : new Date();

          _.rangeFrom = _.dateFrom ? {
            year: _.dateFrom.getFullYear(),
            month: _.dateFrom.getMonth(),
            date: _.dateFrom.getDate()
          } : null;
          _.rangeTo = _.dateTo ? {
            year: _.dateTo.getFullYear(),
            month: _.dateTo.getMonth(),
            date: _.dateTo.getDate()
          } : null;
          _.viewYear = _date.getFullYear();
          _.viewMonth = _date.getMonth();
        } else {
          _.selected = {
            year: _.date.getFullYear(),
            month: _.date.getMonth(),
            date: _.date.getDate()
          };
          _.viewYear = _.selected.year;
          _.viewMonth = _.selected.month;
        }

        _.datepicker.calendarHolder.monthsView.querySelectorAll('.dudp__month').forEach(function (melem) {
          var _meMonth = parseInt(melem.dataset.month),
              _month = _.config.range ? _.dateFrom ? _.dateFrom.getMonth() : null : _.selected.month;

          melem.classList[_meMonth === _month ? 'add' : 'remove']('selected');
        });
      }
      /**
       * Sets the section display (datepicker header)
       */

    }, {
      key: "_setSelection",
      value: function _setSelection() {
        var _ = this,
            picker = _.datepicker,
            selected = _.config.range ? new Date() : new Date(_.selected.year, _.selected.month, _.selected.date);

        picker.header.selectedYear.innerText = selected.getFullYear();
        picker.header.selectedDate.innerText = hf.formatDate(selected, SELECTED_FORMAT);
      }
      /**
       * Sets the value of the input
       * @param {(string|Date)} value The new input value. If the value specified is a string, it will be parsed using `config.format`.
       */

    }, {
      key: "setValue",
      value: function setValue(value) {
        if (typeof value === 'undefined') throw new Error('Expecting a value.');

        var _ = this,
            _empty = typeof value === 'string' && value === '',
            changeData = null;

        if (_.config.range) {
          var _range = _empty ? [] : value.split(_.config.rangeDelim);

          if (value !== '' && _range.length < 2) throw new Error('Invalid date range value.');

          var now = new Date(),
              _from = _empty ? null : hf.parseDate.call(_, _range[0]).date,
              _to = _empty ? null : hf.parseDate.call(_, _range[1]).date,
              formattedFrom = _empty ? '' : hf.formatDate(_from, _.config.format),
              outFrom = _empty ? '' : hf.formatDate(_from, _.config.outFormat || _.config.format),
              formattedTo = _empty ? '' : hf.formatDate(_to, _.config.format),
              outTo = _empty ? '' : hf.formatDate(_to, _.config.outFormat || _.config.format),
              valueDisp = _empty ? '' : _.config.events && _.config.events.onRangeFormat ? _.formatRange(_from, _to) : _range[0] === _range[1] ? _range[0] : value;

          _.dateFrom = _from;
          _.dateTo = _to;
          _.viewYear = (_from ? _from : now).getFullYear();
          _.viewMonth = (_from ? _from : now).getMonth();
          _.input.value = valueDisp;
          hf.setAttributes(_.input, {
            'value': valueDisp,
            'data-range-from': outFrom,
            'data-range-to': outTo
          });

          if (_.fromEl) {
            _.fromEl.value = formattedFrom;
            hf.setAttributes(_.fromEl, {
              'value': formattedFrom,
              'data-value': outFrom
            });
          }

          if (_.toEl) {
            _.toEl.value = formattedTo;
            hf.setAttributes(_.toEl, {
              'value': formattedTo,
              'data-value': outTo
            });
          }

          changeData = {
            _dateFrom: _from,
            dateFrom: _empty ? null : formattedFrom,
            _dateTo: _to,
            dateTo: _empty ? null : formattedTo,
            value: valueDisp
          };
        } else {
          var date = typeof value === 'string' ? _empty ? new Date() : hf.parseDate.call(_, value, _.config.format).date : value,
              formatted = _empty ? '' : hf.formatDate(date, _.config.format);
          _.date = date;
          _.viewYear = date.getFullYear();
          _.viewMonth = date.getMonth();
          _.input.value = formatted;

          _.input.setAttribute('value', formatted);

          changeData = {
            _date: _empty ? null : _.date,
            date: _empty ? null : hf.formatDate(_.date, _.config.outFormat || _.config.format)
          };
        }

        hf.triggerChange(_.input, changeData);
        if (_.config.events && _.config.events.dateChanged) _.config.events.dateChanged.call(_, changeData, _);
      }
      /**
       * Returns formatted string representation of specified date
       * @param {Date} date Date object
       * @param {string} format Date format
       */

    }, {
      key: "formatDate",
      value: function formatDate(date, format) {
        return hf.formatDate(date, format);
      }
      /**
       * Formats specified date range to string (for display)
       * @param {Date} from Date from
       * @param {Date} to Date to
       * @returns {string} Formatted date range
       */

    }, {
      key: "formatRange",
      value: function formatRange(from, to) {
        return this.config.events.onRangeFormat.call(this, from, to, this);
      }
      /**
       * Shows the date picker
       */

    }, {
      key: "show",
      value: function show() {
        var _ = this;

        setTimeout(function () {
          hf.setAttributes(document.body, {
            'datepicker-display': 'on'
          });

          _._resetSelection();

          _._setSelection();

          _._setupCalendar();

          _.datepicker.container.classList.add('dp__open');

          if (_.config.inline) {
            var inputRef = _.showInFromEl ? _.fromEl : _.showInToEl ? _.toEl : _.input,
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
            };
            offsetCss[below ? 'top' : 'bottom'] = "".concat(below ? offset.top - scroll.y : offset.bottom, "px");
            offsetCss[left_side ? 'left' : 'right'] = "".concat(left_side ? offset.left - scroll.x : offset.right, "px");

            _.datepicker.container.removeAttribute('style');

            hf.setStyles(_.datepicker.container, offsetCss);
          }

          _.datepicker.wrapper.focus();

          _.visible = true;

          _.input.blur();

          if (_.config.events && _.config.events.shown) _.config.events.shown.call(_, _);
        }, 0);
      }
      /**
       * Hides the date picker
       */

    }, {
      key: "hide",
      value: function hide() {
        var _ = this;

        _.datepicker.container.classList.add('dp__closing');

        _.visible = false;

        _.input.focus();

        document.body.removeAttribute('datepicker-display');
        setTimeout(function () {
          _._switchView('calendar'); // Reset view to calendar


          _.datepicker.container.classList.remove('dp__closing', 'dp__open');

          if (_.config.events && _.config.events.hidden) _.config.events.hidden.call(_, _);
        }, 200);
      }
      /**
       * Destroys the date picker plugin
       */

    }, {
      key: "destroy",
      value: function destroy() {
        this._unbindInput();

        document.body.removeChild(this.datepicker.container);
        delete this.input[DATA_KEY];
      }
    }]);

    return _duDatePicker;
  }();
  /**
   * Creates date picker
   */


  function duDatepicker() {
    var args = arguments,
        arg0 = args[0],
        arg0IsList = arg0 instanceof NodeList || Array.isArray(arg0),
        arg0IsElem = arg0 instanceof Element,
        inputs = typeof arg0 === 'string' ? document.querySelectorAll(arg0) : arg0IsList ? arg0 : arg0IsElem ? [arg0] : document.querySelectorAll(DEFAULT_CLASS),
        options = _typeof(arg0) === 'object' && !arg0IsList && !arg0IsElem ? arg0 : args[1] && _typeof(args[1]) === 'object' ? args[1] : {};
    Array.from(inputs).forEach(function (el) {
      var picker = el[DATA_KEY];
      if (!picker) el[DATA_KEY] = picker = new _duDatePicker(el, options);

      if ((typeof arg0 === 'string' || arg0IsList || arg0IsElem) && args[1] && typeof args[1] === 'string') {
        picker[args[1]].apply(picker, Array.prototype.slice.call(args).slice(2));
      }
    });
  }

  return duDatepicker;

})));
