var connect = require('connect')
  , http = require('http')
  , url = require('url')
  , querystring = require('querystring')
  , randomWords = require('random-words')
;

var app = connect()
  .use(connect.favicon())
  .use(function(req, res, next) {
    if (/\/clear/.test(req.url))
      return res.end('clear.');
    next();
  })
  .use(function(req, res, next) {
    req.query = querystring.parse(url.parse(req.url).query);
    next();
  })
  .use(function(req, res, next) {
    if (!/\/json/.test(req.url))
      return next();
    var pow = (req.query.objects || '10^3').split('^')
      , count = 0
    ;
    var sendObjects = function() {
      for(var i = 0; i < 1000; i++) {
        var value = randomWords({ exactly: 4, join: ' ' });
        var message = '';
        if (count > 0)
          message += '\n';
        count += 1;
        message += JSON.stringify({ message: value });
        res.write(message);
      }
      if (count < Math.pow(pow[0], pow[1]))
        return setImmediate(sendObjects);
      res.end();
    }
    sendObjects();
  })
  .use(connect.static('public'))
  .use(connect.directory('public'))
;

http.createServer(app).listen(3000);
console.log('listening on 3000');