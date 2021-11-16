import redis from 'redis'

const client = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_IP
});
client.on("error", function (error) {
    console.error(error);
});

export default client