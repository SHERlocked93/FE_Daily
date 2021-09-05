# 插入一条数据到顾客表中
insert into customers
values (null, 'Zhang San', '001 street', 'ShangHai', 'SH', '666666', 'ZH', null, null);

# 安全但繁琐的插入方式
insert into customers(cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country, cust_contact, cust_email)
values ('Zhang San', '001 street', 'ShangHai', 'SH', '666666', 'ZH', null, null);

# 插入多个行
insert into customers(cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country, cust_contact, cust_email)
values ('Zhang San', '001 street', 'ShangHai', 'SH', '666666', 'ZH', null, null),
       ('Li Si', '002 street', 'BeiJing', 'BJ', '878787', 'ZH', null, '123123@163.com');

# 从别的表中找出数据，并插入 customers 表中
insert into customers(cust_id, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country, cust_contact, cust_email)
select id,
       name,
       address,
       city,
       state,
       zip,
       country,
       contact,
       email
from custnew;

# 更新 id 为 10005 的用户的信息
update customers
set cust_email = '888@qq.com'
where cust_id = 10005;

# 更新多个字段
update customers
set cust_email   = '666@qq.com',
    cust_contact = 'S Zhang'
where cust_id = 10005;

# 删除顾客表中顾客 id 为 10008 的行
delete
from customers
where cust_id = 10008;
