import requests
import re

    
API_TOKEN = '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'
API_URL = "https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct"
headers = {"Authorization": f"Bearer {API_TOKEN}"}

def extract_ratings(output_text):
    ratings = {}
    factors = [
        "Market Analysis and Opportunity",
        "Business Model and Strategy",
        "Financial Projections and Feasibility",
        "Management Team and Experience",
        "Risk Assessment and Mitigation"
    ]
    for factor in factors:
        pattern = rf"{factor}:\s(\d+)"
        match = re.search(pattern, output_text)
        if match:
            ratings[factor] = int(match.group(1))
        else:
            ratings[factor] = None
    return ratings

def extract_combined_rating(output_text):
    pattern = r"Combined rating: (\d+\/10)"
    match = re.search(pattern, output_text)
    if match:
        return match.group(1)
    else:
        return None

def query(business_plan_text):
    prompt = """You are an AI assistant tasked with evaluating business plans for SMEs based on the following 5 factors:

    1. Market Analysis and Opportunity
    2. Business Model and Strategy
    3. Financial Projections and Feasibility
    4. Management Team and Experience
    5. Risk Assessment and Mitigation

    Please provide a rating for each factor on a scale of 1 to 100, where 1 is poor and 100 is excellent. Do not give any explanation about the rating. Also give a combined rating by taking average of all of the ratings.

    Here is the business plan for evaluation:

    """ + business_plan_text + """

    Please provide your ratings and feedback for each of the 5 factors.
    """

    payload = {"inputs": prompt,
               "parameters": {
                   "repetition_penalty": 1.0,
    				"max_length": 1000}}
    response = requests.post(API_URL, headers=headers, json=payload)
    return response.json()

def scores(business_plan_text):
    output = query(business_plan_text)
    #output_text = output[0]['generated_text']
    #print(output_text)
    combined_rating = extract_combined_rating(output_text)
    factors = extract_ratings(output_text)
    return combined_rating, factors


if __name__ == "__main__":
    business_plan_text = "The Green Haven Café is a small-medium enterprise (SME) aiming to establish a sustainable and community-focused café in the heart of downtown. Our mission is to provide a welcoming space where customers can enjoy high-quality, locally sourced food and beverages in an environmentally conscious setting. We will prioritize eco-friendly practices, from compostable packaging to energy-efficient appliances, while fostering a sense of community through partnerships with local farmers and artisans. The Green Haven Café will be located in a high-traffic area, targeting urban professionals, students, and residents seeking an environment to relax, work, or socialize. Our menu will feature a variety of coffees and teas, baked goods, and un-healthy breakfast and lunch options made from cancer causing ingredients. We will limited choices of food"
    output = query(business_plan_text)
    output_text = output[0]['generated_text']
    print(output_text)
    combined_rating = extract_combined_rating(output_text)
    if combined_rating:
        print(f"Combined rating: {combined_rating}")
    else:
        print("Combined rating not found in the output.")