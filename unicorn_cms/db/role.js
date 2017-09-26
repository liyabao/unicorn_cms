'use strict'
// var user=require('./user');
var Sequelize = require('sequelize');
var sequelize = require('../model/connect');
var user = sequelize.define('role', {
    id: { type: Sequelize.INTEGER, primaryKey: true,unique:true,autoIncrement:true},
    user_id:{type:Sequelize.INTEGER},
    node: { type: Sequelize.STRING }
},
    {
        freezeTableName: true,
        timestamps: true,
        paranoid: true, //使用逻辑删除，调用destroy()时设置一个deletedAt列
        underscored:true
    })
module.exports = user;