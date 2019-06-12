const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const Storage = require('./storage')
const StorageTree = require('./storage_tree')
const Router = require('./router')
const RouterDynamicLoading = require('./router_dynamic_loading')

module.exports = function(host = '127.0.0.1', port = '9200') {
    
    const app = express()
    
    const storage = new Storage(require('./data.json'))
    const dynamicStorage = new StorageTree(require('./data-dynamic.json'))
    const router = new Router('/data', storage)
    const dynLoading = new RouterDynamicLoading('/data-dynamic', dynamicStorage)
    
    app.use(bodyParser.json()) // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        res.header('Access-Control-Allow-Methods', '*')
        next()
    })
    
    router.connect(app)
    dynLoading.connect(app)
    
    app.use('/codebase', express.static(path.join(__dirname, '..', 'codebase')))
    app.use('/samples', express.static(path.join(__dirname, '..', 'samples')))
    app.use(/^\/$/, function(req, res) {//default url
        res.redirect('/samples')
    })
    
    const server = app.listen(port, host, function() {
        console.log(`Server is running on port http://${ host }:${ port }/ ...`)
    })
    
}
