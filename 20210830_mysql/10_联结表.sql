# 列出产品的供应商及其价格
select vend_name, prod_name, prod_price
from vendors,
     products
where vendors.vend_id = products.vend_id
order by prod_price desc;


# 返回两个表长度乘积行，笛卡尔积
select vend_name, prod_name, prod_price
from vendors,
     products;

# 联结多个表
# 将订单 20005 的产品信息、订单信息、供应商信息找出来
select prod_name, vend_name, prod_price, quantity
from orderitems,
     products,
     vendors
where products.vend_id = vendors.vend_id
  and orderitems.prod_id = products.prod_id
  and order_num = 20005;

# 使用联结来实现 9.1 的例子
select customers.cust_id, cust_name
from orders,
     customers,
     orderitems
where orders.order_num = orderitems.order_num
  and customers.cust_id = orders.cust_id
  and prod_id = 'TNT2'; # 由于三个表中只有一个表有 prod_id，所以不需要限定表名

# 把前面这个句子起别名
select c.cust_id, cust_name
from orders o,
     customers c,
     orderitems oi
where o.order_num = oi.order_num
  and c.cust_id = o.cust_id
  and prod_id = 'TNT2';

# 内部联结 inner join
# 列出产品的供应商及其价格
select vend_name, prod_name, prod_price
from vendors
         inner join products
                    on vendors.vend_id = products.vend_id;


# 先找到产品 ID 为 TNT1 的供应商 ID，然后找到对应供应商 ID 提供的产品列表
select prod_id, prod_name, vend_id
from products
where vend_id in (
    select vend_id
    from products
    where prod_id = 'TNT1'
);

# 自联结
select p1.prod_id, p1.prod_name, p1.vend_id
from products p1,
     products p2
where p1.vend_id = p2.vend_id
  and p2.prod_id = 'TNT1';

# 自然联结
# 自选择唯一的通配符只对第一个表使用。所有其他列明确列出，所以没有重复的列被检索出来。
select v.*, p.prod_id
from vendors v,
     products p
where v.vend_id = p.vend_id;

# 内部联结，查找用户对应的订单
select c.cust_id, o.order_num
from customers c
         inner join orders o
                    on c.cust_id = o.cust_id;

# 左外部联结，将没有下单过的顾客行也列出来
select c.cust_id, o.order_num
from customers c
         left outer join orders o
                         on c.cust_id = o.cust_id;

# 右外部联结，列出所有订单及其顾客，这样没下单过的顾客就不会被列举出来
select c.cust_id, o.order_num
from customers c
         right outer join orders o
                          on c.cust_id = o.cust_id;

# 使用带聚集函数的联结
# 找到每个顾客所下订单的数量，并降序排列
select c.cust_id, c.cust_name, count(o.order_num) count_orders
from customers c
         left outer join orders o on c.cust_id = o.cust_id
group by c.cust_id
order by count_orders desc;
