import { act, fireEvent, render, screen } from '@testing-library/react'
import RequestForm from './RequestForm'

const mockOnClose = jest.fn()
const mockSubmit = jest.fn()

test('renders RequestForm component', () => {
  render(<RequestForm dismissible onClose={mockOnClose} />)

  const requestFormModal = screen.getByTestId('request-form')

  expect(requestFormModal).toBeInTheDocument()
  expect(requestFormModal).toBeVisible()

  expect(requestFormModal.querySelector('[data-testid="modal-close"]')).toBeVisible()
  expect(requestFormModal.querySelector('form')).toBeVisible()
  expect(requestFormModal.querySelector('[data-testid="full-name-input"]')).toBeVisible()
  expect(requestFormModal.querySelector('[data-testid="full-name-input"]')).not.toBeDisabled()
  expect(requestFormModal.querySelector('[data-testid="email-input"]')).toBeVisible()
  expect(requestFormModal.querySelector('[data-testid="email-input"]')).not.toBeDisabled()
  expect(requestFormModal.querySelector('[data-testid="confirm-email-input"]')).toBeVisible()
  expect(requestFormModal.querySelector('[data-testid="confirm-email-input"]')).not.toBeDisabled()
  expect(requestFormModal.querySelector('[data-testid="submit-invite-request"]')).toBeVisible()
  expect(requestFormModal.querySelector('[data-testid="submit-invite-request"]')).not.toBeDisabled()

  // TODO: Need to find a workaround since react-testing-library cannot assert CSS visibility:hidden
  // expect(screen.getByTestId('request-error').parentElement).not.toBeVisible()
  // expect(screen.getByTestId('request-success').parentElement).not.toBeVisible()
})

test('errors validation of required fields', async () => {
  await act(() => {
    render(<RequestForm dismissible onClose={mockOnClose} />)
  })

  await act(() => {
    fireEvent.submit(screen.getByTestId('submit-invite-request'))
  })

  expect(screen.getByTestId('full-name-input').nextElementSibling).toHaveTextContent('Full Name is required')
  expect(screen.getByTestId('email-input').nextElementSibling).toHaveTextContent('Email Address is required')
  expect(screen.getByTestId('confirm-email-input').nextElementSibling).toHaveTextContent(
    'Confirm email address is required'
  )
})

test('validate full name at least 3 characters', async () => {
  await act(() => {
    render(<RequestForm dismissible onClose={mockOnClose} />)
  })

  const fullNameInput = screen.getByTestId('full-name-input')

  await act(() => {
    fireEvent.input(fullNameInput, { target: { value: 'a' } })
    fireEvent.submit(screen.getByTestId('submit-invite-request'))
  })

  expect(fullNameInput.nextElementSibling).toHaveTextContent('Minimum 3 characters')
})

test('validate incorrect email address format', async () => {
  await act(() => {
    render(<RequestForm dismissible onClose={mockOnClose} onSubmit={mockSubmit} />)
  })

  const emailInput = screen.getByTestId('email-input')

  await act(() => {
    fireEvent.input(emailInput, { target: { value: 'abcdefg' } })
    fireEvent.submit(screen.getByTestId('submit-invite-request'))
  })

  expect(mockSubmit).not.toHaveBeenCalled()
  expect(emailInput.nextElementSibling).toHaveTextContent('Incorrect email format')
})

test('validate incorrect confirm email address format', async () => {
  await act(() => {
    render(<RequestForm dismissible onClose={mockOnClose} onSubmit={mockSubmit} />)
  })

  const confirmEmailInput = screen.getByTestId('confirm-email-input')

  await act(() => {
    fireEvent.input(confirmEmailInput, { target: { value: 'abcdefg' } })
    fireEvent.submit(screen.getByTestId('submit-invite-request'))
  })

  expect(mockSubmit).not.toHaveBeenCalled()
  expect(confirmEmailInput.nextElementSibling).toHaveTextContent('Incorrect email format')
})

test('validate confirm email address is not matched', async () => {
  await act(() => {
    render(<RequestForm dismissible onClose={mockOnClose} onSubmit={mockSubmit} />)
  })

  const confirmEmailInput = screen.getByTestId('confirm-email-input')

  await act(() => {
    fireEvent.input(screen.getByTestId('email-input'), { target: { value: 'example@gmail.com' } })
    fireEvent.input(confirmEmailInput, { target: { value: 'example1@gmail.com' } })
    fireEvent.submit(screen.getByTestId('submit-invite-request'))
  })

  expect(mockSubmit).not.toHaveBeenCalled()
  expect(confirmEmailInput.nextElementSibling).toHaveTextContent('email address is not matched')
})

test('passed validation and submit is fired', async () => {
  await act(() => {
    render(<RequestForm dismissible onClose={mockOnClose} onSubmit={mockSubmit} />)
  })

  await act(() => {
    fireEvent.input(screen.getByTestId('full-name-input'), { target: { value: 'Example Name' } })
    fireEvent.input(screen.getByTestId('email-input'), { target: { value: 'example@gmail.com' } })
    fireEvent.input(screen.getByTestId('confirm-email-input'), { target: { value: 'example@gmail.com' } })
    fireEvent.submit(screen.getByTestId('submit-invite-request'))
  })

  expect(mockSubmit).toHaveBeenCalled()
})
