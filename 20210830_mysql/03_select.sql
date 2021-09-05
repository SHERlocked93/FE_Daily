# 基本语法
# select [查询列表] from [表名];

# 查询单个/多个/所有字段
select cust_name
from customers;

select cust_name, cust_city, cust_address
from customers;

select *
from customers;
# * 表示所有

# 查询常量值/表达式/函数
select 100;
select 'zhangsan';
select 100 % 98;
select version();

# 有一些重复值
select order_num
from orderitems;

# 将重复值去重
select distinct order_num
from orderitems;

# 完全限定表名
select orderitems.order_num
from mysql_demo1.orderitems;
# 上面这句等价于
select order_num
from orderitems;
