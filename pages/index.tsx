import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import { FaListUl, FaThLarge } from 'react-icons/fa'
import { useRouter } from 'next/router'

import Employee from '@/models/Employee'
import EmployeeCard from '@/components/templates/EmployeeCards'
import EmployeeList from '@/components/templates/EmployeeList'
import employeeService from '@/services/employee'
import Button from '@/components/atoms/Button'
import styles from '@/styles/Home.module.scss'

interface EmployeeManagementProps {
  employees: Employee[] | []
}

export default function Home({ employees }: EmployeeManagementProps) {
  const router = useRouter()
  const [isList, setIsList] = useState<boolean>(false)

  const onDeleteConfirm = (employee: Employee) => {
    employee?.id && deleteEmployee(employee.id)
  }

  const deleteEmployee = (id: string) => {
    employeeService.removeEmployee(id).then(() => {
      router.replace('/')
    })
  }

  const onToggle = () => {
    setIsList(!isList)
  }

  return (
    <>
      <Head>
          <title>Employee Management</title>
      </Head>
      <main>
        <Container className='mt-5 mb-5'>
          <Row>
            <Stack direction="horizontal" gap={3}>
              <Col md={4}><h3>Employees</h3></Col>
              <Button variant="secondary" className={[styles.filerButton, 'ms-auto'].join(' ')} onClick={onToggle}>
                {isList ? <FaThLarge /> : <FaListUl />}
              </Button>
              <Link href="/employee/new">
                <Button variant="primary">Add new Employee</Button>
              </Link>
            </Stack>
          </Row>
          <Row className='mt-5'>
            {
              isList
                ? <EmployeeList employees={employees} onDelete={onDeleteConfirm}/>
                : <EmployeeCard employees={employees} onDelete={onDeleteConfirm}/>
            }
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
