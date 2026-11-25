import joblib
import numpy as np
import pandas as pd
import shap
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.schema import EmployeeInput

app = FastAPI(title="Employee Attrition Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load("models/best_model.pkl")
preprocessor = model.named_steps["preprocessor"]
classifier = model.named_steps["classifier"]
explainer = shap.LinearExplainer(classifier, shap.maskers.Independent(preprocessor.transform(
    pd.read_csv("data/WA_Fn-UseC_-HR-Employee-Attrition.csv").drop(columns=["Attrition"])
)))


@app.api_route("/", methods=["GET", "HEAD"])
def root():
    return {"message": "Employee Attrition API is running"}


@app.post("/predict")
def predict(employee: EmployeeInput):
    data = pd.DataFrame([employee.model_dump()])
    prediction = model.predict(data)[0]
    probability = model.predict_proba(data)[0]

    yes_idx = list(model.classes_).index("Yes")
    prob_yes = round(float(probability[yes_idx]), 3)

    # SHAP explanations
    X_transformed = preprocessor.transform(data)
    shap_values = explainer.shap_values(X_transformed)

    # Get feature names after preprocessing
    num_features = preprocessor.transformers_[0][2]
    cat_encoder = preprocessor.transformers_[1][1].named_steps["onehot"]
    cat_features = list(cat_encoder.get_feature_names_out(preprocessor.transformers_[1][2]))
    all_features = num_features + cat_features

    # shap_values shape: (1, n_features) for LinearExplainer
    sv = shap_values[0] if shap_values.ndim == 2 else shap_values

    # Pick top 5 by absolute impact
    indices = np.argsort(np.abs(sv))[::-1][:5]
    total = float(np.sum(np.abs(sv))) or 1.0

    top_reasons = []
    for i in indices:
        impact = float(sv[i])
        top_reasons.append({
            "feature": all_features[i],
            "impact": round(impact, 4),
            "impact_pct": round(abs(impact) / total * 100, 1),
            "direction": "increases" if impact > 0 else "decreases",
        })

    return {
        "attrition": prediction,
        "probability_of_leaving": prob_yes,
        "top_reasons": top_reasons,
    }
