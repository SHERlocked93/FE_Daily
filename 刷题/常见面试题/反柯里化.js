function unCurrying(func) {
    return function(tar, ...rest) {
        func.apply(tar, rest)
    }
}

/**************************/

var push = unCurrying(Array.prototype.push)

function execPush() {
    push(arguments, 4)
    console.log(arguments)
}

execPush(1, 2, 3)    // 输出: [1, 2, 3, 4]
