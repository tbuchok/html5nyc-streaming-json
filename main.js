var hyperquest = require('hyperquest')
  , url = require('url')
  , querystring = require('querystring')
  , JSON_URI = 'http://localhost:3000/json?'
  , results = []
;

var query = querystring.parse(url.parse(window.location.href).query);

var writeToDom = function(o) {
  var data = JSON.parse(o);
  var p = document.createElement('p');
  p.innerHTML = data.message || 'default';
  document.body.appendChild(p);
};

hyperquest.get({ uri: JSON_URI + querystring.stringify(query), method: 'get' })
  .on('data', function(chunk) {
    if (query.buffer)
      return results.push(chunk);
    var objects = chunk.split('\n');
    objects
      .filter(function(o) { return o.length > 0 })
      .forEach(writeToDom)
    ;
  })
  .on('end', function() {
    console.log('complete!');
    if (!query.buffer)
      return;
    results
      .join('')
      .split('\n')
      .filter(function(o) { return o.length > 0 })
      .forEach(writeToDom)
    ;
  })
;