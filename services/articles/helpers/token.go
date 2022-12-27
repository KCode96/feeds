package helpers

import (
	"fmt"
	"os"

	"github.com/golang-jwt/jwt"
)

func ValidateToken(tokenString string) string {

	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {

		innerMap := claims["user"].(map[string]interface{})

		id := innerMap["id"].(string)
		return id
	}

	return ""
}
