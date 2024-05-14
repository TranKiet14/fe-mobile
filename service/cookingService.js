import { get, patch, post } from "../utils/request"
export const getCooking = async (id) => {
    const result = await get(`cooking/detail/${id}`)
    return result
}
export const getListCookings = async (id) => {
    const result = await get(`cooking/${id}`)
    return result
}
export const createCooking = async (options) => {
    const result = await post(`cooking/create`, options)
    return result
}
export const deleteCooking = async (id) => {
    const result = await patch(`cooking/delete/${id}`, {})
    return result
}
export const editCooking = async (id, options) => {
    const result = await patch(`cooking/edit/${id}`, options)
    return result
}