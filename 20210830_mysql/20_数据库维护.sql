analyze table orders;

check table orders,orderitems;

# 查找错误日志
show variables like "log_error";

# 查找日常日志
show global variables like "%genera%";

# 打开日常日志查询
set global general_log = on;

# 查看二进制日志 binlog
show variables like "%log_bin%";

# 查看所有二进制日志
show master logs;

# 查找缓慢查询日志
show variables like "%slow%";
