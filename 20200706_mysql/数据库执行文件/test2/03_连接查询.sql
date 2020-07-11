#进阶6：连接查询
/*
说明：又称多表查询，当查询语句涉及到的字段来自于多个表时，就会用到连接查询

笛卡尔乘积现象：表1 有m行，表2有n行，结果=m*n行

	发生原因：没有有效的连接条件
	如何避免：添加有效的连接条件

分类：

	按年代分类：
	1、sql92标准:仅仅支持内连接
		内连接：
			等值连接
			非等值连接
			自连接
	2、sql99标准【推荐】：支持内连接+外连接（左外和右外）+交叉连接

	按功能分类：
		内连接：
			等值连接
			非等值连接
			自连接
		外连接：
			左外连接
			右外连接
			全外连接

		交叉连接


*/
#引入案例
#查询女神名和对应的男神名
select *
from beauty;

select *
from boys;


select name, boyname
from boys,
     beauty
where beauty.boyfriend_id = boys.id;

#---------------------------------sql92标准------------------
#一、内连接
/*
语法:
select 查询列表
from 表1 别名,表2 别名
where 连接条件
and 筛选条件
group by 分组列表
having 分组后筛选
order by 排序列表

执行顺序：

1、from子句
2、where子句
3、and子句
4、group by子句
5、having子句
6、select子句
7、order by子句




*/


#一）等值连接
/*

① 多表等值连接的结果为多表的交集部分
②n表连接，至少需要n-1个连接条件
③ 多表的顺序没有要求
④一般需要为表起别名
⑤可以搭配前面介绍的所有子句使用，比如排序、分组、筛选


*/


#案例1：查询女神名和对应的男神名
select name, boyname
from boys,
     beauty
where beauty.boyfriend_id = boys.id;

#案例2：查询员工名和对应的部门名

select last_name, department_name
from employees,
     departments
where employees.department_id = departments.department_id;



#2、为表起别名
/*
①提高语句的简洁度
②区分多个重名的字段

注意：如果为表起了别名，则查询的字段就不能使用原来的表名去限定

*/
#查询员工名、工种号、工种名

select e.last_name, e.job_id, j.job_title
from employees e,
     jobs j
where e.job_id = j.job_id;


#3、两个表的顺序是否可以调换

#查询员工名、工种号、工种名

select e.last_name, e.job_id, j.job_title
from jobs j,
     employees e
where e.job_id = j.job_id;


#4、可以加筛选


#案例：查询有奖金的员工名、部门名

select last_name, department_name, commission_pct

from employees e,
     departments d
where e.department_id = d.department_id
  and e.commission_pct is not null;

#案例2：查询城市名中第二个字符为o的部门名和城市名

select department_name, city
from departments d,
     locations l
where d.location_id = l.location_id
  and city like '_o%';

#5、可以加分组


#案例1：查询每个城市的部门个数

select COUNT(*) 个数, city
from departments d,
     locations l
where d.location_id = l.location_id
group by city;


#案例2：查询有奖金的每个部门的部门名和部门的领导编号和该部门的最低工资
select department_name, d.manager_id, MIN(salary)
from departments d,
     employees e
where d.department_id = e.department_id
  and commission_pct is not null
group by department_name, d.manager_id;
#6、可以加排序


#案例：查询每个工种的工种名和员工的个数，并且按员工个数降序

select job_title, COUNT(*)
from employees e,
     jobs j
where e.job_id = j.job_id
group by job_title
order by COUNT(*) desc;



#7、可以实现三表连接？

#案例：查询员工名、部门名和所在的城市

select last_name, department_name, city
from employees e,
     departments d,
     locations l
where e.department_id = d.department_id
  and d.location_id = l.location_id
  and city like 's%'

order by department_name desc;



#二）非等值连接


#案例1：查询员工的工资和工资级别


select salary, grade_level
from employees e,
     job_grades g
where salary between g.lowest_sal and g.highest_sal
  and g.grade_level = 'A';

