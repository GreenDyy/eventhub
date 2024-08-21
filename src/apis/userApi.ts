import axiosClient from "./axiosClient"

class UserAPI {
    handleUser = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete'
    ) => {
        return await axiosClient(`/user${url}`, {
            method: method ?? 'get',
            data
        })
    }

}

const userAPI = new UserAPI()
export default userAPI