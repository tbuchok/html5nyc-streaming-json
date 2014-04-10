var hyperquest = require('hyperquest')
  , url = require('url')
  , querystring = require('querystring')
  , results = []
;

var buffer = querystring
              .parse(url.parse(window.location.href).query)
              .buffer
            ;

var writeToDom = function(o) {
  var data = JSON.parse(o);
  var p = document.createElement('p');
  p.innerHTML = data.message || 'default';
  document.body.appendChild(p);
}

hyperquest.get({ uri: 'http://localhost:3000/json', method: 'get' })
  .on('data', function(chunk) {
    if (buffer)
      return results.push(chunk);
    var objects = chunk.split('\n');
    objects
      .filter(function(o) { return o.length > 0 })
      .forEach(writeToDom)
    ;
  })
  .on('end', function() {
    console.log('complete!');
    if (!buffer)
      return;
    results
      .join('')
      .split('\n')
      .filter(function(o) { return o.length > 0 })
      .forEach(writeToDom)
    ;
  })
;