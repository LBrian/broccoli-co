import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Hero from './Hero'

test('renders Hero component', () => {
  render(<Hero />)

  const requestBtn = screen.getByTestId('hero-request-invite')

  expect(requestBtn).toBeInTheDocument()
  expect(requestBtn).toHaveAttribute('aria-label')
})

test('click request an invite button should open request form modal', async () => {
  render(<Hero />)

  await userEvent.click(screen.getByTestId('hero-request-invite'))

  expect(screen.getByTestId('request-form')).toBeInTheDocument()
  expect(screen.getByTestId('modal-close')).toBeInTheDocument()
  expect(screen.getByTestId('full-name-input')).toBeEnabled()
  expect(screen.getByTestId('email-input')).toBeEnabled()
  expect(screen.getByTestId('confirm-email-input')).toBeEnabled()
  expect(screen.getByTestId('submit-invite-request')).toBeEnabled()

  await userEvent.click(screen.getByTestId('modal-close'))
  await waitFor(() => screen.queryByTestId('request-form'))
})

test('click outside the request form modal (outside modal-box) should close the modal', async () => {
  render(<Hero />)

  await userEvent.click(screen.getByTestId('hero-request-invite'))
  await userEvent.click(screen.getByTestId('request-form').parentElement as Element)
  await waitFor(() => screen.queryByTestId('request-form'))
})
