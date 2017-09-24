'use strict'

var Sequelize=require('sequelize');
var sequelize=require('../model/connect');
var user=sequelize.define('user',{
    id:{type:Sequelize.INTEGER,primaryKey:true},
    username:{type:Sequelize.STRING},
    password:{type:Sequelize.STRING},
    created_at:{type:Sequelize.DATE},
    updated_at:{type:Sequelize.DATE},
    deleted_at:{type:Sequelize.DATE}
},
{
    freezeTableName:true,
    // tableName:'user',
    timestamps:false

})
module.exports=user;