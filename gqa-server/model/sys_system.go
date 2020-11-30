package model

import (
	"gin-quasar-admin/config"
)

// 配置文件结构体
type System struct {
	Config config.Server
}
