const express = require('express');
const path = require('path');

const layout = `
  <!DOCTYPE html>
    <html>
      <head>
      <title>GeoIdeas</title>
      </head>
      <body>
      <div id="root"></div>
      <script src='/index.js' type='text/javascript'></script>
    </body>
  </html>
`;

const app = express();

const serveItStatically = path.join(__dirname, '/public');

app.use(express.static(serveItStatically));

app.get('/', (req, res) => {
  res.send(layout);
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})
