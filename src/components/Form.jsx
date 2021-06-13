import React from "react";
import { useParams, useHistory } from "react-router";
import { useEffect } from "react";
import { createProject, editProject } from "../api";
import NavBar from "./NavBar.jsx";
import { getProject } from '../api.js'


export default function Form(props) {
  const { formData, setFormData } = props
  const history = useHistory()
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      setFormData({})
      if (id) {
        const res = await getProject(id);
        res && setFormData(res.fields);
      }
      console.log(formData)
    };
    fetchProject()
    //eslint-disable-next-line
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await editProject(id, formData);
    } else {
      console.log("running")
      await createProject(formData);
    }
    history.push('/pr')
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };


  return (
    <div className="form-inner-wrapper">

      <NavBar />

      <form
        className="form-container"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <label htmlFor="projName">Project Name: </label>
        <input
          id="projName"
          type="text"
          name="projectName"
          value={formData.projectName ?? ''}
        />
        <br />
        <label htmlFor="initialInvestment">Initial Investment: </label>
        <input
          id="initialInvestment"
          type="number"
          name="initialInvestment"
          value={formData.initialInvestment ?? ''}
        />
        <br />
        <label htmlFor="addCapital">Additional Capital: </label>
        <input
          id="addCapital"
          type="number"
          name="additionalCapital"
          defaultValue=''
          value={formData.additionalCapital ?? ''}
        />
        <br />
        <label htmlFor="holdPeriod">Hold Period: </label>
        <input
          id="holdPeriod"
          type="number"
          name="holdPeriod"
          value={formData.holdPeriod ?? ''}
        />
        <br />
        <label htmlFor="annualRev">Annual Revenue: </label>
        <input
          id="annualRev"
          type="number"
          name="annualRevenue"
          value={formData.annualRevenue ?? ''}
        />
        <br />
        <label htmlFor="annualExp">Annual Expense: </label>
        <input
          id="annualExp"
          type="number"
          name="annualExpense"
          value={formData.annualExpense ?? ''}
        />
        <br />
        <label htmlFor="closingCost">Closing Cost: </label>
        <input
          id="closingCost"
          type="number"
          name="closingCost"
          value={formData.closingCost ?? ''}
        />
        <br />
        <label htmlFor="growthRev">Revenue Growth Rate: </label>
        <input
          id="growthRev"
          type="number"
          name="revenueGrowthRate"
          value={formData.revenueGrowthRate ?? ''}
        />
        <br />
        <label htmlFor="growthExp">Expense Growth Rate: </label>
        <input
          id="growthExp"
          type="number"
          name="expenseGrowthRate"
          value={formData.expenseGrowthRate ?? ''}
        />
        <br />
        <label htmlFor="capRate">Cap Rate: </label>
        <input
          id="capRate"
          type="number"
          name="capRate"
          value={formData.capRate ?? ''}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
