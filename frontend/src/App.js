import { useState } from "react";
import "./App.css";

const defaultForm = {
  Age: 35,
  BusinessTravel: "Travel_Rarely",
  DailyRate: 800,
  Department: "Sales",
  DistanceFromHome: 10,
  Education: 3,
  EducationField: "Life Sciences",
  EmployeeCount: 1,
  EmployeeNumber: 100,
  EnvironmentSatisfaction: 3,
  Gender: "Male",
  HourlyRate: 65,
  JobInvolvement: 3,
  JobLevel: 2,
  JobRole: "Sales Executive",
  JobSatisfaction: 3,
  MaritalStatus: "Single",
  MonthlyIncome: 5000,
  MonthlyRate: 15000,
  NumCompaniesWorked: 3,
  Over18: "Y",
  OverTime: "Yes",
  PercentSalaryHike: 14,
  PerformanceRating: 3,
  RelationshipSatisfaction: 3,
  StandardHours: 80,
  StockOptionLevel: 0,
  TotalWorkingYears: 10,
  TrainingTimesLastYear: 2,
  WorkLifeBalance: 2,
  YearsAtCompany: 5,
  YearsInCurrentRole: 3,
  YearsSinceLastPromotion: 1,
  YearsWithCurrManager: 3,
};

const sections = [
  {
    title: "Personal Info",
    fields: ["Age", "Gender", "MaritalStatus", "Over18", "DistanceFromHome"],
  },
  {
    title: "Job Info",
    fields: [
      "Department", "JobRole", "JobLevel", "JobInvolvement",
      "BusinessTravel", "OverTime", "EmployeeCount", "EmployeeNumber",
    ],
  },
  {
    title: "Compensation",
    fields: [
      "MonthlyIncome", "MonthlyRate", "DailyRate", "HourlyRate",
      "PercentSalaryHike", "StockOptionLevel",
    ],
  },
  {
    title: "Satisfaction",
    fields: [
      "JobSatisfaction", "EnvironmentSatisfaction",
      "RelationshipSatisfaction", "WorkLifeBalance", "PerformanceRating",
    ],
  },
  {
    title: "Education",
    fields: ["Education", "EducationField"],
  },
  {
    title: "Experience",
    fields: [
      "TotalWorkingYears", "NumCompaniesWorked", "TrainingTimesLastYear",
      "StandardHours", "YearsAtCompany", "YearsInCurrentRole",
      "YearsSinceLastPromotion", "YearsWithCurrManager",
    ],
  },
];

const selectOptions = {
  Gender: ["Male", "Female"],
  MaritalStatus: ["Single", "Married", "Divorced"],
  Over18: ["Y"],
  BusinessTravel: ["Non-Travel", "Travel_Rarely", "Travel_Frequently"],
  OverTime: ["Yes", "No"],
  Department: ["Sales", "Research & Development", "Human Resources"],
  JobRole: [
    "Sales Executive", "Research Scientist", "Laboratory Technician",
    "Manufacturing Director", "Healthcare Representative", "Manager",
    "Sales Representative", "Research Director", "Human Resources",
  ],
  EducationField: [
    "Life Sciences", "Medical", "Marketing", "Technical Degree",
    "Human Resources", "Other",
  ],
};

function App() {
  const [form, setForm] = useState(defaultForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = Object.keys(defaultForm).filter(
      (k) => typeof defaultForm[k] === "number"
    );
    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("https://employee-attrition-api-zf98.onrender.com/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError("Could not connect to API. Make sure FastAPI is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>Employee Attrition Predictor</h1>
      <form onSubmit={handleSubmit}>
        {sections.map((section) => (
          <div key={section.title} className="section">
            <h2>{section.title}</h2>
            <div className="grid">
              {section.fields.map((field) => (
                <div key={field} className="field">
                  <label>{field}</label>
                  {selectOptions[field] ? (
                    <select name={field} value={form[field]} onChange={handleChange}>
                      {selectOptions[field].map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="number"
                      name={field}
                      value={form[field]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict Attrition"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className={`result ${result.attrition === "Yes" ? "yes" : "no"}`}>
          <h2>Prediction: {result.attrition === "Yes" ? "⚠️ Will Leave" : "✅ Will Stay"}</h2>
          <p>Probability of Leaving: <strong>{(result.probability_of_leaving * 100).toFixed(1)}%</strong></p>
        </div>
      )}
    </div>
  );
}

export default App;
