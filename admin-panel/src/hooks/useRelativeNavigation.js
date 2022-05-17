import { resolvePath, useLocation, useNavigate } from 'react-router-dom'

export default function useRelativeNavigation() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const relativeNavigation = relativePath => navigate(resolvePath(relativePath, pathname))
    return relativeNavigation
}
