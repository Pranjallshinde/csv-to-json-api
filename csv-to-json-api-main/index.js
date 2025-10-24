require('dotenv').config();                                                                                              
const express = require('express');                                                                                      
const fs = require('fs');                                                                                                
const { parseCsv } = require('./src/csvParser');                                                                         
const { insertData, pool } = require('./src/database');                                                                  
const { generateReport } = require('./src/report');                                                                      
const app = express();                                                                                                   
const port = 3000;                                                                                                       

app.post('/upload', async (req, res) => {                                                                                
  const csvFilePath = process.env.CSV_FILE_PATH || 'data.csv';                                                           

  try {                                                                                                                  
    const fileContent = fs.readFileSync(csvFilePath, 'utf8');                                                            
    const jsonData = parseCsv(fileContent);                                                                              
    await insertData(jsonData);                                                                                          
    const report = await generateReport();                                                                               
    console.log(report);                                                                                                 
    res.status(200).send('Data uploaded and report generated successfully.');                                            
    } catch (error) {                                                                                                      
    console.error(error);                                                                                                
    res.status(500).send('An error occurred.');
}                                                                                                                      
});                                                                                                                      

app.listen(port, () => {                                                                                                
  console.log(`Server is running on http://localhost:${port}`);                                                          
});                                                                                                                      

module.exports = { app };
