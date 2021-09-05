# 创建表 customers
create table customers
(
    cust_id      int       not null auto_increment,
    cust_name    char(50)  not null,
    cust_address char(50)  null,
    cust_city    char(50)  null,
    cust_state   char(5)   null,
    cust_zip     char(10)  null,
    cust_country char(50)  null default 'ZH', # 指定默认值
    cust_contact char(50)  null,
    cust_email   char(255) null,
    primary key (cust_id)                     # 指定主键
) engine = InnoDB;

# 给供应商表增加一列 vend_phone 字段
alter table vendors
    add vend_phone char(20) default 12212341234;

# 删除这个添加的 vend_phone 字段
alter table vendors
    drop column vend_phone;

# 将订单信息表的 order_num 设置为订单表的外键
alter table orderitems
    add constraint fk_orderitems_orders foreign key (order_num) references orders (order_num);

# 直接删除外键行报错，不允许删
delete
from orders
where order_num = 20009;

# 先删除 orderitems 中的关联行再删除 orders 中的外键行，就可以删了
delete
from orders
where order_num = 20009;
delete
from orderitems
where order_num = 20009;

# 删除表
drop table customers2;

# 删除一个表，如果没加 if exists 表又不存在则会报错
drop table if exists customers2;

# 重命名一个表
rename table customers to customers2;

# 重命名多个表
rename table customers to customers2,
    vendors to vendors2;
