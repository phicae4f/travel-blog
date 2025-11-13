import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      alert("Для доступа к этой странице необходимо авторизоваться");
    }
  }, [token]);


  if (!token) {
    return (
        <>
            <Navigate to="/" replace />
        </>
    )
  }

  return <>{children}</>;
};
