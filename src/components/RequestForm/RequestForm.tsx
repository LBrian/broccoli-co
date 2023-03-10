import { ComponentProps, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../Modal'
import ConfirmModal from './ConfirmModal'
import ErrorModal from './ErrorModal'

type FormFields = {
  fullName: string
  email: string
  confirmEmail: string
}

const RequestForm = ({ ...props }: Omit<ComponentProps<typeof Modal>, 'isOpen' | 'children'>) => {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(0)
  const [error, setError] = useState<string>()
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors }
  } = useForm<FormFields>()

  const emailFieldPattern = {
    value: /\S+@\S+\.\S+/,
    message: 'Incorrect email format'
  }

  const onSubmit = async ({ fullName: name, email }: FormFields) => {
    setLoading(true)

    const res = await fetch('https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth', {
      method: 'POST',
      body: JSON.stringify({ name, email })
    })

    if (res?.status) {
      setStatus(res.status)

      if (res.status !== 200) {
        setError((await res.json()).errorMessage)
      }
    }

    setLoading(false)
  }

  return (
    <>
      <ConfirmModal {...props} isOpen={status === 200} />
      <ErrorModal isOpen={status === 400} onClose={() => setStatus(0)}>
        {error}
      </ErrorModal>
      <Modal name='request-form' isOpen={!status} {...props} dismissible={!loading}>
        <h3 className='font-bold text-xl text-center mb-12'>Request an invite</h3>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <input
              disabled={loading}
              placeholder='Full Name'
              data-testid='full-name-input'
              className='input input-bordered w-full max-w-xs'
              {...register('fullName', {
                required: 'Full Name is required',
                minLength: {
                  value: 3,
                  message: 'Minimum 3 characters'
                }
              })}
            />
            <p className='text-xs text-error mt-2 min-h-[16px]'>{errors.fullName?.message}</p>
          </div>
          <div>
            <input
              disabled={loading}
              placeholder='Email'
              data-testid='email-input'
              className='input input-bordered w-full max-w-xs'
              {...register('email', {
                required: 'Email Address is required',
                pattern: emailFieldPattern
              })}
            />
            <p className='text-xs text-error mt-2 min-h-[16px]'>{errors.email?.message}</p>
          </div>
          <div>
            <input
              disabled={loading}
              data-testid='confirm-email-input'
              placeholder='Confirm email'
              className='input input-bordered w-full max-w-xs'
              {...register('confirmEmail', {
                required: 'Confirm email address is required',
                pattern: emailFieldPattern,
                validate: (confirmEmail: string) => confirmEmail === getValues('email')
              })}
            />
            <p className='text-xs text-error mt-2 min-h-[16px]'>
              {errors.confirmEmail?.type === 'validate' ? 'email address is not matched' : errors.confirmEmail?.message}
            </p>
          </div>
          <button
            aria-label='Submit invite request'
            data-testid='submit-invite-request'
            disabled={loading}
            type='submit'
            className={`btn btn-wide mx-auto ${loading && 'loading'}`}
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  )
}

export default RequestForm
