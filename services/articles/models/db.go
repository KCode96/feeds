package models

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := os.Getenv("DB_URL")

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err.Error())
	}

	// db.Migrator().DropTable(&Tag{})
	// db.Migrator().DropTable(&Article{})

	db.AutoMigrate(&Article{})
	db.AutoMigrate(&Tag{})

	// Seed the database
	// if err := Seed(db); err != nil {
	// 	log.Fatal(err)
	// }

	fmt.Println("Seed data successfully added to the database.")

	DB = db
}

func Seed(db *gorm.DB) error {

	dir, _ := os.Getwd()

	data, err := ioutil.ReadFile(dir + "/data/articleSeed.json")
	if err != nil {
		return err
	}

	var articles []Article

	if err := json.Unmarshal(data, &articles); err != nil {
		return err
	}

	for _, article := range articles {
		if err := db.Create(&article).Error; err != nil {
			return nil
		}
	}

	return nil
}
