import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase-config'

const AuthContext = React.createContext()

/**
 * Context for authorizaion.
 *
 * @returns {*} - context
 */
export function useAuth () {
  return useContext(AuthContext)
}

/**
 * Set the current user.
 *
 * @param {*} param0 - param
 * @returns {*} - context
 */
export function AuthProvider ({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  /**
   * Signup.
   *
   * @param {*} email - email
   * @param {*} password - password
   * @returns {*} auth context
   */
  function signup (email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  /**
   * Login.
   *
   * @param {*} email - email
   * @param {*} password - password
   * @returns {*} auth context
   */
  function login (email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  /**
   * Logout.
   *
   * @returns {*} auth context
   */
  function logout () {
    return auth.signOut()
  }

  /**
   * Reset password.
   *
   * @param {*} email - email
   * @returns {*} auth context
   */
  function resetPassword (email) {
    return auth.sendPasswordResetEmail(email)
  }

  // function updateEmail(email) {
  //  return currentUser.updateEmail(email)
  // }

  // function updatePassword(password) {
  // return currentUser.updatePassword(password)
  //

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword    
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
