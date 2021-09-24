export const getTags =  async (req, res, next) => {
      try {
          res.send('get /profiles/:username')
      } catch (err) {
          next(err)
      }
  }
