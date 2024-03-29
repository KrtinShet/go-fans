import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './../components/AppLayout'
import AuthWrapper from './../components/AuthWrapper'
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
import CreatorLoginPage from './CreatorLoginPage'
import CreatorSignupPage from './CreatorSignupPage'
import FeedsPage from './FeedsPage';
import FeedPage from './FeedPage'
import CreatorPage from './CreatorPage'
import MyPosts from './MyPosts'
import FollowersPage from './FollowersPage'
import StatsPage from './Stats'
import CreateFeedPage from './CreateFeedPage'
import CreatorsPage from './Creators'
import PaymentPage from './PaymentPage'

const routes = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/login', element: <LoginPage /> },
            { path: '/creators', element: <CreatorsPage /> },
            { path: '/signup', element: <SignupPage /> },
            { path: '/creator/login', element: <CreatorLoginPage /> },
            { path: '/creator/signup', element: <CreatorSignupPage /> },
            {
                element: <AuthWrapper />,
                children: [
                    { path: '/feeds', element: <FeedsPage /> },
                    { path: '/feeds/:feedId', element: <FeedPage /> },
                    { path: "/payment/:creatorId", element: <PaymentPage /> }
                ]
            },
            {
                element: <AuthWrapper to={"creator"} />,
                children: [
                    { path: '/dashboard/myposts', element: <MyPosts /> },
                    { path: '/dashboard/followers', element: <FollowersPage /> },
                    { path: '/dashboard/createfeed', element: <CreateFeedPage /> },
                ]
            },
            { path: "/creator/:creatorId", element: <CreatorPage /> },
            { path: "/stats", element: <StatsPage /> },
            { path: '*', element: <NotFoundPage /> },
        ]
    }

])


export default routes;