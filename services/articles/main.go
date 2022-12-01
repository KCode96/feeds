package main

import (
	"feeds-articles/api"
	"feeds-articles/models"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.New()

	// Middlewares
	r.Use(gin.Logger())
	r.Use(gin.Recovery())

	// Connect to the database
	models.ConnectDB()

	// Routes
	api.TagRoute(r)
	api.AritcleRoute(r)

	r.Run(":8000")
}
