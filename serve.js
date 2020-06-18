// step 1.因为node将功能都分成的不同的模块，每个模块执行特性的功能，所以我们创建服务器之前需要引入'http'模块。引入http的原因在于：浏览器和服务器之间需要通过http协议进行通信。
// Node.js 中的 HTTP 接口被设计成支持协议的许多特性。 比如，大块编码的消息。 这些接口不缓冲完整的请求或响应，用户能够以流的形式处理数据。为了支持各种可能的 HTTP 应用，Node.js 的 HTTP API 是非常底层的。 它只涉及流处理与消息解析。 它把一个消息解析成消息头和消息主体，但不解析具体的消息头或消息主体。

var http = require('http')
// 引入文件操作模块
var fs = require('fs')
var path = require('path')
console.log(path.resolve('./') === __dirname)
// 2.创建服务器对象，http使用createServer([Option][,requestListener])来返回一个server对象，createServer([Option][, requestListener])提供了两个可选参数，requestListener是一个自动添加到'request'事件的方法。
var server = http.createServer()

// server.all('*', function(req, res, next) {
//     //设置允许跨域的域名，*代表允许任意域名跨域
//     res.header('Access-Control-Allow-Origin', '*')
//     //允许的header类型
//     res.header('Access-Control-Allow-Headers', 'content-type')
//     //跨域允许的请求方式
//     res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS')
//     if (req.method.toLowerCase() == 'options') res.send(200)
//     //让options尝试请求快速结束
//     else next()
// })

// 3.注册一个接收请求的事件，等待浏览器发送请求，事件中的回调函数获得请求信息后触发。
// 回调函数中有两个行参：第一个行参用于接收请求报文对象，第二个行参用于接收响应报文对象。
server.on('request', function (req, res) {
    console.log(req.url)
    // 判断请求的url是否为'index.html',如果为index,则读取服务器端index.html中的内容,并返回
    if (req.url === '/index.html') {
      // console.log(req.url);
      // fs的readFlie提供的三个参数,第一个参数为服务器文件的路径,
      // 第二个参数为可选参数,用于设置读取文件的编码方式,
      // 第三个参数为读取文件的回调函数,用于对读取的文件内容后做后续处理
      fs.readFile('./index.html', 'utf8', function (err, data) {
        // 对文件操作的回调函数中,首先需要处理可能发生的异常,才能进行后续的操作
        if (err) {
          console.log('read error')
          return
        }
        res.end(data)
        // 上面  res.end(data);等价于 res.write(data); 
        // res.end(); 将结果写入响应报文对象,写入之后,关闭。
        // 如果写入少量数据,可以使用res.end(data);
      })

    // link中引入的css文件和img文件,请求的路径标识中都包含'public'
    } else if (req.url.indexOf('/public') != -1) {
      // 因为req.url的路径为绝对定位/public...,而读取服务器public文件夹的路径为当前路径,需要拼接"."
      fs.readFile('.' + req.url, function (err, data) {
        // 对文件操作的回调函数中,首先需要处理可能发生的异常,才能进行后续的操作
        if (err) {
          console.log('read error')
          return
        }
        res.end(data)
        // 上面  res.end(data);等价于 res.write(data);res.end();
        // 将结果写入响应报文对象,写入之后,关闭。如果写入少量数据,可以使用res.end(data);
      })
    // 请求接口
    } else if (req.url.indexOf('/api') != -1) {
        let jsonName = req.url.split('/').join('');
        // http://localhost:3000/api/apply/add  可以test
        console.log(jsonName)
      fs.readFile('./mock/' + jsonName +'.json', function (err, data) {
        // 对文件操作的回调函数中,首先需要处理可能发生的异常,才能进行后续的操作
        if (err) {
          console.log('read error')
          return
        }
        res.end(data)
        // 上面  res.end(data);等价于 res.write(data);res.end();
        // 将结果写入响应报文对象,写入之后,关闭。如果写入少量数据,可以使用res.end(data);
      })
    } else {
      res.end('404')
    }
  }),
  //  4.开启HTTP服务器监听连接，Server 可以是一个 TCP 或者 一个 IPC server，这取决于它监听什么。
  
/* 我们使用server提供的 server.listen([port][, host][, backlog][, callback])，它用于TCP类型的服务。

server.listen([port][, host][, backlog][, callback])提供了四个可选参数：

 [port]为自定义的端口号，如果port省略或是0，系统会随意分配一个在'listening'事件触发后能被server.address().port检索的无用端口

 [host]为定义的IP，如果没有定义，则自动默认为本地host，即127.0.0.1

 [backlog]:一个监听日志

 [callback]:监听后的回调函数,监听开启后所要执行的操作
*/

server.listen(3000,'127.0.0.1', function () {
    console.log('serve in running on http://localhost:3000');

    let child_process = require('child_process')
    url = 'http://localhost:3000/index.html';
    //'http://' + youUrl;

    if (process.platform == 'wind32') {
        cmd = 'start "%ProgramFiles%\Internet Explorer\iexplore.exe"';
    } else if (process.platform == 'linux') {
        cmd = 'xdg-open';
    } else if (process.platform == 'darwin') {
        cmd = 'open';
    }
    child_process.exec(`${cmd} "${url}"`);
});


//   function upload (filename) {
//     let newArr = filename.split('/')
//     newArr.shift()
//     let newPath = newArr.join('/')
//     if (newPath == 'index.html') {
//       newPath = 'page/usercenter/index.html'
//     }
//     let formData = {
//       file: fs.createReadStream(__dirname + '/' + filename),
//       to: '/home/rim/products/tomcat/tomcat_edw/webapps/ROOT/' + newPath
//     }
//     request.post(
//       {
//         url: 'http://cp01-rim-selfcare-ris04.cp01.baidu.com:8999/receiver',
//         formData: formData
//         // eslint-disable-next-line no-unused-vars
//       },
//       function optionalCallback (err, httpResponse, body) {
//         if (err) {
//           // eslint-disable-next-line no-console
//           return console.error('upload failed:', err)
//         }
//         // eslint-disable-next-line no-console
//         console.log('Upload successful!  Server responded with:', formData.to)
//       }
//     )
//   },

//   function readFile (path) {
//     console.log(__dirname)
//     fs.readdir(__dirname + '/' + path, function (err, file) {
//       if (err) {
//         throw err
//       }
//       file.forEach(function (list) {
//         let newPath = ''
//         newPath = path + '/' + list
//         if (fs.lstatSync(__dirname + '/' + path + '/' + list).isDirectory()) {
//           readFile(newPath)
//         } else {
//           // upload(newPath);
//         }
//       })
//     })
//   },
//   readFile('mock')

