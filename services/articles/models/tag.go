package models

type Tag struct {
	Id   uint   `gorm:"primaryKey" json:"id"`
	Name string `json:"name" validate:"required"`
}
