# Employee Attrition Prediction

A machine learning project built while learning ML. The goal is to predict whether an employee will leave the company or stay, using the IBM HR Analytics dataset.

> This is a learning project — actively being improved.

---

## What I built

- Explored the dataset (1,470 employees, 35 features)
- Performed EDA to understand patterns (overtime, monthly income vs attrition)
- Built a preprocessing pipeline (StandardScaler + OneHotEncoder)
- Trained Logistic Regression models
- Tuned hyperparameters using GridSearchCV
- Evaluated using Accuracy, Precision, Recall, F1-score
- Built a FastAPI backend with `/predict` endpoint
- Built a React frontend with a form to predict attrition

## Tech Stack

- Python 3.13
- pandas, numpy, matplotlib, seaborn
- scikit-learn
- uv (package manager)
- Jupyter Notebook
- FastAPI + Uvicorn
- React

## Project Structure

```
employee-attrition-ml/
├── data/                             # Dataset goes here (not tracked)
├── notebooks/
│   └── 02_optimized_logistic.ipynb  # Main notebook
├── models/
│   └── best_model.pkl               # Saved trained model
├── src/
│   └── schema.py                    # Pydantic input schema
├── frontend/                        # React frontend
├── main.py                          # FastAPI app
├── pyproject.toml
└── README.md
```

## How to Run

### 1. Clone and setup

```bash
git clone <your-repo-url>
cd employee-attrition-ml
```

### 2. Install Python dependencies

```bash
uv sync
```

### 3. Download dataset

Download from Kaggle and place in `data/`:
https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset

### 4. Run the notebook (optional)

```bash
uv run jupyter notebook
```

### 5. Run the backend

```bash
uv run uvicorn main:app --reload
```

API runs at `http://127.0.0.1:8000`
Swagger docs at `http://127.0.0.1:8000/docs`

### 6. Run the frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at `http://localhost:3000`

---

## Status

- [x] Data understanding & EDA
- [x] Preprocessing pipeline
- [x] Logistic Regression model
- [x] Hyperparameter tuning
- [x] FastAPI backend with `/predict` endpoint
- [x] React frontend
- [ ] Feature selection & model retraining
- [ ] Deploy to cloud
