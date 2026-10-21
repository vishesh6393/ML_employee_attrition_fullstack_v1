import joblib
import pandas as pd
from fastapi import FastAPI
from src.schema import EmployeeInput

app = FastAPI(title="Employee Attrition Predictor")

model = joblib.load("models/best_model.pkl")


@app.get("/")
def root():
    return {"message": "Employee Attrition API is running"}


@app.post("/predict")
def predict(employee: EmployeeInput):
    data = pd.DataFrame([employee.model_dump()])
    prediction = model.predict(data)[0]
    probability = model.predict_proba(data)[0]

    yes_idx = list(model.classes_).index("Yes")

    return {
        "attrition": prediction,
        "probability_of_leaving": round(float(probability[yes_idx]), 3)
    }
