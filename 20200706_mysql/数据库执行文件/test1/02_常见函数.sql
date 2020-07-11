#进阶4：常见函数
/*
函数：类似于java中学过的“方法”，
为了解决某个问题，将编写的一系列的命令集合封装在一起，对外仅仅暴露方法名，供外部调用

1、自定义方法(函数)
2、调用方法(函数)★
	叫什么  ：函数名
	干什么  ：函数功能
	

常见函数：
单行函数
	字符函数
		concat
		substr
		length（str）
		char_length
		upper
		lower
		trim
		left
		right
		lpad
		rpad
		instr
		strcmp
	数学函数
		abs
		ceil
		floor
		round
		truncate
		mod
		
	日期函数
		now 
		curtime
		curdate
		datediff
		date_format
		str_to_date
		
	流程控制函数
		if
		case






*/

#一、字符函数
1、CONCAT 拼接字符

SELECT CONCAT('hello,',first_name,last_name)  备注 FROM employees;

2、LENGTH 获取字节长度

SELECT LENGTH('hello,郭襄');

3、CHAR_LENGTH 获取字符个数
SELECT CHAR_LENGTH('hello,郭襄');

4、SUBSTRING 截取子串
/*
注意：起始索引从1开始！！！
substr(str,起始索引，截取的字符长度)
substr(str,起始索引)
*/
SELECT SUBSTR('张三丰爱上了郭襄',1,3);
SELECT SUBSTR('张三丰爱上了郭襄',7);

5、INSTR获取字符第一次出现的索引

SELECT INSTR('三打白骨精aaa白骨精bb白骨精','白骨精');

6、TRIM去前后指定的字符，默认是去空格


SELECT TRIM(' 虚  竹    ')  AS a;
SELECT TRIM('x' FROM 'xxxxxx虚xxx竹xxxxxxxxxxxxxxxxxx')  AS a;

7、LPAD/RPAD  左填充/右填充
SELECT LPAD('木婉清',10,'a');
SELECT RPAD('木婉清',10,'a');

8、UPPER/LOWER  变大写/变小写

#案例：查询员工表的姓名，要求格式：姓首字符大写，其他字符小写，名所有字符大写，且姓和名之间用_分割，最后起别名“OUTPUT”


SELECT UPPER(SUBSTR(first_name,1,1)),first_name FROM employees;
SELECT LOWER(SUBSTR(first_name,2)),first_name FROM employees;
SELECT UPPER(last_name) FROM employees;

SELECT CONCAT(UPPER(SUBSTR(first_name,1,1)),LOWER(SUBSTR(first_name,2)),'_',UPPER(last_name)) "OUTPUT"
FROM employees;

9、STRCMP 比较两个字符大小

SELECT STRCMP('aec','aec');


10、LEFT/RIGHT  截取子串
SELECT LEFT('鸠摩智',1);
SELECT RIGHT('鸠摩智',1);


#二、数学函数

1、ABS 绝对值
SELECT ABS(-2.4);
2、CEIL 向上取整  返回>=该参数的最小整数
SELECT CEIL(-1.09);
SELECT CEIL(0.09);
SELECT CEIL(1.00);

3、FLOOR 向下取整，返回<=该参数的最大整数
SELECT FLOOR(-1.09);
SELECT FLOOR(0.09);
SELECT FLOOR(1.00);

4、ROUND 四舍五入
SELECT ROUND(1.8712345);
SELECT ROUND(1.8712345,2);

5、TRUNCATE 截断

SELECT TRUNCATE(1.8712345,1);

6、MOD 取余

SELECT MOD(-10,3);
a%b = a-(INT)a/b*b
-10%3 = -10 - (-10)/3*3   = -1

SELECT -10%3;
SELECT 10%3;
SELECT -10%-3;
SELECT 10%-3;


#三、日期函数


1、NOW
SELECT NOW();

2、CURDATE

SELECT CURDATE();

3、CURTIME
SELECT CURTIME();


4、DATEDIFF
SELECT DATEDIFF('1998-7-16','2019-7-13');

5、DATE_FORMAT

SELECT DATE_FORMAT('1998-7-16','%Y年%M月%d日 %H小时%i分钟%s秒') 出生日期;



SELECT DATE_FORMAT(hiredate,'%Y年%M月%d日 %H小时%i分钟%s秒')入职日期 
FROM employees;



6、STR_TO_DATE 按指定格式解析字符串为日期类型
SELECT * FROM employees
WHERE hiredate<STR_TO_DATE('3/15 1998','%m/%d %Y');



#四、流程控制函数


1、IF函数

SELECT IF(100>9,'好','坏');


#需求：如果有奖金，则显示最终奖金，如果没有，则显示0
SELECT IF(commission_pct IS NULL,0,salary*12*commission_pct)  奖金,commission_pct
FROM employees;



2、CASE函数

①情况1 ：类似于switch语句，可以实现等值判断
CASE 表达式
WHEN 值1 THEN 结果1
WHEN 值2 THEN 结果2
...
ELSE 结果n
END


案例：
部门编号是30，工资显示为2倍
部门编号是50，工资显示为3倍
部门编号是60，工资显示为4倍
否则不变

显示 部门编号，新工资，旧工资

SELECT department_id,salary,
CASE department_id
WHEN 30 THEN salary*2
WHEN 50 THEN salary*3
WHEN 60 THEN salary*4
ELSE salary
END  newSalary
FROM employees;


②情况2：类似于多重IF语句，实现区间判断
CASE 
WHEN 条件1 THEN 结果1
WHEN 条件2 THEN 结果2
...

ELSE 结果n

END



案例：如果工资>20000,显示级别A
      工资>15000,显示级别B
      工资>10000,显示级别C
      否则，显示D
      
 SELECT salary,
 CASE 
 WHEN salary>20000 THEN 'A'
 WHEN salary>15000 THEN 'B'
 WHEN salary>10000 THEN 'C'
 ELSE 'D'
 END
 AS  a
 FROM employees;   






