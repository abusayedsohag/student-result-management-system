import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import router from './Router/MainRouter';
import AuthContext from './Provider/AuthContext';
import Context from './Provider/Context';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context>
      <AuthContext>
        <RouterProvider router={router} />
      </AuthContext>
    </Context>
  </StrictMode>,
)
