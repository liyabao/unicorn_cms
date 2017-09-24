var express = require('express');
var router = express.Router();
var session = require('express-session');
var user = require('../db/user');
var role = require('../db/role');
var data = require('../db/data');
var column = require('../db/column');
var column_information = require('../db/column_information');
// session.username="123";
/* GET home page. */
router.get('/', function (req, res, next) {
  session.role='0';
  // console.log(session.username);
  res.render('login');
});

//用户登陆接口
router.post('/login', function (req, res, next) {
  user.findAll({ where: { username: req.body.username } }).then(function (result) {
    var data = result[0].dataValues;
    JSON.stringify(data);
    if (req.body.password == data['password']) {
      session.role = data['id'];
      console.log(session.role);
      res.render('index', { title: 'express' });

    }
    else
      res.send("用户名或密码错误!");
  });
})

//用户登出接口
router.post('/login_out', function (req, res, next) {
  console.log(session.role);
  // req.session.destroy();
  session.role = '0';
  res.render('login');
})

//查看栏目信息
router.get('/column', function (req, res, next) {
  var json=[];
  console.log(session.role);
  if (session.role != 0) {
    Promise.all([column.findAll()]).then(function(result){
      for(var i=0;i<result[0].length;i++){
        json.push(result[0][i]['name'])
      }
      
      
    })

    Promise.all([])
    res.send(json);
  }
  else{
    res.send('请先登录');
  }
})


module.exports = router;
