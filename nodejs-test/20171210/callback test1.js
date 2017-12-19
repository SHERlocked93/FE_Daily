function learn(sth) {
  console.log(`${sth} in learn~`)
}

function we(cb, something) {
  something += ' very cool'
  cb(something)
}

we(learn, 'Nodejs')