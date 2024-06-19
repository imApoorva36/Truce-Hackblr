# QuickCredit
A platform built to revolutionise SME loan application processes

[Link to the demo](https://www.loom.com/share/96244a4ac6d643a4b75b5075308911ae?sid=b4c2cdee-694c-4a54-afbf-d8b6a46e2714)

## Overview

QuickCredit aims to address the challenge of financial inclusion for small and medium enterprises (SMEs) by providing them with access to small loans through a simplified platform. The platform facilitates the loan application process, review, and approval. In our project we have leveraged generative AI and machine learning to analyze the business plan and loan application.  We have a 3 stage workflow which includes Automated and Manual checks leading to a successful loan application. We also generate a loan approval document for the user containing his/her loan details.

## Submission Artefact

### 1️⃣ Hackathon track

- **Financial Inclusion**

### 2️⃣ Tech Stacks and tools Used

- **Django** (for backend)
- **Next.js** (for frontend)
- **Shadcn UI** (for styling)
- **scikit-learn** (for AI loan approval)
- **hugging-face llama3** (for business plan evaluation)
- **Supabase Postgres Database** (for database)
- **JWT Auth** (for token authorisation)

### 3️⃣ Pitch Deck

The pitch deck provides an overview of the project, its technical implementation, and future roadmap. Please refer the attached [presentation link](https://www.canva.com/design/DAGE_McgApQ/Bt_3aKr4ogT6k_kf0C16AA/edit?utm_content=DAGE_McgApQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) for the same.


## Project Structure

The project is structured as follows:

- **/backend**: Contains the Django Rest Framework backend application files.
- **/frontend**: Stores Next.js frontend files.
- **/ai_stuff**: Includes model files and scripts for the automated loan approval.

## Usage Instructions

To run the project locally, follow these steps:

1. Clone the GitHub repository:
`git clone https://github.com/imApoorva36/Truce-Hackblr`

2. Navigate to the project directory:
`cd backend`

3. Install dependencies:
`pip install -r requirements.txt`

4. Set up the database:
`python manage.py makemigrations`
`python manage.py migrate`

6. Run the Django backend:
`python manage.py runserver`

7. Now let's navigate to the frontend directory:
`cd frontend`

8. Install frontend dependencies:
`npm install`

9. Run the Next.js frontend:
`npm run dev`

10. Access the application in your web browser at `http://localhost:3000`.

## Major Dependencies

- Django==5.0.6
- django-nextjs==2.4.0
- django-rest-framework==0.1.0
- djangorestframework-simplejwt==5.3.1
- Next.js==11.1.2
- scikit-learn==1.2.2
- python-decouple==3.8
- requests==2.31.0
- PyJWT==2.8.0

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
