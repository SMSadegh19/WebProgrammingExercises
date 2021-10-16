package main

import (
	"crypto/sha256"

	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
)

func main() {
	client := redis.NewClient(&redis.Options{
		Addr:     "redis:6379", // 213.233.179.83
		Password: "",
		DB:       0,
	})

	r := gin.Default()

	r.POST("/ip/go/sha256/:string", func(c *gin.Context) {
		str := c.Param("string")
		if len([]rune(str)) < 8 {
			c.JSON(200, gin.H{
				"status":     false,
				"status_str": "String length should be >= 8",
				"sha256":     nil,
			})
		} else {
			hash := sha256.Sum256([]byte(str))
			err := client.Set(string(hash[:]), str, 0).Err()
			c.JSON(200, gin.H{
				"status":     true,
				"status_str": err,
				"sha256":     hash,
			})
		}
	})
	r.GET("/ip/go/sha256/:string", func(c *gin.Context) {
		hash := c.Param("string")
		str, err := client.Get(hash).Result()
		if err != nil {
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
