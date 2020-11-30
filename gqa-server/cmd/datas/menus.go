package datas

import (
	"gin-quasar-admin/global"
	"github.com/gookit/color"
	"os"
	"time"

	"gin-quasar-admin/model"
	"gorm.io/gorm"
)

var BaseMenus = []model.SysBaseMenu{
	// 仪表盘
	{GqaModel: global.GqaModel{ID: 1, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, ParentId: "0", Path: "dashboard", Name: "dashboard", Hidden: false, Component: "Dashboard/Dashboard.vue", Sort: 1, Meta: model.Meta{Title: "仪表盘", Icon: "dashboard"}},
	// 系统权限管理
	{GqaModel: global.GqaModel{ID: 2, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "0", Path: "authority", Name: "authority", Component: "SystemAuthority/Index.vue", Sort: 20, Meta: model.Meta{Title: "系统权限管理", Icon: "settings"}},
	{GqaModel: global.GqaModel{ID: 3, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "2", Path: "menu", Name: "menu", Component: "SystemAuthority/Menu/Menu.vue", Sort: 1, Meta: model.Meta{Title: "菜单管理", Icon: "menu", KeepAlive: true}},
	{GqaModel: global.GqaModel{ID: 4, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "2", Path: "role", Name: "role", Component: "SystemAuthority/Role/Role.vue", Sort: 2, Meta: model.Meta{Title: "角色管理", Icon: "face"}},
	{GqaModel: global.GqaModel{ID: 5, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "2", Path: "user", Name: "user", Component: "SystemAuthority/User/User.vue", Sort: 3, Meta: model.Meta{Title: "用户管理", Icon: "person"}},
	{GqaModel: global.GqaModel{ID: 6, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "2", Path: "api", Name: "api", Component: "SystemAuthority/Api/Api.vue", Sort: 4, Meta: model.Meta{Title: "API管理", Icon: "router", KeepAlive: true}},
	// 系统配置管理
	{GqaModel: global.GqaModel{ID: 7, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "0", Path: "manage", Name: "manage", Component: "SystemManage/Index.vue", Sort: 21, Meta: model.Meta{Title: "系统配置管理", Icon: "ac_unit"}},
	{GqaModel: global.GqaModel{ID: 8, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "7", Path: "dict", Name: "dict", Component: "SystemManage/Dict/Dict.vue", Sort: 1, Meta: model.Meta{Title: "字典管理", Icon: "library_books"}},
	{GqaModel: global.GqaModel{ID: 9, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: true, ParentId: "7", Path: "dictDetail/:id", Name: "dictDetail", Component: "SystemManage/Dict/DictDetail.vue", Sort: 2, Meta: model.Meta{Title: "字典详情", Icon: "library_books"}},
	{GqaModel: global.GqaModel{ID: 10, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "7", Path: "config", Name: "config", Component: "SystemManage/Config/Config.vue", Sort: 3, Meta: model.Meta{Title: "系统配置", Icon: "settings"}},
	// 系统工具
	{GqaModel: global.GqaModel{ID: 11, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "0", Path: "tool", Name: "tool", Component: "SystemTool/Index.vue", Sort: 22, Meta: model.Meta{Title: "系统工具", Icon: "settings"}},
	{GqaModel: global.GqaModel{ID: 12, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "11", Path: "codeGenerator", Name: "codeGenerator", Component: "SystemTool/CodeGenerator/CodeGenerator.vue", Sort: 1, Meta: model.Meta{Title: "代码生成器", Icon: "code", KeepAlive: true}},
	{GqaModel: global.GqaModel{ID: 13, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "11", Path: "serverInfo", Name: "serverInfo", Component: "SystemTool/ServerInfo/ServerInfo.vue", Sort: 2, Meta: model.Meta{Title: "服务器状态", Icon: "computer"}},
	// 系统日志管理
	{GqaModel: global.GqaModel{ID: 14, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "0", Path: "log", Name: "log", Component: "SystemLog/Index.vue", Sort: 23, Meta: model.Meta{Title: "系统日志管理", Icon: "adb"}},
	{GqaModel: global.GqaModel{ID: 15, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "14", Path: "operation", Name: "operation", Component: "SystemLog/Operation/Operation.vue", Sort: 1, Meta: model.Meta{Title: "操作日志", Icon: "ac_unit"}},
	// 非目录菜单
	{GqaModel: global.GqaModel{ID: 16, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: true, ParentId: "0", Path: "userInfo", Name: "userInfo", Component: "UserInfo.vue", Sort: 24, Meta: model.Meta{Title: "个人信息", Icon: "info"}},

	// 系统示例
	{GqaModel: global.GqaModel{ID: 17, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "0", Path: "example", Name: "example", Component: "SystemExample/Index.vue", Sort: 25, Meta: model.Meta{Title: "系统示例", Icon: "info"}},
	{GqaModel: global.GqaModel{ID: 18, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "17", Path: "iconList", Name: "iconList", Component: "SystemExample/IconList/IconList.vue", Sort: 1, Meta: model.Meta{Title: "图标合集", Icon: "insert_emoticon"}},

	// 系统介绍
	{GqaModel: global.GqaModel{ID: 19, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "0", Path: "introduce", Name: "introduce", Component: "SystemIntroduce/Index.vue", Sort: 26, Meta: model.Meta{Title: "系统介绍", Icon: "info"}},
	{GqaModel: global.GqaModel{ID: 20, CreatedAt: time.Now(), UpdatedAt: time.Now()}, MenuLevel: 0, Hidden: false, ParentId: "19", Path: "aboutUs", Name: "aboutUs", Component: "SystemIntroduce/AboutUs/AboutUs.vue", Sort: 1, Meta: model.Meta{Title: "关于我们", Icon: "info"}},

}

func InitSysBaseMenus(db *gorm.DB) {
	if err := db.Transaction(func(tx *gorm.DB) error {
		if tx.Where("id IN ?", []int{1, 27}).Find(&[]model.SysBaseMenu{}).RowsAffected == 2 {
			color.Danger.Println("sys_base_menus表的初始数据已存在!")
			return nil
		}
		if err := tx.Create(&BaseMenus).Error; err != nil { // 遇到错误时回滚事务
			return err
		}
		return nil
	}); err != nil {
		color.Warn.Printf("[Mysql]--> sys_base_menus 表的初始数据失败,err: %v\n", err)
		os.Exit(0)
	}
}
