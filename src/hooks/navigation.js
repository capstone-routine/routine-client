import { useNavigate } from "react-router-dom";

export function useNavigation() {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/");
    };

    const goToSignIn = () => {
        navigate("/signin");
    };

    const goToSignUp = () => {
        navigate("/signup");
    };

    const goToMypage = () => {
        navigate("/mypage");
    };
    
    return {
        goToHome,
        goToSignIn,
        goToSignUp,
        goToMypage,
    };
}