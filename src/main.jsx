import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import Homepage from './Homepage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Homepage />
  </StrictMode>,
)
