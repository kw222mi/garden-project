import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

/**
 *
 * @param root0
 * @param root0.children
 */
export default function PrivateRoute ({ children }) {
  const { currentUser } = useAuth()

  return currentUser ? children : <Navigate to="/login" />
}
