export const login = async (req, res, next) => {
    try {
        res.send('login user')
    } catch (err) {
        next(err)
    }
}

export const register = async (req, res, next) => {
    try {
        console.log(req.body)
        res.send('register s')
    } catch (err) {
        next(err)
    }
}

export const getCurrUser = async (req, res, next) => {
    try {
        res.send('get /user')
    } catch (err) {
        next(err)
    }
}

export const updateCurrUser = async (req, res, next) => {
    try {
        res.send('put /user')
    } catch (err) {
        next(err)
    }
}
