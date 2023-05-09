import { useState } from 'react'
import { Table } from 'react-bootstrap'
import Link from 'next/link'

import Employee from '@/models/Employee'
import DeleteModal from '@/components/templates/DeleteModal'
import Button from '@/components/atoms/Button'

interface EmployeeListProps {
  employees: Employee[];
  onDelete: (employee: Employee) => void;
}

const EmployeeList = ({ employees, onDelete }: EmployeeListProps) => {
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.email}</td>
              <td>{employee.number}</td>
              <td>{employee.gender === 'M' ? 'Male' : 'Female'}</td>
              <td>
                <Link href={`/employee/update/${employee.id}`}>
                  <Button variant="primary" className="me-2">Update</Button>
                </Link>
                <Button variant="danger" onClick={() => {handleDelete(employee)}}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}

export default EmployeeList
