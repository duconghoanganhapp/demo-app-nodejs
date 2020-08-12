 import app from './app';
 import 'dotenv/config';
// import https from "https";
// import pem from 'pem';
 import http from 'http';
 import socketIo from 'socket.io';
// // Define PORT
// let port = process.env.PORT || 3000;

// // Create server
// const server = https.createServer(app);
// pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {    
//     if (err) {
//       throw err
//     }
//     https.createServer({
//         key: keys.serviceKey,
//         cert: keys.certificate
//      }, app).listen(8005, () => {
//         console.log(`Server started on port ${port}`);
//      });
// });
// const io = socketIo(server);
// io.on('connection', (socket) => {
//   console.log(socket.id);
// });
import * as Message from './models/mysql/Messages';
//  import moment from 'moment';
 import moment from 'moment-timezone';
const server = http.createServer(app);
server.listen(3000);
const io = socketIo(server);
app.get('/', (req,res) => {
  return res.render('index');
});
io.on('connection', (socket) => {
   socket.on('send', async (data) => {
      let messInsert = await Message.insert(1, data.idUser, data.message);
      let date = new Date();
      data.date = `${date.getHours()}giờ ${date.getMinutes()} phút ${date.getSeconds()} giây`;
      if (!messInsert) socket.emit('alert-fail', 'there is have problem');
      io.sockets.emit('alert-all', messInsert);
   });
});
var hcm = moment(Date.now()).tz('Asia/Ho_Chi_Minh').format('YYYY-MM-DD hh:mm:ss');

console.log(hcm);
