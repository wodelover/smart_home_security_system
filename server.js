/*
    file: server.js
    note: 此文件用于接收硬件使用HTTP协议通过POST方式发送的JSON数据
*/

// 导入express框架模块 
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* 跨域设置 */
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*'); //访问控制允许来源：所有
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); //访问控制允许报头 X-Requested-With: xhr请求
    res.header('Access-Control-Allow-Metheds', 'PUT, POST, GET, DELETE, OPTIONS'); //访问控制允许方法
    // res.header('X-Powered-By', 'nodejs'); //自定义头信息，表示服务端用nodejs
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

/* 定义系统用到的所有的中间变量 */
var temperature = "0"; // 温度
var humidity = "0"; // 湿度
var fireStatus = true; // 是否有可燃气体
var homeStatus = true; // 是否有人进入
var lightStatus = true; // 照明是否打开
var changeAirStatus = true; // 是否在打开换气

var hardLightStatus = 0; // 硬件照明是否打开
var hardChangeAirStatus = 0; // 硬件是否在打开换气

/*
    url:  127.0.0.1:8080/roomStatus
    note: 硬件数据回传接口地址，数据返回也通过此接口地址
*/
app.post('/roomStatus', function(req, res) {

    // 定义接收数据缓冲区
    var data = '';

    // 连接数据接收完成信号
    req.on('end', function() {
        // 接收到硬件的完整数据(注意最外层应该使用单引号): {"temp":22.00,"humidity":45,"home":0,"fire":0,"air":0,"light":0}
        var temp = JSON.parse(data);
        // console.log(temp);
        temperature = String(temp['temp']);
        humidity = String(temp['humidity']);
        fireStatus = Boolean(temp['fire']);
        homeStatus = Boolean(temp['home']);
        lightStatus = Boolean(temp['light']);
        changeAirStatus = Boolean(temp['air']);

        // 定义返回的数据包 {"L":1,"A":0,"K":1}
        var res_data = '{"L":' + hardLightStatus.toString(); // 是否开灯
        res_data += ',"A":' + hardChangeAirStatus.toString() + '}'; // 是否排气
        res.send(res_data);
    });

    // 连接有新数据到来信号
    req.on('data', function(chunk) {
        data += chunk;
    });
});

/*
    url:  127.0.0.1:8080/login
    note: 网页首页登陆接口
*/
app.post('/login', urlencodedParser, function(req, res) {

    // 获取用户名和密码
    var request = {
        "username": req.body.username,
        "password": req.body.password
    };

    // 返回是否验证成功
    var response = {
        "loginStatus": true
    }

    if (request.username == 'admin' && request.password == '123') {
        response.loginStatus = true;
    } else {
        response.loginStatus = false;
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    // 把json对象转换为json字符串
    res.end(JSON.stringify(response));
});

/**
 * url: 127.0.0.1:8000/light
 * note: 打开照明接口
 */
app.post('/light', urlencodedParser, function(req, res) {
    if ('true' == req.body.lightStatus.toString()) {
        hardLightStatus = 1;
    } else {
        hardLightStatus = 0;
    }
    var response = {
        "lightStatus": hardLightStatus
    }
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(response));
});

/**
 * url: 127.0.0.1:8000/air
 * note: 打开换气接口
 */
app.post('/air', urlencodedParser, function(req, res) {
    if ('true' == req.body.airStatus.toString()) {
        hardChangeAirStatus = 1;
    } else {
        hardChangeAirStatus = 0;
    }
    var response = {
        "airStatus": hardChangeAirStatus
    }
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify(response));
});

/**
 * url: 127.0.0.1:8000/homeDefaultStatus
 * note: 获取默认状态
 */
app.get('/homeDefaultStatus', urlencodedParser, function(req, res) {
    var response = {
            "temp": temperature,
            "humidity": humidity,
            'fire': fireStatus,
            'home': homeStatus
        }
        // console.log(response);
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    // 把json对象转换为json字符串
    res.end(JSON.stringify(response));
});

/**
 * url: 127.0.0.1:8000/controlDefaultStatus
 * note: 获取默认控制信息状态
 */
app.get('/controlDefaultStatus', urlencodedParser, function(req, res) {
    var response = {
        "light": lightStatus,
        'changeAir': changeAirStatus
    }
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    // 把json对象转换为json字符串
    res.end(JSON.stringify(response));
});

// 开启服务器监听,这里不能填写IP地址,否则无法接收到硬件的数据
var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("listen at:%s %s", host, port);
});