#进阶5：分组函数
/*

说明：分组函数往往用于实现将一组数据进行统计计算，最终得到一个值，又称为聚合函数或统计函数

分组函数清单：

sum(字段名)：求和
avg(字段名)：求平均数
max(字段名)：求最大值
min(字段名)：求最小值
count(字段名)：计算非空字段值的个数

*/

#案例1 ：查询员工信息表中，所有员工的工资和、工资平均值、最低工资、最高工资、有工资的个数

SELECT SUM(salary),AVG(salary),MIN(salary),MAX(salary),COUNT(salary) FROM employees;

#案例2：添加筛选条件
	#①查询emp表中记录数：
	SELECT COUNT(employee_id) FROM employees;

	#②查询emp表中有佣金的人数：
	
	SELECT COUNT(salary) FROM employees;
	
	
	#③查询emp表中月薪大于2500的人数：
	SELECT COUNT(salary) FROM employees WHERE salary>2500;

	
	#④查询有领导的人数：
	SELECT COUNT(manager_id) FROM employees;
	
	
#count的补充介绍★


#1、统计结果集的行数，推荐使用count(*)
	
SELECT COUNT(*) FROM employees;
SELECT COUNT(*) FROM employees WHERE department_id = 30;


SELECT COUNT(1) FROM employees;
SELECT COUNT(1) FROM employees WHERE department_id = 30;


#2、搭配distinct实现去重的统计

#需求：查询有员工的部门个数

SELECT COUNT(DISTINCT department_id) FROM employees;


#思考：每个部门的总工资、平均工资？

SELECT SUM(salary)  FROM employees WHERE department_id = 30;
SELECT SUM(salary)  FROM employees WHERE department_id = 50;


SELECT SUM(salary) ,department_id
FROM employees
GROUP BY department_id;



