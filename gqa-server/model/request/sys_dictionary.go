package request

import "gin-quasar-admin/model"

type SysDictionarySearch struct{
    model.SysDictionary
    PageInfo
}