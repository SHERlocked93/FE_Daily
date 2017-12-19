/**
 * Created by SHERlocked on 2017/6/24.
 */

// 赋值
var str = "happy every day!";
var strA = "about 5'10\" long";
var strB = true;

// 数组
var beatles = ["John", "Paul", "George", "Ringo", true, 44, strA, [0, false, "my Dog", strB]];

var arr1 = [];
arr1["name"] = "John";

// 对象
var lennon = Object();
lennon.name = "Smith";
var lennon1 = {name: "Ringo", age: 78};

// 条件
var strC = false;
if (strC === "") {
	alert("xixi");
}

if ("") {
	alert("memeda");
}

// 循环
var strD = 1;
while (0) {
	alert(strD);
	strD--;
}

for (var strE = 0; strE < beatles.length; strE++) {
	//alert(beatles[strE]);
}

// 函数
function shout(para) {
	var beatlesA = [para, 44, [0, false, "my Dog", strB]];
	for (var strE = 0; strE < beatlesA.length; strE++) {
		// alert(beatles[strE]);
	}
}// shout("xixixi");

// 对象
var num = 7.454;
num = Math.round(num);
// alert(num);

var current_date = new Date();
var today = current_date.getDate();
// alert(today);

// window.open("http://www.baidu.com", "","", false);

alert(document.getElementById("header_h1").getAttribute("title"));
