import { useAuth } from "@/context/AuthContext";

const { useRouter } = require("next/router");
const { useEffect } = require("react");

const ProtectedRoute = ({ children }) => {

    const { user } = useAuth();
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [router.push, user]);

    return <>{user ? children : <div></div>}</>;
}

export default ProtectedRoute