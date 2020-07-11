#子查询
/*
说明：当一个查询语句中又嵌套了另一个完整的select语句，则被嵌套的select语句称为子查询或内查询
外面的select语句称为主查询或外查询。


分类：

按子查询出现的位置进行分类：

1、select后面
	要求：子查询的结果为单行单列（标量子查询）
2、from后面
	要求：子查询的结果可以为多行多列
3、where或having后面 ★
	要求：子查询的结果必须为单列
		单行子查询
		多行子查询
4、exists后面
	要求：子查询结果必须为单列（相关子查询）
	
特点：
	1、子查询放在条件中，要求必须放在条件的右侧
	2、子查询一般放在小括号中
	3、子查询的执行优先于主查询
	4、单行子查询对应了 单行操作符：> < >= <= = <>
	   多行子查询对应了 多行操作符：any/some  all in   



*/
#一、放在where或having后面
#一）单行子查询

#案例1：谁的工资比 Abel 高?


#①查询Abel的工资
SELECT salary
FROM employees
WHERE last_name  = 'Abel'
#②查询salary>①的员工信息
SELECT last_name,salary
FROM employees
WHERE salary>(
	SELECT salary
	FROM employees
	WHERE last_name  <> 'Abel'

);

#案例2：返回job_id与141号员工相同，salary比143号员工多的员工姓名，job_id 和工资
#①查询141号员工的job_id
SELECT job_id
FROM employees
WHERE employee_id = 141

#②查询143号员工的salary

SELECT salary
FROM employees
WHERE employee_id = 143

#③查询job_id=① and salary>②的信息
SELECT last_name,job_id,salary
FROM employees
WHERE job_id = (
	SELECT job_id
	FROM employees
	WHERE employee_id = 141
) AND salary>(

	SELECT salary
	FROM employees
	WHERE employee_id = 143

);



#案例3：返回公司工资最少的员工的last_name,job_id和salary

#①查询最低工资
SELECT MIN(salary)
FROM employees

#②查询salary=①的员工的last_name,job_id和salary
SELECT last_name,job_id,salary
FROM employees
WHERE salary=(
	SELECT MIN(salary)
	FROM employees

);

#案例4：查询最低工资大于50号部门最低工资的部门id和其最低工资

#①查询50号部门的最低工资
SELECT MIN(salary)
FROM employees
WHERE department_id = 50


#②查询各部门的最低工资，筛选看哪个部门的最低工资>①

SELECT MIN(salary),department_id
FROM employees
GROUP BY department_id
HAVING MIN(salary)>(

	SELECT MIN(salary)
	FROM employees
	WHERE department_id = 50
);


#二）多行子查询
/*

in:判断某字段是否在指定列表内  
x in(10,30,50)


any/some:判断某字段的值是否满足其中任意一个

x>any(10,30,50)
x>min()

x=any(10,30,50)
x in(10,30,50)


all:判断某字段的值是否满足里面所有的

x >all(10,30,50)
x >max()

*/


#案例1：返回location_id是1400或1700的部门中的所有员工姓名

#①查询location_id是1400或1700的部门
SELECT department_id
FROM departments
WHERE location_id IN(1400,1700)


#②查询department_id = ①的姓名
SELECT last_name
FROM employees
WHERE department_id IN(
	SELECT DISTINCT department_id
	FROM departments
	WHERE location_id IN(1400,1700)

);



#题目：返回其它部门中比job_id为‘IT_PROG’部门任一工资低的员工的员工号、姓名、job_id 以及salary

#①查询job_id为‘IT_PROG’部门的工资
SELECT DISTINCT salary
FROM employees
WHERE job_id = 'IT_PROG'


#②查询其他部门的工资<任意一个①的结果

SELECT employee_id,last_name,job_id,salary
FROM employees
WHERE salary<ANY(

	SELECT DISTINCT salary
	FROM employees
	WHERE job_id = 'IT_PROG'


);



等价于

SELECT employee_id,last_name,job_id,salary
FROM employees
WHERE salary<(

	SELECT MAX(salary)
	FROM employees
	WHERE job_id = 'IT_PROG'


);




#案例3：返回其它部门中比job_id为‘IT_PROG’部门所有工资都低的员工 的员工号、姓名、job_id 以及salary

#①查询job_id为‘IT_PROG’部门的工资
SELECT DISTINCT salary
FROM employees
WHERE job_id = 'IT_PROG'


#②查询其他部门的工资<所有①的结果

SELECT employee_id,last_name,job_id,salary
FROM employees
WHERE salary<ALL(

	SELECT DISTINCT salary
	FROM employees
	WHERE job_id = 'IT_PROG'


);



等价于

SELECT employee_id,last_name,job_id,salary
FROM employees
WHERE salary<(

	SELECT MIN(salary)
	FROM employees
	WHERE job_id = 'IT_PROG'


);


#二、放在select后面

#案例；查询部门编号是50的员工个数

SELECT 
(
	SELECT COUNT(*)
	FROM employees
	WHERE department_id = 50
)  个数;


#三、放在from后面

#案例：查询每个部门的平均工资的工资级别
#①查询每个部门的平均工资

SELECT AVG(salary),department_id
FROM employees
GROUP BY department_id



#②将①和sal_grade两表连接查询

SELECT dep_ag.department_id,dep_ag.ag,g.grade
FROM sal_grade g
JOIN (

	SELECT AVG(salary) ag,department_id
	FROM employees
	GROUP BY department_id

) dep_ag ON dep_ag.ag BETWEEN g.min_salary AND g.max_salary;


#四、放在exists后面



#案例1 ：查询有无名字叫“张三丰”的员工信息
SELECT EXISTS(
	SELECT * 
	FROM employees
	WHERE last_name = 'Abel'

) 有无Abel;


#案例2：查询没有女朋友的男神信息

USE girls;

SELECT bo.*
FROM boys bo
WHERE bo.`id` NOT IN(
	SELECT boyfriend_id
	FROM beauty b
)



SELECT bo.*
FROM boys bo
WHERE NOT EXISTS(
	SELECT boyfriend_id
	FROM beauty b
	WHERE bo.id = b.boyfriend_id
);








