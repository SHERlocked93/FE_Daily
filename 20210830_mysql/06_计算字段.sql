# 使用 as 关键字
select cust_name as name
from customers;

# as 关键字也可以直接省略
select cust_name name
from customers;

# 可以给不同字段分别起别名
select cust_name name, cust_city location
from customers;

# 将供应商的名字和地点拼接好后返回，并命名为 vend
select concat(vend_name, '(', vend_country, ')') vend
from vendors;


# 将顾客信息拼接起来
select concat(cust_name, '(', ifnull(cust_email, '-'), ')') customerinfo
from customers;

# 将顾客信息处理后拼接起来
select concat(rtrim(vend_name), '(', trim(vend_country), ')') vend
from vendors;

# 计算订单总额，并按照总金额降序排列
select prod_id as id, quantity, order_item * item_price as totalprice
from orderitems
order by totalprice desc;
