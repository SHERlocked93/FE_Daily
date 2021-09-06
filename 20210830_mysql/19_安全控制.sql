use mysql;
show tables;
select user from user;

# 创建用户及其密码
create user zhangsan identified by '888888';

# 更改用户名
rename user zhangsan to lisi;

# 删除用户
drop user if exists lisi;

# 显示用户张三的权限
show grants for zhangsan;

# 设置权限，允许张三在 mysql_demo1 库上使用 select
grant select on mysql_demo1.* to zhangsan;

# 撤销权限，撤销张三在 mysql_demo1 库上使用 select 的权限
revoke select on mysql_demo1.* from zhangsan;
