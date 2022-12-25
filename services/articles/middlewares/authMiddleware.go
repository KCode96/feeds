package middlewares

import (
	"feeds-articles/helpers"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")

		if token == "" {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		// token := strings.Split(token, " ")[0]

		// Validate the token
		valid, err := helpers.ValidateToken("")
		if err != nil || !valid {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		// Token is valid, call the next handler
		c.Next()

	}
}
