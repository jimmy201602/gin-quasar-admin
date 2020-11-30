package initialize

import (
	"gin-quasar-admin/global"
	"github.com/go-redis/redis"
	"go.uber.org/zap"
)

func Redis() {
	redisCfg := global.GqaConfig.Redis
	client := redis.NewClient(&redis.Options{
		Addr:     redisCfg.Addr,
		Password: redisCfg.Password, // no password set
		DB:       redisCfg.DB,       // use default DB
	})
	pong, err := client.Ping().Result()
	if err != nil {
		global.GqaLog.Error("redis connect ping failed, err:", zap.Any("err", err))
	} else {
		global.GqaLog.Info("redis connect ping response:", zap.String("pong",pong))
		global.GqaRedis = client
	}
}
