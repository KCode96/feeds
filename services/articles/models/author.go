package models

type Author struct {
	Id        uint   `gorm:"primaryKey" json:"id"`
	Username  string `json:"username"`
	Email     string `json:"email"`
	Role      string `json:"role"`
	Image     string `json:"image"`
	Bio       string `json:"bio"`
	CreatedAt string `json:"createdAt"`
	UpdatedAt string `json:"updatedAt"`
}
