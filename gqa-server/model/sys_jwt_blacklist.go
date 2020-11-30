package model

import (
	"gin-quasar-admin/global"
)

type JwtBlacklist struct {
	global.GqaModel
	Jwt string `gorm:"type:text;comment:jwt"`
}
