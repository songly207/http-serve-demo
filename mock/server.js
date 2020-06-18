/* eslint-disable */
let jsonServer = require('json-server');
let path = require('path');
let server = jsonServer.create();
let middlewares = jsonServer.defaults();
let fs = require('fs');
let dirNameArr = [];
let { spawn } = require('child_process');
let db = {};
let promises = [];
fs.readdir(__dirname, function (err, file) {
    if (err) {
        throw err;
    }
    file.forEach(function (list) {
        let dirname = /\.json/.exec(list);
        if (dirname) {
            dirNameArr.push(dirname.input);
        }
    });
    read();
});
function read() {
    promises = dirNameArr.map(function (list) {
        return new Promise((resolve, reject) => {
            fs.readFile(__dirname + '/' + list, 'utf-8', function (err, data) {
                if (err) {
                    throw err;
                }
                let key = list.split('.')[0];
                db[key] = JSON.parse(data);
                resolve();
            });
            fs.watch(__dirname, function (event, filename) {
                process.send('exit');
                process.exit();
            });
        });
    });
    Promise.all(promises)
    .then((arg) => {
        serverStart();
    })
    .catch((err) => {
        throw err;
    });

}
function serverStart() {
    // 也可以直接使用json文件，如：jsonServer.router('db.json')
    let router = jsonServer.router(db)
    
    // 设置默认的中间件，包括logger, static, cors（支持跨域）和no-cache（无缓存）
    server.use(middlewares);
    // 使用生成好的RESTful路由
    server.use(router)
    // 监听3000端口，启动服务器
    server.listen(3000, function () {
      console.log('JSON Server is running');
    })
}
server.on('err', (err) => {
    console.log(123123123);
});
