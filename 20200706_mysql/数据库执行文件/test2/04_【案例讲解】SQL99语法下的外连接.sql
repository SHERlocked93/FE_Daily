#一、查询编号>3 的女神的男朋友信息，如果有则列出详细，如果没有，用 null 填充
4   小红     大飞
5   小白     大黄
6   小绿     null



select b.id, b.name, bo.*
from beauty b
         left join boys bo on b.boyfriend_id = bo.id
where b.id > 3;


#二、查询哪个城市没有部门

select l.city
from departments d
         right join locations l on l.location_id = d.location_id
where d.department_id is null;


#三、查询部门名为 SAL 或 IT 的员工信息

select d.*, e.*
from departments d
         left join employees e on d.department_id = e.department_id
where d.department_name = 'SAL'
   or d.department_name = 'IT';


select b.*, bo.*
from beauty b
         cross join boys bo;

select b.*, bo.*
from beauty b,
     boys bo;

select *
from beauty g
         left join boys y on g.boyfriend_id = y.id
where g.boyfriend_id > 3
  and y.id is not null;

select *
from locations l
         left join departments d on l.location_id = d.location_id
where department_name is null;

select e.*, d.department_name
from employees e
         left join departments d on e.department_id = d.department_id
where d.department_name in ('sal', 'it');
