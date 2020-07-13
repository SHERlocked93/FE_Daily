#一、查询每个专业的学生人数
select majorid, COUNT(*)
from student
group by majorid;

#二、查询参加考试的学生中，每个学生的平均分、最高分
select AVG(score), MAX(score), studentno
from result
group by studentno;

#三、查询姓张的每个学生的最低分大于60的学号、姓名
select s.studentno, s.studentname, MIN(score)
from student s
         join result r
              on s.studentno = r.studentno
where s.studentname like '张%'
group by s.studentno
having MIN(score) > 60;
#四、查询每个专业生日在“1988-1-1”后的学生姓名、专业名称

select m.majorname, s.studentname
from student s
         join major m
              on m.majorid = s.majorid
where DATEDIFF(borndate, '1988-1-1') > 0
group by m.majorid;


#五、查询每个专业的男生人数和女生人数分别是多少

select COUNT(*), sex, majorid
from student
group by sex, majorid;
#六、查询专业和张翠山一样的学生的最低分
#①查询张翠山的专业编号
select majorid
from student
where studentname = '张翠山'

#②查询编号=①的所有学生编号
select studentno
from student
where majorid = (
    select majorid
    from student
    where studentname = '张翠山'
)
#②查询最低分
select MIN(score)
from result
where studentno in (
    select studentno
    from student
    where majorid = (
        select majorid
        from student
        where studentname = '张翠山'
    )
)

#七、查询大于60分的学生的姓名、密码、专业名

select studentname, loginpwd, majorname
from student s
         join major m on s.majorid = m.majorid
         join result r on s.studentno = r.studentno
where r.score > 60;
#八、按邮箱位数分组，查询每组的学生个数
select COUNT(*), LENGTH(email)
from student
group by LENGTH(email);
#九、查询学生名、专业名、分数

select studentname, score, majorname
from student s
         join major m on s.majorid = m.majorid
         left join result r on s.studentno = r.studentno


#十、查询哪个专业没有学生，分别用左连接和右连接实现
#左
select m.majorid, m.majorname, s.studentno
from major m
         left join student s on m.majorid = s.majorid
where s.studentno is null;

#右
select m.majorid, m.majorname, s.studentno
from student s
         right join major m on m.majorid = s.majorid
where s.studentno is null;
#十一、查询没有成绩的学生人数

select COUNT(*)
from student s
         left join result r on s.studentno = r.studentno
where r.id is null










