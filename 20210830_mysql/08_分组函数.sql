# 分别查询每个供应商提供的产品种类数
select vend_id, count(*) num_prods
from products
group by vend_id;

# 查询每个供应商提供的产品的平均价格
select vend_id, avg(prod_price) avg_price
from products
group by vend_id;

# 找到提供大于 2 个产品的供应商，并列出其提供的产品数量，这里使用 having 来过滤掉产品数不大于2的供应商
select vend_id, count(*) prodcount
from products
group by vend_id
having prodcount > 2;

# 找到供应商提供的商品平均价格大于 10 的供应商，并且按平均价格降序排列
select vend_id, avg(prod_price) avgprice
from products
group by vend_id
having avgprice > 10
order by avgprice desc;

