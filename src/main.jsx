// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { seedDemoUsers } from './services/seedUsers.js'

// Seed akun demo sekali saat pertama kali dibuka
seedDemoUsers()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
