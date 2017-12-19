/**
 * Created by SHERlocked on 2017/6/29.
 */

//hide()
//$(function () {
//	$("p").click(function () {
//		$(this).hide();
//	});
//});


$(function () {
	//$("div p").click(function () {
	//	$(this).html("么么哒");
	//});


	//$(".s").css("color", "gold");

	//$(".s,.m").css("color", "orange");


	//$("#btn").click(function () {
	//	$(".mover").toggleClass("colored");
	//});


	//(function animIt() {
	//	$(".mover").slideToggle("slow", animIt);
	//})();


	//$("td:lt(4)").css("color", "red");


	//$("tr:first-child").css("color", "red");


	//$("td:contains(5)").addClass("colored");


	//$("td:empty").addClass("colored");


	//$("td:has(p)").addClass("colored");


	//$("P").dblclick(function () {
	//	alert($(this).html());
	//});

	//$(window).resize(function () {
	//	alert("页面大小发生改变");
	//})

	//$("#btn2").bind("click", function () {      //不推介使用了，推介使用on()
	//	alert("haha");
	//});


	//$("#btn2").bind({
	//	click: function () {
	//		alert("click");
	//	},
	//	mouseover: function () {
	//		alert("mouseover");
	//	}
	//});


	//$(".o").bind({
	//	mouseover: function () {
	//		$(this).addClass("colored");
	//	},
	//	mouseout: function () {
	//		$(this).removeClass("colored");
	//	}
	//});


	//$(".o").bind("mouseover mouseout", function () {
	//	$(this).toggleClass("colored");
	//});


	//$("div").delegate("p", "click", function () {       //不推介使用了
	//	alert($(this).html());
	//});

	//var fn = function () {
	//	alert(this.innerHTML);
	//};
	//$("div").one("click mouseover", "p", fn);
	//
	//$("div").off("mouseover", "p", fn);


	//$("div").on("click", function (e) {
	//	console.log($(e.currentTarget));
	//	console.log($(e.target));
	//	console.log($(this));
	//});


	//$("div").on("click", "p", function (e) {
	//	console.log($(this).html());
	//	console.log($(e.delegateTarget));
	//});

	//$("div").on("mouseover", function (e) {
	//	console.log(e.type + ":  pagex=" + e.pageX + "   pagey=" + e.pageY);
	//});

	//$("a").on("click", function (e) {
	//	e.preventDefault();
	//	alert("hahha");
	//});


	//$("#target-form").submit(function (e) {
	//	alert("提交"+e.type);
	//});

	//var name = $(".o").attr("name");
	//$(".p").text(name);

	//
	//$("h1").addClass("colored daf");
	//
	//console.log($("h1").prop("class"));
	//
	//$("h1").removeAttr("class");
	//console.log($("h1").prop("class"));
	//
	//$(".mover").unwrap("p");


	//$("<span>span</span>").replaceAll("p");

	//$("p").eq(-1).css("color", "blue");
	//$("p").filter(":even").css("color", "blue");

	$("#btn2").click(function () {
		$("p").toggle("slow");
	});
});




