package request

import "gin-quasar-admin/model"

type SysDictionaryDetailSearch struct{
    model.SysDictionaryDetail
    PageInfo
}