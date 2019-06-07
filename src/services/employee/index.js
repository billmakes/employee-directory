import instance from '@/http'

const endpoint = '/api/v1/employees/'

export default class EmployeeService {
  static async getAllEmployees() {
    try {
      const source = await instance.get(endpoint)
      return source.data
    } catch (error) {
      throw error
    }
  }

  static async getEmployee(id) {
    try {
      const source = await instance.get(endpoint + id)
      return source.data
    } catch (error) {
      throw error
    }
  }

  static async addEmployee(params) {
    try {
      const result = await instance.post(endpoint, params)
      return result
    } catch (error) {
      throw error
    }
  }

  static async updateEmployee(id, params) {
    try {
      await instance.put(endpoint + id, params)
    } catch (error) {
      throw error
    }
  }

  static async deleteEmployee(id) {
    try {
      await instance.delete(endpoint + id)
    } catch (error) {
      throw error
    }
  }
}
