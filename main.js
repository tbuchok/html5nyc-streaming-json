var hyperquest = require('hyperquest')
  , url = require('url')
  , querystring = require('querystring')
  , JSON_URI = 'http://localhost:3000/json?'
  , eventCount = 0
  , objectCount = 0
  , results = []
  , query = querystring.parse(url.parse(window.location.href).query)
;

document.querySelector('#type').innerHTML = query.buffer ? 'buffer' : 'streaming';

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
  })
;