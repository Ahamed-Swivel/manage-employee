import { useEffect, useState } from 'react'
import { Form, Row, Container, Col } from 'react-bootstrap'

import Employee from '@/models/Employee'
import validateForm from '@/helpers/validateForm'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'

interface EmployeeFormProps {
  onSubmit: (employee: Employee) => void,
  employee?: Employee,
}

const EmployeeForm = ({ onSubmit, employee }: EmployeeFormProps) => {
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
    <Form noValidate validated={false} className="mt-5" onSubmit={handleSubmit}>
      <Container >
        <Row className="mb-3">
          <Col md={{ span: 4, offset: 4 }}>
            <Input
              type='text'
              label='First Name'
              placeholder='Enter First Name'
              value={firstName}
              onChange={(value) => setFirstName(value)}
              isInvalid={isFormValid('firstName')}
            />
            <Input
              type='text'
              label='Last Name'
              placeholder='Enter Last Name'
              value={lastName}
              onChange={(value) => setLastName(value)}
              isInvalid={isFormValid('lastName')}
            />
            <Input
              type='email'
              label='Email'
              placeholder='Enter email'
              value={email}
              onChange={(value) => setEmail(value)}
              isInvalid={isFormValid('email')}
            />
            <Input
              type='text'
              label='Contact Number'
              placeholder='Enter Contact Number'
              value={number}
              onChange={(value) => setNumber(value)}
              isInvalid={isFormValid('number')}
            />
            <Select
              label='Gender'
              onChange={(value) => setGender(value)}
              options={[
                {label: 'Male', value: 'M'},
                {label: 'Female', value: 'F'}
              ]}
              value={gender}
            />
            <Input
              type='url'
              label='Photo URL'
              placeholder='Enter Photo URL'
              value={photo}
              onChange={(value) => setPhoto(value)}
            />
            <Button variant="primary" type="submit">
              {employee ? 'Update' : 'Submit'}
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

export default EmployeeForm
