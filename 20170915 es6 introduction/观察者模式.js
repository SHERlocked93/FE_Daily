/**
 * Created by SHERlocked on 2017/10/12
 */
let publisher = {
  subscribers: {
    any: []
  },
  subscribe: function(fn, type = 'any') {
     if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = []
    }
    this.subscribers[type].push(fn)
  },
  unsubscribe: function(fn, type) {
    this.visitSubscribers('unsubscribe', fn, type)
  },
  publish: function(publication, type) {
    this.visitSubscribers('publish', publication, type)
  },
  visitSubscribers: function(action, arg, type = 'any') {
    let b=this.subscribers[type]
    this.subscribers[type].forEach((currentValue, index, array) => {
      if (action === 'publish') {
        currentValue(arg)
      } else if (action === 'unsubscribe') {
        if (currentValue === arg) {
          this.subscribers[type].splice(index, 1)
        }
      }
    })
  }
}

let funcA = function(cl) {
  console.log('msg1' + cl)
}
let funcB = function(cl) {
  console.log('msg2' + cl)
}
//
// publisher.subscribe(funcA)
// publisher.subscribe(funcB)
// publisher.unsubscribe(funcB)
//
// publisher.publish(' in publisher')


function makePublisher(o) {
  Object.keys(publisher).forEach((curr, index, array) => {
    if (publisher.hasOwnProperty(curr) && typeof publisher[curr] === 'function') {
      o[curr] = publisher[curr]
    }
  })
  o.subscribers={any:[]}
}


// 发行者对象
let paper = {
  daily: function() {
    this.publish('big news today')
  },
  monthly: function() {
    this.publish('interesting analysis', 'monthly')
  }
}

makePublisher(paper)

// 订阅对象
let joe = {
  drinkCoffee: function(paper) {
    console.log('Just read daily ' + paper)
  },
  sundayPreNap: function(monthly) {
    console.log('Reading this monthly ' + monthly)
  }
}

// paper.subscribe(joe.drinkCoffee)
// paper.subscribe(joe.sundayPreNap, 'monthly')
//
// paper.daily() // Just read daily big news today
// paper.monthly() // Reading this monthly interesting analysis

makePublisher(joe)

joe.tweet=function(msg){
  this.publish(msg)
}

joe.subscribe(joe.drinkCoffee)

joe.tweet('memeda~')