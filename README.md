### API Documentation for Process Payment System

## Installation
    $ git clone https://github.com/TalhaDogar007/ProcessPayment.git
    $ cd ProcessPayment
    $ npm install

## Running the project

    $ npm run dev
## API Request

**Add Credit Card Details for Process Payment**   
POST request: http://localhost:8000/api/v1/payment       
Send this data in body of request   
{  
    "creditCardNumber": "5555555555554444",  
    "cardHolder": "talha dogar",  
    "expirationDate":  "06/25/22",  
    "securityCode": "123",  
    "amount": 10  
}  
**dd-mm-yy use this date format** 