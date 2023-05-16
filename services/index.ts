import Employee from "@/models/Employee"
import axios from "axios"

class Services {
  http = axios.create({
    baseURL: process.env.apiUrl
  })

  async getEmployees(token: string | undefined) {
    try {
      const response = await this.http.get<Employee[]>('/employees', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async getToken() {
    try {
      const response = await this.http.post('/employees/get-token')

      return response.data.token
    } catch (error) {
      console.log(error)
    }
  }
}

const service = new Services()
export default service
