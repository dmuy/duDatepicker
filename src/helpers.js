/**
 * Helper functions
 */
export const hf = {
    /**
     * Appends element(s) to parent
     * @param {Element|Element[]} elem Element(s) to append to parent
     * @param {Element} to Parent element
     */
    appendTo (elem, to, idx) {
        if (Array.isArray(elem)) {
            elem.forEach(el => {
                if (idx === 0) to.insertBefore(el, to.childNodes[idx] || null)
                else to.appendChild(el)
            })
        } else {
            if (idx === 0) to.insertBefore(elem, to.childNodes[idx] || null)
            else to.appendChild(elem)
        }
    },
    /**
     * Adds event listener to element(s)
     * @param {Element|Element[]} elem Element(s) to add event
     * @param {string} event Event name
     * @param {Function} handler Event handler
     */
    addEvent (elem, event, handler) {
        function listenEvent(el, evt, fn) {
            el.addEventListener(evt, fn, false)
        }

        if (Array.isArray(elem)) {
            elem.forEach(e => listenEvent(e, event, handler))
        } else listenEvent(elem, event, handler)
    },
    /**
     * Removes event listener to element(s)
     * @param {Element|Element[]} elem Element(s) to remove event
     * @param {string} event Event name
     * @param {Function} handler Event handler
     */
    removeEvent (elem, event, handler) {
        function delEvent(el, evt, fn) {
            el.removeEventListener(evt, fn, false)
        }

        if (Array.isArray(elem)) {
            elem.forEach(e => delEvent(e, event, handler))
        } else delEvent(elem, event, handler)
    },
    /**
     * Removes child nodes
     * @param {Element} elem Html element to empty
     */
    empty (elem) {
        while (elem.firstChild) { elem.removeChild(elem.firstChild) }
    },
    /**
     * Creates an HTML element; `document.createElement` helper function
     * @see {@link http://jsfiddle.net/andr3ww/pvuzgfg6/13/}
     * @param {string} tag HTML tag name (i.e. `div`, `span`, `a`)
     * @param {Object} attributes Attribute object
     * @param {string|Element} content Element content: text or HTML element(s)
     * @param {Boolean} isHtml Determines if `content` specified should added as an html element
     */
    createElem (tag, attributes, content, isHtml) {
        let el = document.createElement(tag)

        if (typeof content !== 'undefined')
            el[isHtml || false ? 'innerHTML' : 'innerText'] = content

        if (typeof attributes !== 'undefined')
            hf.setAttributes(el, attributes)

        return el
    },
    /**
     * Sets the attribute(s) of the element
     * @param {Element} el Html element
     * @param {Object} attrs Attribute object
     */
    setAttributes (el, attrs) {
        for(let attr in attrs) { el.setAttribute(attr, attrs[attr]) }
    },
    /**
     * Sets the inline style(s) of the element
     * @param {Element} el HTML element
     * @param {Object} styles Styles object
     */
    setStyles (el, styles) {
        for (let style in styles) { el.style[style] = styles[style] }
    },
    /**
     * Adds class name(s) to the element
     * @param {Element} el HTML element
     * @param {string|string[]} className Class name to remove
     */
    addClass (el, className) {
        if (Array.isArray(className)) {
            className.forEach(cn => el.classList.add(cn))
        }
        else el.classList.add(className)
    },
    /**
     * Removes class name(s) of an element
     * @param {Element} el HTML element
     * @param {string|string[]} className Class name to remove
     */
    removeClass (el, className) {
        if (Array.isArray(className)) {
            className.forEach(cn => el.classList.remove(cn))
        }
        else el.classList.remove(className)
    },
    /**
     * Gets the number of days based on the month of the given date
     * @param {Date} date Date object
     */
    getDaysCount (date) { return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate() },
    /**
     * Calculates date difference
     * @param {Date} from Date from
     * @param {Date} to Date to
     */
    dateDiff (from, to) {
        // Take the difference between the dates and divide by milliseconds per day.
        // Round to nearest whole number to deal with DST.
        return Math.round((to - from) / (1000 * 60 * 60 * 24))
    },
    /**
     * Returns the document width and height
     */
    screenDim () {
        let doc = document.documentElement

        return {
            height: Math.max(doc.offsetHeight, doc.clientHeight),
            width: Math.max(doc.offsetWidth, doc.clientWidth)
        }
    },
    /**
     * Calculates the offset of the given html element
     * @param {Element} el HTML element
     */
    calcOffset (el) {
        let doc = document.documentElement || document.body,
            rect = el.getBoundingClientRect(),
            offset = {
                top: rect.top + doc.scrollTop,
                left: rect.left + doc.scrollLeft
            },
            dim = {
                height: el.offsetHeight,
                width: el.offsetWidth
            },
            screen = hf.screenDim()

        return {
            top: offset.top + dim.height,
            left: offset.left,
            right: screen.width - (offset.left + dim.width),
            bottom: screen.height - (offset.top)
        }
    },
    /**
    * Vanilla JavaScript version of jQuery.extend()
    * @see {@link https://gomakethings.com/vanilla-javascript-version-of-jquery-extend/}
    */
    extend () {
        // Variables
        let extended = {}
        let deep = false
        let i = 0
        let length = arguments.length

        // Check if a deep merge
        if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
            deep = arguments[0]
            i++
        }

        // Merge the object into the extended object
        let merge = function (obj) {
            for (let prop in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                    // If deep merge and property is an object, merge properties
                    if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                        extended[prop] = hf.extend(true, extended[prop], obj[prop])
                    } else {
                        extended[prop] = obj[prop]
                    }
                }
            }
        }

        // Loop through each object and conduct a merge
        for (; i < length; i++) {
            let obj = arguments[i]
            merge(obj)
        }

        return extended
    },
    /**
     * Returns formatted string representation of specified date
     * @param {Date} date Date to format
     * @param {string} format Date format pattern
     */
    formatDate (date, format) {
        let d = new Date(date), day = d.getDate(), m = d.getMonth(), y = d.getFullYear(),
            i18n = this.config.i18n,
            mVal = m + 1

        return format.replace(/(yyyy|yy|mmmm|mmm|mm|m|DD|D|dd|d)/g, (e) => {
            switch (e) {
                case 'd':
                    return day
                case 'dd':
                    return ('00' + day).slice(-2)
                case 'D':
                    return i18n.shortDays[d.getDay()]
                case 'DD':
                    return i18n.days[d.getDay()]
                case 'm':
                    return mVal
                case 'mm':
                    return ('00' + mVal).slice(-2)
                case 'mmm':
                    return i18n.shortMonths[m]
                case 'mmmm':
                    return i18n.months[m]
                case 'yy':
                    return y.toString().substring(2, 4)
                case 'yyyy':
                    return y
            }
        })
    },
    /**
     * Parses date string using default or specified format
     * @param {string} date Date string to parse
     * @param {string=} format Format of the date string; `config.format` will be used if not specified
     */
    parseDate (date, format) {
        let _ = this, _format = typeof format === 'undefined' ? _.config.format : format,
            dayLength = (_format.match(/d/g) || []).length,
            monthLength = (_format.match(/m/g) || []).length,
            yearLength = (_format.match(/y/g) || []).length,
            isFullMonth = monthLength == 4,
            isMonthNoPadding = monthLength == 1,
            isDayNoPadding = dayLength == 1,
            lastIndex = date.length,
            firstM = _format.indexOf('m'), firstD = _format.indexOf('d'), firstY = _format.indexOf('y'),
            month = '', day = '', year = '',
            before, after,
            monthIdx = -1

        if (date === '') return { m: null, d: null, y: null, date: new Date('') }

        // Get month on given date string using the format (default or specified)
        if (isFullMonth) {
            monthIdx = _.config.i18n.months.findIndex(m => date.indexOf(m) >= 0)
            month = _.config.i18n.months[monthIdx]
            _format = _format.replace('mmmm', month)
            firstD = _format.indexOf('d')
            firstY = firstY < firstM ? _format.indexOf('y') : _format.indexOf('y', _format.indexOf(month) + month.length)
        }
        else if (!isDayNoPadding && !isMonthNoPadding || (isDayNoPadding && !isMonthNoPadding && firstM < firstD)) {
            month = date.substring(firstM, firstM + monthLength)
        } 
        else {
            let lastIndexM = _format.lastIndexOf('m')

            before = _format.substring(firstM - 1, firstM)
            after = _format.substring(lastIndexM + 1, lastIndexM + 2)

            if (lastIndexM === _format.length - 1) {
                month = date.substring(date.indexOf(before, firstM - 1) + 1, lastIndex)
            } else if (firstM === 0) {
                month = date.substring(0, date.indexOf(after, firstM))
            } else {
                month = date.substring(date.indexOf(before, firstM - 1) + 1, date.indexOf(after, firstM + 1))
            }
        }

        // Get date on given date string using the format (default or specified)
        if (!isDayNoPadding && !isMonthNoPadding || (!isDayNoPadding && isMonthNoPadding && firstD < firstM)) {
            day = date.substring(firstD, firstD + dayLength)
        } else {
            let lastIndexD = _format.lastIndexOf('d')

            before = _format.substring(firstD - 1, firstD)
            after = _format.substring(lastIndexD + 1, lastIndexD + 2)

            if (lastIndexD === _format.length - 1) {
                day = date.substring(date.indexOf(before, firstD - 1) + 1, lastIndex)
            } else if (firstD === 0) {
                day = date.substring(0, date.indexOf(after, firstD))
            } else {
                day = date.substring(date.indexOf(before, firstD - 1) + 1, date.indexOf(after, firstD + 1))
            }
        }

        // Get year on given date string using the format (default or specified)
        if (!isMonthNoPadding && !isDayNoPadding || (isMonthNoPadding && isDayNoPadding && firstY < firstM && firstY < firstD)
            || (!isMonthNoPadding && isDayNoPadding && firstY < firstD) || (isMonthNoPadding && !isDayNoPadding && firstY < firstM)) {
            year = date.substring(firstY, firstY + yearLength)
        } else {
            before = _format.substring(firstY - 1, firstY)
            let yearStart = date.indexOf(before, firstY - 1) + 1

            year = date.substring(yearStart, yearStart + yearLength)
        }

        return {
            m: month,
            d: day,
            y: year,
            date: isNaN(parseInt(month)) ?
                new Date(`${year}-${month}-${day}`) : 
                new Date(year, isNaN(parseInt(month)) ? monthIdx : month - 1, day)
        }
    },
    /**
     * Triggers the `change`, `onchange`, `datechanged` event on the specified input element
     * @param {HTMLInputElement} el HTML input element
     * @param {Object} data Event data
     */
    triggerChange (el, data) {
        let change = new Event('change', { bubbles: true, cancelable: false })
        let onChange = new Event('onchange', { bubbles: true, cancelable: false })
        let dateChanged = new Event('datechanged', { bubbles: true, cancelable: false })

        dateChanged.data = data

        el.dispatchEvent(change)
        el.dispatchEvent(onChange)
        el.dispatchEvent(dateChanged)
    },
    /**
     * Creates HTML for the days of the week
     */
    daysOfWeekDOM () {
        let config = this.config,
            locale = config.i18n,
            firstDay = config.firstDay || locale.firstDay

        let weekDays = []

        for (let i = 0, dow = firstDay; i < locale.shorterDays.length; i++, dow++) {
            weekDays.push(locale.shorterDays[dow % 7])
        }

        return `<span>${weekDays.join('</span><span>')}</span>`
    },
    /**
     * Converts date JSON to Date object
     * @param {Object} o Date breakdown (year, month, date)
     * @param {number} o.year Year value
     * @param {number} o.month Month value
     * @param {number} o.date Date value
     */
    jsonToDate (o) {
        return new Date(o.year, o.month, o.date)
    },
    /**
     * Converts Date object to JSON
     * @param {Date} date Date object
     */
    dateToJson (date) {
        return date ? {
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate()
        } : null
    },
    /**
     * Determines if object is an HTML element
     * @returns `true` if the object is an instance of an HTML element; `false` otherwise
     */
    isElement (obj) { return obj instanceof Element },
    /**
     * Swipe event handler
     * @param {Element} elem HTML element
     * @param {Object} callbacks Swipe event callbacks
     * @param {Function} callbacks.swipeRight Callback when swiping right
     * @param {Function} callbacks.swipeLeft Callback when swiping left
     */
    swipeEvent(elem, callbacks) {
        let clientX = 0, clientY = 0,
            lastX = 0, lastY = 0

        this.addEvent(elem, 'touchstart', e => {
            clientX = e.touches[0].clientX
            clientY = e.touches[0].clientY
        })

        this.addEvent(elem, 'touchend', e => {
            lastX = e.changedTouches[0].clientX
            lastY = e.changedTouches[0].clientY

            let deltaX = clientX - lastX,
                deltaY = clientY - lastY,
                swipeRight = deltaX > 100 && Math.abs(deltaY) <= 50,
                swipeLeft = deltaX < -100 && Math.abs(deltaY) <= 50

            if (swipeRight && callbacks?.swipeRight) callbacks.swipeRight()
            else if (swipeLeft && callbacks?.swipeLeft) callbacks.swipeLeft()
        })
    },
    /**
     * Click event handler for date elements
     * @param {Element} dateElem Date element
     */
    dateClickEvent(dateElem) {
        let _ = this

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
                }
                else if (!_.rangeTo || (_.rangeTo && _selected > rangeTo) ||
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
                    delem.classList.remove(...['range-from-preview', 'range-to-preview', 'in-range-preview'])
                })
            }
            else {
                if (_.config.multiple) {
                    let isSelected = _this.classList.contains('selected')

                    _.datepicker.calendarHolder.calendarViews.wrapper
                        .querySelectorAll(`.dudp__date[data-date="${_date}"][data-month="${_month}"][data-year="${_year}"]`)
                        .forEach(function (delem) {
                            delem.classList[isSelected ? 'remove' : 'add']('selected')
                        })

                    if (isSelected) _.selectedDates = _.selectedDates.filter(sd => sd.getTime() !== _selected.getTime())
                    else _.selectedDates.push(_selected)
                    _._setSelection()
                }
                else {
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
    },
    /**
     * Hover event handler for date elements
     * @param {Element} dateElem Date element
     */
    dateHoverEvent(dateElem) {
        let _ = this,
            inRange = (selected, isFrom, date) => {
                let _from = isFrom ? selected : _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
                    _to = !isFrom ? selected : _.rangeTo ? hf.jsonToDate(_.rangeTo) : null
        
                return (_from && date > _from) && (_to && date < _to)
            }

        hf.addEvent(dateElem, 'mouseover', function () {
            let _this = this, _year = _this.dataset.year, _month = _this.dataset.month, _date = _this.dataset.date,
                _selected = new Date(_year, _month, _date),
                isFrom = false

            if (_._dateDisabled(_selected) || _this.classList.contains('range-from') || _this.classList.contains('range-to')) return

            if (_.rangeFrom) {
                let rangeFrom = _.rangeFrom ? hf.jsonToDate(_.rangeFrom) : null,
                    rangeTo = _.rangeTo ? hf.jsonToDate(_.rangeTo) : null

                if (!_.rangeFrom || (_.rangeFrom && _selected < rangeFrom) ||
                    (_.rangeFrom && _.rangeTo && hf.dateDiff(rangeFrom, _selected) <= hf.dateDiff(_selected, rangeTo) && hf.dateDiff(rangeFrom, _selected) !== 0) ||
                    (_.rangeFrom && _.rangeTo && rangeTo.getTime() === _selected.getTime())) {
                    isFrom = true
                } else if (!_.rangeTo || (_.rangeTo && _selected > rangeTo) ||
                    (_.rangeFrom && _.rangeTo && hf.dateDiff(_selected, rangeTo) < hf.dateDiff(rangeFrom, _selected) && hf.dateDiff(_selected, rangeTo) !== 0) ||
                    (_.rangeFrom && _.rangeTo && rangeFrom.getTime() === _selected.getTime())) {
                    isFrom = false
                }

                _.datepicker.calendarHolder.calendarViews.wrapper.querySelectorAll('.dudp__date').forEach(function (delem) {
                    let _deYear = delem.dataset.year, _deMonth = delem.dataset.month, _deDate = delem.dataset.date,
                        _inRange = inRange(_selected, isFrom, new Date(_deYear, _deMonth, _deDate))

                    delem.classList[(_year === _deYear && _month === _deMonth && _date === _deDate) ? 'add' : 'remove'](isFrom ? 'range-from-preview' : 'range-to-preview')
                    delem.classList[_inRange ? 'add' : 'remove']('in-range-preview')
                })
            }
        })

        hf.addEvent(dateElem, 'mouseout', function() {
            let _this = this, _year = _this.dataset.year, _month = _this.dataset.month, _date = _this.dataset.date,
                _selected = new Date(_year, _month, _date)

            if (_._dateDisabled(_selected)) return

            _.datepicker.calendarHolder.calendarViews.wrapper
                .querySelectorAll('.dudp__date.range-from-preview, .dudp__date.range-to-preview, .dudp__date.in-range-preview').forEach(delem => {
                    delem.classList.remove(...['range-from-preview', 'range-to-preview', 'in-range-preview'])
                })
        })
    }
}