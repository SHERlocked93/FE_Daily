(function() {
  var i = 0;
  var forward = true;
  setTimeout(type, 1000);
  showResponse(1);
  
  function type() {
    if (forward) {
      document.getElementById('ch' + i).style.display = 'inline';
      i++;
      if (i === 20) {
        forward = false;
        showResponse(3);
        setTimeout(type, 1500);
      } else if (i === 11) {
        showResponse(2);
        setTimeout(type, 1500);
      } else {
        setTimeout(type, Math.random() * 180 + 70);
      }
    } else {
      i--;
      document.getElementById('ch' + i).style.display = 'none';
      if (i === 0) {
        forward = true;
        showResponse(1);
        setTimeout(type, 2000);
      } else {
        setTimeout(type, 80);
      }
    }
  }
  
  function showResponse(num) {
    document.getElementById('r1').style.display = num === 1 ? 'block' : 'none';
    document.getElementById('r2').style.display = num === 2 ? 'block' : 'none';
    document.getElementById('r3').style.display = num === 3 ? 'block' : 'none';
  }
})()
