#进阶8：分页查询
/*
应用场景：当页面上的数据，一页显示不全，则需要分页显示

分页查询的sql命令请求数据库服务器——>服务器响应查询到的多条数据——>前台页面



语法：

select 查询列表
from 表1 别名
join 表2 别名
on 连接条件
where 筛选条件
group by 分组
having 分组后筛选
order by 排序列表
limit 起始条目索引,显示的条目数

执行顺序：

1》from子句
2》join子句
3》on子句
4》where子句
5》group by子句
6》having子句
7》select子句
8》order by子句
9》limit子句


特点：
①起始条目索引如果不写，默认是0
②limit后面支持两个参数
参数1：显示的起始条目索引
参数2：条目数

公式：

假如要显示的页数是page，每页显示的条目数为size

select *
from employees
limit (page-1)*size,size;

page	size=10
1                       limit 0,10
2			limit 10,10
3			limit 20,10
4			limit 30,10


*/





#案例1：查询员工信息表的前5条
SELECT * FROM employees LIMIT 0,5;
#完全等价于
SELECT * FROM employees LIMIT 5;

#案例2：查询有奖金的，且工资较高的第11名到第20名
SELECT 
    * 
FROM
    employees 
WHERE commission_pct IS NOT NULL 
ORDER BY salary DESC
LIMIT 10,10 ;


#练习：查询年薪最高的前10名

SELECT last_name,salary,salary*12*(1+IFNULL(commission_pct,0)) 年薪
FROM employees
ORDER BY 年薪 DESC
LIMIT 0,10;














