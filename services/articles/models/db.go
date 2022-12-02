package models

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	
)

var DB *gorm.DB

func ConnectDB() {
	dsn := "host=db-postgresql-syd1-96283-do-user-12994114-0.b.db.ondigitalocean.com user=doadmin password=AVNS_EU1LYCSS7HpHQRwitkM dbname=defaultdb port=25060 sslmode=require"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err.Error())
	}



	db.AutoMigrate(&Tag{})
	db.AutoMigrate(&Article{})



	DB = db
}
