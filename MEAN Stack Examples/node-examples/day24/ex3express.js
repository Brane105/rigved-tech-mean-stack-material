let express = require('express');
let app = express();
app.listen(3003, () => console.log('Server is running in 3003'));
app.get('/', (request, response) => {
    response.send('Hello World!');
});
app.get('/employee', (request, response) => {
    let emp = {id : 100, name : "Vijay", salary : 35000};
    response.json(emp); // converts js object to json and returns that as a response
});
app.get('/employees', (request, response) => {
   let employeeArray = [
    {id : 102, name : "Vijay", salary : 35000},
    {id : 103, name : "Ajay", salary : 45000},
    {id : 104, name : "Manu", salary : 25000}
   ]; 
   response.json(employeeArray); 
});