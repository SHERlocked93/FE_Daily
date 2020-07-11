#进阶9：联合查询
/*
说明：当查询结果来自于多张表，但多张表之间没有关联，这个时候往往使用联合查询，也称为union查询

语法：
select 查询列表 from 表1  where 筛选条件  
	union
select 查询列表 from 表2  where 筛选条件  


特点：

1、多条待联合的查询语句的查询列数必须一致，查询类型、字段意义最好一致
2、union实现去重查询
   union all 实现全部查询，包含重复项
*/

#案例：查询所有国家的年龄>20岁的用户信息

SELECT * FROM usa WHERE uage >20 UNION
SELECT * FROM chinese WHERE age >20 ;


#案例2：查询所有国家的用户姓名和年龄

SELECT uname,uage FROM usa
UNION
SELECT age,`name` FROM chinese;


#案例3：union自动去重/union all 可以支持重复项


SELECT 1,'范冰冰' 
UNION ALL
SELECT 1,'范冰冰' 
UNION  ALL
SELECT 1,'范冰冰' 
UNION  ALL
SELECT 1,'范冰冰' ;






