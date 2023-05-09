import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import Employee from '@/models/Employee'
import ManageEmployee from '@/components/templates/ManageEmployee'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { addNewEmployee } from '@/features/employee/employeeSlice'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'

const NewEmployee = () => {
  const router = useRouter()

  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.employeeSlice.loading)
  const error = useAppSelector(state => state.employeeSlice.error)

  useEffect(() => {
    error && router.replace(`/errorSplash?message=${error}`)
  }, [error, router])

  const addEmployee = (employee: Employee) => {
    dispatch(addNewEmployee(employee))
      .then(() => {
        router.replace('/', undefined, { shallow: true })
      }).catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <Head>
        <title>Add new employee</title>
      </Head>
      <main>
        {isLoading && <LoadingSpinner/>}
        <ManageEmployee onSubmit={addEmployee} />
      </main>
    </>
  )
}

export default NewEmployee
