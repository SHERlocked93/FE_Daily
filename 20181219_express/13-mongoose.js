const Student = require("./Student.js")
////实例化了一个学生类
//var xiaoming = new Student({"name":"小明","age":12,"sex":"男"});
////保存这个学生类
//xiaoming.save(function(){
//    console.log("存储成功");
//});

//用类来创建一个对象（工厂）
Student.create({ "name": "小帅", "age": 16, "sex": "男" }, function(error) {
  Student.zhaoren("小帅", function(err, result) {
    console.log(result)
  })
})

Student.xiugai({ "name": "小明" }, { $set: { "age": 30 } }, {}, function() {
  console.log("改年龄成功")
})
