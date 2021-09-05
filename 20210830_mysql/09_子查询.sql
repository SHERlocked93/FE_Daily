# 首先在 orderitems 表中找到产品 TNT2 对应的订单编号
select order_num
from orderitems
where prod_id = 'TNT2'

# 然后在 orders 表中找到订单编号对应的顾客 id
select cust_id
from orders
where order_num in (
    select order_num
    from orderitems
    where prod_id = 'TNT2');

# 然后去 customers 表中找到顾客 id 对应的顾客名字
select cust_id, cust_name
from customers
where cust_id in (
    select cust_id
    from orders
    where order_num in (
        select order_num
        from orderitems
        where prod_id = 'TNT2'));

# 相关子查询
# 首先找到用户 ID 对应的订单数量
select count(*)
from orders
where cust_id = 10003;

# 然后将其作为一个 select 子句，将用户 id
select cust_name,
       cust_state,
       (
           select count(*)
           from orders
           where orders.cust_id = customers.cust_id) as order_count
from customers
order by order_count desc;
