#DML语言
/*
数据操作语言：
插入：insert
修改：update
删除：delete

*/

#一、插入语句
#方式一：经典的插入
/*
语法：
insert into 表名(列名,...) values(值1,...);

*/
select *
from beauty;
#1.插入的值的类型要与列的类型一致或兼容
insert into beauty(id, name, sex, borndate, phone, photo, boyfriend_id)
values (13, '唐艺昕', '女', '1990-4-23', '1898888888', null, 2);

#2.不可以为null的列必须插入值。可以为null的列如何插入值？
#方式一：
insert into beauty(id, name, sex, borndate, phone, photo, boyfriend_id)
values (13, '唐艺昕', '女', '1990-4-23', '1898888888', null, 2);

#方式二：

insert into beauty(id, name, sex, phone)
values (15, '娜扎', '女', '1388888888');


#3.列的顺序是否可以调换
insert into beauty(name, sex, id, phone)
values ('蒋欣', '女', 16, '110');


#4.列数和值的个数必须一致

insert into beauty(name, sex, id, phone)
values ('关晓彤', '女', 17, '110');

#5.可以省略列名，默认所有列，而且列的顺序和表中列的顺序一致

insert into beauty
values (18, '张飞', '男', null, '119', null, null);

#方式二：
/*

语法：
insert into 表名
set 列名=值,列名=值,...
*/


insert into beauty
set id=19,
    name='刘涛',
    phone='999';


#两种方式大pk ★


#1、方式一支持插入多行,方式二不支持

insert into beauty
values (23, '唐艺昕1', '女', '1990-4-23', '1898888888', null, 2)
     , (24, '唐艺昕2', '女', '1990-4-23', '1898888888', null, 2)
     , (25, '唐艺昕3', '女', '1990-4-23', '1898888888', null, 2);

#2、方式一支持子查询，方式二不支持

insert into beauty(id, name, phone)
select 26, '宋茜', '11809866';

insert into beauty(id, name, phone)
select id, boyname, '1234567'
from boys
where id < 3;

#二、修改语句

/*

1.修改单表的记录★

语法：
update 表名
set 列=新值,列=新值,...
where 筛选条件;

2.修改多表的记录【补充】

语法：
sql92语法：
update 表1 别名,表2 别名
set 列=值,...
where 连接条件
and 筛选条件;

sql99语法：
update 表1 别名
inner|left|right join 表2 别名
on 连接条件
set 列=值,...
where 筛选条件;


*/


#1.修改单表的记录
#案例1：修改beauty表中姓唐的女神的电话为13899888899

update beauty
set phone = '13899888899'
where name like '唐%';

#案例2：修改boys表中id好为2的名称为张飞，魅力值 10
update boys
set boyname='张飞',
    usercp=10
where id = 2;

#2.修改多表的记录

#案例 1：修改张无忌的女朋友的手机号为114

update boys bo
    inner join beauty b on bo.id = b.boyfriend_id
set b.phone='119',
    bo.usercp=1000
where bo.boyname = '张无忌';


update beauty be
    join boys b on be.boyfriend_id = b.id
set be.phone='114'
where b.boyname = '张无忌';

#案例2：修改没有男朋友的女神的男朋友编号都为2号

update boys bo
    right join beauty b on bo.id = b.boyfriend_id
set b.boyfriend_id=2
where bo.id is null;

update boys b
    right join beauty be on be.boyfriend_id = b.id
set phone=112
where b.id is null;


#三、删除语句
/*

方式一：delete
语法：

1、单表的删除【★】
delete from 表名 where 筛选条件

2、多表的删除【补充】

sql92语法：
delete 表1的别名,表2的别名
from 表1 别名,表2 别名
where 连接条件
and 筛选条件;

sql99语法：

delete 表1的别名,表2的别名
from 表1 别名
inner|left|right join 表2 别名 on 连接条件
where 筛选条件;



方式二：truncate
语法：truncate table 表名;

*/

#方式一：delete
#1.单表的删除
#案例：删除手机号以9结尾的女神信息

delete
from beauty
where phone like '%9';
select *
from beauty;

delete
from beauty
where phone like '%9%';

#2.多表的删除

#案例：删除张无忌的女朋友的信息

delete b
from beauty b
         inner join boys bo on b.boyfriend_id = bo.id
where bo.boyname = '张无忌';


#案例：删除黄晓明的信息以及他女朋友的信息
delete b,bo
from beauty b
         inner join boys bo on b.boyfriend_id = bo.id
where bo.boyname = '黄晓明';

delete b,bo
from boys bo
         inner join beauty b
                    on b.boyfriend_id = bo.id
where bo.boyname = '黄晓明';

#方式二：truncate语句

#案例：将魅力值>100的男神信息删除
truncate table boys;



#delete pk truncate【面试题★】

/*

1. delete 可以加where 条件，truncate不能加

2. truncate删除，效率高一丢丢

3. 假如要删除的表中有自增长列，
如果用delete删除后，再插入数据，自增长列的值从断点开始，
而truncate删除后，再插入数据，自增长列的值从1开始。

4. truncate删除没有返回值，delete删除有返回值

5. truncate删除不能回滚，delete删除可以回滚.

*/

truncate table beauty;

select *
from boys;

delete
from boys;
truncate table boys;
insert into boys (boyname, usercp)
values ('张飞', 100),
       ('刘备', 100),
       ('关云长', 100);

select *
from beauty;
delete
from beauty
where id = 11;




