import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

/**
 * Show the user navigation and information about login.
 *
 * @returns {HTMLElement}-the user interface of the dashboard.
 */
export default function Dashboard () {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  /**
   *  Function to handle the users logout.
   */
  async function handleLogout () {
    setError('')

    try {
      await logout()
      navigate('login')
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}

        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
      <div>
      <Link to="/todo" className="btn btn-primary w-100 mt-3">
            TodoList
          </Link>
      </div>
      <div>
      <Link to="/garden" className="btn btn-primary w-100 mt-3">
            My garden
          </Link>
      </div>
    </>
  )
}
