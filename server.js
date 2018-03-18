const express = require('express');
const path = require('path');

const layout = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>GeoIdeas</title>
      <meta charset="utf-8"/>
      <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0"/>
      <meta name="author"  content="GeoIdeas" />
      <meta name="robots" content="follow"/>
      <meta name="revisit-after" content="1 weeks" />
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
  console.log('Example app listening on port 3000! si');
})
