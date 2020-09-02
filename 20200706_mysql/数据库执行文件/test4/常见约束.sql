#常见约束

/*


含义：一种限制，用于限制表中的数据，为了保证表中的数据的准确和可靠性


分类：六大约束
	NOT NULL：非空，用于保证该字段的值不能为空
	比如姓名、学号等
	DEFAULT:默认，用于保证该字段有默认值
	比如性别
	PRIMARY KEY:主键，用于保证该字段的值具有唯一性，并且非空
	比如学号、员工编号等
	UNIQUE:唯一，用于保证该字段的值具有唯一性，可以为空
	比如座位号
	CHECK:检查约束【mysql中不支持】
	比如年龄、性别
	FOREIGN KEY:外键，用于限制两个表的关系，用于保证该字段的值必须来自于主表的关联列的值
		在从表添加外键约束，用于引用主表中某列的值
	比如学生表的专业编号，员工表的部门编号，员工表的工种编号


添加约束的时机：
	1.创建表时
	2.修改表时


约束的添加分类：
	列级约束：
		六大约束语法上都支持，但外键约束没有效果

	表级约束：

		除了非空、默认，其他的都支持


主键和唯一的大对比：

		保证唯一性  是否允许为空    一个表中可以有多少个   是否允许组合
	主键	√		×		至多有1个           √，但不推荐
	唯一	√		√		可以有多个          √，但不推荐
外键：
	1、要求在从表设置外键关系
	2、从表的外键列的类型和主表的关联列的类型要求一致或兼容，名称无要求
	3、主表的关联列必须是一个key（一般是主键或唯一）
	4、插入数据时，先插入主表，再插入从表
	删除数据时，先删除从表，再删除主表


*/

create table 表名
(
    字段名 字段类型 列级约束,
    字段名 字段类型,
    表级约束

)
create database students;
#一、创建表时添加约束

#1.添加列级约束
/*
语法：

直接在字段名和类型后面追加 约束类型即可。

只支持：默认、非空、主键、唯一



*/

use students;
drop table stuinfo;
create table stuinfo
(
    id      int primary key,#主键
    stuname varchar(20) not null unique,#非空
    gender  char(1) check (gender = '男' or gender = '女'),#检查
    seat    int unique,#唯一
    age     int default 18,#默认约束
    majorid int references major (id)#外键

);

create table st
(
    id      int primary key,
    stuname char(20) not null,
    gender  char(1) check ( gender = '男' or gender = '女' ),
    seat    int unique,
    age     int default 18,
    majorid int references major (id)
);


create table major
(
    id        int primary key,
    majorname varchar(20)
);

#查看stuinfo中的所有索引，包括主键、外键、唯一
show index from stuinfo;


#2.添加表级约束
/*

语法：在各个字段的最下面
 【constraint 约束名】 约束类型(字段名)
*/

drop table if exists stuinfo;
create table stuinfo
(
    id      int,
    stuname varchar(20),
    gender  char(1),
    seat    int,
    age     int,
    majorid int,

    constraint pk primary key (id),#主键
    constraint uq unique (seat),#唯一键
    constraint ck check (gender = '男' or gender = '女'),#检查
    constraint fk_stuinfo_major foreign key (majorid) references major (id)#外键

);



show index from stuinfo;


#通用的写法：★

create table if not exists stuinfo
(
    id      int primary key,
    stuname varchar(20),
    sex     char(1),
    age     int default 18,
    seat    int unique,
    majorid int,
    constraint fk_stuinfo_major foreign key (majorid) references major (id)

);



#二、修改表时添加约束

/*
1、添加列级约束
alter table 表名 modify column 字段名 字段类型 新约束;

2、添加表级约束
alter table 表名 add 【constraint 约束名】 约束类型(字段名) 【外键的引用】;


*/
drop table if exists stuinfo;
create table stuinfo
(
    id      int,
    stuname varchar(20),
    gender  char(1),
    seat    int,
    age     int,
    majorid int
)
desc stuinfo;
#1.添加非空约束
alter table stuinfo
    modify column stuname varchar(20) not null;
#2.添加默认约束
alter table stuinfo
    modify column age int default 18;
#3.添加主键
#①列级约束
alter table stuinfo
    modify column id int primary key;
#②表级约束
alter table stuinfo
    add primary key (id);

#4.添加唯一

#①列级约束
alter table stuinfo
    modify column seat int unique;
#②表级约束
alter table stuinfo
    add unique (seat);


#5.添加外键
alter table stuinfo
    add constraint fk_stuinfo_major foreign key (majorid) references major (id);

#三、修改表时删除约束

#1.删除非空约束
alter table stuinfo
    modify column stuname varchar(20) null;

#2.删除默认约束
alter table stuinfo
    modify column age int;

#3.删除主键
alter table stuinfo
    drop primary key;

#4.删除唯一
alter table stuinfo
    drop index seat;

#5.删除外键
alter table stuinfo
    drop foreign key fk_stuinfo_major;

show index from stuinfo;





