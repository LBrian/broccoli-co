import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

const mockOnClose = jest.fn()

test('renders Modal component', () => {
  render(<Modal isOpen onClose={mockOnClose} name='modal-test' />)

  const modalBox = screen.getByTestId('modal-test')
  const hiddenInput = screen.getByTestId('modal-toggle')

  expect(modalBox).toBeInTheDocument()
  expect(modalBox).toBeVisible()
  // Ensure name is added as data-testid value at modal-box layer
  expect(modalBox).toHaveClass('modal-box')

  expect(hiddenInput).toBeInTheDocument()
  expect(hiddenInput).toBeVisible()
  expect(hiddenInput).toHaveClass('modal-toggle')
  expect(hiddenInput).toHaveProperty('checked', true)
})

test('dismissible should render a close button at the top right corner', async () => {
  render(<Modal dismissible isOpen onClose={mockOnClose} name='modal-test' />)

  const closeBtn = screen.getByTestId('modal-close')

  expect(closeBtn).toBeInTheDocument()
  expect(closeBtn).toBeVisible()
  expect(closeBtn).toHaveAttribute('aria-label')
})

test('click close button should invoke onClose callback', async () => {
  render(<Modal dismissible isOpen onClose={mockOnClose} name='modal-test' />)

  expect(mockOnClose).toBeCalledTimes(0)

  await userEvent.click(screen.getByTestId('modal-close'))

  expect(mockOnClose).toBeCalledTimes(1)
})
