package main

import (
	"gin-quasar-admin/core"
	"gin-quasar-admin/global"
	"gin-quasar-admin/initialize"
)

// @title Swagger Example API
// @version 0.0.1
// @description This is a sample Server pets
// @securityDefinitions.apikey ApiKeyAuth
// @in header
// @name x-token
// @BasePath /
func main() {
	global.GqaViper = core.Viper()       // 初始化Viper
	global.GqaLog = core.Zap()           // 初始化zap日志库
	global.GqaDb = initialize.Gorm()     // gorm连接数据库
	initialize.MysqlTables(global.GqaDb) // 初始化表
	// 程序结束前关闭数据库链接
	db, _ := global.GqaDb.DB()
	defer db.Close()

	core.RunWindowsServer()
}
