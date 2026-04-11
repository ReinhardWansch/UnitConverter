
import express from 'express';
import fs from 'fs';

const app = express();

app.use((req, res, next) => {
        const timestamp = new Date().toLocaleString('de-DE');
        console.log(`[${timestamp}] ${req.method}: ${req.url}`);
        next();
});
app.use(express.urlencoded());
app.use(express.static('public'));

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