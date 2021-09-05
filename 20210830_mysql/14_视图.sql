# 找到购买了 TNT2 的顾客信息
select cust_name, cust_contact, cust_email, prod_id
from customers c,
     orders o,
     orderitems oi
where c.cust_id = o.cust_id
  and o.order_num = oi.order_num
  and prod_id = 'TNT2';

# 创建 prod_cust 视图
create view prod_cust as
select cust_name, cust_contact, cust_email, prod_id
from customers c,
     orders o,
     orderitems oi
where c.cust_id = o.cust_id
  and o.order_num = oi.order_num;

# 使用视图查询购买了产品 TNT2 的顾客信息
select cust_name, cust_email
from prod_cust
where prod_id = 'TNT2';

# 创建视图
# create view prod_cust as ...;

# 查看创建视图的语句
show create view prod_cust;

# 删除视图
drop view prod_cust;

# 更新视图
# create or replace view prod_cust as ...;

# 经常用到的供应商信息，可以先组装成视图
create or replace view vend_infos as
select vend_id, concat(vend_name, '(', vend_city, ', ', vend_country, ')') vend_info
from vendors;

# 使用视图直接拿到拼好的供应商信息
select prod_id, prod_name, vend_info
from products,
     vend_infos
where products.vend_id = vend_infos.vend_id;

select *
from orders;

# 找到 email 不是 null 的顾客下的订单
select order_num, cust_name, cust_email
from customers,
     orders
where customers.cust_id = orders.cust_id
  and cust_email is not null;

# 创建邮箱地址不为 null 的顾客的视图
create view cust_has_email as
select *
from customers
where cust_email is not null;

# 找到 email 不是 null 的顾客下的订单
select order_num, cust_name, cust_email
from cust_has_email c,
     orders o
where c.cust_id = o.cust_id;

# 找到 email 不是 null 的顾客购买的所有商品列表
select c.cust_name, c.cust_email, c.cust_name, prod_name
from cust_has_email c,
     orders o,
     orderitems oi,
     products p
where c.cust_id = o.cust_id
  and oi.order_num = o.order_num
  and p.prod_id = oi.prod_id;

select *
from orderitems;

# 查找 20008 订单的订单总额
select order_num, sum(quantity * item_price) sum_price
from orderitems
where order_num = 20008;

# 查找订单总额视图
create or replace view sum_orders as
select order_num, sum(quantity * item_price) sum_price
from orderitems
group by order_num;

# 找另一个订单的总金额
select order_num, sum_price
from sum_orders
where order_num = 20007;

# 比如给上面的 email 不为 null 的视图添加一行数据
insert into cust_has_email(cust_id, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country, cust_contact)
values (10010, 'Zhang San', '001 street', 'ShangHai', 'SH', '9999', 'ZH', 'Li S');

# 给查找订单总额视图增加一行会失败，因为这里有分组，数据库不知道在哪插入
insert into sum_orders(order_num, order_item, prod_id, quantity, item_price)
values (20009, 5, 'OL1', 2, 8.99);

