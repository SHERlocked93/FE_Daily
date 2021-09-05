#####################
# 字符函数
#####################

# upper、lower 将姓变大写，名变小写，然后拼接
select concat(upper(last_name), lower(first_name)) 姓名
from employees;

# 姓名中首字符大写，其他字符小写然后用_拼接，显示出来
select concat(upper(substr(last_name, 1, 1)), '_', lower(substr(last_name, 2)))
from employees;

# substr 截取字符串，sql 中索引从 1 开始而不是0
select substr('hello world', 3); # llo world
select substr('hello world', 2, 3);
# ell

# instr 返回子串第一次出现的索引，没找到返回 0
select instr('abcdefg', 'cd');
# 3

# trim 减去字符串首尾的空格或指定字符
select trim('   hello    '); # hello
select trim('aa' from 'aaabaabaaaaaa');
# abaab

# lpad 用指定的字符实现左填充指定长度
select lpad('he', 5, '-');
# ---he

# rpad 用指定的字符实现左填充指定长度
select rpad('he', 5, '-*');
# he-*-

# replace 替换
select replace('abcabcabc', 'bc', '--'); # a--a--a--

#####################
# 数学函数
#####################

# round 四舍五入，第二个参数是小数点后保留的位数
select round(-1.55); # -2
select round(1.446, 2);
# 1.45

# ceil 向上取整
select ceil(1.001); # 2
select ceil(1.000); # 1
select ceil(-1.001);
# -1

# floor 向下取整
select floor(1.001); # 1
select floor(1.000); # 1
select floor(-1.001);
# -2

# truncate 小数点后截断几位
select truncate(1.297, 1); # 1.2
select truncate(1.297, 2);
# 1.29

# mod 取余和%同理，符号与被除数一样
select mod(10, -3); # 1
select mod(-10, -3); # -1
select mod(-10, 3); # -1
select 10 % 3; # 1

#####################
# 日期函数
#####################

# now 返回当前系统日期和时间
select now();
# 2020-07-08 12:29:56

# curdate,current_date 返回当前系统日期，不包括时间
select curdate();
# 2020-07-08

# curtime,current_time 返回当前时间，不包括日期
select curtime();
# 12:29:56

# year... 获取时间指定部分，年、月、日、小时、分钟、秒
select year(now()); # 2020
select month(now()); # 7
select monthname(now()); # July
select day(now()); # 8
select dayname(now()); # Wednesday
select hour(now()); # 12
select minute(now()); # 29
select second(now()); # 56
select month(order_date)
from orders;

# str_to_date 将日期格式的字符转换成指定格式的日期
select str_to_date('1-9-2021', '%d-%c-%Y'); # 2020-09-01
select *
from orders
where order_date = str_to_date('2005-09-01', '%Y-%m-%d');

# date_format 将日期转换成指定格式的字符
select date_format(now(), '%Y年%m月%d日'); # 2020年09月01日
select order_num orderid, date_format(order_date, '%Y/%m') ordermonth
from orders;

#####################
# 聚集函数
#####################

# 计算产品价格平均值
select avg(prod_price) as avgprice
from products;

# 计算供应商id为 1003 提供的产品的平均价格
select avg(prod_price) as avgprice
from products
where vend_id = 1003;

# 计算价格最大的产品价格
select max(prod_price) as maxprice
from products;

# 计算顾客总数
select count(*)
from customers;

# 计算具有 email 的顾客数
select count(cust_email)
from cutomers;

# 计算产品价格总和
select sum(prod_price)
from products;

# 计算订单为 20005 的订单总额
select sum(item_price * quantity) totalprice
from orderitems
where order_num = 20005;

# 计算产品具有的不同的价格的平均数
select avg(distinct prod_price) avgprice
from products
where vend_id = 1003;

# 同时计算产品总数、价格最小值、最大值、平均数
select count(*) prodnums, min(prod_price) pricemin, max(prod_price) pricemax, avg(prod_price) priceavg
from products;
