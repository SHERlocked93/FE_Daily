# 创建一个查询订单总金额的视图
create or replace view sum_order_price as
select sum(quantity * item_price) as total_price, order_num
from orderitems
group by order_num;

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

drop procedure if exists process_orders;

# 使用游标将每个订单的实际价格填写到一个表中
create procedure process_orders()
begin
    # 定义本地变量
    declare o_num int;                    # 循环中的订单号变量
    declare d_price decimal(8, 2);        # 循环中的实际价格变量
    declare done boolean default false;   # 终止条件布尔值

    # 定义游标
    declare order_numbers cursor for
        select order_num from orders;

    # 终止条件，当没有更多行供循环时满足 not found，此时给 done 赋值 true
    declare continue handler for not found set done = true;

    # 没有则创建一个新的表，用来存订单的实际价格
    create table if not exists ordertotals
    (
        order_num   int,
        order_price decimal(8, 2),
        primary key (order_num)
    );

    open order_numbers;         # 打开游标

    # 在循环中依次给表 ordertotals 填充行
    repeat
        fetch order_numbers into o_num;
        call total_discount_price(o_num, d_price);
        insert into ordertotals(order_num, order_price)
        values (o_num, d_price);
    until done end repeat;              # 满足 done 为真值则跳出循环

    close order_numbers;
end;

call process_orders();

select * from ordertotals;

truncate table ordertotals;
drop table ordertotals;

# 显示当前database中不包括视图的所有基表
select table_name
from information_schema.tables
where table_schema = 'mysql_demo1'
  and table_type = 'BASE TABLE';
