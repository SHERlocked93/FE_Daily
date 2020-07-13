#1. 查询和 Zlotkey 相同部门的员工姓名和工资
use myemployees;

select last_name, salary
from employees e
where e.department_id = (
    select department_id
    from employees
    where last_name = 'zlotkey'
);


#①查询Zlotkey的部门编号
select department_id
from employees
where last_name = 'Zlotkey'

#②查询department_id = ①的员工姓名和工资
select last_name, salary
from employees
where department_id = (
    select department_id
    from employees
    where last_name = 'Zlotkey'
);


#2. 查询工资比公司平均工资高的员工的员工号，姓名和工资。

select employee_id, last_name, salary
from employees e
where salary > (
    select avg(salary)
    from employees
);

#①查询平均工资
select AVG(salary)
from employees;

#②查询salary>①的信息
select employee_id, last_name, salary
from employees
where salary > (
    select AVG(salary)
    from employees
);

# 查询每个部门比本部门平均工资高的人
select salary, last_name, e.department_id
from employees e
         join (select avg(salary) 平均工资, department_id
               from employees
               group by department_id) t on t.department_id = e.department_id
where salary > t.平均工资;

# 查询在部门的location_id为1700的部门工作的员工的员工号
select e.department_id, d.location_id, e.last_name, e.employee_id
from locations l
         join departments d on l.location_id = d.location_id
         join employees e on d.department_id = e.department_id
where d.location_id = 1700;

select employee_id
from employees
where department_id in (
    select d.department_id
    from departments d
    where d.location_id = 1700
);

# 查询平均工资最低的部门信息
select *
from departments d
where d.department_id = (
    select department_id
    from employees e
    group by department_id
    order by avg(salary) desc
    limit 1);











