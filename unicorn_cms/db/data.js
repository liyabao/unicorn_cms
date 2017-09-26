'use strict'

var Sequelize=require('sequelize');
var sequelize=require('../model/connect');
var user=sequelize.define('data',{
    id: { type: Sequelize.INTEGER, primaryKey: true,unique:true,autoIncrement:true},
    column_information_id:{type:Sequelize.INTEGER},
    control_content:{type:Sequelize.JSON}
},
{
    freezeTableName: true,
    timestamps: true,
    paranoid: true, //使用逻辑删除，调用destroy()时设置一个deletedAt列
    underscored:true
})
module.exports=user;