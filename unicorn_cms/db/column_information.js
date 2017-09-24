'use strict'

var Sequelize=require('sequelize');
var sequelize=require('../model/connect');
var user=sequelize.define('user',{
    column_id:{type:Sequelize.INTEGER,primaryKey:true},
    control_name:{type:Sequelize.STRING},
    control_type:{type:Sequelize.JSON},
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