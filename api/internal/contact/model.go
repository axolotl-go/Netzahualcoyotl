package contact

import "gorm.io/gorm"

type ContactRequest struct {
	gorm.Model

	Name    string `gorm:"type:varchar(150);not null" json:"name"`
	Email   string `gorm:"type:varchar(255);not null;index" json:"email"`
	Message string `gorm:"type:text;not null" json:"message"`
}
