package models

type Tag struct {
	ID   string `gorm:"primaryKey"`
	Name string
}
