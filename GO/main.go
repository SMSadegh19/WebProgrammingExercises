package main

import (
	"crypto/sha256"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
)

func main() {
	client := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379", // 213.233.179.83
		Password: "",
		DB:       0,
	})

	r := gin.Default()

	r.POST("/go/sha256/", func(c *gin.Context) {
		str := c.Query("string")
		if len([]rune(str)) < 8 {
			c.JSON(200, gin.H{
				"status":     false,
				"status_str": "String length should be >= 8",
				"sha256":     nil,
			})
		} else {
			hash_bytes := sha256.Sum256([]byte(str))
			hash_string := fmt.Sprintf("%x", string(hash_bytes[:]))
			go client.Set(hash_string, str, 0).Err()
			c.JSON(200, gin.H{
				"status":     true,
				"status_str": "",
				"sha256":     hash_string,
			})
		}
	})
	r.GET("/go/sha256/", func(c *gin.Context) {
		hash := c.Query("sha256")
		str, err := client.Get(hash).Result()
		if err != redis.Nil {
			c.JSON(200, gin.H{
				"found":  true,
				"string": str,
			})
		} else {
			c.JSON(200, gin.H{
				"found":  false,
				"string": nil,
			})
		}
	})
	r.Run()
}
