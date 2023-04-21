import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import EmployeeCard from '@/components/EmployeeCards'
import Employee from '@/models/Employee'
import EmployeeList from '@/components/EmployeeList'
import ManageEmployee from '@/components/ManageEmployee'

const dummyEmployee: Employee[] = [{
  id: "644127d23e6e56a2b8e8b91d",
  firstName: "Henri",
  lastName: "Rodriguez",
  email: "Darrin_Rippin@gmail.com",
  gender: "M",
  number: "+94771277218",
  photo: "https://randomuser.me/api/portraits/men/92.jpg"
}]

describe('Components', () => {
  it('renders EmployeeCard', () => {
    const onDelete = (value: Employee) => {
      expect(value.id).toBe(dummyEmployee[0].id)
    }

    const component = render(
      <EmployeeCard
        employees={dummyEmployee}
        onDelete={(employee: Employee) => {onDelete(employee)}}
      />
    )

    expect(component).toMatchSnapshot()
  })

  it('renders EmployeeList', () => {
    const onDelete = (value: Employee) => {
      expect(value.id).toBe(dummyEmployee[0].id)
    }

    const component = render(
      <EmployeeList
        employees={dummyEmployee}
        onDelete={(employee: Employee) => {onDelete(employee)}}
      />
    )

    expect(component).toMatchSnapshot()
  })

  it('renders Manage Employee - Update Employee', () => {
    const onSubmit = (value: Employee) => {
      expect(value.id).toBe(dummyEmployee[0].id)
    }

    const component = render(
      <ManageEmployee
        employee={dummyEmployee[0]}
        onSubmit={(employee: Employee) => {onSubmit(employee)}}
      />
    )

    expect(component).toMatchSnapshot()
  })

  it('renders Manage Employee - Add new Employee', () => {
    const onSubmit = (value: Employee) => {
      expect(value.id).toBe(dummyEmployee[0].id)
    }

    const component = render(
      <ManageEmployee
        onSubmit={(employee: Employee) => {onSubmit(employee)}}
      />
    )

    expect(component).toMatchSnapshot()
  })
})
