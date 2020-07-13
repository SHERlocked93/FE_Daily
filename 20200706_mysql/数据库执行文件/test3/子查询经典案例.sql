# 1. 查询工资最低的员工信息: last_name, salary

#①查询最低的工资
select MIN(salary)
from employees

#②查询last_name,salary，要求salary=①
select last_name, salary
from employees
where salary = (
    select MIN(salary)
    from employees
);

# 2. 查询平均工资最低的部门信息

#方式一：
#①各部门的平均工资
select AVG(salary), department_id
from employees
group by department_id
#②查询①结果上的最低平均工资
select MIN(ag)
from (
         select AVG(salary) ag, department_id
         from employees
         group by department_id
     ) ag_dep

#③查询哪个部门的平均工资=②

select AVG(salary), department_id
from employees
group by department_id
having AVG(salary) = (
    select MIN(ag)
    from (
             select AVG(salary) ag, department_id
             from employees
             group by department_id
         ) ag_dep
);

#④查询部门信息

select d.*
from departments d
where d.department_id = (
    select department_id
    from employees
    group by department_id
    having AVG(salary) = (
        select MIN(ag)
        from (
                 select AVG(salary) ag, department_id
                 from employees
                 group by department_id
             ) ag_dep
    )
);

#方式二：
#①各部门的平均工资
select AVG(salary), department_id
from employees
group by department_id

#②求出最低平均工资的部门编号
select department_id
from employees
group by department_id
order by AVG(salary)
limit 1;

#③查询部门信息
select *
from departments
where department_id = (
    select department_id
    from employees
    group by department_id
    order by AVG(salary)
    limit 1
);



# 3. 查询平均工资最低的部门信息和该部门的平均工资
#①各部门的平均工资
select AVG(salary), department_id
from employees
group by department_id
#②求出最低平均工资的部门编号
select AVG(salary), department_id
from employees
group by department_id
order by AVG(salary)
limit 1;
#③查询部门信息
select d.*, ag
from departments d
         join (
    select AVG(salary) ag, department_id
    from employees
    group by department_id
    order by AVG(salary)
    limit 1
) ag_dep
              on d.department_id = ag_dep.department_id;



# 4. 查询平均工资最高的 job 信息
#①查询最高的job的平均工资
select AVG(salary), job_id
from employees
group by job_id
order by AVG(salary) desc
limit 1

#②查询job信息
select *
from jobs
where job_id = (
    select job_id
    from employees
    group by job_id
    order by AVG(salary) desc
    limit 1
);
# 5. 查询平均工资高于公司平均工资的部门有哪些?

#①查询平均工资
select AVG(salary)
from employees

#②查询每个部门的平均工资
select AVG(salary), department_id
from employees
group by department_id

#③筛选②结果集，满足平均工资>①

select AVG(salary), department_id
from employees
group by department_id
having AVG(salary) > (
    select AVG(salary)
    from employees
);

# 6. 查询出公司中所有 manager 的详细信息.
#①查询所有manager的员工编号
select distinct manager_id
from employees

#②查询详细信息，满足employee_id=①
select *
from employees
where employee_id = any (
    select distinct manager_id
    from employees
);

# 7. 各个部门中 最高工资中最低的那个部门的 最低工资是多少

#①查询各部门的最高工资中最低的部门编号
select department_id
from employees
group by department_id
order by MAX(salary)
limit 1


#②查询①结果的那个部门的最低工资

select MIN(salary), department_id
from employees
where department_id = (
    select department_id
    from employees
    group by department_id
    order by MAX(salary)
    limit 1
);
# 8. 查询平均工资最高的部门的 manager 的详细信息: last_name, department_id, email, salary
#①查询平均工资最高的部门编号
select department_id
from employees
group by department_id
order by AVG(salary) desc
limit 1

#②将employees和departments连接查询，筛选条件是①
select last_name,
       d.department_id,
       email,
       salary
from employees e
         inner join departments d
                    on d.manager_id = e.employee_id
where d.department_id =
      (select department_id
       from employees
       group by department_id
       order by AVG(salary) desc
       limit 1);

