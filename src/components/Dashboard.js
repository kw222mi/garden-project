import React, { useState } from 'react'
import { Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'

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
   * Function to handle the users logout.
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
    <Navbar/>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}

        </Card.Body>
      </Card>
    
      
    </>
  )
}
