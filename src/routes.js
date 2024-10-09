import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Main from "./pages/Main";
import Routine from "./pages/Routine";
import TypeDetail from "./pages/TypeDetail";
import TypeTest from "./pages/TypeTest";
import MyPage from "./pages/MyPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const routes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Main />} />
                    <Route path="/typetest" element={<TypeTest />} />
                    <Route path="/typetest/detail" element={<TestDetail />} />
                    <Route path="/routine" element={<Routine />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default routes;