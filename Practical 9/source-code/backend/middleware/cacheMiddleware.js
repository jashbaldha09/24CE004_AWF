const cacheService = require('../config/cache');

const cacheMiddleware = (cacheKeyPrefix, ttl = 60) => {
  return (req, res, next) => {
    const startTime = process.hrtime();
    const key = `${cacheKeyPrefix}_${req.originalUrl}`;
    const cachedData = cacheService.get(key);

    if (cachedData) {
      const diff = process.hrtime(startTime);
      const timeMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);

      res.setHeader('X-Cache', 'HIT');
      res.setHeader('X-Response-Time', `${timeMs}ms`);
      return res.status(200).json(cachedData);
    }

    res.setHeader('X-Cache', 'MISS');
    const originalJson = res.json.bind(res);

    res.json = (body) => {
      const diff = process.hrtime(startTime);
      const timeMs = (diff[0] * 1000 + diff[1] / 1e6).toFixed(2);
      res.setHeader('X-Response-Time', `${timeMs}ms`);

      if (res.statusCode >= 200 && res.statusCode < 300) {
        cacheService.set(key, body, ttl);
      }
      return originalJson(body);
    };

    next();
  };
};

module.exports = cacheMiddleware;
