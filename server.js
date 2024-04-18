
const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const targetUrl = 'https://api.openai.com';
const port = 3000;

// app.use((req, res, next) => {
//     const start = Date.now();
//     res.on('finish', () => {
//       const duration = Date.now() - start;
//       console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
//     });
//     next();
//   });

app.use((req, res, next) => {
    const start = Date.now();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let bodySize = 0;
  
    res.on('data', (chunk) => {
      bodySize += chunk.length;
    });
  
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[${new Date().toISOString()}] ${ip} - ${req.method} ${req.originalUrl} - ${res.statusCode} (${bodySize} bytes, ${duration}ms)`);
    });
  
    next();
  });

app.use('/api', proxy(targetUrl, {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    // Modify the request headers if necessary
    // proxyReqOpts.headers['Authorization'] = 'Bearer '+openaiKey;
    return proxyReqOpts;
  },
}));

app.get("/", (req, res) => {
  res.send('This is OAIRP');
});


app.listen(port, () => {
//  console.log(`Reverse proxy server running on ${baseUrl}`);
  console.log('OpenAI Reverse proxy server running on port ' + port);})