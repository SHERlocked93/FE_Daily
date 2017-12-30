function funcDemo(bb) {
  bb(T1, T2)
  
  function T1(val) {
    console.log(val, ' T1')
  }
  
  function T2(val) {
    console.log(val, ' T2')
  }
}

funcDemo((A, B) => {
  A('传入A')
  B('传入B')
  console.log(A, B, ' AB')
})


