import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './Companents/App.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
