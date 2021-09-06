select *
from customers;

# 使用 rollback 回滚 delete 语句
start transaction;
delete
from customers
where cust_id > 10005;

select *
from customers;

rollback;
select *
from customers;

# 删除订单详情表总中 20007 相关订单详情，再删除订单表中的 20007
start transaction;
delete
from orders
where order_num = 20009;
delete
from orderitems
where order_num = 20009;
commit;

# 再去查询会发现订单信息已经被删除
select *
from orders;

select *
from orderitems;

