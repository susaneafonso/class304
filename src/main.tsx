import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Rotas } from './Rotas'



createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Rotas/>
  </StrictMode>,
)
