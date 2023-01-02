package main

import (
	"feeds-articles/api"
	"feeds-articles/initializers"
	"feeds-articles/models"

	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.New()

	initializers.LoadEnvs()

	// middlewares
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowCredentials = true
	config.AddAllowHeaders("authorization")


	r.Use(cors.New(config))

	// connect to the database
	models.ConnectDB()

	// routes
	api.TagRoute(r)
	api.AritcleRoute(r)

	r.Run(":" + os.Getenv("PORT"))
}
