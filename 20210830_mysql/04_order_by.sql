# 按item_price升序排列
select * from orderitems order by item_price;           

# 先按 quantity 升序排列，quantity 的值一样时按 item_price 的值升序排列
select * from orderitems order by quantity,item_price;

# 先按 quantity 降序排列，quantity 的值一样时按 item_price 的值升序排列
select * from orderitems order by quantity desc,item_price;

# 找到最贵订单
select * from orderitems order by item_price desc limit 1;
