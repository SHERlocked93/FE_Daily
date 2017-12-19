/**
 * Created by SHERlocked on 2017/9/28
 */

function Universe() {
  let a = 1
  this.c = 3
  const instance = this
  Universe = function() {
    let b = 2
    return instance
  }
}

const uni1 = new Universe()
const a = 1
const uni2 = new Universe()
const uni3 = new Universe()
console.log(uni1 === uni2)
