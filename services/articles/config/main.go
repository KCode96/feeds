package config

import "os"

var PORT = os.Getenv("PORT")
var DB_URL = os.Getenv("DB_URL")
