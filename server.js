var connect = require('connect')
  , http = require('http')
  , randomWords = require('random-words')
;

var app = connect()
  .use(connect.favicon())
  .use(function(req, res, next) {
    if (!/\/json/.test(req.url))
      return next();
    var results = {}
    for(var i = 0; i < Math.pow(10, 5); i++) {
      var value = randomWords({ exactly: 4, join: ' ' });
      res.write(JSON.stringify({ message: value }) + '\n')
    }
    res.end();
  })
  .use(connect.static('public'))
  .use(connect.directory('public'))
;

http.createServer(app).listen(3000);
console.log('listening on 3000');