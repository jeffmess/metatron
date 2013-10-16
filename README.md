# metatron [![Build Status](https://secure.travis-ci.org/jeffmess/metatron.png?branch=master)](http://travis-ci.org/jeffmess/metatron)

Metatron fetches data from a url.

## Getting Started
Install the module with: `npm install metatron`

```javascript
var metatron = require('metatron');
metatron.validateUrl("www.youtube.com"); // true
metatron.validateUrl("s3://amazon.com"); // true

metatron.stringContainsUrl("This string contains a url: youtube.com"); // true
metatron.stringContainsUrl("This string does not contain a url"); // false

metatron.convertString({text: "This string contains a url: youtube.com"});
//"This string contains a url: <a href='youtube.com' target=''>youtube.com</a>"

metatron.convertString({text: "This string contains 2 urls: youtube.com and http://amazon.com/login", target: "_blank"});
//"This string contains 2 urls: <a href='http://youtube.com' target='_blank'>youtube.com</a> and <a href='http://amazon.com/login' target='_blank'>http://amazon.com/login</a>")
```

## License
Copyright (c) 2013 Jeffrey van Aswegen. Licensed under the MIT license.
