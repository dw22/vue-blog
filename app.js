/**
 * Created by wanrenya on 2017/2/10.
 */
const http = require('http')
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/dist',express.static(path.join(__dirname,'./dist')));

require('./server/db').connect();
app.use('/api',require('./server/api'))
app.get('/',(req,res,next)=> {
  res.sendfile(path.resolve(__dirname,'./client.html'))
})
app.get('/admin',(req,res,next)=> {
  res.sendfile(path.resolve(__dirname,'./index.html'))
})

/*404*/
app.use((req, res, next)=> {
  let err = new Error('Not Found');
  err.status = 404;
  res.send(err)
});
/*500*/
app.use((err, req, res, next)=> {
  res.status(err.status || 500);
  res.send(err)
});
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app).listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
