import { openDB } from 'idb'

const DB_NAME = 'edc_offline'
const STORE_NAME = 'key_val'

const dbPromise = openDB(DB_NAME, 1, {
    upgrade(db) {
        db.createObjectStore(STORE_NAME)
    }
})
  
export default {
    async get(key) {
        return (await dbPromise).get(STORE_NAME, key)
    },
    async set(key, val) {
        return (await dbPromise).put(STORE_NAME, val, key)
    },
    async delete(key) {
        return (await dbPromise).delete(STORE_NAME, key)
    },
    async clear() {
        return (await dbPromise).clear(STORE_NAME)
    },
    async keys() {
        return (await dbPromise).getAllKeys(STORE_NAME)
    },
}
