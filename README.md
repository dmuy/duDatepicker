## How to use
Make sure you include the jQuery library first.
Include `duDatepicker.css` and `duDatepicker.js` in your html file:
```html
<link rel="stylesheet" type="text/css" href="duDatepicker.css">
<script type="text/javascript" src="duDatepicker.js"></script>
```

Add a reference on your `input` element for later use:
```html
<input type="text" id="datepicker"/>
```

Then add this piece of code in your `script` tag:
```javascript
$(document).ready(function(){
  $('#datepicker').duDatepicker(); //Initializes the date picker
});
```

### CDN
Use the following if you don't want to host the `js` and `css` files:
```
https://cdn.jsdelivr.net/gh/dmuy/duDatepicker/duDatepicker.css
https://cdn.jsdelivr.net/gh/dmuy/duDatepicker/duDatepicker.js
```
Minified version:
```
https://cdn.jsdelivr.net/gh/dmuy/duDatepicker/duDatepicker.min.css
https://cdn.jsdelivr.net/gh/dmuy/duDatepicker/duDatepicker.min.js
```

[Learn more about the CDN](https://www.jsdelivr.com/features#gh)

### Remember
Comment or remove the line shown below in the css file if you already have a link to the Roboto font.
```css
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500');
```

## Formatting

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

The default string format of the date is `mm/dd/yyyy`. You can specify the format you want by adding a parameter on initialization:
```javascript
$('#datepicker').duDatepicker({format: 'mm-dd-yyy'}); //Initializes the date picker and uses the specified format
```
The above code will output a date in this format `mm-dd-yyyy`, for example: `10-31-2016` - which is October 31, 2016.
You can specify other format you want, like `mmm dd, yyyy` which would output something like `Oct 01, 2016`.

## Min and Max
You can also specify the mininum and/or maximum date the user can select on othe date picker.
Just specify `data-mindate` and/or `data-maxdate` attributes on your `input` element. The acceptable values for these attributes are `today` or a specific date using this format: `mm/dd/yyyy`:
```html
<input type="text" id="datepicker" data-mindate="today"/>       //Dates enabled ranges from the current date onwards.
<input type="text" id="datepicker" data-mindate="10/30/2016"/>  //Dates enabled ranges from October 30, 2016 onwards.
<input type="text" id="datepicker" data-maxdate="today"/>       //Dates enabled ranges from earlier dates until current date.
<input type="text" id="datepicker" data-maxdate="10/30/2016"/>  //Dates enabled ranges from previous dates of October 10, 2016 until October 10, 2016
```
You can also specify both the mininum and maximum date to create a specific date range acceptable:
```html
<input type="text" id="datepicker" data-mindate="1/1/2016" data-maxdate="2/1/2016"/>  //Dates enabled ranges from January 1 to February 1, 2016
```
### Using configuration
During initialization, you can also specify the min and max date.
```javascript
$('#datepicker').duDatepicker({ minDate: 'today', maxDate: '10/30/2016' });
```
If you specify the `minDate` and/or `maxDate` and place the `data-mindate` and/or `data-maxdate` on the input element, the value of the attribute will take precedence. For example if you specify `minDate: 'today'` in the config and placed a `data-mindate="01/20/2018"`, the min date (for the input with `data-mindate` attribute) will be `01/20/2018`.

## Disabling specific dates and/or days
To disable specific date(s) or date range(s) use the `disabledDates` configuration:
```javascript
// specific dates
$('#datepicker').duDatepicker({ disabledDates: ['10/30/2016', '11/12/2016'] }); // disables the specific dates on the picker
// date ranges
$('#datepicker').duDatepicker({ disabledDates: ['10/01/2016-10/15/2016', '11/01/2016-11/15/2016'] }); // disables dates from 10/01/2016 up to 10/15/2016 and 11/01/2016 up to 11/15/2016 on the picker
// mixed
$('#datepicker').duDatepicker({ disabledDates: ['10/30/2016', '11/01/2016-11/15/2016'] });
```
***Note: The date(s) should be written in the same format as the datepicker format (specified by the `format` configuration).***


To disable specific days of the week use the `disabledDays` configuration:
```javascript
$('#datepicker').duDatepicker({ disabledDays: ['Monday', 'Tue', 'We'] }); // disables all mondays, tuesdays and wednesdays on the picker
```

## Range From and To
For situations where you have two inputs representing a date range (from & to), you can restrict the minimum and maximum date based on the values of the input elements - the maximum allowed date for date from (input element) is the value of date to (input element), and the minimum allowed date for date to is the value of the date from input.

You can do this by adding the `data-rangefrom` and/or `data-rangeto` attributes. The value for these attributes is the id reference of the input element.

Example:
```html
<input type="text" id="datefrom" data-rangeto="#dateto"/>   //Maximum enabled date is <= value of #dateto
<input type="text" id="dateto" data-rangefrom="#datefrom" data-maxdate="today"/>  //Minimum enabled date is >= value of #datefrom
```
Or
```javascript
$('#datefrom').duDatepicker({ rangeTo: '#dateto'});
$('#dateto').duDatepicker({ rangeFrom: '#datefrom'});
```

## Event
The event `datechanged` is fired after selection of date in the date picker.
You can use this to get the new date value:
```javascript
$('#datepicker').duDatepicker({format: 'mm-dd-yyy'}).on('datechanged', function(e){
  alert(e.date);
});
```
The above code will alert the new date selected. For example: `01-16-2016` or January 16, 2016

## Themes
You can specify the color theme of the date picker by adding `theme` option upon initialization:
```javascript
$('#datepicker').duDatepicker({theme: 'green'});
```
Predefined themes are: `red`,`blue` *(default)*, `green`, `purple`, `indigo` and `teal`.
If you don't specify the theme to use or specify a theme which isn't there, the default theme will be used.

## Options
Below is the default configuration of the date picker.
```javascript
{
  format: 'mm/dd/yyyy', // Determines the date format
  theme: 'blue',        // Determines the color theme of the date picker
  auto: false,          // Determines if clicking the date will automatically select it; OK button will not be displayed if true
  clearBtn: false,      // Determines if Clear button is displayed
  cancelBtn: false,     // Determines if Cancel button is displayed
  overlayClose: true    // Determines if clicking the overlay will close the date picker
  disabledDates: [],    // Array of dates to be disabled (format should be the same as the specified format)
  disabledDays: []      // Array of days of the week to be disabled (i.e. Monday, Tuesday, Mon, Tue, Mo, Tu)
}
```