import type { ChangeEvent, FC, PropsWithChildren } from 'react'

type Props = {
  name: string
  isOpen: boolean
  onClose: () => void
  dismissible?: boolean
}

const Modal: FC<PropsWithChildren<Props>> = ({ name, isOpen = false, onClose, dismissible = false, children }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      onClose()
    }
  }

  return (
    <>
      <input
        data-testid='modal-toggle'
        type='checkbox'
        className='modal-toggle'
        checked={isOpen}
        onChange={handleChange}
      />
      <label className='modal cursor-pointer'>
        <div data-testid={name} className='modal-box w-auto py-16 modal-middle'>
          {dismissible && (
            <button
              aria-label='Close'
              data-testid='modal-close'
              className='btn btn-sm btn-circle absolute right-2 top-2'
              onClick={() => onClose()}
            >
              ✕
            </button>
          )}
          {children}
        </div>
      </label>
    </>
  )
}

export default Modal
