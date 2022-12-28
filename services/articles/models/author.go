package models

import "github.com/lib/pq"

type Author struct {
	Id        uint           `gorm:"primaryKey" json:"id"`
	Username  string         `json:"username"`
	Email     string         `json:"email"`
	Role      string         `json:"role"`
	Image     string         `json:"image"`
	Bio       string         `json:"bio"`
	Followers pq.StringArray `gorm:"type:text[]" json:"followers"`
	CreatedAt string         `json:"createdAt"`
	UpdatedAt string         `json:"updatedAt"`
}
