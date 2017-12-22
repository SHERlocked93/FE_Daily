// 运动模块
class Speed {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  
  run() {
    console.log(`运动起来 ${this.x} + ${this.y}`)
  }
}

class Color {
  constructor(cl) {
    this.color = cl
  }
  
  draw() {
    console.log(`绘制颜色 ${this.color}`)
  }
}

class Speak {
  constructor(wd) {
    this.word = wd
  }
  
  say() {
    console.log(`说话 ${this.word}`)
  }
}

// 创建球类，可以着色和运动
class Ball {
  constructor(x, y, cl) {
    this.speed = new Speed(x, y)
    this.color = new Color(cl)
  }
  
  init() {
    this.speed.run()
    this.color.draw()
  }
}

class Man {
  constructor(x, y, wd) {
    this.speed = new Speed(x, y)
    this.speak = new Speak(wd)
  }
  
  init() {
    this.speed.run()
    this.speak.say()
  }
}

const man = new Man(1, 2, 'hehe?')

man.init()// 运动起来 1 + 2      说话 hehe?
