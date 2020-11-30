package core

import (
	"fmt"
	"gin-quasar-admin/global"
	"gin-quasar-admin/initialize"
	"go.uber.org/zap"
	"time"
)

type server interface {
	ListenAndServe() error
}

func RunWindowsServer() {
	if global.GqaConfig.System.UseMultipoint {
		// 初始化redis服务
		initialize.Redis()
	}
	Router := initialize.Routers()
	Router.Static("/form-generator", "./resource/page")

	address := fmt.Sprintf(":%d", global.GqaConfig.System.Addr)
	s := initServer(address, Router)
	// 保证文本顺序输出
	// In order to ensure that the text order output can be deleted
	time.Sleep(10 * time.Microsecond)
	global.GqaLog.Info("server run success on ", zap.String("address", address))

	fmt.Println("   _______             ____                                    ___       __          _     \n  / ____(_)___        / __ \\__  ______ __________ ______      /   | ____/ /___ ___  (_)___ \n / / __/ / __ \\______/ / / / / / / __ `/ ___/ __ `/ ___/_____/ /| |/ __  / __ `__ \\/ / __ \\\n/ /_/ / / / / /_____/ /_/ / /_/ / /_/ (__  ) /_/ / /  /_____/ ___ / /_/ / / / / / / / / / /\n\\____/_/_/ /_/      \\___\\_\\__,_/\\__,_/____/\\__,_/_/        /_/  |_\\__,_/_/ /_/ /_/_/_/ /_/ \n                                                                                           ")
	fmt.Println("欢迎使用 Gin-Quasar-Admin ！")
	global.GqaLog.Error(s.ListenAndServe().Error())
}
