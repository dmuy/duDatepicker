duDatepicker
=========

This is the enhanced date picker extracted from [DCalendar plugin](https://github.com/dmuy/DCalendar).

**[DEMO](https://dmuy.github.io/duDatepicker/)**

![alt text](https://i.imgur.com/cBFuALu.png "Date picker")
![alt text](https://i.imgur.com/DHtNcEN.png "with Clear button")
![alt text](https://i.imgur.com/iBYl49d.png "Months view")
![alt text](https://i.imgur.com/wgvJYCf.png "Years view")
![alt text](https://i.imgur.com/cezrhRv.png "Date range mode")
![alt text](https://i.imgur.com/KZxDxsW.png "Dark theme")
![alt text](https://i.imgur.com/Gqt8UzL.png "Inline date picker")
![alt text](https://i.imgur.com/5YfbZm9.png "Inline range date picker")

## Installation
### NPM
Install via npm:
```
npm i @dmuy/datepicker
```

Include in your app
```javascript
import '@dmuy/datepicker/dist/duDatepicker.css'
import duDatepicker from '@dmuy/datepicker'
```

#### Old version (with jQuery dependency)
```
npm i @dmuy/jquery-datepicker
```

Include in your app
```javascript
import '@dmuy/jquery-datepicker/duDatepicker.css'
import duDatepicker from '@dmuy/jquery-datepicker'
```


### CDN
Use the following if you don't want to host the `js` and `css` files:
```
https://cdn.jsdelivr.net/gh/dmuy/duDatepicker@{version}/duDatepicker.css
https://cdn.jsdelivr.net/gh/dmuy/duDatepicker@{version}/duDatepicker.js
```
Minified version:
```
https://cdn.jsdelivr.net/gh/dmuy/duDatepicker@{version}/duDatepicker.min.css
https://cdn.jsdelivr.net/gh/dmuy/duDatepicker@{version}/duDatepicker.min.js
```
***Note: Replace `{version}` with the version you want to use.***

[Learn more about the CDN](https://www.jsdelivr.com/features#gh)

### Self Hosting
Copy `duDatepicker.css` and `duDatepicker.js` (or the minified versions `*.min.js` and `*.min.css`) in the `dist` folder and include in your app:
```html
<link rel="stylesheet" type="text/css" href="{path-to}/duDatepicker.css">
<script type="text/javascript" src="{path-to}/duDatepicker.js"></script>
```
***Note: Replace `{path-to}` with the absolute or relative path to where you copied the css and js files.***

## Options
Calling `duDatepicker()` will initialize the date picker. If `selectors` is not provided, the plugin will look for input elements with the class `duDatepicker-input`.
```javascript
duDatepicker(
  [selectors],  // optional; input element selectors; input element; Array or NodeList of input elements
  [config],     // optional; date picker configurations
  [...params]   // optional; this is used when calling date picker built-in methods which requires parameters like 'setValue'
)
```

### Default configurations
```javascript
{
  // Determines the date format
  format: 'mm/dd/yyyy',
  // Determines the date format of the 'datechanged' callback; 'format' config will be used by default
  outFormat: null,
  // Determines the color theme of the date picker
  theme: 'blue',
  // Determines if clicking the date will automatically select it; OK button will not be displayed if true
  auto: false,  
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
    // Callback function when date picker is initialized null,  
    ready: null,
    // Callback function when date picker is shown
    shown: null,
    // Callback function when date picker is hidden
    hidden: null
  },
  // internationalization
  i18n: 'en',
  // first day of the week (1 - 7; Monday - Sunday); default will be fetched from i18n.firstDay
  firstDay: null
}
```
#### Callback functions
```javascript
events: {
  /**
   * Callback function on date (or date range) selection
   * Parameters: 
   *    data       - Object contains the data of the selected date. Property starting with underscore is a Date object
   *                 Default { _date, date }
   *                 Range mode { _dateFrom, dateFrom, _dateTo, dateTo , value - formatted date range }
   *    datepicker - The date picker object instance
   */
  dateChanged(data, datepicker);

  /**
   * Callback function to for custom date range formatting (displayed on the input) upon selection
   * Parameters:
   *     from - Date object of the selected start date
   *     to   - Date object of the selected end date
   */
  onRangeFormat(from, to);

  /**
   * Callback function when date picker is initialized
   * Parameter:
   *     datepicker - The date picker object instance
   */
  ready(datepicker);

  /**
   * Callback function when date picker is shown
   */
  shown();
  
  /**
   * Callback function when date picker is hidden
   */
  hidden();
}
```

### Formatting
The default string format of the date is `mm/dd/yyyy`.
| Variable      | Code         | Output  |
| ------------- |--------------|---------|
| Month         | `m`          | 1 to 12 |
|               | `mm`         | 01 to 12|
|               | `mmm`        | Jan     |
|               | `mmmm`       | January |
| Date          | `d`          | 1       |
|               | `dd`         | 01      |
| Day           | `D`          | Mon (Monday) |
|               | `DD`         | Monday  |
| Year          | `yy`         | 16      |
|               | `yyyy`       | 2016    |

You can specify the format you want by adding a parameter on initialization:
```javascript
//Initializes the date picker and uses the specified format
duDatepicker('#datepicker', { format: 'mm-dd-yyy' });
```
The above code will output a date in this format `mm-dd-yyyy`, for example: `10-31-2016` - which is October 31, 2016.
You can specify other format you want, like `mmm dd, yyyy` which would output something like `Oct 01, 2016`.

## Usage
To create a date picker, just call `duDatepicker()`:
```javascript
//Initializes a date picker for each input element with the class name '.duDatepicker-input'
duDatepicker();

//Initializes a date picker using the specified query selector
duDatepicker('#datepicker');

//Initializes a date picker using then matched input element
duDatepicker(document.querySelector('#datepicker'));

//Initializes a date picker for each mached input element
duDatepicker(document.querySelectorAll('.datepicker'));
```

### Using configuration
During initialization, you can also specify the min and max date.
```javascript
duDatepicker('#datepicker', { minDate: 'today', maxDate: '10/30/2016' });
```
If you specify the `minDate` and/or `maxDate` and place the `data-mindate` and/or `data-maxdate` on the input element, the value of the attribute will take precedence. For example if you specify `minDate: 'today'` in the config and placed a `data-mindate="01/20/2018"`, the min date (for the input with `data-mindate` attribute) will be `01/20/2018`.

### Usable built-in methods
Below are some built-in methods you can use (assuming the date picker is already initialized).

`setValue` - Sets the (selected) value of the date picker; follow `format` configuration
```javascript
// default
duDatepicker('#datepicker', 'setValue', '08/01/2020');
// date range mode
duDatepicker('#daterange', 'setValue', '08/01/2020-08/05/2020');
```
`show` - Programmatically shows the date picker
```javascript
duDatepicker('#datepicker', 'show');
```
`hide` - Programmatically hides the date picker
```javascript
duDatepicker('#datepicker', 'hide');
```
`destroy` - Removes the date picker plugin
```javascript
duDatepicker('#datepicker', 'destroy');
```

### Min and Max
You can also specify the mininum and/or maximum date the user can select on othe date picker.
Just specify `data-mindate` and/or `data-maxdate` attributes on your `input` element. The acceptable values for these attributes are `today` or a specific date using this format: `mm/dd/yyyy`:
```html
<!-- Dates enabled ranges from the current date onwards. -->
<input type="text" id="datepicker" data-mindate="today"/>
<!-- Dates enabled ranges from October 30, 2016 onwards. -->
<input type="text" id="datepicker" data-mindate="10/30/2016"/>
<!-- Dates enabled ranges from earlier dates until current date. -->
<input type="text" id="datepicker" data-maxdate="today"/>
<!-- Dates enabled ranges from previous dates of October 10, 2016 until October 10, 2016 -->
<input type="text" id="datepicker" data-maxdate="10/30/2016"/>
```
You can also specify both the mininum and maximum date to create a specific date range acceptable:
```html
<!-- Dates enabled ranges from January 1 to February 1, 2016 -->
<input type="text" id="datepicker" data-mindate="1/1/2016" data-maxdate="2/1/2016"/>
```

### Disabling specific dates and/or days
To disable specific date(s) or date range(s) use the `disabledDates` configuration:
```javascript
// disables the specific dates on the picker
duDatepicker('#datepicker', { disabledDates: ['10/30/2016', '11/12/2016'] });

// disables dates from 10/01/2016 up to 10/15/2016 and 11/01/2016 up to 11/15/2016 on the picker
duDatepicker('#datepicker', { disabledDates: ['10/01/2016-10/15/2016', '11/01/2016-11/15/2016'] });

// mixed
duDatepicker('#datepicker', { disabledDates: ['10/30/2016', '11/01/2016-11/15/2016'] });
```
***Note: The date(s) should be written in the same format as the datepicker format (specified by the `format` configuration).***


To disable specific days of the week use the `disabledDays` configuration:
```javascript
// disables all mondays, tuesdays and wednesdays on the picker
duDatepicker('#datepicker', { disabledDays: ['Monday', 'Tue', 'We'] });
```

### Date Range
To enable date range, set the `range` configuration to `true`. The following attributes will be added automatically to the input element: `data-range-from` and `data-range-to`.
```javascript
duDatepicker('#daterange', { range: true });
```
If you are using a custom `format` configuration using a dash (`-`), make sure to change the `rangeDelim` to avoid conflict upon formatting or parsing.
```javascript
duDatepicker('#daterange', { format: 'yyyy-mm-dd', range: true, rangeDelim: '/' });
```
By default, the value display for date range will be like this `datefrom-dateto`, and will display 1 date if `dateFrom` is equal to `dateTo`. To customize the value displayed in the input, use the `events.onRangeFormat` callback function.
```javascript
duDatepicker('#daterange', { 
  format: 'mmmm d, yyyy', range: true,
  events: {
    onRangeFormat: function(from, to) {
      var fromFormat = 'mmmm d, yyyy', toFormat = 'mmmm d, yyyy';

      if (from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear()) {
        fromFormat = 'mmmm d'
        toFormat = 'd, yyyy'
      } else if (from.getFullYear() === to.getFullYear()) {
        fromFormat = 'mmmm d'
        toFormat = 'mmmm d, yyyy'
      }

      return from.getTime() === to.getTime() ?
        this.formatDate(from, 'mmmm d, yyyy') :
        [this.formatDate(from, fromFormat), this.formatDate(to, toFormat)].join('-');
    }
  }
})
```
The above code will format the value display like this: `August 15, 2020` (from & to is equal) or `August 1-5, 2020` or `August 28-September 5, 2020` or `December 30, 2020-January 2, 2021`.

#### Setting default value
Concatenate `from` and `to` with a delimiter (default is `-`) following the `format` configuration (default is `mm/dd/yyyy`)
```html
<input type="text" id="daterange" value="08/01/2020-08/05/2020">
```
Or via `value` configuration
```javascript
duDatepicker('#daterange', { range: true, value: '08/01/2020-08/05/2020' })
```

#### Using two input elements
For situations where you need to use two input elements representing a date range (from & to), here's a workaround:
```html
<input type="text" id="daterange" hidden>
<input type="text" id="range-from">
<input type="text" id="range-to">
```
```javascript
duDatepicker('#daterange', { 
  range: true, clearBtn: true, fromTarget: '#range-from', toTarget: '#range-to'
});
```
The above script uses the configurations `fromTarget` and `toTarget` to use as the display input elements.

### Internationalization
The date picker offers the following `i18n` presets: 
| Language          | Usage (object or string)          |
| ----------------- | --------------------------------- |
| English (default) | `duDatepicker.i18n.en` or `'en'`  |
| Russian           | `duDatepicker.i18n.ru` or `'ru'`  |
| Spanish           | `duDatepicker.i18n.es` or `'es'`  |
| Turkish           | `duDatepicker.i18n.tr` or `'tr'`  |
| Persian           | `duDatepicker.i18n.fa` or `'fa'`  |
| French            | `duDatepicker.i18n.fr` or `'fr'`  |
| German            | `duDatepicker.i18n.de` or `'de'`  |
| Japanese          | `duDatepicker.i18n.ja` or `'ja'`  |
| Portuguese        | `duDatepicker.i18n.pt` or `'pt'`  |
| Vietnamese        | `duDatepicker.i18n.vi` or `'vi'`  |
| Chinese           | `duDatepicker.i18n.zh` or `'zh'`  |
***Disclaimer: As of writing, preset list is based on the top 11 [Languages used on the Internet](https://en.wikipedia.org/wiki/Languages_used_on_the_Internet#Content_languages_for_websites)***

To use the above presets, you can access it via `duDatepicker.i18n` or use its code.
```javascript
// sets the language to Russian
duDatepicker('#datepicker', { i18n: 'ru' });
duDatepicker('#datepicker', { i18n: duDatepicker.i18n.ru });
```

#### Custom i18n
You can also pass your own `i18n` object with the following format:
```javascript
{
  // required; array of month names
  months: [],
  // required; array of 3-character month names
  shortMonths: [],
  // required; array of day names
  days: [],
  // required; array of 3-character day names
  shortDays: [],
  // required; array of 2-character day names; this will used as week day label on the calendar
  shorterDays: [],
  // required; first day of the week; this gets overriden by `config.firstDay`
  firstDay: 1,
  // optional; dictionary for the button texts (if not specified English text will be used)
  dict: {
    // optional; OK button text
    btnOk: '',
    // optional; CANCEL button text
    btnCancel: '',
    // optional; CLEAR button text
    btnClear: ''
  }
}
```
Or create it via [`duDatepicker.i18n.Locale()`](https://github.com/dmuy/duDatepicker/blob/master/src/i18n.js#L12)
```javascript
// custom i18n config
var months = 'gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre'.split('_'),
    days = 'domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato'.split('_');

duDatepicker('#datepicker', {
  i18n: new duDatepicker.i18n.Locale(months, null, days, null, null, 1)
});
```

### Event handling
The event `datechanged` is fired after selection of date in the date picker.
You can use this to get the new date value:
```javascript
duDatepicker('#datepicker', {format: 'mm-dd-yyy'})
// listen to event
document.querySelector('#datepicker').addEventListener('datechanged', function(e) {
  // e.data contains the same properties as the 'data' parameter in the 'dateChanged' callback
  console.log(e.data);
  // this will log the input value
  consoe.log(this.value);
})
```
If `outFormat` configuration is specified, the `date` value will be different from the input value. Otherwise, the `format` configuration will be used to format the date.

Or you can use the `events.dateChanged` callback configuration to catch the date selection changes.

### Themes
You can specify the color theme of the date picker by adding `theme` option upon initialization:
```javascript
duDatepicker('#datepicker', {theme: 'green'});
```
Or by adding a `data-theme` attribute on the input element:
```html
<input type="text" id="datepicker" data-theme="dark"/>
```
***Note: If `data-theme` attribute is used, `theme` configuration will be overridden.***

Predefined themes are: `red`, `blue`, `green`, `purple`, `indigo`,  `teal` and `dark`.
If you don't specify the theme, the default theme (`blue`) will be used.

#### Custom theme
If you want to customize the theme, just use the `src/themes/_format.scss` file and change the following:
```scss
$theme: 'yellow';             // theme name
$headerBg: #F9A825;           // header background color
$highlight: #FBC02D;          // current date color, selected date(s) highlight color
$selectedHighlight: #F57F17;  // selected highlight & buttons color
```
Then compile it using any sass compiler. Or if you are using this project, just run the npm scripts `compile-theme-css` and `minify-theme-css` (for a compressed version).

If you prefer editing a `css` file, you can edit the `dist/duDatepicker-theme.css` file.

### Remember
Comment or remove the line shown below in the css file if you already have a link to the Roboto font.
```css
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500');
```