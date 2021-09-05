# 找出产品价格为 2.5 的产品名字
select prod_name, prod_price
from products
where prod_price = 2.5;

# 找出产品价格小于等于 10 的产品名字，并按产品价格降序排列
select prod_name, prod_price
from products
where prod_price <= 10
order by prod_price desc;

# 找到供应商 id 不为 1003 的产品，!= 和 <> 含义一样，都是不等于
select vend_id, prod_name
from products
where vend_id <> 1003;


# 查询产品价格在 3 到 10 内的产品
select prod_name, prod_price
from products
where prod_price between 3 and 10;

# 单独使用 and 也可以打到这个效果
select prod_name, prod_price
from products
where prod_price <= 10
  and prod_price >= 3;

# 找出顾客中邮箱不是 null 的顾客信息
select *
from customers
where cust_email is not null;

# 使用安全等于号来判断 null 也是可以的
select *
from customers
where cust_email <=> null;


# 找出供应商为 1003 提供的价格小于等于 10 的产品
select *
from products
where vend_id = 1003
  and prod_price <= 10;


# 找出id为 1003 或 1001 的供应商
select *
from products
where vend_id = 1003
   or vend_id = 1001;

# 在 `and` 和 `or` 同时出现时，会优先处理 `and`，比如这句
select *
from products
where vend_id = 1001
   or vend_id = 1003 and prod_price >= 10;

# 遇到这种情况，可以通过增加圆括号
select *
from products
where (vend_id = 1001 or vend_id = 1003)
  and prod_price >= 10;


# 找出id为 1003 或 1001 的供应商
select *
from products
where vend_id in (1001, 1003);


# 找出id不为 1001 1003 的产品
select *
from products
where vend_id not in (1001, 1003);

# 选择产品价格不在 5 到 15 之间的产品
select *
from products
where prod_price not between 5 and 15;

# 找出产品名字以 jet 开头的产品
select *
from products
where prod_name like 'jet%';

# 找出产品名中含有 on 的产品
select *
from products
where prod_name like '%on%';

# 找出产品名以 s 开头，以 e 结束的产品
select *
from products
where prod_name like 's%e';

select *
from products
where prod_name like '_ ton anvil';


# 找到描述中有 % 的产品
select *
from products
where prod_desc like '%\%%';

# 找到产品名以 1000 或 anvil 结尾的产品
select *
from products
where prod_name regexp '1000|anvil$';


# 找到产品名以 . 字符开头的产品
select *
from products
where prod_name regexp '^\\.';
