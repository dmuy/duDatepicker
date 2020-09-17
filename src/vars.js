/**
 * Month names (i.e. `January`, `February`, etc)
 */
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

/**
 * Shortened month names (i.e. `Jan`, `Feb`, etc)
 */
export const SHORT_MONTHS = MONTHS.map(x => x.substr(0, 3))

/**
 * Days of the week (i.e. `Monday`, `Tuesday`, etc)
 */
export const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
 * Shortened days of the week (i.e. `Mon`, `Tue`, etc)
 */
export const SHORT_DAYS = DAYS_OF_WEEK.map(x => x.substr(0, 3))

/**
 * Days of the week HTML (displaying `Mo`, `Tu`, `We`, etc)
 */
export const WEEK_DAYS_HTML = `<span>${SHORT_DAYS.map(x => x.substr(0, 2)).join('</span><span>')}</span>`

/**
 * Keydown excluded key codes
 */
export const EX_KEYS = [9, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123]

/**
 * Key name for the date picker data
 */
export const DATA_KEY = '_duDatepicker'

/**
 * Default date picker query selector class
 */
export const DEFAULT_CLASS = '.duDatepicker-input'

/**
 * Header selected date format
 */
export const SELECTED_FORMAT = 'D, mmm d'

/**
 * Default date picker configurations
 */
export const DEFAULTS = {
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
}