import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RouteProtected = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== "recruiter") {
      navigate("/");
    }
  }, [user, navigate]);

  // Conditionally render children if user is a recruiter
  return user && user.role === "recruiter" ? <>{children}</> : null;
};

export default RouteProtected;
