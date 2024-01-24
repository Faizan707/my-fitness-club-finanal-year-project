import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import ManagerLogin from './components/ManagerLogin/ManagerLogin';
import ManagerDashboard from './pages/ManagerDashboard/ManagerDashboard';
import CustomerSignin from './components/CustomerSignin/CustomerSignin';
import AddWorkout from './pages/Workout/AddWorkout';
import CustomerLoginPage from './pages/CustomerPage/CustomerLoginPage';
import Services from './pages/home/Services';
import AssistantManager from './components/AssistantManager/AssistantManager';
import AssistantManagerLogin from './components/AssistantManagerLogin/AssistantManagerLogin';
import AssistantManagerDashboard from './pages/AssistantManagerDashboard/AssistantManagerDashboard';
import CreateAccountForm from './pages/Accounts/CreateAccounts/CreateAccountsForm';
import PaidAccounts from './pages/Accounts/PaidAccounts/PaidAccounts';
import DietPlanForm from './pages/Diet plan/DietPlanForm';
import CreateInstructorForm from './pages/Instructor/CreateInstructorForm';
import CustomerReports from './pages/Reports/Customer Reports/CustomerReports';
import MonthlyBills from './pages/Reports/Monthly Bill/MonthlyBills';
import SalaryComponent from './pages/Reports/Salaries/SalaryComponent';
import RentComponent from './pages/Reports/Rent/RentComponent';
import CreateProfit from './pages/Reports/Profits/CreateProfit';
import BackupComponent from './pages/Backup/BackupComponent';
function App() {
  return (
 

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}  />
          <Route path='/services' element={<Services/>}/>
          <Route path='/manager-signin' element={<ManagerLogin/>}> </Route>
          <Route path='/manager-dashboard' element={<ManagerDashboard/>}></Route>
          <Route path='/customer-signin' element={<CustomerSignin/>}/>
          <Route path='/workouts' element={<AddWorkout/>}/>
          <Route path='/customer-login-page/:username' element={<CustomerLoginPage/>}/>
          <Route path='/assistant-manager' element={<AssistantManager/>}/>
          <Route path='/assistant-manager-signin' element={<AssistantManagerLogin/>}/>
          <Route path='/assistant-manager-dashboard/:name' element={<AssistantManagerDashboard/>}/>
          <Route path='/create-account' element={<CreateAccountForm/>}/>
          <Route path='/paid-amounts' element={<PaidAccounts/>}/>
          <Route path='/diet-plan' element={<DietPlanForm/>}/>
          <Route path='/instructor' element={<CreateInstructorForm/>}/>
          <Route path='/customer-reports' element={<CustomerReports/>}/>
          <Route path='monthly-bills' element={<MonthlyBills/>}/>
          <Route path='/salaries' element={<SalaryComponent/>}/>
          <Route path='/rent' element={<RentComponent/>}/>
          <Route path='/profits' element={<CreateProfit/>}/>
          <Route path='backup' element={<BackupComponent/>}/>


        </Routes>
      </BrowserRouter>
    </div>
   


  );
}

export default App;
