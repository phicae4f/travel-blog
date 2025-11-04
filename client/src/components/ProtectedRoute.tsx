import { Navigate } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"


interface ProtectedRouteProps {
    children: React.ReactNode,
}

export const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const {token} = useAppSelector((state) => state.auth)


    if(!token) {
        return(
            <Navigate to="/" replace />
        )
    }

    return (
        <>{children}</>
    )
}