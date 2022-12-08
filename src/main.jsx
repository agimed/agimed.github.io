import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ProviderAtendimento } from './Providers/Atendimento'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ProviderAtendimento>
    <BrowserRouter basename={import.meta.env.BASE_URL || ''}>
      <App />
    </BrowserRouter>
  </ProviderAtendimento>
)
