package redis

import (
	"context"
    "fmt"
    "log"
    "os"
	"github.com/go-redis/redis/v8"
)

var rdb *redis.Client
var ctx = context.Background()

func CrateClient() {

    rdb = redis.NewClient(&redis.Options{
        Addr:     os.Getenv("REDIS_IP"),
        Password: "", // no password set
        DB:       0,  // use default DB
    })
}


func SetData(key, value string){

    err := rdb.Set(ctx, key, value, 0).Err()
    if err != nil {
        log.Print(err)
    }
}

func getData(key string){

    val, err := rdb.Get(ctx, key).Result()
    if err == redis.Nil {
        fmt.Println(key, " does not exist")
    } else if err != nil {
        log.Print(err)
    } else {
        fmt.Println(key,": ", val)
    }

}

func SetHash(player, value string){

    num := rdb.HSet(ctx, "players:all", player, value)
    fmt.Println(num)

}