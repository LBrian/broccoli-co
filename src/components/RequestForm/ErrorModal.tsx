import type { ComponentProps } from 'react'
import Modal from '../Modal'

const ErrorModal = ({ onClose, children, ...props }: Omit<ComponentProps<typeof Modal>, 'name'>) => {
  return (
    <Modal name='request-error' {...props} onClose={onClose}>
      <h3 className='font-bold text-lg text-error'>Oops!</h3>
      <p className='py-4 text-error'>{children}</p>
      <div className='modal-action'>
        <button aria-label='Try again' data-testid='try-again' className='btn btn-error' onClick={onClose}>
          Try Again
        </button>
      </div>
    </Modal>
  )
}

export default ErrorModal
