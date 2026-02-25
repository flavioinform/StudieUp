import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { FirebaseAppProvider } from 'reactfire'
import { firebaseConfig } from './config/firebase.ts'
import FirebaseServices from './config/firebase-services.tsx'
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>  
      <FirebaseServices>

        <BrowserRouter>           
           <App />


       </BrowserRouter>


      </FirebaseServices>


</FirebaseAppProvider>
  </StrictMode>,
)
