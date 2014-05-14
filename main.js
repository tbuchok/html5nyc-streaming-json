var hyperquest = require('hyperquest')
  , url = require('url')
  , querystring = require('querystring')
  , JSON_URI = 'http://localhost:3000/json?'
  , eventCount = 0
  , objectCount = 0
  , results = []
  , query = querystring.parse(url.parse(window.location.href).query)
;

var header = query.buffer ? 'buffer ' : 'streaming ';
// <3 http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
header += Math.pow.apply(null, query.objects.split('^'))
            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          ;
header += ' objects!'
document.querySelector('#type').innerHTML = header;

var writeToDom = function(o) {
  document.querySelector('#objects').innerHTML = (objectCount += 1);
  var p = document.createElement('p');
  p.innerHTML = o.message;
  document.body.appendChild(p);
};

hyperquest(JSON_URI + querystring.stringify(query))
  .on('data', function(chunk) {
    if (query.buffer)
      return results.push(chunk);
    document.querySelector('#events').innerHTML = eventCount += 1;
    chunk
      .split('\n')
      .filter(function(o) { return o.length > 0; })
      .map(function(o) { return JSON.parse('' + o) })
      .forEach(writeToDom)
    ;
    window.scrollTo(0,document.body.scrollHeight);
  })
  .on('end', function() {
    if (!query.buffer)
      return;
    document.querySelector('#events').innerHTML = eventCount += 1;
    results
      .join('')
      .split('\n')
      .map(function(json) { return JSON.parse(json) })
      .forEach(writeToDom)
    ;
    window.scrollTo(0,document.body.scrollHeight);
  })
;