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

    const goToPurpose = () => {
        navigate("/purpose");
    };

    const goToTestDetail = () => {
        navigate("/typetest/detail");
    };
    const goToTestResult = () => {
        navigate("/typetest/result");
    };
    const goToTestResult1 = () => {
        navigate("/typetest/result1");
    };
    const goToTestResult2 = () => {
        navigate("/typetest/result2");
    };
    const goToTestResult3 = () => {
        navigate("/typetest/result3");
    };
    const goToTestResult4 = () => {
        navigate("/typetest/result4");
    };
    const goToTestResult5 = () => {
        navigate("/typetest/result5");
    };
    const goToTestResult6 = () => {
        navigate("/typetest/result6");
    };



    
    return {
        goToHome,
        goToSignIn,
        goToSignUp,
        goToMypage,
        goToPurpose,
        goToTestDetail,
        goToTestResult,
        goToTestResult1,
        goToTestResult2,
        goToTestResult3,
        goToTestResult4,
        goToTestResult5,
        goToTestResult6
    };
}