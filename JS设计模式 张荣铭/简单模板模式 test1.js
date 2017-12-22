formateString = function(str, data) {
  return str.replace(/{#(\w+)#}/g, function(match, key) {
    return data[key] === undefined ? '' : data[key]
  })
}

const tpl = `<h2>{#h2#}</h2>   <p>{#p#}</p>  <ul>{#ul#}</ul>`

formateString(tpl, {
  h2: '是h2!',
  p: '是p~',
  ul: '是ul@'
})                              // "<h2>是h2!</h2>   <p>是p~</p>  <ul>是ul@</ul>"