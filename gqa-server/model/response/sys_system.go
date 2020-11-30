package response

import "gin-quasar-admin/config"

type SysConfigResponse struct {
	Config config.Server `json:"config"`
}
