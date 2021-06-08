const router = require('express').Router()
const Account = require('./accounts-model')

const {
  checkAccountPayload,
  checkAccountId,
  checkAccountNameUnique
} = require('./accounts-middleware')

router.get('/', (req, res, next) => {
  Account.getAll()
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

router.get('/:id', checkAccountId, (req, res, next) => {
  res.json(req.data)
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Account.create(req.body)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(next)
})

router.put('/:id', 
  checkAccountId, 
  checkAccountPayload, 
  checkAccountNameUnique, 
  (req, res, next) => {
  Account.updateById(req.params.id, req.body)
    .then(data => {
      res.status.json(data)
    })
    .catch(next)
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Account.deleteById(req.params.id)
    .then(data => {
      res.json(data)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
