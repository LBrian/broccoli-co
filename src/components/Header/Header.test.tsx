import { render } from '@testing-library/react'
import Header from './Header'

test('renders Header component', () => {
  expect(render(<Header />)).toMatchSnapshot()
})
