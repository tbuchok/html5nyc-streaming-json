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
    var pow = (req.query.objects || '10^3').split('^');
    for(var i = 0; i < Math.pow(pow[0], pow[1]); i++) {
      var value = randomWords({ exactly: 4, join: ' ' });
      var message = '';
      if (i > 0)
        message += '\n';
      message += JSON.stringify({ message: value });
      res.write(message);
    }
    res.end();
  })
  .use(connect.static('public'))
  .use(connect.directory('public'))
;

http.createServer(app).listen(3000);
console.log('listening on 3000');