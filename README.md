# nodejs搭建 MVC  
MVC全名是Model View Controller，是 **<font color=red>模型(model)</font>**－**<font color=red>视图(view)</font>**－**<font color=red>控制器(controller)</font>** 的缩写，一种软件设计典范，用一种业务逻辑、数据、界面显示分离的方法组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。MVC被独特的发展起来用于映射传统的输入、处理和输出功能在一个逻辑的图形化用户界面的结构中。  
![mvc p](mvc.jpg)
## 运用模块
1.express  
2.sequelize
## 说明
### Model 
node提供的模块,中间件,在用express创建项目时,产生node_modules即表示M层,即Model
模块如jade,mongoose,morgan,body-parser等等   
在这里使用sequelize操作数据库。
### View 
express生成项目时会产生views,即前端
### Controller 
即视图向控制器发出请求,由控制器选择相应的模型来处理
模型返回的结果给控制器,由控制器来选择合适的视图,生成界面给用户
如通过res.render来渲染jade文件
