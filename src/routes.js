import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Main from "./pages/Main";
import Purpose from "./pages/Purpose";
import Routine from "./pages/Routine";
import TestDetail from "./pages/TypeTest/TestDetail.js";
import TestResult from "./pages/TypeTest/TestResult.js";
import TestResult1 from "./pages/TypeTest/TestResult1.js";
import TestResult2 from "./pages/TypeTest/TestResult2.js";
import TestResult3 from "./pages/TypeTest/TestResult3.js";
import TestResult4 from "./pages/TypeTest/TestResult4.js";
import TestResult5 from "./pages/TypeTest/TestResult5.js";
import TestResult6 from "./pages/TypeTest/TestResult6.js";
import MyPage from "./pages/MyPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const routes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Main />} />
                    <Route path="/typetest/detail" element={<TestDetail />} />
                    <Route path="/typetest/result" element={<TestResult />} />
                    <Route path="/typetest/result1" element={<TestResult1 />} />
                    <Route path="/typetest/result2" element={<TestResult2 />} />
                    <Route path="/typetest/result3" element={<TestResult3 />} />
                    <Route path="/typetest/result4" element={<TestResult4 />} />
                    <Route path="/typetest/result5" element={<TestResult5 />} />
                    <Route path="/typetest/result6" element={<TestResult6 />} />
                    <Route path="/routine" element={<Routine />} />
                    <Route path="/Purpose" element={<Purpose />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default routes;