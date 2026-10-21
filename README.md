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

## Tech Stack

- Python 3.13
- pandas, numpy, matplotlib, seaborn
- scikit-learn
- uv (package manager)
- Jupyter Notebook

## Project Structure

```
employee-attrition-ml/
├── data/                        # Dataset goes here (not tracked)
├── notebooks/
│   └── 02_optimized_logistic.ipynb   # Main notebook
├── models/
│   └── best_model.pkl           # Saved trained model
├── src/                         # Source code (coming soon)
├── main.py
├── pyproject.toml
└── README.md
```

## How to Run

```bash
# Clone the repo
git clone <your-repo-url>
cd employee-attrition-ml

# Install dependencies
uv sync

# Download the dataset from Kaggle and place it in data/
# https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset

# Open the notebook
uv run jupyter notebook
```

## Status

- [x] Data understanding & EDA
- [x] Preprocessing pipeline
- [x] Logistic Regression model
- [x] Hyperparameter tuning
- [ ] Backend API (FastAPI) — coming soon
- [ ] Frontend — coming soon
