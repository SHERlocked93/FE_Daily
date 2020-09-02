#1.	运行以下脚本创建表employees

USE myemployees;
CREATE TABLE employees(
	Id INT(10),
	First_name VARCHAR(10),
	Last_name VARCHAR(10),
	Userid VARCHAR(10),
	Salary DOUBLE(10,2)
);
CREATE TABLE users(
	id INT,
	userid VARCHAR(10),
	department_id INT

);
#2.	显示表employees的结构
DESC employees;

#3.	向employees表中插入下列数据
ID	FIRST_NAME	LAST_NAME	USERID	SALARY
1	patel		Ralph		Rpatel	895
2	Dancs		Betty		Bdancs	860
3	Biri		Ben		Bbiri	1100
4	Newman		Chad		Cnewman	750
5	Ropeburn	Audrey		Aropebur	1550

#方式一：
INSERT INTO employees
VALUES(1,'patel','Ralph','Rpatel',895),
(2,'Dancs','Betty','Bdancs',860),
(3,'Biri','Ben','Bbiri',1100),
(4,'Newman','Chad','Cnewman',750),
(5,'Ropeburn','Audrey','Aropebur',1550);
DELETE FROM employees;
#方式二：

INSERT INTO employees
SELECT 1,'patel','Ralph','Rpatel',895 UNION
SELECT 2,'Dancs','Betty','Bdancs',860 UNION
SELECT 3,'Biri','Ben','Bbiri',1100 UNION
SELECT 4,'Newman','Chad','Cnewman',750 UNION
SELECT 5,'Ropeburn','Audrey','Aropebur',1550;

use myemployees;

insert into myemployees.employees
select 207, 'Bruce', 'Ernst', 'BERNST', '590.423.4568', 'IT_PROG', 6000.00, null, 103, 60, '1992-04-03 00:00:00' union
select       208, 'David', 'Austin', 'DAUSTIN', '590.423.4569', 'IT_PROG', 4800.00, null, 103, 60, '1998-03-03 00:00:00' union
select       209, 'Valli', 'Pataballa', 'VPATABAL', '590.423.4560', 'IT_PROG', 4800.00, null, 103, 60, '1998-03-03 00:00:00' union
select       210, 'Diana', 'Lorentz', 'DLORENTZ', '590.423.5567', 'IT_PROG', 4200.00, null, 103, 60, '1998-03-03 00:00:00';

use girls;

insert into beauty
SELECT 23, '唐艺昕1', '女', '1990-4-23', '1898888888', null, 2 union
SELECT 24, '唐艺昕2', '女', '1990-4-23', '1898888888', null, 2 union
SELECT 25, '唐艺昕3', '女', '1990-4-23', '1898888888', null, 2;


insert into beauty
set id=19,
    name='刘涛',
    phone='999';
#4.	 向users表中插入数据
1	Rpatel	10
2	Bdancs	10
3	Bbiri	20
4	Cnewman	30
5	Aropebur	40

INSERT INTO users
VALUES(1,'Rpatel',10),
(2,'Bdancs',10),
(3,'Bbiri',20);




#5.将3号员工的last_name修改为“drelxer”
UPDATE employees SET last_name='drelxer' WHERE id = 3;



#6.将所有工资少于900的员工的工资修改为1000
UPDATE employees SET salary=1000 WHERE salary<900;

#7.将userid 为Bbiri的user表和employees表的记录全部删除

DELETE u,e
FROM users u
JOIN employees e ON u.`userid`=e.`Userid`
WHERE u.`userid`='Bbiri';

#8.删除所有数据

DELETE FROM employees;
DELETE FROM users;
#9.检查所作的修正

SELECT * FROM employees;
SELECT * FROM users;

#10.清空表employees
TRUNCATE TABLE employees;







