import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase-config'

const AuthContext = React.createContext()

/**
 * Context for authorizaion
 * @returns {context}
 */
export function useAuth() {
  return useContext(AuthContext)
}

/**
 * 
 * @param {*} param0 
 * @returns 
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  /**
   * 
   * @param {*} email 
   * @param {*} password 
   * @returns 
   */
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  /**
   * 
   * @param {*} email 
   * @param {*} password 
   * @returns 
   */
  function login (email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  /**
   * 
   * @returns 
   */
  function logout() {
    return auth.signOut()
  }

  /**
   * 
   * @param {*} email 
   * @returns 
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
    // updateEmail,
    // updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
