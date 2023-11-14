import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const SetAvatar = lazy(() => import("./pages/SetAvatar"));
const Setusername = lazy(() => import("./pages/Setusername"));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path="/setusername" element={<Setusername />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
