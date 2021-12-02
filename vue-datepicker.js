import './dist/duDatepicker.css'
import duDatepicker from './dist/duDatepicker.js'

export default {
    install(Vue, options) {

        if (! options) options = {}

        // <du-datepicker /> component
        Vue.component('duDatepicker', {
            render(createElement) {
                return createElement('input', {
                    domProps: {
                        type: 'text'
                    },
                    on: {
                        datechanged: e => {
                            this.$emit('datechanged', e)
                        }
                    }
                })
            },
            props: {
                options: { type: Object },
                ready: { type: Function },
                dateChanged: { type: Function },
                onRangeFormat: { type: Function },
                shown: { type: Function },
                hidden: { type: Function }
            },
            methods: {
                show() { duDatepicker(this.$el, 'show') },
                hide() { duDatepicker(this.$el, 'hide') },
                destroy() { duDatepicker(this.$el, 'destroy') },
                setValue(value) { duDatepicker(this.$el, 'setValue', value) },
                setTheme(theme) { duDatepicker(this.$el, 'setTheme', theme) },
                setMinDate(date) { duDatepicker(this.$el, 'setMinDate', date) },
                setMaxDate(date) { duDatepicker(this.$el, 'setMaxDate', date) },
                setMinYear(year) { duDatepicker(this.$el, 'setMinYear', year) },
                setMaxYear(year) { duDatepicker(this.$el, 'setMaxYear', year) },
                setPriorYears(years) { duDatepicker(this.$el, 'setPriorYears', years) },
                setLaterYears(years) { duDatepicker(this.$el, 'setLaterYears', years) },
                setDisabled(dates) { duDatepicker(this.$el, 'setDisabled', dates) },
                setDisabledDays(days) { duDatepicker(this.$el, 'setDisabledDays', days) },
                setI18n(i18n) { duDatepicker(this.$el, 'setI18n', i18n) },
                set(setters) { duDatepicker(this.$el, 'set', setters) }
            },
            mounted() {
                let evtProps = {
                    events: { ready: this.ready, dateChanged: this.dateChanged, onRangeFormat: this.onRangeFormat, shown: this.shown, hidden: this.hidden }
                }

                // remove undefined callbacks
                Object.keys(evtProps.events).forEach(key => evtProps.events[key] === undefined && delete evtProps.events[key])

                // initialize
                duDatepicker(this.$el, { ...options, ...this.options, ...evtProps })
            },
            destroyed() {
                this.destroy()
            }
        })

        // v-du-datepicker directive
        Vue.directive('du-datepicker', {
            bind(el, binding) {
                duDatepicker(el, { ...options, ...binding.value })
            },
            unbind(el) {
                duDatepicker(el, 'destroy')
            }
        })
    }
}