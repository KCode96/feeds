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

	// Middlewares
	r.Use(gin.Logger())
	r.Use(gin.Recovery())
	r.Use(cors.Default())


	// Connect to the database
	models.ConnectDB()

	// Routes
	api.TagRoute(r)
	api.AritcleRoute(r)

	r.Run(":" + os.Getenv("PORT"))
}
