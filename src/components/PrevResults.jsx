import React from "react";
import { useEffect, useState } from "react";
import { showPrevious, deleteProject } from "../api";
import { Link } from "react-router-dom";
import NavBar from "./NavBar.jsx";

export default function PrevResults() {
  const [projects, setProjects] = useState([]);

  const fetchData = async () => {
    const res = await showPrevious();
    // console.log(res);
    setProjects(res);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    // console.log(e.target.innerHTML);
    await deleteProject(id);
    const project = projects.find(project => project.id = id)
    projects.splice(projects.indexOf(project), 1)
    setProjects([...projects])
    // fetchData()

  };

  return (
    <div>
      <NavBar />
      {projects &&
        projects.map((project) => {
          return (
            <div key={project.id}>
              <h2>Project Name: {project.fields.projectName}</h2>
              <p>Initial Investment: {project.fields.initialInvestment}</p>
              <p>Additional Capital: {project.fields.additionalCapital}</p>
              <p>Annual Revenue: {project.fields.annualRevenue}</p>
              <p>Annual Expense: {project.fields.annualExpense}</p>
              <p>Closing Cost: {project.fields.closingCost}</p>
              <p>Revenue Growth Rate: {project.fields.revenueGrowthRate}</p>
              <p>Expense Growth Rate: {project.fields.expenseGrowthRate}</p>
              <p>Hold Period: {project.fields.holdPeriod}</p>
              <p>Cap Rate: {project.fields.capRate}</p>
              <Link to={`/edit/pr/${project.id}`}>Edit</Link>
              <button onClick={()=> handleDelete(project.id)}>Delete</button>
            </div>
          );
        })}
    </div>
  );
}
