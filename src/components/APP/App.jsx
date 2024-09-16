
import Header from "components/Header/Header";
import Spinner from "components/Spinner/Spinner";
import { PrivateRoute } from "../../configRoute/PrivateRoute";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { RestrictedRoute } from "configRoute/RestrictedRoute";


const DiaryPage = lazy(() => import('../../pages/DiaryPage/DiaryPage'));
const CalculatorPage = lazy(() => import('../../pages/CalculatorPage/CalculatorPage'));
const RegistrationPage = lazy(() => import('../../pages/RegistrationPage/RegistrationPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage/LoginPage'));
const MainPage = lazy(() => import('../../pages/MainPage/MainPage'));

export const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/diary' element={<PrivateRoute redirectTo="/login" component={<DiaryPage />}/>} />
          <Route path='/calculator' element={<PrivateRoute redirectTo="/" component={<CalculatorPage />} />} />
          <Route path='/registration' element={<RestrictedRoute redirectTo="/calculator" component={<RegistrationPage />} />} />
          <Route path='/login' element={<RestrictedRoute redirectTo="/calculator" component={<LoginPage />} />} />
        </Routes>
      </Suspense>
    </>
  );
};
