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
          y = d.getFullYear(),
          i18n = this.config.i18n,
          mVal = m + 1;
      return format.replace(/(yyyy|yy|mmmm|mmm|mm|m|DD|D|dd|d)/g, function (e) {
        switch (e) {
          case 'd':
            return day;

          case 'dd':
            return ('00' + day).slice(-2);

          case 'D':
            return i18n.shortDays[d.getDay()];

          case 'DD':
            return i18n.days[d.getDay()];

          case 'm':
            return mVal;

          case 'mm':
            return ('00' + mVal).slice(-2);

          case 'mmm':
            return i18n.shortMonths[m];

          case 'mmmm':
            return i18n.months[m];

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
    parseDate: function parseDate(date, format) {
      var _ = this,
          _format = typeof format === 'undefined' ? _.config.format : format,
          dayLength = (_format.match(/d/g) || []).length,
          monthLength = (_format.match(/m/g) || []).length,
          yearLength = (_format.match(/y/g) || []).length,
          isFullMonth = monthLength === 4,
          isMonthNoPadding = monthLength === 1,
          isDayNoPadding = dayLength === 1,
          lastIndex = date.length,
          firstM = _format.indexOf('m'),
          firstD = _format.indexOf('d'),
          firstY = _format.indexOf('y'),
          month = '',
          day = '',
          year = '',
          before,
          after,
          monthIdx = -1;

      if (date === '') return {
        m: null,
        d: null,
        y: null,
        date: new Date('')
      }; // Get month on given date string using the format (default or specified)

      if (isFullMonth) {
        monthIdx = _.config.i18n.months.findIndex(function (m) {
          return date.indexOf(m) >= 0;
        });
        month = _.config.i18n.months[monthIdx];
        _format = _format.replace('mmmm', month);
        firstD = _format.indexOf('d');
        firstY = firstY < firstM ? _format.indexOf('y') : _format.indexOf('y', _format.indexOf(month) + month.length);
      } else if (!isDayNoPadding && !isMonthNoPadding || isDayNoPadding && !isMonthNoPadding && firstM < firstD) {
        month = date.substr(firstM, monthLength);
      } else {
        var lastIndexM = _format.lastIndexOf('m');

        before = _format.substring(firstM - 1, firstM);
        after = _format.substring(lastIndexM + 1, lastIndexM + 2);

        if (lastIndexM === _format.length - 1) {
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
        var lastIndexD = _format.lastIndexOf('d');

        before = _format.substring(firstD - 1, firstD);
        after = _format.substring(lastIndexD + 1, lastIndexD + 2);

        if (lastIndexD === _format.length - 1) {
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
        before = _format.substring(firstY - 1, firstY);
        year = date.substr(date.indexOf(before, firstY - 1) + 1, yearLength);
      }

      return {
        m: month,
        d: day,
        y: year,
        date: new Date(year, isNaN(parseInt(month)) ? monthIdx : month - 1, day)
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
    },

    /**
     * Creates HTML for the days of the week
     */
    daysOfWeekDOM: function daysOfWeekDOM() {
      var config = this.config,
          locale = config.i18n,
          firstDay = config.firstDay || locale.firstDay;
      var weekDays = [];

      for (var i = 0, dow = firstDay; i < locale.shorterDays.length; i++, dow++) {
        weekDays.push(locale.shorterDays[dow % 7]);
      }

      return "<span>".concat(weekDays.join('</span><span>'), "</span>");
    },

    /**
     * Converts date JSON to Date object
     * @param {Object} o Date breakdown (year, month, date)
     * @param {number} o.year Year value
     * @param {number} o.month Month value
     * @param {number} o.date Date value
     */
    jsonToDate: function jsonToDate(o) {
      return new Date(o.year, o.month, o.date);
    },

    /**
     * Converts Date object to JSON
     * @param {Date} date Date object
     */
    dateToJson: function dateToJson(date) {
      return date ? {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate()
      } : null;
    },

    /**
     * Determines if object is an HTML element
     * @returns `true` if the object is an instance of an HTML element; `false` otherwise
     */
    isElement: function isElement(obj) {
      return obj instanceof Element;
    }
  };

  /**
   * Dictionary defaults
   */

  var DICT_DEFAULTS = {
    btnOk: 'OK',
    btnCancel: 'CANCEL',
    btnClear: 'CLEAR'
  };

  var Locale =
  /**
   * Creates i18n locale
   * @param {string[]} months List of month names
   * @param {string[]} shortMonths List of shortened month names
   * @param {string[]} days List of day names
   * @param {string[]} shortDays List of 3-letter day names
   * @param {string[]} shorterDays List of 2-letter day names
   * @param {number} firstDay First day of the week (1 - 7; Monday - Sunday)
   * @param {Object} dict Dictionary of words to be used on the UI
   * @param {string} dict.btnOk OK button text
   * @param {string} dict.btnCancel Cancel button text
   * @param {string} dict.btnClear Clear button text
   */
  function Locale(months, shortMonths, days, shortDays, shorterDays, firstDay, dict) {
    _classCallCheck(this, Locale);

    this.months = months;
    this.shortMonths = shortMonths || this.months.map(function (x) {
      return x.substr(0, 3);
    });
    this.days = days;
    this.shortDays = shortDays || this.days.map(function (x) {
      return x.substr(0, 3);
    });
    this.shorterDays = shorterDays || this.days.map(function (x) {
      return x.substr(0, 2);
    });
    this.firstDay = firstDay;
    this.dict = hf.extend(DICT_DEFAULTS, dict);
  };
  /**
   * Internationalization
   */


  var i18n = {
    // expose Locale class
    Locale: Locale,

    /**
     * English
     */
    en: new Locale('January_February_March_April_May_June_July_August_September_October_November_December'.split('_'), null, 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'), null, null, 7),

    /**
     * Russian
     */
    ru: new Locale('январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь'.split('_'), 'янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.'.split('_'), 'воскресенье_понедельник_вторник_среда_четверг_пятница_суббота'.split('_'), 'вс_пн_вт_ср_чт_пт_сб'.split('_'), 'вс_пн_вт_ср_чт_пт_сб'.split('_'), 1, {
      btnCancel: 'Отменить',
      btnClear: 'очищать'
    }),

    /**
     * Spanish
     */
    es: new Locale('enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre'.split('_'), null, 'domingo_lunes_martes_miércoles_jueves_viernes_sábado'.split('_'), 'dom._lun._mar._mié._jue._vie._sáb.'.split('_'), null, 1, {
      btnCancel: 'Cancelar',
      btnClear: 'Despejar'
    }),

    /**
     * Turkish
     */
    tr: new Locale('Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'), null, 'Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi'.split('_'), 'Paz_Pts_Sal_Çar_Per_Cum_Cts'.split('_'), 'Pz_Pt_Sa_Ça_Pe_Cu_Ct'.split('_'), 1),

    /**
     * Persian
     */
    fa: new Locale('ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'), 'ژانویه_فوریه_مارس_آوریل_مه_ژوئن_ژوئیه_اوت_سپتامبر_اکتبر_نوامبر_دسامبر'.split('_'), "\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split('_'), "\u06CC\u06A9\u200C\u0634\u0646\u0628\u0647_\u062F\u0648\u0634\u0646\u0628\u0647_\u0633\u0647\u200C\u0634\u0646\u0628\u0647_\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647_\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647_\u062C\u0645\u0639\u0647_\u0634\u0646\u0628\u0647".split('_'), 'ی_د_س_چ_پ_ج_ش'.split('_'), 1),

    /**
     * French
     */
    fr: new Locale('janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'), 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'), 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'), 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'), 'di_lu_ma_me_je_ve_sa'.split('_'), 1, {
      btnCancel: 'Abandonner',
      btnClear: 'Effacer'
    }),

    /**
     * German
     */
    de: new Locale('Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'), 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'), 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'), 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'), 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'), 1, {
      btnCancel: 'Stornieren',
      btnClear: 'Löschen'
    }),

    /**
     * Japanese
     */
    ja: new Locale('一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'), '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'), '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'), '日曜_月曜_火曜_水曜_木曜_金曜_土曜'.split('_'), '日_月_火_水_木_金_土'.split('_'), 7),

    /**
     * Portuguese
     */
    pt: new Locale('janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro'.split('_'), null, 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'), 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'), 'Do_2ª_3ª_4ª_5ª_6ª_Sá'.split('_'), 1, {
      btnCancel: 'Cancelar',
      btnClear: 'Clarear'
    }),

    /**
     * Vietnamese
     */
    vi: new Locale('tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12'.split('_'), 'Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12'.split('_'), 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split('_'), 'CN_T2_T3_T4_T5_T6_T7'.split('_'), 'CN_T2_T3_T4_T5_T6_T7'.split('_'), 1),

    /**
     * Chinese
     */
    zh: new Locale('一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'), '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'), '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'), '周日_周一_周二_周三_周四_周五_周六'.split('_'), '日_一_二_三_四_五_六'.split('_'), 1)
  };

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
    // callback functions
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
    },
    // internationalization
    i18n: i18n.en,
    // first day of the week (1 - 7; Monday - Sunday); default will be fetched from i18n.firstDay
    firstDay: null,
    // parent element where the date picker DOM will be added
    root: 'body'
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

      var _ = this,
          i18n = options.i18n;

      if (typeof i18n === 'string') options.i18n = duDatepicker.i18n[i18n];
      this.config = hf.extend(DEFAULTS, options);
      var dp_root = this.config.root;
      if (typeof dp_root === 'string') this.config.root = document.querySelector(dp_root);else if (!hf.isElement(dp_root)) delete this.config.root;
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
      this.input.readOnly = true;
      this.fromEl = document.querySelector(this.config.fromTarget);
      this.toEl = document.querySelector(this.config.toTarget);
      this.input.hidden = this.config.range && (this.fromEl || this.toEl);
      this.viewMode = 'calendar';
      this.dict = hf.extend(DICT_DEFAULTS, this.config.i18n.dict);
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
            }, _.dict.btnClear),
            btnCancel: hf.createElem('span', {
              class: 'dudp__button cancel',
              role: 'button'
            }, _.dict.btnCancel),
            btnOk: hf.createElem('span', {
              class: 'dudp__button ok',
              role: 'button'
            }, _.dict.btnOk)
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
              formattedFrom = hf.formatDate.call(_, _from, _.config.format),
              outFrom = hf.formatDate.call(_, _from, _.config.outFormat || _.config.format),
              formattedTo = hf.formatDate.call(_, _to, _.config.format),
              outTo = hf.formatDate.call(_, _to, _.config.outFormat || _.config.format);
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
        this.selected = hf.dateToJson(_.date);
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
        _.input.readOnly = false;

        _.input.removeEventListener('click', _inputClick);

        _.input.removeEventListener('keydown', _inputKeydown);

        if (_.fromEl) {
          _.fromEl.readOnly = false;

          _.fromEl.removeEventListener('click', _inputClick);

          _.fromEl.removeEventListener('keydown', _inputKeydown);
        }

        if (_.toEl) {
          _.toEl.readOnly = false;

          _.toEl.removeEventListener('click', _inputClick);

          _.toEl.removeEventListener('keydown', _inputKeydown);
        }
      };

      hf.addEvent(_.input, 'click', _inputClick);
      hf.addEvent(_.input, 'keydown', _inputKeydown);

      if (_.fromEl) {
        _.fromEl.readOnly = true;
        hf.addEvent(_.fromEl, 'click', _inputClick);
        hf.addEvent(_.fromEl, 'keydown', _inputKeydown);
      }

      if (_.toEl) {
        _.toEl.readOnly = true;
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
            monthElem.innerText = _.config.i18n.shortMonths[_month];
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
        hf.appendTo(picker.container, _.config.root);
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

            var _from = hf.jsonToDate(_.rangeFrom),
                _to = hf.jsonToDate(_.rangeTo);

            if (_._dateDisabled(_from) || _._dateDisabled(_to)) return;
            _.dateFrom = _from;
            _.dateTo = _to;

            _.setValue([hf.formatDate.call(_, _from, _.config.format), hf.formatDate.call(_, _to, _.config.format)].join(_.config.rangeDelim));
          } else {
            var _date = hf.jsonToDate(_.selected);

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
            _from = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
            _to = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null;

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
            _inDays = _days.indexOf(_.config.i18n.days[date.getDay()]) >= 0 || _days.indexOf(_.config.i18n.shortDays[date.getDay()]) >= 0 || _days.indexOf(_.config.i18n.shorterDays[date.getDay()]) >= 0;

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
            selected = _.config.range ? null : hf.jsonToDate(_.selected),
            rangeFrom = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
            rangeTo = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null,
            date = new Date(year, month, day),
            totalDays = hf.getDaysCount(date),
            nmStartDay = 1,
            weeks = [],
            firstDay = _.config.firstDay || _.config.i18n.firstDay,
            lastDay = (firstDay + 6) % 7;

        for (var week = 1; week <= 6; week++) {
          var daysOfWeek = [];

          for (var idx = 0, dow = firstDay; idx < 7; idx++, dow++) {
            daysOfWeek.push(hf.createElem('span', {
              class: 'dudp__date',
              'data-dow': dow % 7
            }));
          }

          var _loop = function _loop() {
            date.setDate(day);
            var dayOfWeek = date.getDay(),
                dayEl = daysOfWeek.find(function (d) {
              return parseInt(d.dataset.dow) === dayOfWeek;
            });
            dayEl.dataset.date = day;
            dayEl.dataset.month = month;
            dayEl.dataset.year = year;
            if (date.getTime() === today.getTime()) dayEl.classList.add('current');
            if (_._dateDisabled(date)) dayEl.classList.add('disabled');
            if (_._inRange(date)) dayEl.classList.add('in-range');
            if (!_.config.range && date.getTime() === selected.getTime()) dayEl.classList.add('selected');
            if (_.config.range && rangeFrom && date.getTime() === rangeFrom.getTime()) dayEl.classList.add('range-from');
            if (_.config.range && rangeTo && date.getTime() === rangeTo.getTime()) dayEl.classList.add('range-to');

            if (week === 1 && dayOfWeek === firstDay % 7) {
              return "break";
            } else if (dayOfWeek !== lastDay) {
              dayEl.innerText = day++;
            } else {
              dayEl.innerText = day++;
              return "break";
            }
          };

          while (day <= totalDays) {
            var _ret = _loop();

            if (_ret === "break") break;
          }
          /* For days of previous and next month */


          if (week === 1 || week > 4) {
            // First week
            if (week === 1) {
              (function () {
                var pm = new Date(year, month - 1, 1),
                    pmDays = hf.getDaysCount(pm);

                for (var a = 1; a <= 7; a++) {
                  pm.setDate(pmDays--);
                  var dayEl = daysOfWeek.find(function (d) {
                    return parseInt(d.dataset.dow) === pm.getDay();
                  });
                  if (dayEl.innerText !== '') continue;
                  dayEl.dataset.date = pm.getDate();
                  dayEl.dataset.month = pm.getMonth();
                  dayEl.dataset.year = pm.getFullYear();
                  dayEl.innerText = pm.getDate();
                  dayEl.classList.add('dudp__pm');
                  if (_._dateDisabled(pm)) dayEl.classList.add('disabled');
                  if (_._inRange(pm)) dayEl.classList.add('in-range');
                  if (pm.getTime() === today.getTime()) dayEl.classList.add('current');
                  if (!_.config.range && pm.getTime() === selected.getTime()) dayEl.classList.add('selected');
                  if (_.config.range && rangeFrom && pm.getTime() === rangeFrom.getTime()) dayEl.classList.add('range-from');
                  if (_.config.range && rangeTo && pm.getTime() === rangeTo.getTime()) dayEl.classList.add('range-to');
                }
              })();
            } // Last week
            else if (week > 4) {
                (function () {
                  var nm = new Date(year, month + 1, 1);

                  for (var a = 1; a <= 7; a++) {
                    nm.setDate(nmStartDay);
                    var dayEl = daysOfWeek.find(function (d) {
                      return parseInt(d.dataset.dow) === nm.getDay();
                    });
                    if (dayEl.innerText !== '') continue;
                    nmStartDay++;
                    dayEl.dataset.date = nm.getDate();
                    dayEl.dataset.month = nm.getMonth();
                    dayEl.dataset.year = nm.getFullYear();
                    dayEl.innerText = nm.getDate();
                    dayEl.classList.add('dudp__nm');
                    if (_._dateDisabled(nm)) dayEl.classList.add('disabled');
                    if (_._inRange(nm)) dayEl.classList.add('in-range');
                    if (nm.getTime() === today.getTime()) dayEl.classList.add('current');
                    if (!_.config.range && nm.getTime() === selected.getTime()) dayEl.classList.add('selected');
                    if (_.config.range && rangeFrom && nm.getTime() === rangeFrom.getTime()) dayEl.classList.add('range-from');
                    if (_.config.range && rangeTo && nm.getTime() === rangeTo.getTime()) dayEl.classList.add('range-to');
                  }
                })();
              }
          }

          weeks.push(daysOfWeek);
        }

        var datesDOM = [];
        weeks.forEach(function (datesEl) {
          var weekDOM = hf.createElem('div', {
            class: 'dudp__cal-week'
          });

          for (var i = 0; i < datesEl.length; i++) {
            var dateElem = datesEl[i]; // Attach click handler for dates

            hf.addEvent(dateElem, 'click', function () {
              var _this = this,
                  _year = _this.dataset.year,
                  _month = _this.dataset.month,
                  _date = _this.dataset.date,
                  _selected = new Date(_year, _month, _date),
                  isFrom = false;

              if (_._dateDisabled(_selected)) return;

              if (_.config.range) {
                var _rangeFrom = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
                    _rangeTo = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null;

                if (!_.rangeFrom || _.rangeFrom && _selected < _rangeFrom || _.rangeFrom && _.rangeTo && hf.dateDiff(_rangeFrom, _selected) <= hf.dateDiff(_selected, _rangeTo) && hf.dateDiff(_rangeFrom, _selected) !== 0 || _.rangeFrom && _.rangeTo && _rangeTo.getTime() === _selected.getTime()) {
                  _.rangeFrom = {
                    year: _year,
                    month: _month,
                    date: _date
                  };
                  isFrom = true;
                } else if (!_.rangeTo || _.rangeTo && _selected > _rangeTo || _.rangeFrom && _.rangeTo && hf.dateDiff(_selected, _rangeTo) < hf.dateDiff(_rangeFrom, _selected) && hf.dateDiff(_selected, _rangeTo) !== 0 || _.rangeFrom && _.rangeTo && _rangeFrom.getTime() === _selected.getTime()) {
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
            hf.appendTo(dateElem, weekDOM);
          }

          datesDOM.push(weekDOM);
        });
        return datesDOM;
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
          }, hf.daysOfWeekDOM.call(_), true),
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
          }, hf.daysOfWeekDOM.call(_), true),
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
          }, hf.daysOfWeekDOM.call(_), true),
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
        }, _.config.i18n.months[prevMonth]), hf.createElem('span', {
          class: 'cal-year'
        }, prevYear)], prev.header);
        hf.appendTo(_._getDates(prevYear, prevMonth), prev.datesHolder);
        hf.appendTo([prev.header, prev.weekDays, prev.datesHolder], prev.wrapper);
        viewsHolder.calendars.push(prev);
        hf.appendTo([hf.createElem('span', {
          class: 'cal-month'
        }, _.config.i18n.months[_month]), hf.createElem('span', {
          class: 'cal-year'
        }, _year)], inView.header);
        hf.appendTo(_._getDates(_year, _month), inView.datesHolder);
        hf.appendTo([inView.header, inView.weekDays, inView.datesHolder], inView.wrapper);
        viewsHolder.calendars.push(inView);
        hf.appendTo([hf.createElem('span', {
          class: 'cal-month'
        }, _.config.i18n.months[nextMonth]), hf.createElem('span', {
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
            buttons = picker.calendarHolder.buttons.wrapper,
            _animDuration = 250,
            _oldView = _.viewMode,
            hc = 'dp__hidden'; // hidden class


        _.viewMode = view;

        switch (_.viewMode) {
          case 'calendar':
            var _calendar = calViews.querySelector('.dudp__calendar:nth-child(2)'); // current month in view


            calViews.classList.add('dp__animate-out');
            calViews.classList.remove(hc);
            if (_oldView !== 'calendar') _calendar.classList.add('dp__zooming', 'dp__animate-zoom');
            picker.calendarHolder.btnPrev.classList.remove(hc);
            picker.calendarHolder.btnNext.classList.remove(hc);
            buttons.classList.remove(hc);
            setTimeout(function () {
              calViews.classList.remove('dp__animate-out');
              if (_oldView !== 'calendar') _calendar.classList.remove('dp__animate-zoom');
            }, 10);
            monthsView.classList.add('dp__animate-out');
            yearsView.classList.add(hc);
            setTimeout(function () {
              if (_oldView !== 'calendar') _calendar.classList.remove('dp__zooming');
              monthsView.classList.add(hc);
              monthsView.classList.remove('dp__animate-out');
            }, _animDuration);
            break;

          case 'months':
            picker.calendarHolder.btnPrev.classList.add(hc);
            picker.calendarHolder.btnNext.classList.add(hc);
            buttons.classList.add(hc);
            calViews.classList.add('dp__animate-out');
            monthsView.classList.add('dp__animate-out');
            monthsView.classList.remove(hc);
            setTimeout(function () {
              monthsView.classList.remove('dp__animate-out');
            }, 10);
            setTimeout(function () {
              calViews.classList.add(hc);
              calViews.classList.remove('dp__animate-out');
            }, _animDuration);
            break;

          case 'years':
            hf.empty(yearsView);
            hf.appendTo(_._getYears(), yearsView);

            var _selYear = yearsView.querySelector('.dudp__year.selected');

            yearsView.scrollTop = _selYear.offsetTop - 120;
            picker.calendarHolder.btnPrev.classList.add(hc);
            picker.calendarHolder.btnNext.classList.add(hc);
            buttons.classList.add(hc);
            monthsView.classList.add('dp__animate-out');
            calViews.classList.add('dp__animate-out');
            yearsView.classList.remove(hc);
            setTimeout(function () {
              calViews.classList.add(hc);
              calViews.classList.remove('dp__animate-out');
              monthsView.classList.add(hc);
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
          }, hf.daysOfWeekDOM.call(_), true),
          datesHolder: hf.createElem('div', {
            class: 'dudp__dates-holder'
          })
        };

        hf.appendTo([hf.createElem('span', {
          class: 'cal-month'
        }, _.config.i18n.months[_month]), hf.createElem('span', {
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

          _.rangeFrom = hf.dateToJson(_.dateFrom);
          _.rangeTo = hf.dateToJson(_.dateTo);
          _.viewYear = _date.getFullYear();
          _.viewMonth = _date.getMonth();
        } else {
          _.selected = hf.dateToJson(_.date);
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
            selected = _.config.range ? new Date() : hf.jsonToDate(_.selected);

        picker.header.selectedYear.innerText = selected.getFullYear();
        picker.header.selectedDate.innerText = hf.formatDate.call(_, selected, SELECTED_FORMAT);
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
              formattedFrom = _empty ? '' : hf.formatDate.call(_, _from, _.config.format),
              outFrom = _empty ? '' : hf.formatDate.call(_, _from, _.config.outFormat || _.config.format),
              formattedTo = _empty ? '' : hf.formatDate.call(_, _to, _.config.format),
              outTo = _empty ? '' : hf.formatDate.call(_, _to, _.config.outFormat || _.config.format),
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
              formatted = _empty ? '' : hf.formatDate.call(_, date, _.config.format);
          _.date = date;
          _.viewYear = date.getFullYear();
          _.viewMonth = date.getMonth();
          _.input.value = formatted;

          _.input.setAttribute('value', formatted);

          changeData = {
            _date: _empty ? null : _.date,
            date: _empty ? null : hf.formatDate.call(_, _.date, _.config.outFormat || _.config.format)
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
        return hf.formatDate.call(this, date, format);
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
          document.body.setAttribute('datepicker-display', 'on');

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

        this.config.root.removeChild(this.datepicker.container);
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
        arg0IsElem = hf.isElement(arg0),
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

  Object.defineProperty(duDatepicker, 'i18n', {
    value: i18n
  });

  return duDatepicker;

})));
