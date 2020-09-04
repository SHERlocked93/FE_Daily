/*
 创建于 2020年9月2日 下午9:29:03
 作者: SHERlocked93
 功能: 有效的括号   https://leetcode.com/problems/valid-parentheses/
*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    const stack = []
    const map = { '(': -1, ')': 1, '{': -2, '}': 2, '[': -3, ']': 3 }
    for (let i = 0; i < s.length; i++) {
        if (map[s[i]] < 0) {
            stack.push(map[s[i]])
        } else {
            if (i === 0 && map[s[i]] > 0) return false
            if (stack[stack.length - 1] === -map[s[i]]) {
                stack.pop()
            } else return false
        }
    }
    return !stack.length
}

console.log(
  isValid('{()[]}')
)
