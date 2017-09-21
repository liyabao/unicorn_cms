#数据库设计

#`hangye`   栏目表 
|	字段名称	|	字段类型	|	字段含义	|  
|	id		|	int		|	栏目id	|  
|	hangye	|	string	|	栏目名称	|

#`set_table` 	栏目信息表  
|	字段名称	|	字段类型	|	字段含义	|  
| hangye_id	|	int		| 栏目信息id	|  
|	name	|	string	|			|  
|text\_type	|	json	|	控件内容	|  

#`data` 	数据表  
|	字段名称	|	字段类型	|	字段含义	|  