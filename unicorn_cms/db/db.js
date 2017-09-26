'use strict'

var Sequelize = require('sequelize');
var sequelize = require('../model/connect');



var user = sequelize.define('user', {
    id: { type: Sequelize.UUID, primaryKey: true },
    username: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING }
},
    {
        freezeTableName: true,
        timestamps: true,
        paranoid: false //使用逻辑删除，调用destroy()时设置一个deletedAt列

    })

user.sync().then(() => {
    return user.create();
})



var user = sequelize.define('role', {
    id: { type: Sequelize.UUID, primaryKey: true },
    user_id: { type: Sequelize.INTEGER },
    node: { type: Sequelize.STRING }
},
    {
        freezeTableName: true,
        timestamps: true,
        paranoid: false //使用逻辑删除，调用destroy()时设置一个deletedAt列

    })



var user = sequelize.define('data', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    control_content: { type: Sequelize.STRING }
},
    {
        freezeTableName: true,
        timestamps: true,
        paranoid: false //使用逻辑删除，调用destroy()时设置一个deletedAt列

    })

module.exports = user;