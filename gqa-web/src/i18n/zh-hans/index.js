// This is just an example,
// so you can safely delete all default props below
const constant = {
    opt: {
        info: '操作提示',
        success: '操作成功',
        error: '操作异常'
    }
}
export default {
    dialog: {
        delete: {
            title: constant.opt.info,
            message: '确定要删除当前所选记录吗?',
            success: '删除成功.'
        },
        clear: {
            title: constant.opt.info,
            message: '确定要清除当前所选内容吗?'
        }
    }
}
