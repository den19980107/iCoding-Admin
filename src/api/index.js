import { message } from 'antd'
import axios from 'axios'

class api {
   static _apiUrl = "";

   static user = {
      // 取得所有使用者
      async getUsers() {
         let data = await api.get(`${api._apiUrl}/admin/getUsers`)
         return data
      },
      // 刪除使用者 by id
      async deleteUserById(id) {
         let data = await api.post(`${api._apiUrl}/admin/deleteUserByid`, { userId: id })
         console.log("deleteUserById")

         return data
      },
      // 審核使用者
      async activeUser(id) {
         let data = await api.post(`${api._apiUrl}/admin/activeUser`, { userId: id })
         console.log("activeUser")
         return data
      },
      // 封鎖使用者
      async inActiveUser(id) {
         let data = await api.post(`${api._apiUrl}/admin/inActiveUser`, { userId: id })
         console.log("inActiveUser")
         return data
      },

   }

   static class = {
      // 取得所有課程
      async getClasses() {
         let data = await api.get(`${api._apiUrl}/admin/getClasses`)
         console.log("getClasses")
         return data
      }
   }

   static material = {
      // 取得所有講義
      async getChpaters() {
         let data = await api.get(`${api._apiUrl}/admin/getChapters`)
         console.log("getChpaters")
         return data
      },
      // 取得所有影片
      async getVideos() {
         let data = await api.get(`${api._apiUrl}/admin/getVideos`)
         console.log("getVideos")

         return data
      },
      // 取得所有測驗
      async getTests() {
         let data = await api.get(`${api._apiUrl}/admin/getTests`)
         console.log("getTests")

         return data
      }
   }

   static activity = {
      // 取得最近幾天的登入紀錄
      async getHistory(passDay) {
         console.log("getHistory")

         if (passDay) {
            let data = await api.get(`${api._apiUrl}/admin/getLoginHistory?passDay=${passDay}`)
            return data
         } else {
            let data = await api.get(`${api._apiUrl}/admin/getLoginHistory`)
            return data
         }
      }
   }

   static coding = {
      // 取得所有程式題
      async getCodingQutions() {
         let data = await api.get(`${api._apiUrl}/admin/getCodingQutions`)
         console.log("getCodingQutions")

         return data
      },
      // 刪除程式題
      async deleteCodingQutionById(id) {
         let data = await api.post(`${api._apiUrl}/api/deletCodingQution/${id}`)
         console.log("deleteCodingQutionById")

         return data
      },
      //取得所有標籤
      async getTags() {
         let data = await api.get(`${api._apiUrl}/admin/getTags`)
         console.log("getTags")

         return data
      },
      // 建立題目
      async CreateQution(newQution) {
         let data = await api.post(`${api._apiUrl}/coding/addQution`, newQution)
         return data
      },
      //刪除標籤
      async deleteTag(id) {
         let data = await api.post(`${api._apiUrl}/coding/deleteTag`, { id: id })
         return data
      },
      //新增標籤
      async addTag(tagName) {
         let data = await api.post(`${api._apiUrl}/coding/addTag`, { tagName: tagName })
         return data
      }
   }

   static async get(url) {
      console.log("get", url)

      try {
         const { data } = await axios.get(url)
         return data
      } catch (error) {
         message.error("get 取得資料失敗！")
         console.log(error)
         return false
      }
   }

   static async post(url, payload) {
      console.log("post", url, payload)
      try {
         const { data } = await axios.post(url, payload)
         return data
      } catch (error) {
         message.error("post 取得資料失敗！")
         console.log("url = ", url, "payload = ", payload, error)
         return false
      }
   }
};

export default api;