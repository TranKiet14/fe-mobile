import { get, patch, post } from "../utils/request"
export const getIngredient = async (id) => {
    const result = await get(`ingredients/detail/${id}`)
    return result
}
export const getListIngredients = async () => {
    const result = await get(`ingredients`)
    return result
}
export const getListIngredientsByUser = async (id) => {
    const result = await get(`ingredients/createdBy/${id}`)
    return result
}
export const createIngredients = async (options) => {
    const result = await post(`ingredients/create`, options)
    return result
}
export const deleteIngredients = async (id) => {
    const result = await patch(`ingredients/delete/${id}`, {})
    return result
}
export const editIngredients = async (id, options) => {
    const result = await patch(`ingredients/edit/${id}`, options)
    return result
}