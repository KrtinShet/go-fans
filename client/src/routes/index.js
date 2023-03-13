import { createBrowserRouter } from 'react-router-dom'


import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';


const routes = createBrowserRouter([
    { path: '/', element: <HomePage /> },
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '*', element: <NotFoundPage /> }
])



export default routes;