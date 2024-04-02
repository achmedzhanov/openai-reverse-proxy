const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const targetUrl = 'https://api.openai.com';
//const openaiKey = process.env.OPENAI_KEY
const port = 3000;
//const baseUrl = getExternalUrl(process.env.SPACE_ID);

app.use('/api', proxy(targetUrl, {
  proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
    // Modify the request headers if necessary
    // proxyReqOpts.headers['Authorization'] = 'Bearer '+openaiKey;
    return proxyReqOpts;
  },
}));

app.get("/", (req, res) => {
  //res.send(`This is your OpenAI Reverse Proxy URL: ${baseUrl}`);
  res.send('This is your OpenAI Reverse Proxy');
});

/*function getExternalUrl(spaceId) {
  try {
    const [username, spacename] = spaceId.split("/");
    return `https://${username}-${spacename.replace(/_/g, "-")}.hf.space/api/v1`;
  } catch (e) {
    return "";
  }
}*/

app.listen(port, () => {
//  console.log(`Reverse proxy server running on ${baseUrl}`);
  console.log('Reverse proxy server running');})