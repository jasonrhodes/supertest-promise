const supertest = require('supertest')
const methods = ['get', 'post', 'put', 'delete', 'options', 'head', 'patch']

module.exports = function(app) {

  const request = (method, path) => new Promise((resolve, reject) => {
    supertest(app)[method](path).end((err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })

  const fns = {}
  methods.forEach((method) => {
    fns[method] = (path) => request(method, path)
  })

  return fns
}
