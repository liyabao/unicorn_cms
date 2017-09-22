#数据库设计

## `users`  用户信息表
| 字段名称       | 字段类型   | 字段含义 |
| ---------- | ------ | ---- |
| id         | int    | 用户id |
| username   | string | 用户名  |
| password   | string | 密码   |
| created_at | date   | 创建时间 |
| updated_at | date   | 更新时间 |
| deleted_at | date   | 删除时间 |

##`role` 权限信息表
| 字段名称       | 字段类型   | 字段含义 |
| ---------- | ------ | ---- |
| user_id    | int    | 用户id |
| node       | string | 权限   |
| created_at | date   | 创建时间 |
| updated_at | date   | 更新时间 |
| deleted_at | date   | 删除时间 |




##`column`   栏目表  

| 字段名称       | 字段类型   | 字段含义 |
| ---------- | ------ | ---- |
| id         | int    | 栏目id |
| name       | string | 栏目名称 |
| created_at | date   | 创建时间 |
| updated_at | date   | 更新时间 |
| deleted_at | date   | 删除时间 |
##`column_information` 	栏目信息表  

| 字段名称         | 字段类型   | 字段含义   |
| ------------ | ------ | ------ |
| column_id    | int    | 栏目信息id |
| control_name | string | 控件名称   |
| control_type | json   | 控件格式   |
| created_at   | date   | 创建时间   |
| updated_at   | date   | 更新时间   |
| deleted_at   | date   | 删除时间   |

##`data` 	数据表  

| 字段名称            | 字段类型 | 字段含义 |
| --------------- | :--- | ---- |
| id              | int  | 栏目id |
| control_content | json | 控件内容 |
| created_at      | date | 创建时间 |
| updated_at      | date | 更新时间 |
| deleted_at      | date | 删除时间 |