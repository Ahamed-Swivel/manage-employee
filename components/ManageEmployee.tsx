import { useEffect, useState } from 'react'
import { Form, Button, Row, Container, Col } from 'react-bootstrap'

import Employee from '@/models/Employee'
import validateForm from '@/helpers/validateForm'

interface ManageEmployeeProps {
  onSubmit: (employee: Employee) => void,
  employee?: Employee,
}

const ManageEmployee = ({ onSubmit, employee }: ManageEmployeeProps) => {
  const [validationResult, setValidationResult] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [firstName, setFirstName] = useState(employee?.firstName || '')
  const [lastName, setLastName] = useState(employee?.lastName || '')
  const [email, setEmail] = useState(employee?.email || '')
  const [number, setNumber] = useState(employee?.number || '')
  const [gender, setGender] = useState(employee?.gender || 'M')
  const [photo, setPhoto] = useState(employee?.photo || '')

  useEffect(() => {
    const errors = validateForm({
      firstName, lastName, email, number
    })

    isSubmitted && setValidationResult(errors)
  }, [firstName, lastName, email, number, isSubmitted])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newEmployee: Employee = {
      firstName,
      lastName,
      email,
      number,
      gender,
      photo,
    }
    const errors = validateForm(newEmployee)

    if (errors.length === 0) {
      onSubmit(newEmployee)
    } else {
      setValidationResult(errors)
    }

    setIsSubmitted(true)
  }

  const isFormValid = (inputName: string): boolean =>
    !!validationResult.find(result => result === inputName)

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
      <Form noValidate validated={false}  className="mt-5" onSubmit={handleSubmit}>
        <Container >
          <Row className="mb-3">
            <Col md={{ span: 4, offset: 4 }}>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  isInvalid={isFormValid('firstName')}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  isInvalid={isFormValid('lastName')}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={isFormValid('email')}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Contact Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  isInvalid={isFormValid('number')}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicGender">
                <Form.Label>Gender</Form.Label>
                <Form.Select value={gender} onChange={(e) => setGender(e.target.value)}>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhoto">
                <Form.Label>Photo URL</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Enter Photo URL"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {employee ? 'Update' : 'Submit'}
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </Container>
  )
}

export default ManageEmployee
