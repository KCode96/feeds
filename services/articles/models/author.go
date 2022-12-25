package models

type Author struct {
	ID       uint   `json:"id" gorm:"primaryKey"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	Image    string `json:"image"`
	Bio      string `json:"bio"`
}


