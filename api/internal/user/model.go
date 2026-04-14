package user

import "gorm.io/gorm"

type User struct {
	gorm.Model

	Email    string `gorm:"type:varchar(255);not null;unique" json:"email"`
	Password string `gorm:"type:varchar(255);not null" json:"password"`
}
