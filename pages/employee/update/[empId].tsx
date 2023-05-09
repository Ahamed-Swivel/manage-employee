import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Employee from '@/models/Employee'
import ManageEmployee from '@/components/templates/ManageEmployee'
import { updateEmployee, getEmployeeById } from '@/features/employee/employeeSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'

const NewEmployee = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const employee = useAppSelector(state => state.employeeSlice.selectedEmployee)
  const isLoading = useAppSelector(state => state.employeeSlice.loading)
  const error = useAppSelector(state => state.employeeSlice.error)

  const { empId } = router.query
  const id = empId as string

  useEffect(() => {
    id && getEmployee(id)
  }, [id])

  useEffect(() => {
    error && router.replace(`/errorSplash?message=${error}`)
  }, [error, router])

  const getEmployee = (id: string) => {
    dispatch(getEmployeeById(id))
  }

  const update = (employee: Employee) => {
    dispatch(updateEmployee({
      empId: id,
      employee: employee
    })).then(() => {
      router.replace('/', undefined, { shallow: true })
    }).catch(error => {
      console.log(error)
    })
  }

  return (
    <>
      <Head>
        <title>Update employee</title>
      </Head>
      <main>
        {isLoading && <LoadingSpinner/>}
        {!employee && !isLoading && 'Employee not found'}
        {!isLoading && employee && <ManageEmployee employee={employee} onSubmit={update} />}
      </main>
    </>
  )
}

export default NewEmployee
