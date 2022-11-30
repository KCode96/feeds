package models

import "time"

type Article struct {
	ID        uint     `json:"id" gorm:"primaryKey"`
	Author    string   `json:"author" `
	Title     string   `json:"title" `
	body      string   `json:"title" `
	Tags      []string `json:"tags" `
	CreatedAt time.Time
	UpdatedAt time.Time
}
