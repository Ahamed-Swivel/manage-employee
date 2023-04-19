import { useState } from 'react'
import Link from 'next/link'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { FaListUl, FaThLarge } from 'react-icons/fa'

import Employee from '@/models/Employee'
import EmployeeCard from './EmployeeCards'
import EmployeeList from './EmployeeList'
import styles from '@/styles/EmployeePage.module.scss'
import employeeService from '@/services/employee'
import { useRouter } from 'next/router'

interface EmployeePageProps {
  allEmployees: Employee[]
}

function EmployeePage({ allEmployees }: EmployeePageProps) {
  const router = useRouter()
  const [isList, setIsList] = useState<boolean>(false)

  const onDeleteConfirm = async (employee: Employee) => {
    employee?.id && deleteEmployee(employee.id)
  }

  const deleteEmployee = async (id: string) => {
    await employeeService.removeEmployee(id)
    router.replace('/')
  }

  const onToggle = () => {
    setIsList(!isList)
  }

  return (
    <Container>
      <Row>
        <Stack direction="horizontal" gap={3}>
          <Col md={4}><h3>Employees</h3></Col>
          <Button variant="outline-secondary" className={[styles.filerButton, 'ms-auto'].join(' ')} onClick={onToggle}>
            {isList ? <FaThLarge /> : <FaListUl />}
          </Button>
          <Link href="/employee/new">
            <Button variant="outline-primary">Add new Employee</Button>
          </Link>
        </Stack>
      </Row>
      <Row className='mt-5'>
        {
          isList
            ? <EmployeeList employees={allEmployees} onDelete={onDeleteConfirm}/>
            : <EmployeeCard employees={allEmployees} onDelete={onDeleteConfirm}/>
        }
      </Row>
    </Container>
  )
}

export default EmployeePage