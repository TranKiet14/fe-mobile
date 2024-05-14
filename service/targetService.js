import { get } from "../utils/request"
export const getTarget = async (id) => {
    const result = await get(`targets/${id}`)
    return result
}