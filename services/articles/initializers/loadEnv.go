package initializers

import (
	"log"

	"github.com/joho/godotenv"
)

func LoadEnvs() {
	err := godotenv.Load("local.env")

	if err != nil {
		log.Fatal("Failed to load .env file")
	}
}
