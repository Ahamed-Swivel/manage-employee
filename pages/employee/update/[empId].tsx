import Head from 'next/head'
import { useRouter } from 'next/router'

import Employee from '@/models/Employee'
import employeeService from '@/services/employee'
import ManageEmployee from '@/components/templates/ManageEmployee'
import { useEffect, useState } from 'react'

const NewEmployee = () => {
  const [employee, setEmployee] = useState<Employee>()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const { empId } = router.query
  const id = empId as string

  useEffect(() => {
    setIsLoading(true)
    id && getEmployee(id)
  }, [id])

  const getEmployee = (id: string) => {
    employeeService.getEmployeeById(id).then((employee) => {
      setEmployee(employee)
      setIsLoading(false)
    }).catch(error => {
      console.log(error)
    })
  }

  const updateEmployee = (employee: Employee) => {
    employeeService.updateEmployee(id, employee).then(() => {
      router.replace('/')
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
        {isLoading && 'Loading...'}
        {!employee && !isLoading && 'Employee not found'}
        {!isLoading && employee && <ManageEmployee employee={employee} onSubmit={updateEmployee} />}
      </main>
    </>
  )
}

export default NewEmployee
