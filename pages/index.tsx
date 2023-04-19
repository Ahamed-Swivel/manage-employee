import Head from 'next/head'
import { Container, Row } from 'react-bootstrap'

import EmployeeList from '@/components/EmployeePage'
import Employee from '@/models/Employee'
import employeeService from '@/services/employee'

interface EmployeeManagementProps {
  employees: Employee[] | []
}

export default function Home({ employees }: EmployeeManagementProps) {
  return (
    <>
      <Head>
          <title>Employee Management</title>
      </Head>
      <main>
        <Container className='mt-5 mb-5'>
          <Row>
            <EmployeeList allEmployees={employees} />
          </Row>
        </Container>
      </main>
    </>
  )
}

export async function getServerSideProps() {
  // Fetch all employees
  const employees: Employee[] | undefined = await employeeService.getEmployees()

  return { props: { employees: employees || [] } }
}
