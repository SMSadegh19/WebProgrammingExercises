var express = require('express')
var app = express()
var crypto = require('crypto');
const redis = require("redis");

const client = redis.createClient({
  host: 'redis-server',
  port: 6379
});

client.on('connect', function() {
  console.log('Connected!');
});


let MIN_LENGTH = 8

function check(string){
  if (string.length < MIN_LENGTH)
    return [false, "String length should be >= " + MIN_LENGTH]
  return [true, "OK"];
}



app.post('/node/sha256', function(req, res) {
    var string = req.query.string
    var check_status = check(string);
    result = {}
   
    if (!check_status[0]){
      result['sha256'] = ''
    }else{
      var hash = crypto.createHash('sha256').update(string).digest('hex');
      result['sha256'] = hash
      client.set(hash, string);
    }
    result['status'] = check_status[0]
    result['status_str'] = check_status[1]
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
})


app.get('/node/ping', function(req, res) {
  console.log(`${process.env.HOSTNAME}`)
  res.end('pong');   
})

app.get('/node/sha256', function(req, res) {
  var sha256 = req.query.sha256
  result = {}
  try {
        client.get(sha256, async (err, jobs) => {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            if (jobs) {
              res.end(JSON.stringify({
                'found': true,
                'string': jobs
              }));     
            } else {
              res.end(JSON.stringify({
                'found': false,
                'string': ''
              }));     
            }
        });
    } catch(err) {
        res.status(500).send({message: err.message});
    }

  
})

app.get('*', function(req, res){
  res.send('<html><head><title>404 Not Found</title></head><body><center><h1>404 Not Found</h1></center><hr><center>nodejs</center></body></html>', 404);
});

var server = app.listen(5000, function () {
  var host = server.address().address
  var port = server.address().port
})