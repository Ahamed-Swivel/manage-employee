import Employee from "@/models/Employee"
import axios from "axios"

// This is a Legacy code service will be kept for future reference
class EmployeeService {
  http = axios.create({
    baseURL: process.env.apiUrl
  })

  async getEmployees() {
    try {
      const response = await this.http.get<Employee[]>('/employees')

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async getEmployeeById(empId: string) {
    try {
      const response = await this.http.get<Employee>(`/employees/${empId}`)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async addEmployee(data: Employee) {
    try {
      const response = await this.http.post<Employee>('/employees', {...data})

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async removeEmployee(empId: string) {
    try {
      const response = await this.http.delete(`/employees/${empId}`)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  async updateEmployee(empId: string, data: Employee) {
    try {
      const response = await this.http.patch(`/employees/${empId}`, data)

      return response.data
    } catch (error) {
      console.log(error)
    }
  }
}

const employeeService = new EmployeeService()
export default employeeService
