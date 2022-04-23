import React from "react"
import Signup from "./components/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import UpdateProfile from "./components/UpdateProfile"
import ForgotPassword from "./components/ForgotPassword"
import ToDoComponent from "./components/ToDoComponent"



function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        
          <AuthProvider>
            <Routes>
              <Route exact path="/"
                element={<PrivateRoute><Dashboard/></PrivateRoute>}
              />
              <Route path="/todo"
                element={<PrivateRoute><ToDoComponent/></PrivateRoute>}
              />
              <Route path="/update-profile"
                element={<PrivateRoute><UpdateProfile/></PrivateRoute>}
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
