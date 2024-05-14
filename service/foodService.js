import { get } from "../utils/request"
export const getFood = async (id) => {
    const result = await get(`foods/detail/${id}`)
    return result
}
export const getListFoods = async () => {
    const result = await get(`foods`)
    return result
}