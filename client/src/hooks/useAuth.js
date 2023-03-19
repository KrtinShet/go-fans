import { useSelector } from 'react-redux'

export default function useAuth() {
    const authState = useSelector(state => state.auth)

    if (authState?.userId) {
        return authState
    } else {
        return null
    }
}