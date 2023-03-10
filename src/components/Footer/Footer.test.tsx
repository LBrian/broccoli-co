import { render } from '@testing-library/react'
import Footer from './Footer'

test('renders Footer component', () => {
  expect(render(<Footer />)).toMatchSnapshot()
})
