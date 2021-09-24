export const getProfile = async (req, res, next) => {
    try {
        res.send('get /profiles/:username')
    } catch (err) {
        next(err)
    }
}

export const followUser = async (req, res, next) => {
    try {
        res.send('post /profiles/:username')
    } catch (err) {
        next(err)
    }
}

export const unfollowUser = async (req, res, next) => {
    try {
        res.send('delete /profiles/:username/follow')
    } catch (err) {
        next(err)
    }
}
