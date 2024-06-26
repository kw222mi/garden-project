import React from 'react'
import Signup from './components/Signup'
import { Container } from 'react-bootstrap'
import { AuthProvider } from './contexts/AuthContext'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import Garden from './components/Garden'
import ForgotPassword from './components/ForgotPassword'
import ToDoComponent from './components/ToDoComponent'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' // eslint-disable-line
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid
    console.log(uid)
  } else {
    console.log('User is signed out')
  }
})

/**
 * App component for the garden application.
 *
 * @returns {HTMLElement} - the application
 */
function App () {
  return (
    <Container
      className="app-container">
      <div >
          <AuthProvider>
            <Routes>
              <Route exact path="/"
                element={<PrivateRoute><Dashboard/></PrivateRoute>}
              />
              <Route path="/todo"
                element={<PrivateRoute><ToDoComponent/></PrivateRoute>}
              />
              <Route path="/garden"
                element={<PrivateRoute><Garden/></PrivateRoute>}
              />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/forgot-password" element={<ForgotPassword/>} />

            </Routes>
          </AuthProvider>
      </div>
    </Container>
  )
}

export default App
