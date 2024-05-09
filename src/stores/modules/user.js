import { userGetInfoService } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

//  用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'big-user',
  () => {
    const token = ref('')
    //  设置 token
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 清除 token
    const removeToken = () => {
      token.value = ''
    }

    //  获取用户基本信息
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService() //  请求获取数据
      user.value = res.data.data
    }
    // 设置用户信息
    const setUser = (obj) => {
      user.value = obj
    }
    // 清除用户信息
    const removeUser = () => {
      user.value = {}
    }

    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser,
      removeUser
    }
  },
  {
    persist: true
  }
)
