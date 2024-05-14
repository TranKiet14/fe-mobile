import { get } from "../utils/request"
export const getStat = async (id) => {
    const result = await get(`stat/${id}`)
    return result
}

export const getStatToday = async (id) => {
    const result = await get(`stat/today/${id}`)
    return result
}