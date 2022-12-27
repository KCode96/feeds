package models

import (
	"time"

	"github.com/lib/pq"
)

type Article struct {
	Id          uint           `gorm:"primaryKey" json:"id"`
	Title       string         `validate:"required" json:"title"`
	Body        string         `validate:"required" json:"body"`
	Description string         `validate:"required" json:"description"`
	Slug        string         `validate:"required" json:"slug"`
	LikesCount  int            `json:"likesCount"`
	Tags        pq.StringArray `gorm:"type:text[]" json:"tags"`
	Likes       pq.StringArray `gorm:"type:text[]" json:"likes"`
	CreatedAt   time.Time      `json:"createdAt"`
	UpdatedAt   time.Time      `json:"updatedAt"`
	AuthorId    string         `validate:"required" json:"authorId"`
	Author      *Author        `gorm:"-" json:"author"`
}

type Like struct{}
