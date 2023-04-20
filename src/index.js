import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Userdisplay from './pages/userDetail';
import Post from './pages/userDetail/components/post';


const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
  },
  {
    path:"/user",
    element: <Userdisplay />
  },
  {
    path:"/post",
    element:<Post />
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <RouterProvider router={router} />
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
