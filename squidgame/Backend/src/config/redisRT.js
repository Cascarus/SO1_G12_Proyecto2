import client from './redis.js'
import rStream from 'redis-rstream'

client.watch("players:all", function (err) {
    if (err) throw err;
    else {
        client.hgetall("players:all", function (err, value) {
            console.log(value); // > "bar"
        });
    }
});
