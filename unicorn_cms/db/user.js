'use strict'
var Sequelize = require('sequelize');
var sequelize = require('../model/connect');
var user = sequelize.define('user', {
    id: { type: Sequelize.INTEGER, primaryKey: true,unique:true,autoIncrement:true},
    username: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    
},
    {
        freezeTableName: true,
        timestamps: true,
        // tableName:'user',
        paranoid: true, //使用逻辑删除，调用destroy()时设置一个deletedAt列
        underscored:true
    })
module.exports = user;