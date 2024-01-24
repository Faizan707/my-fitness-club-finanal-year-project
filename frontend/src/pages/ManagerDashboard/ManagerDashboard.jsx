import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ManagerDashboard.css";
import { useNavigate } from "react-router-dom";
import InstructorList from "../Instructor/View Instructor/InstructorList";
import ViewCustomerReports from "../Reports/View Customer Reports/ViewCustomerReports";
import WorkoutList from "../Workout/Workout List/WorkoutList";
import ViewMonthlyBills from "../Reports/Monthly Bill/ViewMonthlyBills";
import ViewSalaries from "../Reports/Salaries/View Salaries/ViewSalaries";
import ViewRent from "../Reports/Rent/ViewRent";
import ViewProfit from "../Reports/Profits/ViewProfits";
import ViewAssistantManager from "../../components/AssistantManager/view Assistant manager/ViewAssistantManager";
import ViewDietPlanManager from "../Diet plan/View Diet plan/ViewDietPlanManager";
function ManagerDashboard() {
  const [formData, setFormData] = useState({
    username: "",
    customer_id: "",
    email: "",
    weight: "",
    heightFeet: "",
    heightInches: "",
    bmi: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [customerList, setCustomerList] = useState([]);

  const navigate = useNavigate()
  
  const handleWorkoutNavigate =()=>{
    navigate("/workouts")
  }
  const managerNavigate = useNavigate()

  const AssistantManagerNavigate=useNavigate()
  const handleAssitantManagerNavige =()=>{
    AssistantManagerNavigate('/assistant-manager')
  }
  const handleManagerlogout = ()=>{
    managerNavigate("/")
  }

  const DietPlanNavigate = useNavigate()
  const handleDietPlanNavigate =() =>{
    DietPlanNavigate("/diet-plan")
  }
  const instructorNavigate = useNavigate()
  const handleInstructorNavigate = () =>{
    instructorNavigate("/instructor")
  }

  const [showReports, setShowReports] = useState(false);
  const handleToggleReports = () => {
    setShowReports((prevShowReports) => !prevShowReports);
  };
  const reportsNavigate =useNavigate()
  const handleReportsNavigate= () => {
    reportsNavigate("/customer-reports")
  }
  const monthlyBillsNavigate = useNavigate()
  const handleMonthlyBillsNavigate = () =>{
    monthlyBillsNavigate("/monthly-bills")
  }
  const salariesNavigate = useNavigate()
  const handleSalariesNavigate = () =>{
    salariesNavigate("/salaries")
  }
const rentNavigate =useNavigate()
const handleRentNavigate = () =>{
  rentNavigate("/rent")
}
const profitNavigate= useNavigate()
const handleProfitNavigate =()=>{
  profitNavigate("/profits")
}
const backupNavigate =useNavigate()
const handleBackupNavigate =()=>{
  backupNavigate("/backup")
}

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8001/api/customer_registration/"
        );
        setCustomerList(response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "weight" || name === "heightFeet" || name === "heightInches") {
      const weight = parseFloat(formData.weight);
      const heightInFeet = parseFloat(formData.heightFeet);
      const heightInInches = parseFloat(formData.heightInches);
      const bmiCalculation = (
        weight /
        ((heightInFeet * 12 + heightInInches) * 0.0254) ** 2
      ).toFixed(2);

      setFormData((prevData) => ({
        ...prevData,
        bmi: isNaN(bmiCalculation) ? "" : bmiCalculation,
      }));
    }

    if (name === "customer_id") {
      setFormData((prevData) => ({
        ...prevData,
        customer_id: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    const heightFeet = parseInt(formData.heightFeet, 10) || 0;
    const heightInches = parseInt(formData.heightInches, 10) || 0;

    const weight = parseFloat(formData.weight) || 0;
    const heightInMeters = (heightFeet * 12 + heightInches) * 0.0254;
    const bmi = weight / heightInMeters ** 2;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8001/api/customer_registration/",
        {
          ...formData,
          bmi,
          height_feet: heightFeet,
          height_inches: heightInches,
        }
      );

      console.log("Server response:", response.data);

      const updatedList = await axios.get(
        "http://127.0.0.1:8001/api/customer_registration/"
      );
      setCustomerList(updatedList.data);

      setFormData({
        username: "",
        customer_id: "",
        email: "",
        weight: "",
        heightFeet: "",
        heightInches: "",
        bmi: "",
        goal:"",

      });

      setShowForm(false);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const handleAddCustomerClick = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleEditCustomerClick = (customer) => {
    setFormData({
      username: customer.username,
      customer_id: customer.customer_id,
      email: customer.email,
      weight: customer.weight,
      heightFeet: customer.height_feet,
      heightInches: customer.height_inches,
      bmi: customer.bmi,
      goal:customer.goal,
    });

    setShowForm(true);
  };

  const handleDeleteCustomer = async (customerId) => {
    console.log('Deleting customer with ID:', customerId);
  
    try {
      await axios.delete(
        `http://127.0.0.1:8001/api/customer_registration/${customerId}/`
      );
  
      const updatedList = await axios.get(
        "http://127.0.0.1:8001/api/customer_registration/"
      );
      setCustomerList(updatedList.data);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };
  
  return (
    <div className="manager-dashboard-container">
      <nav>
        <div className="manager-dashboard-navbar">
          <h1>Welcome Manager</h1>
          <button onClick={handleManagerlogout}>Logout</button>
        </div>
      </nav>
      <div className="manager-dashboard-content">
        <div className="Buttons-container">
        <button onClick={handleAddCustomerClick}>
          {showForm ? "Hide Form" : "Add Customer"}
        </button>
        <button onClick={handleBackupNavigate} className="backup-button">Database Backup</button>

        <button className="workout-button" onClick={handleWorkoutNavigate}>Add Workout</button>
        <button className="assistant-manager-button" onClick={handleAssitantManagerNavige}>Add Assistant Manager</button>
        <button className="diet-plan-button" onClick={handleDietPlanNavigate}>Add diet</button>
        <button className="add-instructor-button" onClick={handleInstructorNavigate}>Add Instructor</button>
        <button onClick={handleReportsNavigate} className='customer-reports-button'>Create Customer Reports</button>
        <button onClick={handleMonthlyBillsNavigate} className="bill-button">Create Monthly Bills Reports</button>
        <button onClick={handleSalariesNavigate} className="salary-button">Create Salaries Reports</button>
        <button onClick={handleRentNavigate} className="Rent-button">Create Rent Reports</button>
        <button onClick={handleProfitNavigate} className="profits-button">Create Profits Reports</button>

        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="registration-form">
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </label>
            <label>
              Customer ID:
              <input
                type="text"
                name="customer_id"
                value={formData.customer_id}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              Weight (kg):
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </label>
            <label>
              Height (Feet):
              <input
                type="number"
                name="heightFeet"
                value={formData.heightFeet}
                onChange={handleChange}
              />
            </label>
            <label>
              Height (Inches):
              <input
                type="number"
                name="heightInches"
                value={formData.heightInches}
                onChange={handleChange}
              />
            </label>
            <label>
                Goal :
              <input
                type="text"
                name="goal"
                value={formData.goal}
                onChange={handleChange}
              />
            </label>



            <button type="submit">Register Customer</button>
          </form>
        )}
      </div>
      <div className="customer-list-container">
  <h2>Customer List</h2>
  <table className="customer-list-table">
    <thead>
      <tr>
        <th>Customer ID</th>
        <th>Username</th>
        <th>Email</th>
        <th>Weight</th>
        <th>Height in feet</th>
        <th>Height in Inches</th>
        <th>BMI</th>
        <th>Goal</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {customerList.map((customer) => (
        <tr key={`${customer.customer_id}-${customer.username}`}>
          <td>{customer.customer_id}</td>
          <td>{customer.username}</td>
          <td>{customer.email}</td>
          <td>{customer.weight}</td>
          <td>{customer.height_feet}</td>
          <td>{customer.height_inches}</td>
          <td>{customer.bmi}</td>
          <td>{customer.goal}</td>
          <td>
            <button onClick={() => handleEditCustomerClick(customer)} className="edit">
              Edit
            </button>
            <button onClick={() => handleDeleteCustomer(customer.customer_id)} className="delete">
              Delete
            </button>

          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        <InstructorList/>
        <WorkoutList/>
        <ViewDietPlanManager/>
        <ViewMonthlyBills/>
        <ViewSalaries/>
        <ViewRent/>
        <ViewProfit/>
        <ViewAssistantManager/>
 
        <div>
      <button onClick={handleToggleReports} style={{marginTop:"10px"}}>
        {showReports ? 'Hide Customer Reports' : 'Show Customer Reports'}
      </button>
      {showReports && <ViewCustomerReports />}
    </div>
    </div>
  );
}

export default ManagerDashboard;
