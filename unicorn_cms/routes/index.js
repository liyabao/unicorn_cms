var express = require('express');
var router = express.Router();
var session = require('express-session');
var sequelize = require('sequelize');
var user = require('../db/user');
var role = require('../db/role');
var data = require('../db/data');
var column = require('../db/column');
var column_information = require('../db/column_information');



//创建数据表
// user.sync({force:true});
// role.sync({force:true});

// column.sync({force:true});
// column_information.sync({force:true});
// data.sync({force:true});

// user.create({
//   username: "admin",
//   password: "123"
// })

// user.destroy({where:{id:3}})
// role.destroy({where:{id:'1'}});


/* GET home page. */
router.get('/', function (req, res, next) {
  session.role = '0';
  // console.log(session.username);
  res.render('login');
});

//用户登陆接口
router.post('/login', function (req, res, next) {
  user.findAll({ where: { username: req.body.username } })
    .then(function (result) {
      var data = result[0].dataValues;
      JSON.stringify(data);
      if (req.body.password == data['password']) {
        session.role = data['id'];
        session.username = data['username'];
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


// 用户修改密码接口
router.post('/update_password', function (req, res, next) {
  var old_password = req.body.old_password;  //旧密码
  var new_password = req.body.new_password;  //新密码
  if (session.role) {
    user.findOne({ username: session.username, password: old_password })
      .then(function (result) {
        if (result) {
          user.update({
            password: new_password
          }, {
              where: {
                username: session.username
              }
            })
        }
      }

      )
  }
})


//用户管理
//1.增加用户
router.post('./new_user', function (req, res, next) {
  var username = req.body.username;  //获取用户名
  var password = req.body.password;  //获取密码
  var role = req.body.role;          //获取权限
  var id;                            //定义id变量，接收新增用户的id，便利role表增加数据

  //查询所填用户是否存在， 存在：提示；不存在：添加用户
  Promise.all([user.findOne({ username: username })]).then(function (result) {
    if (result) {
      res.send('用户名已存在！');
    }
    else {
      user.create({
        username: username,
        password: password
      });

    }
  })
  //查询上面所添加用户的id，将id,权限添加到role表中
  Promise.all([user.findOne({ username: username })]).then(function (result) {
    if (result) {
      id = result[0][0]['id'];
      role.create({
        user_id: id,
        node: role
      })
    }
  })
})


//2.修改用户权限
router.post('./update_user', function (req, res, next) {
  var username = req.body.username;
  var role = req.body.role;
  //判断是否是超级管理员 如果是则修改
  if (session.username == "superadmin") {
    role.update({
      node: role
    }, {
        where: {
          username: username
        }
      })
  }
})

//3.删除用户
router.post('./delete_user', function (req, res, next) {
  var username = req.body.username;
  var userid;
  Promise.all([user.findOne({ username: username })]).then(function (result) {
    userid = result[0][0]['id'];
  })
  //判断是否是超级管理员 如果是则修改
  if (session.username == "superadmin") {
    role.destroy({ where: { user_id: userid } });
    user.destroy({ where: { username: username } });

  }
})

//查看栏目信息
router.get('/column', function (req, res, next) {
  var json = [];
  if (session.role != 0) {
    Promise.all([column.findAll()]).then(function (result) {
      for (var i = 0; i < result[0].length; i++) {
        console.log(result[0][i]['name']);
        json.push(result[0][i]['name'])
      }
      res.send(json);
    });

  }
  else {
    res.render('login');
  }
})

//查看栏目控件信息
router.post('/column', function (req, res, next) {
  var aaid = "1";//前端返回控件id
  var json = [];
  if (session.role != 0) {
    Promise.all([column_information.findAll({ where: { column_id: aaid } })])
      .then(function (elem) {
        json.push(elem[0][0]["control_type"]);
        res.send(json);
      })
  } else {
    res.render('login');
  }
})

//增加栏目
router.post('/add_column', function (req, res, next) {
  var name = req.body.name;
  column.create({
    name: name
  })
})

// 修改栏目
router.post('/update_column', function (req, res, next) {
  var old_name = req.body.old_name;
  var name = req.body.name;
  column.update({
    name: old_name
  }, {
      where: {
        name: name
      }
    })
})


//删除栏目
router.post('/delete_column', function (req, res, next) {
  var name = req.body.name;

  column.destroy({ where: { name: name } });
})

//添加控件
router.post('/add_control', function (req, res, next) {
  var name = req.body.name;  //从前端获取栏目名
  var control_name = req.body.control_name; //从前端获取控件名
  var type = req.body.type;//从前端获取控件内容；
  var column_id; // 栏目id

  //获取栏目id 赋值给column_id
  Promise.all([column.findOne({ name: name })]).then(function (result) {
    column_id = result[0][0]['id'];
  })

  column_information.create({
    column_id: column_id,
    control_name: control_name,
    control_type: type
  })
})


//修改控件
router.post('/update_control', function (req, res, next) {
  var name = req.body.name;
  var control_name = req.body.control_name; //从前端获取控件名
  var type = req.body.type;//从前端获取控件内容；
  var id;
  Promise.all([column.findOne({ name: name })]).then(function (result) {
    id = result[0][0]['id'];
  })
  Promise.all([column_information.destroy({ column_id: id })]);
  Promise.all([column_information.create({
    column_id:id,
    control_name:control_name,
    control_type:type
  })])
})


// 删除控件
router.post('/delete_control',function(req,res,next){
  var name= req.body.control_name;
  column_information.destroy({control_name:name});
})


//显示控件页面
router.get('/control_show',function(req,res,next){
  if(session.role!=0)
  {
  var json=[];
  Promise.all([column.findAll()]).then(function(result){
    json.push(result[0][0]);
  })
  Promise.all([column_information.findAll()]).then(function(result){
    json.push(result[0][0]);
    
    res.send(json);
  })
  // Promise.all([data.findAll()]).then(function(result){
  //   json.push(result[0][0]);
  // })

}
else{
  res.render('login');
}
})
// 添加数据
router.post('/add_data',function(req,res,next){
 var id=req.body.column_information_id;
 var json=[];

 data.create({
   column_information_id:id,
   control_content:json
 })
})

//修改数据
router.post('/update_data',function(req,res,next){
  var id=req.body.column_information_id;
  var json=[];

  data.update({
    control_content:json
  },{
    where:{
      column_information_id:id
    }
  })
})

// 删除数据
router.post('/delete_data',function(req,res,next){
  var id=req.body.column_information_id;

  data.destroy({column_information_id:id});
})

//显示页面
router.get('/show',function(req,res,next){
  if(session.role!=0)
  {
    var json=[];
    Promise.all([column.findAll()]).then(function(result){
      json.push(result[0][0]);
    })
    Promise.all([column_information.findAll()]).then(function(result){
      json.push(result[0][0]);
    })
    Promise.all([data.findAll()]).then(function(result){
      json.push(result[0][0]);
    })
  
    res.send(json);
  }
  else{
    res.render('login');
  }
  
})
module.exports = router;
