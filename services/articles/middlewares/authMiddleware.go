package middlewares

import (
	"feeds-articles/helpers"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func Auth() gin.HandlerFunc {

	return func(c *gin.Context) {

		// get the header
		header := c.GetHeader("Authorization")

		if header == "" {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		token := strings.Split(header, " ")[1]

		id := helpers.ValidateToken(token)

		// Validate the token
		if id == "" {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}

		// Token is valid, call the next handler
		c.Set("id", id)
		c.Next()
	}
}
