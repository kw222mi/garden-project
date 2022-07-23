import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 * Component to route the user to login page.
 *
 * @param {*} root0 - root.
 * @param {*} root0.children - root.children
 * @returns {*} - navigate to the login page
 */
export default function PrivateRoute ({ children }) {
  const { currentUser } = useAuth()

  return currentUser ? children : <Navigate to="/login" />
}
