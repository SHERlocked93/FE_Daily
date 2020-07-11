#1. 显示所有员工的姓名，部门号和部门名称。
select e.last_name, d.department_id, d.department_name
from employees e
         join departments d on e.department_id = d.department_id;


#2. 查询 90 号部门员工的 job_id 和 90 号部门的 location_id
select e.job_id, d.location_id
from employees e
         join departments d on e.department_id = d.department_id
where e.department_id = 90;


#3. 选择所有有奖金的员工的
#last_name , department_name , location_id , city

select last_name, department_name, location_id, city
from employees e
         join departments d on e.department_id = d.department_id
         join locations l on d.location_id = l.location_id
where e.commission_pct is not null;


#4. 选择city在Toronto工作的员工的
#last_name , job_id , department_id , department_name

select last_name, job_id, department_id, department_name
from employees e
         join departments d on e.department_id = d.department_id
         join locations l on d.location_id = l.location_id
where city = 'Toronto';


#5.查询每个工种、每个部门的部门名、工种名和最低工资

select j.job_title, d.department_name, MIN(salary) 最低工资
from employees e
         join departments d on e.department_id = d.department_id
         join jobs j on e.job_id = j.job_id
group by j.job_id, d.department_id;


#6.查询每个国家下的部门个数大于 2 的国家编号

select l.country_id, COUNT(*) 部门个数
from departments d
         join locations l on d.location_id = l.location_id
group by l.country_id
having 部门个数 > 2;

#7、选择指定员工的姓名，员工号，以及他的管理者的姓名和员工号，结果类似于下面的格
式 #employees Emp# manager  Mgr#
#kochhar   101   king    100
select e.last_name   employees,
       e.employee_id "Emp#",
       m.last_name   manager,
       m.employee_id "Mgr#"
from employees m
         join employees e
              on e.manager_id = m.employee_id;

