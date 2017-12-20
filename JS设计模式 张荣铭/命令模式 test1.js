const CarManager = {
  requestInfo: function(model, id) {  // 请求信息
    console.log('The information for ' + model + ' with ID ' + id + ' is foobar')
  },
  
  buyVehicle: function(model, id) {  // 购买汽车
    console.log('You have successfully purchased Item ' + id + ', a ' + model)
  },
  
  arrangeViewing: function(model, id) {  // 组织view
    console.log('You have successfully booked a viewing of ' + model + ' ( ' + id + ' ) ')
  },
  
  execute: function(command) {
    return this[command.request](command.model, command.carID)
  }
}

CarManager.execute({ request: "arrangeViewing", model: 'Ferrari', carID: '145523' })
CarManager.execute({ request: "requestInfo", model: 'Ford Mondeo', carID: '543434' })
CarManager.execute({ request: "requestInfo", model: 'Ford Escort', carID: '543434' })
CarManager.execute({ request: "buyVehicle", model: 'Ford Escort', carID: '543434' })