def warn(*args, **kwargs):
    pass
import warnings
warnings.warn = warn
import numpy as np
import pickle

def pred(values):
    with open('random_forest_model.pkl', 'rb') as f:
        classifier = pickle.load(f)

    #values = np.array([0,4500000, 17500000, 10, 500,52343223,523843,5292939,5000000,0])
    return classifier.predict_proba(np.array(values).reshape(1, -1))[0][0]


if __name__ == "__main__":
    pass

    