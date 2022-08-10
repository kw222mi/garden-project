import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { auth } from '../firebase-config'
import { sendPasswordResetEmail } from 'firebase/auth'

/**
 * Function to reset the users password.
 *
 * @returns {HTMLElement}-user interface for forgot password.
 */
export default function ForgotPassword () {
  const emailRef = useRef()
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  /**
   * Handles the change of password.
   *
   * @param {event} e - the subminevent.
   */
  async function handleSubmit (e) {
    e.preventDefault()

    try {
      setMessage('')
      setError('')
      setLoading(true)
      await sendPasswordResetEmail(auth, emailRef.current.value)
      setMessage('Check your inbox for further instructions')
    } catch {
      setError('Failed to reset password')
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>

          <div class="form-row">
            <div class="col">
          <div className='form-group row'>
            <label for='forgotPasswordForm'></label>
            <input type='text' className='form-control' id='forgotPasswordForm' placeholder='Email'
              ref={emailRef} required />
            </div>
            </div>

            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
            </div>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
