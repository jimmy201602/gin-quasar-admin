package global

import (
	"go.uber.org/zap"

	"gin-quasar-admin/config"
	"github.com/go-redis/redis"
	"github.com/spf13/viper"
	"gorm.io/gorm"
)

var (
	GqaDb     *gorm.DB
	GqaRedis  *redis.Client
	GqaConfig config.Server
	GqaViper     *viper.Viper
	GqaLog    *zap.Logger
)
