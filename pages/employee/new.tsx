import Head from 'next/head'
import { useRouter } from 'next/router'

import Employee from '@/models/Employee'
import employeeService from '@/services/employee'
import ManageEmployee from '@/components/templates/ManageEmployee'

const NewEmployee = () => {
  const router = useRouter()

  const addNewEmployee = async (employee: Employee) => {
    await employeeService.addEmployee(employee)
    router.replace('/')
  }

  return (
    <>
      <Head>
        <title>Add new employee</title>
      </Head>
      <main>
        <ManageEmployee onSubmit={addNewEmployee} />
      </main>
    </>
  )
}

export default NewEmployee
