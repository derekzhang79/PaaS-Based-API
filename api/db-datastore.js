// Require gcloud datastore with the namespace of our entity
const ds = require('@google-cloud/datastore')({ namespace: 'jamesbarrett-task2' });

// Cateogrise our entity for the purpose of queries.
const kind = 'namecounters';

// A nice helper function which returns a datastore key
function key (id) {
  return ds.key([kind, id]);
}

// Retrieve name from datastore.
module.exports.retrieveName = async (id) => {
  const [data] = await ds.get(key(id));
  if (data && data.val) return `${data.val}`;
  return '0';
};

// Add to the existing counter for a given name in datastore and return the input value initially passed in
module.exports.addToCounter = async (id, val) => {
    const [data] = await ds.get(key(id));
    if (data && data.val) {
        val = parseInt(val) + parseInt(data.val);
    }
      const entity = {
        key: key(id),
        data: { name: id, val },
      }
      await ds.save(entity);
      return `${val}`;
};

// Reset the existing counter for a given name in datastore and return the input value initially passed in
module.exports.resetCounter = async (id, val) => {
  const entity = {
    key: key(id),
    data: { name: id, val },
  }
  await ds.save(entity);
  return `${val}`;
};

// Delete a name from DataStore.
module.exports.deleteName = async(id) => {
  const [data] = await ds.delete(key(id));
  if (data.indexUpdates > 0) return 'ok';
  return '0';
}
