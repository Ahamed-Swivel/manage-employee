interface ValidationInput {
  firstName: string,
  lastName: string,
  email: string,
  number: string,
}
const validateForm = ({
  firstName,
  lastName,
  email,
  number,
}: ValidationInput): string[] => {
  const errors: string[] = []

  if (!firstName || !/^[A-Za-z]{6,10}$/.test(firstName)) {
    errors.push('firstName')
  }

  if (!lastName || !/^[A-Za-z]{6,10}$/.test(lastName)) {
    errors.push('lastName')
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push('email')
  }

  if (!number || !/^\+?\d{10}$/.test(number)) {
    errors.push('number')
  }

  return errors
}

export default validateForm
