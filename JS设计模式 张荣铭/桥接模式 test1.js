// addEvent(element, 'click', getBeerById)
//
// function getBeerById(e) {
//   var id = this.id
//   asyncRequest('GET', 'beer.uri?id=' + id, function(resp) {
//     console.log('Requested Beer: ' + resp.responseText)
//   })
// }


/* 改之后 */

function getBeerById(id, callback) {
  asyncRequest('GET', 'beer.uri?id=' + id, function(resp) {
    callback(resp.responseText)
  })
}

addEvent(element, 'click', getBeerByIdBridge);

function getBeerByIdBridge(e) {
  getBeerById(this.id, function(beer) {
    console.log('Requested Beer: ' + beer);
  });
}