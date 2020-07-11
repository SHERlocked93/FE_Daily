use myemployees;

#1. 查询公司员工工资的最大值，最小值，平均值，总和
select MAX(salary), MIN(salary), AVG(salary), SUM(salary)
from employees;


#2. 查询员工表中的最大入职时间和最小入职时间的相差天数 （DIFFRENCE）

select DATEDIFF(MAX(hiredate), MIN(hiredate)) diffrence
from employees;


#3. 查询部门编号为 90 的员工个数

select COUNT(*) 员工个数
from employees
where department_id = 90;







