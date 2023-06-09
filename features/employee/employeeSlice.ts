import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

import Employee from '@/models/Employee'
import { store } from '@/app/store'

type InitialState = {
  loading: boolean
  employees: Employee[]
  selectedEmployee: Employee | null
  error: string
}

interface IUpdateEmployee {
  empId: string
  employee: Employee
}

const initialState: InitialState = {
  loading: false,
  employees: [],
  selectedEmployee: null,
  error: ''
}

const http = axios.create({
  baseURL: process.env.apiUrl
})

const getHeaders = () => {
  const state = store.getState()

  return {
    headers: {
      Authorization: `Bearer ${state.authSlice.token}`,
      Accept: "application/json, text/plain, */*",
      Host: "localhost:4000",
      Origin: "http://localhost:3000",
    }
  }
}

export const addNewEmployee = createAsyncThunk('employee/addNewEmployee', (employee: Employee) => {
  return http.post<Employee>('/employees', {...employee}, getHeaders()).then(response => response.data)
})

export const getEmployeeById = createAsyncThunk('employee/getEmployeeById', (empId: string) => {
  return http.get<Employee>(`/employees/${empId}`, getHeaders()).then(response => response.data)
})

export const updateEmployee = createAsyncThunk('employee/updateEmployee', (data: IUpdateEmployee) => {
  return http.patch(`/employees/${data.empId}`, data.employee, getHeaders()).then(response => response.data)
})

export const removeEmployee = createAsyncThunk('employee/removeEmployee', (empId: string) => {
  return http.delete(`/employees/${empId}`, getHeaders()).then(response => response.data)
})

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    populateEmployee: (state, action: PayloadAction<Employee[]>) => {
      state.employees = action.payload
    }
  },
  extraReducers: builder => {
    // Add new employee
    builder.addCase(addNewEmployee.pending, state => {
      state.loading = true
    })
    builder.addCase(
      addNewEmployee.fulfilled,
      (state, action: PayloadAction<Employee>) => {
        state.loading = false
        state.employees = [...state.employees, action.payload]
        state.error = ''
      }
    )
    builder.addCase(addNewEmployee.rejected, (state, action) => {
      state.loading = false
      state.employees = []
      state.error = action.error.message || 'Something went wrong'
    })

    // Selected Employee
    builder.addCase(getEmployeeById.pending, state => {
      state.loading = true
    })
    builder.addCase(
      getEmployeeById.fulfilled,
      (state, action: PayloadAction<Employee>) => {
        state.loading = false
        state.selectedEmployee = action.payload
        state.error = ''
      }
    )
    builder.addCase(getEmployeeById.rejected, (state, action) => {
      state.loading = false
      state.selectedEmployee = null
      state.error = action.error.message || 'Something went wrong'
    })

    // Update Employee
    builder.addCase(updateEmployee.pending, state => {
      state.loading = true
    })
    builder.addCase(
      updateEmployee.fulfilled,
      (state, action: PayloadAction<Employee>) => {
        const oldEmployeeDataIndex = state.employees.findIndex(employee => employee.id === action.payload.id)

        state.loading = false
        state.employees[oldEmployeeDataIndex] = action.payload
        state.error = ''
      }
    )
    builder.addCase(updateEmployee.rejected, (state, action) => {
      state.loading = false
      state.employees = []
      state.error = action.error.message || 'Something went wrong'
    })

    // Remove Employee
    builder.addCase(removeEmployee.pending, state => {
      state.loading = true
    })
    builder.addCase(
      removeEmployee.fulfilled,
      (state, action: PayloadAction<Employee>) => {
        const deletedEmployeeIndex = state.employees.findIndex(employee => employee.id === action.payload.id)
        state.employees.splice(deletedEmployeeIndex, 1)

        state.loading = false
        state.employees = [...state.employees]
        state.error = ''
      }
    )
    builder.addCase(removeEmployee.rejected, (state, action) => {
      state.loading = false
      state.employees = []
      state.error = action.error.message || 'Something went wrong'
    })
  }
})

export default employeeSlice.reducer
export const { populateEmployee } = employeeSlice.actions
