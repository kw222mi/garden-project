import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
// import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import {
  signInWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '../firebase-config'

/**
 * Component to handle the login in the system.
 *
 * @returns {HTMLElement}-Login form
 */
export default function Login () {
  const emailRef = useRef()
  const passwordRef = useRef()
  // const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  /**
   * Handle the input when submit.
   *
   * @param {event} e - the event
   */
  async function handleSubmit (e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch {
      setError('Failed to log in')
    }

    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>

          <div class="form-row">
            <div class="col">
          <div className='form-group row'>
            <label for='loginForm'></label>
            <input type='text' className='form-control' id='loginForm' placeholder='Email'
              ref={emailRef} required />
            </div>
            </div>
            <div className='form-group row'>
            <label for='loginForm'></label>
            <input type='password' className='form-control' id='loginForm' placeholder='Password'
             ref={passwordRef} required />
            </div>

            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
            </div>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}
