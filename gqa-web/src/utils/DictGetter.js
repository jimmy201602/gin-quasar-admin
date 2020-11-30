import Store from 'src/store'

export async function getDict(type) {
    const res = await Store().dispatch('session/GetDict', type)
    return res
}
