// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext'; 
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Home from './components/Home'; 
import Login from './components/Login';
import Register from './components/Register'; 
import RoomDetails from './components/RoomDetails'; 
import Profile from './components/Profile'; 
import './global.css';
// import AdminPanel from './components/AdminPanel'; 

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout>
                <Home /> 
              </Layout>
            } 
          />
          <Route 
            path="/login" 
            element={ 
              <> 
                <Navbar /> 
                <Login /> 
              </>
            } 
          />
          <Route 
            path="/register" 
            element={ 
              <> 
                <Navbar /> 
                <Register /> 
              </>
            } 
          />
          <Route 
            path="/details/:roomId" 
            element={
              <Layout>
                <RoomDetails /> 
              </Layout>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <Layout>
                <Profile /> 
              </Layout>
            } 
          />
          {/* <Route 
            path="/admin" 
            element={
              <Layout>
                {currentUser && currentUser.role === 'admin' ? ( 
                  <AdminPanel /> 
                ) : (
                  <Navigate to="/" /> 
                )}
              </Layout>
            } 
          /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;