package models

import "time"

type Article struct {
	ID          uint     `json:"id" gorm:"primaryKey"`
	Author      string   `json:"string"`
	Title       string   `json:"title" `
	Body        string   `json:"body"`
	Description string   `json:"description"`
	Tags        []string `json:"tags" `
	Slug        string   `json:"slug"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
}
