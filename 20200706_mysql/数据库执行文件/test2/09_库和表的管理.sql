#DDL语言
/*
说明：Data Define Language数据定义语言,用于对数据库和表的管理和操作



*/

#---------------------------库的管理------------------------√

#一、创建数据库
CREATE DATABASE stuDB;
CREATE DATABASE IF NOT EXISTS stuDB;


#二、删除数据库

DROP DATABASE stuDB;

DROP DATABASE IF EXISTS stuDB;





#---------------------------表的管理------------------------


#一、创建表 ★
语法：
CREATE TABLE [IF NOT EXISTS] 表名(
	字段名  字段类型  【字段约束】,
	字段名  字段类型  【字段约束】,
	字段名  字段类型  【字段约束】,
	字段名  字段类型  【字段约束】,
	字段名  字段类型  【字段约束】
	

);


案例：没有添加约束


CREATE TABLE IF NOT EXISTS stuinfo(
	stuid INT ,
	stuname VARCHAR(20),
	stugender CHAR(1),
	email VARCHAR(20),
	borndate DATETIME

);


案例：添加约束
DROP TABLE IF EXISTS stuinfo;
CREATE TABLE IF NOT EXISTS stuinfo(
	stuid INT PRIMARY KEY,#添加了主键约束
	stuname VARCHAR(20) UNIQUE NOT NULL,#添加了唯一约束+非空
	stugender CHAR(1) DEFAULT '男',#添加了默认约束
	email VARCHAR(20) NOT NULL,
	age INT CHECK( age BETWEEN 0 AND 100),#添加了检查约束，mysql不支持
	majorid INT,
	CONSTRAINT fk_stuinfo_major FOREIGN KEY (majorid) REFERENCES major(id)#添加了外键约束

);






#一）数据类型：

1、整型
TINYINT SMALLINT  INT  BIGINT 

2、浮点型
FLOAT(m,n)
DOUBLE(m,n) 
DECIMAL(m,n)
m和n可选



3、字符型

CHAR(n):n可选
VARCHAR(n)：n必选
TEXT
n表示最多字符个数



4、日期型

DATE TIME  DATETIME TIMESTAMP


5、二进制型

BLOB 存储图片数据


#二）常见约束
说明：用于限制表中字段的数据的，从而进一步保证数据表的数据是一致的、准确的、可靠的！

NOT NULL 非空：用于限制该字段为必填项
DEFAULT 默认：用于限制该字段没有显式插入值，则直接显式默认值
PRIMARY KEY 主键：用于限制该字段值不能重复，设置为主键列的字段默认不能为空
	一个表只能有一个主键，当然可以是组合主键
	
UNIQUE 唯一：用于限制该字段值不能重复
		字段是否可以为空		一个表可以有几个
		
	主键	×				1个
	唯一    √				n个
CHECK检查：用于限制该字段值必须满足指定条件
	CHECK(age BETWEEN 1 AND 100)
	
	
FOREIGN KEY 外键:用于限制两个表的关系,要求外键列的值必须来自于主表的关联列
	要求：
	①主表的关联列和从表的关联列的类型必须一致，意思一样，名称无要求
	②主表的关联列要求必须是主键
	
	





#二、修改表[了解]

语法：ALTER TABLE 表名 ADD|MODIFY|CHANGE|DROP COLUMN 字段名 字段类型 【字段约束】;

#1.修改表名

ALTER TABLE stuinfo RENAME TO students;


#2.添加字段
ALTER TABLE students ADD COLUMN borndate TIMESTAMP NOT NULL;

DESC students;


#3.修改字段名

ALTER TABLE students CHANGE COLUMN borndate birthday DATETIME NULL;




#4.修改字段类型


ALTER TABLE students MODIFY COLUMN birthday TIMESTAMP ;


#5.删除字段

ALTER TABLE students DROP COLUMN birthday;

DESC students;



#三、删除表 √

DROP TABLE IF EXISTS students;


#四、复制表√


#仅仅复制表的结构

CREATE TABLE newTable2 LIKE major;

#复制表的结构+数据

CREATE TABLE newTable3 SELECT * FROM girls.`beauty`;


#案例：复制employees表中的last_name,department_id,salary字段到新表 emp表，但不复制数据

CREATE TABLE emp 
SELECT last_name,department_id,salary 
FROM myemployees.`employees`
WHERE 1=2;












