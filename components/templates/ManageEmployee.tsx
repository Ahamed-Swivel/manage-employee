import { Row, Container, Col } from 'react-bootstrap'

import Employee from '@/models/Employee'
import EmployeeForm from '@/components/molecules/EmployeeForm'

interface ManageEmployeeProps {
  onSubmit: (employee: Employee) => void,
  employee?: Employee,
}

const ManageEmployee = ({ onSubmit, employee }: ManageEmployeeProps) => {
  return (
    <Container className='mt-5 mb-5'>
      <Row>
        <Col>
          <h3>
            {
              employee
                ? `Update employee: ${employee?.firstName}`
                : 'Add new employee'
            }
          </h3>
        </Col>
      </Row>
      <EmployeeForm onSubmit={onSubmit} employee={employee}/>
    </Container>
  )
}

export default ManageEmployee
