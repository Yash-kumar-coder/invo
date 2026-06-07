const express = require('express');
const cors = require('cors');
// Use puppeteer-core and @sparticuz/chromium for Render compatibility
const puppeteer = require('puppeteer-core');
const chromium = require('@sparticuz/chromium');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/api/generate-pdf', async (req, res) => {
  try {
    const data = req.body;

    // Format the address for HTML line breaks
    if (data.companyAddress) {
      data.companyAddressFormatted = data.companyAddress.replace(/\n/g, '<br>');
    }
    if (!data.goodsDescriptions) {
      data.goodsDescriptions = '&nbsp;';
    }

    // Read and compile template
    const templatePath = path.join(__dirname, 'template.html');
    const templateSource = fs.readFileSync(templatePath, 'utf8');
    const template = handlebars.compile(templateSource);
    const htmlContent = template(data);

    // Launch puppeteer
    // Launch puppeteer with sparticuz/chromium for serverless compatibility
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    });

    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '10px',
        right: '10px',
        bottom: '10px',
        left: '10px'
      }
    });

    await browser.close();

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="consignment-note.pdf"',
      'Content-Length': pdfBuffer.length,
    });
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
