package request

import "gin-quasar-admin/model"

type SysOperationRecordSearch struct {
	model.SysOperationRecord
	PageInfo
}