/*
select salary,employee_id from employees;
select * from job_grades;
CREATE TABLE job_grades
(grade_level VARCHAR(3),
 lowest_sal  int,
 highest_sal int);

INSERT INTO job_grades
VALUES ('A', 1000, 2999);

INSERT INTO job_grades
VALUES ('B', 3000, 5999);

INSERT INTO job_grades
VALUES('C', 6000, 9999);

INSERT INTO job_grades
VALUES('D', 10000, 14999);

INSERT INTO job_grades
VALUES('E', 15000, 24999);

INSERT INTO job_grades
VALUES('F', 25000, 40000);

*/


#三）自连接


#案例：查询 员工名和上级的名称

select e.employee_id, e.last_name, m.employee_id, m.last_name
from employees e,
     employees m
where e.manager_id = m.employee_id;



#------------------------SQL99语法
#一、内连接
语法：

select 查询列表
from 表名1 别名 [连接类型 inner/outer] join  表名2 别名
on 连接条件
where 筛选条件
group by 分组列表
having 分组后筛选
order by 排序列表;


# SQL92和SQL99的区别：

#  SQL99，使用JOIN关键字代替了之前的逗号，并且将连接条件和筛选条件进行了分离，提高阅读性！！！


#一）等值连接
#①简单连接
#案例：查询员工名和部门名

select last_name, department_name
from departments d
         inner join employees e
                    on e.department_id = d.department_id;



#②添加筛选条件
#案例1：查询部门编号>100的部门名和所在的城市名
select department_name, city
from departments d
         join locations l
              on d.location_id = l.location_id
where d.department_id > 100;


#③添加分组+筛选
#案例1：查询每个城市的部门个数

select COUNT(*) 部门个数, l.city
from departments d
         join locations l
              on d.location_id = l.location_id
group by l.city;



#④添加分组+筛选+排序
#案例1：查询部门中员工个数>10的部门名，并按员工个数降序

select COUNT(*) 员工个数, d.department_name
from employees e
         join departments d
              on e.department_id = d.department_id
group by d.department_id
having 员工个数 > 10
order by 员工个数 desc;



#二）非等值连接

#案例：查询部门编号在10-90之间的员工的工资级别，并按级别进行分组
select *
from sal_grade;


select COUNT(*) 个数, grade
from employees e
         join sal_grade g
              on e.salary between g.min_salary and g.max_salary
where e.department_id between 10 and 90
group by g.grade;



#三）自连接

#案例：查询员工名和对应的领导名

select e.last_name, m.last_name
from employees e
         join employees m
              on e.manager_id = m.employee_id;



#二、外连接

/*

说明：查询结果为主表中所有的记录，如果从表有匹配项，则显示匹配项；如果从表没有匹配项，则显示null

应用场景：一般用于查询主表中有但从表没有的记录

特点：

1、外连接分主从表，两表的顺序不能任意调换
2、左连接的话，left join左边为主表
   右连接的话，right join右边为主表


语法：

select 查询列表
from 表1 别名
left|right|full 【outer】 join 表2 别名
on 连接条件
where 筛选条件;

*/
use girls;
#案例1：查询所有女神记录，以及对应的男神名，如果没有对应的男神，则显示为null

#左连接
select b.*, bo.*
from beauty b
         left join boys bo on b.boyfriend_id = bo.id;

#右连接
select b.*, bo.*
from boys bo
         right join beauty b on b.boyfriend_id = bo.id;



#案例2：查哪个女神没有男朋友

#左连接
select b.name
from beauty b
         left join boys bo on b.boyfriend_id = bo.id
where bo.id is null;

#右连接
select b.*, bo.*
from boys bo
         right join beauty b on b.boyfriend_id = bo.id
where bo.id is null;


#案例3：查询哪个部门没有员工，并显示其部门编号和部门名

select COUNT(*) 部门个数
from departments d
         left join employees e on d.department_id = e.department_id
where e.employee_id is null;



















