package initializers

import (
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnvs() {
	err := godotenv.Load("local.env")

	if err != nil {
		log.Fatal("Failed to load .env file")
	}

	PORT := os.Getenv("PORT")

	fmt.Println(PORT)

}
