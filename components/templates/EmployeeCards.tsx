import { Card, ListGroup, Col } from 'react-bootstrap'
import { useState } from 'react'
import Link from 'next/link'

import Employee from '@/models/Employee'
import DeleteModal from '@/components/templates/DeleteModal'
import Button from '@/components/atoms/Button'

interface EmployeeCardProps {
  employees: Employee[];
  onDelete: (employee: Employee) => void;
}

const EmployeeCard = ({ employees, onDelete }: EmployeeCardProps) => {
  const [deleteEmployee, setDeleteEmployee] = useState<Employee>()
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

  const handleDelete = (employee: Employee) => {
    setDeleteEmployee(employee)
    setIsModalVisible(true)
  }

  const onDeleteConfirm = () => {
    deleteEmployee && onDelete(deleteEmployee)
    setIsModalVisible(false)
  }

  const onDeleteCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <DeleteModal
        isModalVisible={isModalVisible}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
      />
      {employees.map((employee) => (
        <Col md={3} key={employee.id}>
          <Card className='mt-3'>
            <Card.Img variant="top" src={employee.photo || '/placeholder.png'} />
            <Card.Body>
              <Card.Title>{`${employee.firstName} ${employee.lastName}`}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item><Card.Text>{employee.email}</Card.Text></ListGroup.Item>
              <ListGroup.Item><Card.Text>{employee.number}</Card.Text></ListGroup.Item>
              <ListGroup.Item><Card.Text>{employee.gender === 'M' ? 'Male' : 'Female'}</Card.Text></ListGroup.Item>
              <ListGroup.Item>
                <Link href={`/employee/update/${employee.id}`}>
                  <Button variant="primary" className="me-2">Update</Button>
                </Link>
                <Button variant="danger" onClick={() => {handleDelete(employee)}}>Delete</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      ))}
    </>
  )
}

export default EmployeeCard
