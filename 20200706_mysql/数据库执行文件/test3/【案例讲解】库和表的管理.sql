#1.	创建表dept1
name	null?	TYPE
id		int(7)
name		varchar(25)


use test;

create table dept1
(
    id   int(7),
    name varchar(25)


);
#2.	将表departments中的数据插入新表dept2中

create table dept2
select department_id, department_name
from myemployees.departments;


#3.	创建表emp5
name	null?	TYPE
id		int(7)
First_name	varchar (25)
Last_name	varchar(25)
Dept_id		int(7)

create table emp5
(
    id         int(7),
    first_name varchar(25),
    last_name  varchar(25),
    dept_id    int(7)

);


#4.	将列Last_name的长度增加到50

alter table emp5
    modify column last_name varchar(50);
#5.	根据表employees创建employees2

create table employees2 like myemployees.employees;

#6.	删除表emp5
drop table if exists emp5;

#7.	将表employees2重命名为emp5

alter table employees2 rename to emp5;

#8.在表dept和emp5中添加新列test_column，并检查所作的操作

alter table emp5
    add column test_column int;
#9.直接删除表emp5中的列 dept_id
desc emp5;
alter table emp5
    drop column test_column;
