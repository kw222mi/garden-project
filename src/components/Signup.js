import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth } from '../firebase-config'

/**
 * Component to handle the signup of a user.
 *
 * @returns {HTMLElement} - returns the form to sign up.
 */
export default function Signup () {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  /**
   *Function to handle the submit.
   *
   * @param {event} e - the submit event
   */
  async function handleSubmit (e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }

    try {
      setError('')
      setLoading(true)
      await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      navigate('/')
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }

  return (
    <>
      <Card >
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <div class="form-row">
            <div class="col">
            <div className='form-group row'>
            <label for='signUpForm'></label>
            <input type='text' className='form-control' id='signUpForm' placeholder='Email'
              ref={emailRef} required />
            </div>
            </div>
            <div className='form-group row'>
            <label for='signUpForm'></label>
            <input type='password' className='form-control' id="signUpForm" placeholder='Password'
             ref={passwordRef} required />
            </div>
            <div className='form-group row'>
            <label for='signUpForm'></label>
            <input type='password' className='form-control' id="signUpForm" placeholder='Password Confirm'
             ref={passwordConfirmRef} required />
            </div>
            <br></br>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
            </div>
            
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
