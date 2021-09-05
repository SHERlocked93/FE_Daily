# 创建一个计算平均价格的存储过程
create procedure product_pricing(vend_id int)
begin
    select avg(prod_price) as priceaverage
    from products
    where products.vend_id = vend_id;
end;

show create procedure product_pricing;

# 调用存储过程查询平均价格
call product_pricing(1002);

# 删除存储过程
drop procedure product_pricing;

# 先检查再删除
drop procedure if exists product_pricing;

# 存储过程输入输出参数
create procedure product_pricing(
    in vend_id int,
    out min_price decimal(8, 2),
    out max_price decimal(8, 2),
    out avg_price decimal(8, 2)
)
begin
    select min(prod_price)
    into min_price
    from products
    where products.vend_id = vend_id;
    select max(prod_price)
    into max_price
    from products
    where products.vend_id = vend_id;
    select avg(prod_price)
    into avg_price
    from products
    where products.vend_id = vend_id;
end;

# 调用存储过程查询平均价格
call product_pricing(1002, @minprice, @maxprice, @avgprice);

# 查询刚刚输出的变量
select @minprice, @maxprice, @avgprice;

select *
from orderitems;

# 计算指定订单号的总价格，并输出到变量中
create procedure order_pricing(
    in order_num int,
    out total_price decimal(8, 2)
)
begin
    select sum(quantity * item_price)
    into total_price
    from orderitems
    where orderitems.order_num = order_num;
end;

# 计算订单 20005 的总价
call order_pricing(20005, @totalprice);

# 查询总价
select @totalprice;
drop procedure if exists order_pricing;


# 创建一个查询订单总金额的视图
create or replace view sum_order_price as
select sum(quantity * item_price) as total_price, order_num
from orderitems
group by order_num;

select *
from orderitems;

# 查询订单 20005 的总金额
select total_price
from sum_order_price
where order_num = 20005;

drop procedure if exists total_discount_price;

# 总商品数量 3 件 8 折，4 件 7 折,计算折扣后的产品价格，
create procedure total_discount_price(
    in order_num int,
    out discount_price decimal(8, 2)
)
    comment 'Count total price with discount,3 pieces 20% off, 4 pieces 30% off'
begin
    # 创建一个变量保存商品总数
    declare prod_count int;

    select sum(quantity)
    into prod_count
    from orderitems
    where orderitems.order_num = order_num;

    # 小于 3 件无折扣
    if prod_count < 3 then
        select total_price
        into discount_price
        from sum_order_price o
        where o.order_num = order_num;
        # 等于 3 件 8 折
    elseif prod_count = 3 then
        select total_price * 0.8
        into discount_price
        from sum_order_price o
        where o.order_num = order_num;
        # 大于等于 3 件 7 折
    else
        select total_price * 0.7
        into discount_price
        from sum_order_price o
        where o.order_num = order_num;
    end if;
end;

# 调用存储过程查询折扣后的金额
call total_discount_price(20007, @discountprice);

select @discountprice;

show procedure status;
