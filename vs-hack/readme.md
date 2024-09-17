Here are all the possible URLs for testing the three endpoints using Postman:

1. POST Request: Add a Question (/add-question)
This endpoint requires a POST request to add a question. The request should include two query parameters:

question: The question you want to store (e.g., question-1).
key: The secret key that validates the request (kaku in this case).
URL Example:
bash
Copy code
http://localhost:3000/add-question?question=question-1&key=kaku
Method: POST
URL Parameters:
question: The question number (e.g., question-1, question-2, etc.)
key: The secret key (kaku)
Example Postman Setup:

Method: POST
URL: http://localhost:3000/add-question?question=question-1&key=kaku
Body: Empty (no body content is needed, as the data is passed via query parameters)
Success Response (Status: 201):
json
Copy code
{
    "message": "Question stored successfully",
    "data": {
        "_id": "64fa94ffb759d2e420b5c63e",
        "questionName": "kaku",
        "question": "question-1",
        "__v": 0
    }
}
Error Responses:
Invalid or missing key (Status: 403):
json
Copy code
{
    "error": "Invalid or missing key"
}
Missing question query parameter (Status: 400):
json
Copy code
{
    "error": "Question query parameter is required"
}
2. GET Request: Retrieve a Question by Question Number (/:question)
This endpoint allows you to retrieve a question by its number (e.g., question-1, question-2). The question number is passed as a URL parameter.

URL Example:
bash
Copy code
http://localhost:3000/question-1
Method: GET
URL Parameter: The question number (question-1, question-2, etc.)
Example Postman Setup:

Method: GET
URL: http://localhost:3000/question-1 (or any other question number you've stored)
Success Response (Status: 200):
json
Copy code
{
    "message": "Question retrieved successfully",
    "data": {
        "_id": "64fa94ffb759d2e420b5c63e",
        "questionName": "kaku",
        "question": "question-1",
        "__v": 0
    }
}
Error Response:
Question not found (Status: 404):
json
Copy code
{
    "message": "Question not found"
}
3. GET Request: Retrieve All Questions (/)
This endpoint retrieves all questions stored in the database.

URL Example:
arduino
Copy code
http://localhost:3000/
Method: GET
No URL Parameters
Example Postman Setup:

Method: GET
URL: http://localhost:3000/
Success Response (Status: 200):
json
Copy code
{
    "message": "All questions retrieved",
    "data": [
        {
            "_id": "64fa94ffb759d2e420b5c63e",
            "questionName": "kaku",
            "question": "question-1",
            "__v": 0
        },
        {
            "_id": "64fa95ffb759d2e420b5c63f",
            "questionName": "kaku",
            "question": "question-2",
            "__v": 0
        }
    ]
}
Error Response:
Internal server error (Status: 500):
json
Copy code
{
    "error": "Failed to retrieve all questions",
    "details": "Error details..."
}
Summary of URLs for Testing in Postman:
Add a question (POST):

bash
Copy code
http://localhost:3000/add-question?question=question-1&key=kaku
Get a question by number (GET):

bash
Copy code
http://localhost:3000/question-1
Get all questions (GET):

arduino
Copy code
http://localhost:3000/
These are the URLs you'll need to test the functionality of your API in Postman.