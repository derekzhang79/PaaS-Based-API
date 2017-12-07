// require the connection to the datastore on the Google app server.
const ds = require('@google-cloud/datastore')({ namespace: 'bens-task-2' });

const kind = 'files';

// keep the code DRY
function key(id) {
  return ds.key([kind, id]);
}

// process get requests and return the value for a name.
module.exports.get = async (id) => {
  const [data] = await ds.get(key(id));
  if (data && data.val) return `${data.val}`;
  return '0';
};

// process post requests and add the value to existing or new names.
module.exports.post = async (id, val) => {
    const [data] = await ds.get(key(id));
    // check if there's an existing value, replacing val with the sum.
    if (data && data.val) {
        val = parseInt(val) + parseInt(data.val);
    }
    // save val regardless of addition.
      const entity = {
        key: key(id),
        data: { name: id, val },
      }
      await ds.save(entity);
      // return the final val
      return `${val}`;
};

// process put requests to update and overwrite the existing key value.
module.exports.put = async (id, val) => {
  const entity = {
    key: key(id),
    data: { name: id, val },
  }
  await ds.save(entity);
  return `${val}`;
};

// process delete requests and remove the key. Returns 'ok' if deleted, 0 if not.
module.exports.delete = async(id) => {
  const [data] = await ds.delete(key(id));
  // check if updated.
  if(data.indexUpdates > 0) return 'ok';
  return '0';
}
