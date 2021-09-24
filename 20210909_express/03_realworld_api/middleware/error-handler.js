import util from 'util'

const errorHandler = () => {
    return (err, req, res, next) => {
        console.log(util.format(err))
        res.json(500, { error: 123 })
    }
}

export default errorHandler
