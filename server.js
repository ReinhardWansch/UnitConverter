
import express from 'express';
import fs from 'fs';
import { convert } from './converter.js';

const app = express();

app.use((req, res, next) => {
        const timestamp = new Date().toLocaleString('de-DE');
        console.log(`[${timestamp}] ${req.method}: ${req.url}`);
        next();
});
// app.use(express.urlencoded());
app.use(express.static('public'));

app.listen(3000, () => {
    console.log();    
    console.log('Server läuft auf http://localhost:3000');
});

//Results Length Conversion
app.get('/convert/length', (req, res) => {
    console.log(`Received length value: ${req.query['length-value']}`);

    const lengthValue = Number(req.query['length-value']);
    const fromUnit = req.query['from-unit'];
    const toUnit = req.query['to-unit'];

    if (!Number.isFinite(lengthValue) || !fromUnit || !toUnit) {
        return res.status(400).send('Missing or invalid length conversion parameters.');
    }

    try {
        const resultPageContent = getLengthResultPage(lengthValue, fromUnit, toUnit);
        res.type('html').send(resultPageContent);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Graceful Shutdown
process.on('SIGINT', () => {
    console.log();
    process.exit();
});



/*##########*/
/*## UTIL ##*/
/*##########*/

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function formatNumber(value) {
    return Number.parseFloat(value.toFixed(4)).toString();
}

function renderTemplate(templatePath, replacements) {
    let templateContent = fs.readFileSync(templatePath, 'utf-8');
    for (const [placeholder, replacement] of Object.entries(replacements)) {
        templateContent = templateContent.replaceAll(placeholder, replacement);
    }
    return templateContent;
}

/*###############*/
/*## TEMPLATES ##*/
/*###############*/

function getLengthResultPage(lengthValue, fromUnit, toUnit) {
    try {
        const convertedValue = convert(lengthValue, fromUnit, toUnit);
        return renderTemplate('./public/convertionResult.html', {
            '{{RESULT_LABEL}}': escapeHtml('Result of your length conversion'),
            '{{RESULT_VALUE}}': escapeHtml(`${formatNumber(lengthValue)} ${fromUnit} = ${formatNumber(convertedValue)} ${toUnit}`)
        });
    } catch (error) {
        throw new Error('Error converting length: ' + error.message);
    }
}


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