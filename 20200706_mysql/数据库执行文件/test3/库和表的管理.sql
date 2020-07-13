#DDL
/*

数据定义语言

库和表的管理

一、库的管理
创建、修改、删除
二、表的管理
创建、修改、删除

创建： create
修改： alter
删除： drop

*/

#一、库的管理
#1、库的创建
/*
语法：
create database  [if not exists]库名;
*/


#案例：创建库Books

create database if not exists books;


#2、库的修改

rename
database books to 新库名;

#更改库的字符集

alter database books character set gbk;


#3、库的删除

drop database if exists books;



#二、表的管理
#1.表的创建 ★

/*
语法：
create table 表名(
	列名 列的类型【(长度) 约束】,
	列名 列的类型【(长度) 约束】,
	列名 列的类型【(长度) 约束】,
	...
	列名 列的类型【(长度) 约束】


)


*/
#案例：创建表Book

create table book
(
    id          int,#编号
    bname       varchar(20),#图书名
    price       double,#价格
    authorid    int,#作者编号
    publishdate datetime#出版日期


);


desc book;

#案例：创建表author
create table if not exists author
(
    id      int,
    au_name varchar(20),
    nation  varchar(10)

)
desc author;


#2.表的修改

/*
语法
alter table 表名 add|drop|modify|change column 列名 【列类型 约束】;

*/

#①修改列名

alter table book
    change column publishdate pubdate datetime;


#②修改列的类型或约束
alter table book
    modify column pubdate timestamp;

#③添加新列
alter table author
    add column annual double;

#④删除列

alter table book_author
    drop column annual;
#⑤修改表名

alter table author rename to book_author;

desc book;


#3.表的删除

drop table if exists book_author;

show tables;


#通用的写法：

drop database if exists 旧库名;
create database 新库名;


drop table if exists 旧表名;
create table 表名
(
);


#4.表的复制

insert into author
values (1, '村上春树', '日本'),
       (2, '莫言', '中国'),
       (3, '冯唐', '中国'),
       (4, '金庸', '中国');

select *
from author;
select *
from copy2;
#1.仅仅复制表的结构

create table copy like author;

#2.复制表的结构+数据
create table copy2
select *
from author;

#只复制部分数据
create table copy3
select id, au_name
from author
where nation = '中国';


#仅仅复制某些字段

create table copy4
select id, au_name
from author
where 0;












