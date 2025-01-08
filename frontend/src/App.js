import logo from './logo.svg';
import './App.css';
// import Section from './components/Section';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignInSide from './components/signIn/sign-in-side/SignInSide';
import SignUp from './components/signup//sign-up/SignUp';
import MarketingPage from './components/LandingPage/marketing-page/MarketingPage';
import Dashboard from './components/Dashboard/dashboard/Dashboard';
import UDashboard from './components/UserDashboard/dashboard/Dashboard';
import PrivateRoute from './components/midllewear/PrivateRoute';


function App() {
  return (

    <div>
      {/* <Section /> */}

      <BrowserRouter>


<Routes>

  <Route path="/signin" element = {<SignInSide />}/>
  <Route path="/signup" element = {<SignUp />}/>
  <Route path="/home" element = {<MarketingPage />}/> 


  <Route element = {<PrivateRoute />}>
  <Route path="/dashboard" element = {<Dashboard />}/> 
  <Route path="/userdashboard" element = {<UDashboard />}/> 
  </Route>
  
</Routes>
 </BrowserRouter>
  


   </div>
  );
}

export default App;
