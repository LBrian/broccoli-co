import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorModal from './ErrorModal'

const mockOnClose = jest.fn()

test('renders ErrorModal component', () => {
  render(<ErrorModal isOpen onClose={mockOnClose} />)

  const errorModal = screen.getByTestId('request-error')

  expect(errorModal).toBeInTheDocument()
  expect(errorModal).toBeVisible()
  expect(errorModal).toMatchSnapshot()
})

test('click Try Again button should invoke onClose callback', async () => {
  render(<ErrorModal isOpen onClose={mockOnClose} />)

  expect(mockOnClose).toBeCalledTimes(0)

  const tryAgainBtn = screen.getByTestId('try-again')

  expect(tryAgainBtn).toHaveAttribute('aria-label')
  expect(tryAgainBtn).toHaveTextContent('Try Again')

  await userEvent.click(tryAgainBtn)

  expect(mockOnClose).toBeCalledTimes(1)
})
