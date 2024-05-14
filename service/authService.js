import { post } from "../utils/request"
export const login = async (options) => {
    const result = await post(`users/login`, options)
    return result
}