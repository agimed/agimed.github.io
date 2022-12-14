import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { WrapperTermoDePrivacidade } from './Pages/TermoDePrivacidade'
import { ProviderAtendimento } from './Providers/Atendimento'
import { LoadingComponentProvider } from './Providers/Loading'

ReactDOM.createRoot(document.getElementById('root')).render(
  <WrapperTermoDePrivacidade>
    <HashRouter basename={import.meta.env.BASE_URL || ''}>
      <LoadingComponentProvider>
        <ProviderAtendimento>
          <App />
        </ProviderAtendimento>
      </LoadingComponentProvider>
    </HashRouter>
  </WrapperTermoDePrivacidade>
)
