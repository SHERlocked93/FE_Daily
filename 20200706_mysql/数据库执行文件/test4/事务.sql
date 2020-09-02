#TCL
/*
Transaction Control Language 事务控制语言

事务：
一个或一组sql语句组成一个执行单元，这个执行单元要么全部执行，要么全部不执行。

案例：转账

张三丰  1000
郭襄	1000

update 表 set 张三丰的余额=500 where name='张三丰'
意外
update 表 set 郭襄的余额=1500 where name='郭襄'


事务的特性：
ACID
原子性：一个事务不可再分割，要么都执行要么都不执行
一致性：一个事务执行会使数据从一个一致状态切换到另外一个一致状态
隔离性：一个事务的执行不受其他事务的干扰
持久性：一个事务一旦提交，则会永久的改变数据库的数据.



事务的创建
隐式事务：事务没有明显的开启和结束的标记
比如insert、update、delete语句

delete from 表 where id =1;

显式事务：事务具有明显的开启和结束的标记
前提：必须先设置自动提交功能为禁用

set autocommit=0;

步骤1：开启事务
set autocommit=0;
start transaction;可选的
步骤2：编写事务中的sql语句(select insert update delete)
语句1;
语句2;
...

步骤3：结束事务
commit;提交事务
rollback;回滚事务

savepoint 节点名;设置保存点



事务的隔离级别：
		  脏读		不可重复读	幻读
read uncommitted：√		√		√
read committed：  ×		√		√
repeatable read： ×		×		√
serializable	  ×             ×               ×


mysql中默认 第三个隔离级别 repeatable read
oracle中默认第二个隔离级别 read committed
查看隔离级别
select @@tx_isolation;
设置隔离级别
set session|global transaction isolation level 隔离级别;




开启事务的语句;
update 表 set 张三丰的余额=500 where name='张三丰'

update 表 set 郭襄的余额=1500 where name='郭襄'
结束事务的语句;



*/

show variables like 'autocommit';
show engines;

#1.演示事务的使用步骤

#开启事务
set autocommit = 0;
start transaction;
#编写一组事务的语句
update employees
set salary = 13000
where employee_id = 102;
update employees
set salary = 13000
where employee_id = 103;

#结束事务
rollback;
# commit;

select *
from account;


#2.演示事务对于delete和truncate的处理的区别

set autocommit = 0;
start transaction;

delete
from account;
rollback;


#3.演示savepoint 的使用
set autocommit = 0;
start transaction;
delete
from account
where id = 25;
savepoint a;#设置保存点
delete
from account
where id = 28;
rollback to a;#回滚到保存点


select *
from account;









