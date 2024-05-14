import { get } from "../utils/request"
export const getMeal = async (id) => {
    const result = await get(`meals/detail/${id}`)
    return result
}
