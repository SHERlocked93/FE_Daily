#进阶6：分组查询
/*
语法：

select 查询列表
from 表名
where 筛选条件
group by 分组列表
having 分组后筛选
order by 排序列表;

执行顺序：
①from子句
②where子句
③group by 子句
④having子句
⑤select子句
⑥order by子句






特点：
①查询列表往往是  分组函数和被分组的字段 ★
②分组查询中的筛选分为两类
			筛选的基表	使用的关键词		位置
分组前筛选		原始表		where			group by 的前面

分组后筛选		分组后的结果集  having			group by的后面

where——group by ——having

问题：分组函数做条件只可能放在having后面！！！

*/


#1）简单的分组
#案例1：查询每个工种的员工平均工资

select avg(salary),job_id from employees group by job_id;

#案例2：查询每个领导的手下人数

select count(*),manager_id
from employees
where manager_id is not null
group by manager_id;

select count(1),manager_id from employees where manager_id is not null group by manager_id;
select count(*),location_id from departments group by location_id;  # 找出每个位置的部门数


#2）可以实现分组前的筛选
#案例1：查询邮箱中包含a字符的 每个部门的最高工资
select max(salary) 最高工资,department_id
from employees
where email like '%a%'
group by department_id;


select avg(salary),department_id from employees where email like '%a%' and department_id is not null group by department_id;

#案例2：查询每个领导手下有奖金的员工的平均工资
select avg(salary) 平均工资,manager_id
from employees
where commission_pct is not null
group by manager_id;

select avg(salary) 平均工资,manager_id from employees where commission_pct is not null group by manager_id;

#3）可以实现分组后的筛选
#案例1：查询哪个部门的员工个数>5
#分析1：查询每个部门的员工个数
select count(*) 员工个数,department_id
from employees
group by department_id;


select count(*),department_id from employees where department_id is not null group by department_id having count(*)>5;

#分析2：在刚才的结果基础上，筛选哪个部门的员工个数>5

select count(*) 员工个数,department_id
from employees

group by department_id
HAVING  count(*)>5;




#案例2：每个工种有奖金的员工的最高工资>12000的工种编号和最高工资

select job_id,max(salary)
from employees
where commission_pct  is not null
group by job_id
HAVING max(salary)>12000;


#案例3：领导编号>102的    每个领导手下的最低工资大于5000的最低工资
#分析1：查询每个领导手下员工的最低工资
select MIN(salary) 最低工资,manager_id
from employees
group by manager_id;


select max(salary) 最高工资,job_id 工种编号 from employees where commission_pct is not null group by job_id having max(salary)>12000;

#分析2：筛选刚才1的结果
select MIN(salary) 最低工资,manager_id
from employees
where manager_id>102
group by manager_id
HAVING MIN(salary)>5000 ;

# 查询领导编号>102的每个领导手下最低工资>5000的领导编号是哪个，以及其最低工资
select min(salary) 最低工资,manager_id from employees where manager_id>102 group by manager_id having min(salary)>5000;

#4）可以实现排序
#案例：查询没有奖金的员工的最高工资>6000的工种编号和最高工资,按最高工资升序
#分析1：按工种分组，查询每个工种有奖金的员工的最高工资
select max(salary) 最高工资,job_id
from employees
where commission_pct is  null
group by job_id


#分析2：筛选刚才的结果，看哪个最高工资>6000
select max(salary) 最高工资,job_id
from employees
where commission_pct is  null
group by job_id
HAVING max(salary)>6000


#分析3：按最高工资升序
select max(salary) 最高工资,job_id
from employees
where commission_pct is  null
group by job_id
HAVING max(salary)>6000
ORDER by max(salary) ASC;


#5）按多个字段分组
#案例：查询每个工种每个部门的最低工资,并按最低工资降序
#提示：工种和部门都一样，才是一组

工种	部门  工资
1	10	10000
1       20      2000
2	20
3       20
1       10
2       30
2       20


select MIN(salary) 最低工资,job_id,department_id
from employees
group by job_id,department_id;








select count(*),length(last_name) 姓名长度 from employees group by 姓名长度 having count(*) > 5 order by count(*) desc;

select avg(salary) 平均工资,department_id,job_id from employees group by department_id,job_id having 平均工资>10000 order by 平均工资 desc;

select max(salary) - min(salary) from employees;

SELECT MIN(salary),manager_id FROM employees WHERE manager_id IS NOT NULL GROUP BY manager_id HAVING MIN(salary)>=6000;

SELECT department_id,COUNT(*),AVG(salary) 平均工资 FROM employees WHERE department_id is not null GROUP BY department_id ORDER BY 平均工资 desc;





