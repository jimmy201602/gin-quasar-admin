import axios from 'axios'

// @Tags {{.StructName}}
// @Summary 创建{{.StructName}}
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.{{.StructName}} true "创建{{.StructName}}"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /{{.Abbreviation}}/create{{.StructName}} [post]
export function create{{.StructName}}Api(data) {
     return axios({
         url: "/{{.Abbreviation}}/create{{.StructName}}",
         method: 'post',
         data
     })
 }


// @Tags {{.StructName}}
// @Summary 删除{{.StructName}}
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.{{.StructName}} true "删除{{.StructName}}"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /{{.Abbreviation}}/delete{{.StructName}} [delete]
 export function delete{{.StructName}}Api(data) {
     return axios({
         url: "/{{.Abbreviation}}/delete{{.StructName}}",
         method: 'delete',
         data
     })
 }

// @Tags {{.StructName}}
// @Summary 删除{{.StructName}}
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除{{.StructName}}"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /{{.Abbreviation}}/delete{{.StructName}} [delete]
 export function delete{{.StructName}}ByIdsApi(data) {
     return axios({
         url: "/{{.Abbreviation}}/delete{{.StructName}}ByIds",
         method: 'delete',
         data
     })
 }

// @Tags {{.StructName}}
// @Summary 更新{{.StructName}}
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.{{.StructName}} true "更新{{.StructName}}"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /{{.Abbreviation}}/update{{.StructName}} [put]
 export function update{{.StructName}}Api(data) {
     return axios({
         url: "/{{.Abbreviation}}/update{{.StructName}}",
         method: 'put',
         data
     })
 }


// @Tags {{.StructName}}
// @Summary 用id查询{{.StructName}}
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.{{.StructName}} true "用id查询{{.StructName}}"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /{{.Abbreviation}}/find{{.StructName}} [get]
 export function find{{.StructName}}Api(params) {
     return axios({
         url: "/{{.Abbreviation}}/find{{.StructName}}",
         method: 'get',
         params
     })
 }


// @Tags {{.StructName}}
// @Summary 分页获取{{.StructName}}列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取{{.StructName}}列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /{{.Abbreviation}}/get{{.StructName}}List [get]
 export function get{{.StructName}}ListApi(params) {
     return axios({
         url: "/{{.Abbreviation}}/get{{.StructName}}List",
         method: 'get',
         params
     })
 }