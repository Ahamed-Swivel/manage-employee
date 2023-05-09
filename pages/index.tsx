import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Container, Row, Col, Stack } from 'react-bootstrap'
import { FaListUl, FaThLarge } from 'react-icons/fa'

import Employee from '@/models/Employee'
import EmployeeCard from '@/components/templates/EmployeeCards'
import EmployeeList from '@/components/templates/EmployeeList'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'
import Button from '@/components/atoms/Button'
import employeeService from '@/services/employee'
import styles from '@/styles/Home.module.scss'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { populateEmployee, removeEmployee } from '@/features/employee/employeeSlice'

interface EmployeeManagementProps {
  employees: Employee[] | []
}

export default function Home({ employees }: EmployeeManagementProps) {
  const router = useRouter()
  const [isList, setIsList] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const employeeFromStore = useAppSelector(state => state.employeeSlice.employees)
  const isLoading = useAppSelector(state => state.employeeSlice.loading)
  const error = useAppSelector(state => state.employeeSlice.error)

  useEffect(() => {
    dispatch(populateEmployee(employees))
  }, [employees, dispatch])

  useEffect(() => {
    error && router.replace(`/errorSplash?message=${error}`)
  }, [error, router])

  const onDeleteConfirm = (employee: Employee): void => {
    employee?.id && deleteEmployee(employee.id)
  }

  const deleteEmployee = (id: string) => {
    dispatch(removeEmployee(id))
  }

  const onToggle = () => {
    setIsList(!isList)
  }

  return (
    <>
      <Head>
          <title>Employee Management</title>
      </Head>
      {isLoading && <LoadingSpinner/>}
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
                ? <EmployeeList employees={employeeFromStore || employees} onDelete={onDeleteConfirm}/>
                : <EmployeeCard employees={employeeFromStore || employees} onDelete={onDeleteConfirm}/>
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

  return { props: { employees: employees ?? [] } }
}
