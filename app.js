const express = require('express');
const Redis = require('ioredis')
const redis = new Redis({
    port: 6379, // Redis port
    host: "127.0.0.1", // Redis host);
});
const app = express();

app.get('/:id', async (req, res) => {
    res.send(await getCachedValue(req.params.id))
});

const getCachedValue = async (key) => {
    const cachedValue = await redis.get(key);
    if (cachedValue) return cachedValue;

    await new Promise(r => setTimeout(r, 2000));
    await redis.set(key, 'Value for key : ' + key);
    console.log('Cache miss')
    return 'Value for key : ' + key;
} 

const server = app.listen(3000, () => {
    console.log('Listening on port 3000')
})