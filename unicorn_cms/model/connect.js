var express = require('express');
var Sequelize = require('sequelize');
var router = express.Router();
var sequelize = new Sequelize("unicorn_cms", "postgres", "lyb123", {

	host: 'localhost',
	dialect: 'postgres',
	port: '5432',
	native: false,
	omitNull: false,
	pool: {
		"max": 5,
		"min": 0,
		"idle": 10000
	},
	quoteIdentifiers:true  //设置为false时postgres中会使表名和属性大小写不敏感，并跳过双引号
});
// var User = sequelize.define('column', {
// 	name: "postgr1s",
// 	password: "lyb123",
// },
// 	{
// 		freezeTableName: true,
// 		tableName: "column"
// 		// 
// 		// timestamps: true

// 	});
module.exports=sequelize;
