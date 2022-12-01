package models

import (
	"gorm.io/driver/mysql"

	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	dsn := "mysql://doadmin:AVNS_YMM9lT9Xzd7MuA41cmj@db-mysql-syd1-95573-do-user-12994114-0.b.db.ondigitalocean.com:25060/myFirstDatabase?ssl-mode=REQUIRED"

	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err.Error())
	}

	DB = db
}
