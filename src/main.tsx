import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.ts'
import { ChakraProvider } from '@chakra-ui/react'

// import 'nextui/dist/index.css'
ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <ChakraProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </ChakraProvider>
    
  </React.StrictMode>,
)
