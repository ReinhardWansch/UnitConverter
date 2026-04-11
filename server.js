
import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.urlencoded());
app.use(express.static('public'));
app.use((req, res, next) => {
        console.log(`${req.method}: ${req.url}`);    
        next();
});

app.listen(3000, () => {
    console.log();    
    console.log('Server läuft auf http://localhost:3000');
});

// Graceful Shutdown
process.on('SIGINT', () => {
    console.log();
    process.exit();
});




/*###########*/
/*## DEBUG ##*/
/*###########*/

app.get('/testform', (req, res) => {
    const testFormContent = fs.readFileSync(`./dev/testFilesHTML/testform.html`, 'utf-8');
    res.send(testFormContent);
});

app.post('/testform', (req, res) => {
    console.log('Query Parameters:', req.query);  
    console.log('Form Data:', req.body);
    res.send('Form submitted successfully!');
});