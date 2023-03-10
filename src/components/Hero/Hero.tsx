import { useState } from 'react'
import RequestForm from '../RequestForm'

function Hero() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='flex-1 flex justify-center items-center'>
      <div className='hero-content text-center'>
        <div className='max-w-md short:max-w-lg'>
          <h1 className='text-5xl sm:text-6xl font-bold short:text-3xl'>A better way to enjoy everyday</h1>
          <p className='py-6 short:text-sm'>
            A better way to enjoy everyday - A better way to enjoy everyday - A better way to enjoy everyday.
          </p>
          <button
            className='btn btn-primary'
            aria-label='Request an invite'
            data-testid='hero-request-invite'
            onClick={() => setIsOpen(true)}
          >
            request an invite
          </button>
        </div>
      </div>
      {isOpen && <RequestForm onClose={() => setIsOpen(!isOpen)} />}
    </div>
  )
}

export default Hero
