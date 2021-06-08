const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts');
}

const getById = id => {
  return db('accounts').where('id', id).first();
}

const create = async account => {
  const [id] = await db('accounts').insert(account)
  return getById(id);
}
// const create = account => {
//   db('accounts').insert(account)
//     .then(([id]) => {
//       return getById(id)
//     })
// }

const updateById = (id, account) => {
  return db('accounts')
    .where('id', id)
    .update(account)
    .then(() => {
      return getById(id)
    })
}

const deleteById = async id => {
  const toBeDeleted = await getById(id)
  await db('accounts')
    .where({ id })
    .del()

  return toBeDeleted;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
