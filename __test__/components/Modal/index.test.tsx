import { render } from '@testing-library/react'
import '@testing-library/jest-dom'


import DeleteModal from '@/components/ConfirmationModal/DeleteModal'

describe('Modal', () => {
  it('renders Delete modal', () => {
    const component = render(
      <DeleteModal
        isModalVisible={true}
        onConfirm= {() => {return}}
        onCancel= {() => {return}}
      />
    )

    expect(component).toMatchSnapshot()
  })
})
