# 语法
# create trigger [触发器名]
# [after/before] [insert/update/delete] on [表名]
# for each row
# begin
#  [sql语句]
# end;

# 删除
drop trigger if exists newproduct;

# 创建一个触发器，在新的产品插入时给临时变量赋值
create trigger newproduct
    after insert
    on products
    for each row select 'Product added'
                 into @newprod;

insert into products(prod_id, vend_id, prod_name, prod_price, prod_desc)
values ('XP2000', 1005, 'JetPack 200', 55, 'JetPack 200, multi-use');

select @newprod;

# 插入用户数据
insert into customers(cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country, cust_contact, cust_email)
values ('Zhang San', '001 street', 'ShangHai', 'SH', '666666', 'ZH', null, null);

drop trigger if exists newcust;
drop trigger if exists newcust2;

# 对于 `auto_increment` 自增列，在 `before` 中 `new` 中的值为 0，在 `after` 中为自动生成的自增值。
create trigger newcust2
    before insert
    on customers
    for each row select new.cust_id
                 into @newcust;
# 插入用户后获取这个新用户的 ID 并且赋值
create trigger newcust
    after insert
    on customers
    for each row select new.cust_id
                 into @newcust_after;
select *
from customers;

# 查看新值
select @newcust, @newcust_after;

drop trigger if exists deletecustomer;

# 创建触发器，当从顾客表中删除时将删除的数据插入到另一个存档表中
create trigger deletecustomer
    before delete
    on customers
    for each row
begin
    insert into customers2(cust_id, cust_name, cust_address, cust_city, cust_state, cust_zip, cust_country, cust_contact, cust_email)
    values (old.cust_id, old.cust_name, old.cust_address, old.cust_city, old.cust_state, old.cust_zip, old.cust_country, old.cust_contact, old.cust_email);
end;

# 删除刚刚创建的顾客数据
delete
from customers
where cust_id = 10013;

select *
from customers;

# 查询一下存档表中的顾客数据是否存在
select *
from customers2;

drop trigger if exists updatecustomer;

# 使用触发器，将每次更新的 cust_country 转化为大写
create trigger updatecustomer
    before update
    on customers
    for each row
begin
    set new.cust_country = upper(new.cust_country);
end;

# 更改数据
update customers
set cust_country ='zh'
where cust_id = 10005;

select *
from customers;

