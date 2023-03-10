import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ConfirmModal from './ConfirmModal'

const mockOnClose = jest.fn()

test('renders ConfirmModal component', () => {
  render(<ConfirmModal isOpen onClose={mockOnClose} />)

  const confirmModal = screen.getByTestId('request-success')

  expect(confirmModal).toBeInTheDocument()
  expect(confirmModal).toBeVisible()
  expect(confirmModal).toMatchSnapshot()
})

test('click confirm button should invoke onClose callback', async () => {
  render(<ConfirmModal isOpen onClose={mockOnClose} />)

  expect(mockOnClose).toBeCalledTimes(0)

  const confirmBtn = screen.getByTestId('confirm')

  expect(confirmBtn).toHaveAttribute('aria-label')
  expect(confirmBtn).toHaveTextContent('Ok')

  await userEvent.click(confirmBtn)

  expect(mockOnClose).toBeCalledTimes(1)
})
