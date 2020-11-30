package request

import "gin-quasar-admin/model"

type {{.StructName}}Search struct{
    model.{{.StructName}}
    PageInfo
}