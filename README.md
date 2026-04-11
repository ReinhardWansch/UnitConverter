# UnitConverter

A small web application to convert values between different units of measurement. The app currently supports length, weight, and temperature conversions and renders the result on a separate HTML result page.

This project is part of the [roadmap.sh Backend learning path](https://roadmap.sh/projects/unit-converter).

Author: **[Reinhard Wansch](https://github.com/ReinhardWansch)**

What I used for this project:
- Visual Studio Code
- GitHub Copilot
- Node.js
- Express

---

## Prerequisites

- [Node.js](https://nodejs.org/) **v18 or higher** (developed with v24)
- npm is required to install the project dependency

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ReinhardWansch/UnitConverter.git
   cd UnitConverter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Open the application in your browser:
   ```text
   http://localhost:3000
   ```

---

## Available Routes

### Pages

- `/` - Opens the default length conversion page
- `/index.html` - Length conversion page
- `/weight.html` - Weight conversion page
- `/temperature.html` - Temperature conversion page

### Conversion Endpoints

- `/convert/length` - Renders the result page for length conversions
- `/convert/weight` - Renders the result page for weight conversions
- `/convert/temperature` - Renders the result page for temperature conversions

---

## Supported Units

### Length

- Millimeter (`mm`)
- Centimeter (`cm`)
- Meter (`m`)
- Kilometer (`km`)
- Inch (`in`)
- Foot (`ft`)
- Yard (`yd`)
- Mile (`mi`)

### Weight

- Milligram (`mg`)
- Gram (`g`)
- Kilogram (`kg`)
- Ounce (`oz`)
- Pound (`lb`)

### Temperature

- Celsius (`C`)
- Fahrenheit (`F`)
- Kelvin (`K`)

---

## How It Works

The frontend pages are served from the `public` directory via Express static middleware. When a form is submitted, the request is sent to a dedicated conversion route such as `/convert/length`. The server validates the query parameters, performs the calculation, loads the HTML result template, replaces placeholder values, and sends the rendered page back to the browser.

---

## Error Handling

- Invalid or missing conversion inputs return HTTP `400`
- Unknown URLs return a custom HTTP `404` page
- User input is escaped before being inserted into the HTML result template

---

## Known Limitations

- The project uses server-rendered HTML templates instead of a templating engine
- Unit labels in the result page are shown as short codes such as `m` or `mi`
- There is currently no dedicated styled HTML page for `404` responses
- The result page template is shared across conversion types and is populated through placeholder replacement