function New(func, ...rest) {
    const res = {}
    if (func.prototype !== null) {
        res.__proto__ = func.prototype
    }
    const ret = func.apply(res, rest)
    if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
        return ret
    }
    return res
}

/**************************/

function A() {}

A.prototype.fn = function() {}

console.log(New(A, 1, 2))
// equals to
console.log(new A(1, 2))
