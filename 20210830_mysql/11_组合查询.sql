# 比如需要列出商品价格小于等于 10 而且是供应商 ID 为 1005 或 1003 的产品信息
select prod_id, prod_name, prod_price, vend_id
from products
where prod_price <= 10
union
select prod_id, prod_name, prod_price, vend_id
from products
where vend_id in (1005, 1003);

# 实际上这句也可以通过 where 语句代替
select prod_id, prod_name, prod_price
from products
where prod_price <= 10
   or vend_id in (1005, 1003);

# 不去重重复行
select prod_id, prod_name, prod_price, vend_id
from products
where prod_price <= 10
union all
select prod_id, prod_name, prod_price, vend_id
from products
where vend_id in (1005, 1003);
