import type { ComponentProps } from 'react'
import Modal from '../Modal'

const ConfirmModal = ({ onClose, ...props }: Omit<ComponentProps<typeof Modal>, 'name' | 'children'>) => {
  return (
    <Modal name='request-success' {...props} onClose={onClose}>
      <h3 className='font-bold text-lg text-success'>All Done!</h3>
      <p className='py-4 text-success'>
        Once you are selected for a chance to get an invite, we will send it to your email!
      </p>
      <div className='modal-action'>
        <button aria-label='Confirm' data-testid='confirm' className='btn btn-success' onClick={onClose}>
          Ok
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
