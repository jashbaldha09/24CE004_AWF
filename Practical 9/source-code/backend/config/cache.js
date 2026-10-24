const NodeCache = require('node-cache');

// Standard TTL of 60 seconds; check period of 120 seconds
const cache = new NodeCache({
  stdTTL: 60,
  checkperiod: 120,
  useClones: false
});

let hitCount = 0;
let missCount = 0;

module.exports = {
  get: (key) => {
    const val = cache.get(key);
    if (val !== undefined) {
      hitCount++;
      return val;
    }
    missCount++;
    return null;
  },
  set: (key, value, ttl = 60) => {
    return cache.set(key, value, ttl);
  },
  del: (key) => {
    return cache.del(key);
  },
  flush: () => {
    return cache.flushAll();
  },
  getStats: () => {
    return {
      hitCount,
      missCount,
      activeKeysCount: cache.keys().length,
      keys: cache.keys(),
      nodeCacheStats: cache.getStats()
    };
  }
};
