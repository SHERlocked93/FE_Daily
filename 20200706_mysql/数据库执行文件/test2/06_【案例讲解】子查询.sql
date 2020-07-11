#1. 查询和 Zlotkey 相同部门的员工姓名和工资

#①查询Zlotkey的部门编号
SELECT department_id
FROM employees
WHERE last_name = 'Zlotkey'

#②查询department_id = ①的员工姓名和工资
SELECT last_name,salary
FROM employees
WHERE department_id = (
	SELECT department_id
	FROM employees
	WHERE last_name = 'Zlotkey'


);


#2. 查询工资比公司平均工资高的员工的员工号，姓名和工资。

#①查询平均工资
SELECT AVG(salary)
FROM employees

#②查询salary>①的信息
SELECT employee_id,last_name,salary
FROM employees
WHERE salary>(
	SELECT AVG(salary)
	FROM employees
);















