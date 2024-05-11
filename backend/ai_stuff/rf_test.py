def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn
import numpy as np
import pickle
from sklearn.ensemble import RandomForestClassifier


with open('random_forest_model.pkl', 'rb') as f:
	classifier = pickle.load(f)

X_temp = np.array([0,4500000, 17500000, 10, 500,52343223,523843,5292939,5000000,0])
print(classifier.predict(X_temp.reshape(1, -1)))
