// let [a, b, c, ...d] = [1, 2, 3, 4, 5, 6]
// console.log(`${a}+${b}+${c}+${d}`)
//
//
// function f() {
//   console.log('aaa')
// }
//
// let [x = f()] = [1]
// console.log(x)
//
// let baz
// ({ foo: baz } = { foo: 'aaa', bar: 'bbb' })
// console.log(baz)
// var con = require('./test')
// console.log(con())
//
//
// let { valueOf: val, toString: str } = 'my string'
// console.log(`${val}+${str}`)
//
// function mov({ x = 3, y = 5 } = {}) {
//   return [x, y]
// }
// console.log(mov({ x: 1, y: 2 }))
// console.log(mov({ x: undefined, y: null }))
// console.log(mov({}))
// console.log(mov())
// console.log(mov(null))      // 报错
//
//
// function move({ x, y } = { x: 0, y: 0 }) {
//   return [x, y];
// }
//
// console.log(move({ x: 3, y: 8 })) // [3, 8]
// console.log(move({ x: 3 })); // [3, undefined]
// console.log(move({})) // [undefined, undefined]
// console.log(move()) // [0, 0]
// console.log(move(null))


// let { x, y } = { x: 2, y: 4 }
// console.log(`1+ ${x} ++ ${y}`)

// let func = (name) => console.log(`hello ${name}`)
// func('Jim')


// var a = 5;
// var b = 10;
// function tag(s, v1, v2) {
//   console.log(s[0]);
//   console.log(s[1]);
//   console.log(s[2]);
//   console.log(v1);
//   console.log(v2);
//
//   return "OK";
// }
// tag`Hello ${ a + b } world ${ a * b}`;


// let obj= { '0': 1, '1': 2, '2': 3, '3': 4 }
// console.log(Array.from(obj))

// function so() {
//   console.log(arguments)
//   let b = Array.from(arguments)
//   console.log(b)
// }
// so(1, 2, 3, 4)


// function log(x, y='world') {
//   console.log(`${x}+${y}`)
// }
// log('hello', '')

// let foo='outer'
// function bar(func = x => foo) {
//   let foo='inner'
//   console.log(func())
// }
// bar()

// function push(arr, ...items) {
//   arr.push(...items)
//   console.log(arr)
// }
// push([], 1, 2, 4)


// let propKey = 'foo';
// let obj = {
//   [propKey]: true,
//   ['a' + 'bc']: 123
// };
// console.log(obj)


// let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
// console.log(`${x}+${y}+${z}`)


// let handeler = {}
// let { proxy, revoke } = Proxy.revocable({}, handeler)
// proxy.foo = 123
// console.log(proxy)
// revoke()
// console.log(proxy)

// let a = {}
// let wm = new WeakMap().set(a, 2)
// wm.set(a, wm.get(a) - 1)
// console.log(wm)

/*region iterator*/
// let iterable = {
//   0: 'a',
//   b: 'b',
//   1: 'c',
//   length: 3,
//   [Symbol.iterator]: [][Symbol.iterator]
// };
// for (let item of iterable) {
//   console.log(item); // 'a', 'b', 'c'
// }

/* endregion */

/* region Generator */

// function* foo() {
//   yield 123
//   yield 234
//   return 'ending'
// }
// for (let obj1 of foo()) {
//   console.log(obj1)
// }

// function* fibonacci() {
//   let [pre, cur] = [0, 1]
//   while (true) {
//     [pre, cur] = [cur, pre + cur]
//     yield cur
//   }
// }
// for (let obj of fibonacci()) {
//   if (obj > 1000) break
//   console.log(obj)
// }

// let big = function* () {
//   for (let i = 0; i < 1000; i++) {
//     yield i
//   }
// }
// let squared = Array.from(big()).map(n => n ** 3)
// console.log(squared[3])

// let clock = function* (i = 1) {
//   while (i++ < 20) {
//     yield 'Tick!'
//     yield 'Tock!'
//   }
// }
// for (let obj of clock()) {
//   console.log(obj)
// }


// let Ajax = {
//   get: function(url, fn) {
//     let obj = new XMLHttpRequest()    // XMLHttpRequest对象用于在后台与服务器交换数据
//     obj.open('GET', url, true)
//     obj.onreadystatechange = function() {
//       if (obj.readyState === 4 && obj.status === 200 || obj.status === 304) {   // readyState == 4说明请求已完成
//         fn.call(this, obj.responseText)     //从服务器获得数据
//       }
//     }
//     obj.send()
//   }
// }
// function* main() {
//   let result = yield request('http://172.16.15.162:8080/mes-web/scada/scadaInfo')
//   let resq = JSON.parse(result)
//   console.log(resq)
// }
// function request(url) {
//   Ajax.get(url, function(response) {
//     it.next(response)
//   })
// }
// let it = main()
// it.next()


// function* parallel() {
//   console.log('vv')
//   let [text1, text2] = yield [taskA(), taskB()]
//   console.log('mm',text1,text2)
// }
// function taskA() {
//   console.log('taskAA')
//   return 1
// }
// function taskB() {
//   console.log('taskBB')
//   return 2
// }
// let c = parallel()
// console.log(c.next())
// console.log(c.next([5, 6]))

/*endregion*/

/*region Promise*/
// let p1 = new Promise(function(resolve, reject) {
//   setTimeout(() => reject(new Error('fail ~~')), 3000)
// })
// let p2 = new Promise(function(resolve, reject) {
//   setTimeout(() => resolve(p1), 1000)
// })
// p2.then(result => console.log(result))
//     .catch(error => console.log(error))

// const someAsyncThing = function() {
//   return new Promise(function(resolve, reject) {
//     // 下面一行会报错，因为x没有声明
//     resolve(x + 2);
//   });
// };
// someAsyncThing().then(function() {
//   console.log('everything is great');
// });


// var someAsyncThing = function() {
//   return new Promise(function(resolve, reject) {
//     // 下面一行会报错，因为x没有声明
//     resolve(x + 2)
//   })
// }
/*endregion*/

/* region Class*/
// class Person {
//   constructor(age) {
//     this.age = age
//   }
// }
// let person = new Person(5)
// class Leader extends Person {
//   constructor(age, pay) {
//     super(age)
//     this.pay = pay
//   }
// }
// let leader = new Leader(10, 200)
// class BigLeader extends Leader {
//   constructor(age, pay, big) {
//     super(age)
//     this.pay = pay
//     this.big = big
//   }
// }
// let bigLeader = new BigLeader(10, 200, 999)


// function mix(...mixins) {
//   class Mix {}
//   for (let mixin in mixins) {
//     copyProp(Mix, mixin)
//     copyProp(Mix.prototype, mixin.prototype)
//   }
//   return Mix
// }
// function copyProp(target, source) {
//   for (let key of source) {
//     if (key !== 'constructor'
//         && key !== 'name'
//         && key !== 'prototype') {
//       let desc = Object.getOwnPropertyDescriptor(source, key)
//       Object.defineProperty(target, key, desc)
//     }
//   }
// }
// /**
//  * 使用：mix函数可以将多个对象合成为一个类，使用时候只需继承这个类
//  */
// class DestributedEdit extends mix(class1,class2){}


/*endregion*/