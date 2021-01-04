"use strict";
// function hello(a?: string): void {
//     console.log('hello world')
// }
//
// let a: string | null = null
// // a = undefined
//
// const intr: Array<string | number> = [1, 'da']
// const b: [null, string] = [null, '12']
// const root: HTMLElement | null = document.getElementById('root')
//
// root!.style.color = 'red'
//
// hello()
//
// let c: string | number = '2'
// ;(c as string).toLowerCase()
//
// type GetUserNameType = (firstName: string, lastName: string) => { name: string }
//
// const hello1: GetUserNameType = (firstName: string, lastName: string): { name: string } => {
//     return { name: firstName + lastName }
// }
//
// function hello2(name: string, age: number, home?: string) {
//     return ''
// }
//
// hello2('1', 2, undefined)
//
// namespace aa {
//     class Person {
//         constructor(public readonly name: string) {}
//     }
//
//     const p = new Person('123')
//     console.log(p.name)
// }
// namespace ab {
//     interface Person {
//         xx: string,
//         yy: string
//     }
//
//     function enhancer(target: any) {
//         target.xx = 'tom'
//     }
//
//     @enhancer
//     class Person {
//         constructor() {}
//     }
//
//     const p = new Person()
//     console.log(p.xx)
//     console.log(p.yy)
// }
// function toNumber(target: any, methodName: string, propertyDescriptor: PropertyDescriptor) {
//     const oldMethod = target
//     propertyDescriptor.value = (...rest: any[]) => {
//         return rest.reduce((acc, item) => acc + +item, 0)
//     }
// }
//
// class Person {
//     @toNumber
//     static getSum(...rest: any[]) {
//         return rest.reduce((acc, item) => acc + item, 0)
//     }
// }
//
// console.log(
//   Person.getSum(1, '2', '3')
// )
// namespace a {
//     function createArray<T>(length: number, value: T): Array<T> {
//         let result: Array<T> = [];
//         for (let i = 0; i < length; i++) {
//             result[i] = value;
//         }
//         return result;
//     }
//
//     let result = createArray<string>(3, 'd');
//     console.log(result);
// }
// interface Calculate {
//     <T>(a: T, b: T): T
// }
//
// let add: Calculate = function <T>(a: T, b: T): T {
//     return a
// }
//
// console.log(
//   add<number>(2, 3)
// )
var Hello;
(function (Hello) {
    Hello[Hello["sua"] = 0] = "sua";
    Hello[Hello["sum"] = 1] = "sum";
    Hello[Hello["ss"] = 5] = "ss";
    Hello[Hello["zs"] = 6] = "zs";
})(Hello || (Hello = {}));
var a = Hello.zs;
console.log(a);
