const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const {CLIENT_KEY, TIKTOK_API_URL, LOCAL_URL, PORT} = process.env;

app.use(cookieParser());
app.use(cors());
app.listen(5000)

console.log(`Running on port 5000`)

const CLIENT_KEY='awfpyb0ek8goiyog'
const CLIENT_SECRET='2b4789a6d2ec2b2efebec1105b60004d'
const TIKTOK_API_URL='https://www.tiktok.com'
const LOCAL_URL='http://localhost'
const PORT=5000

app.get('/oauth', (req, res) => {
  console.log('oauth request received')
  const csrfState = Math.random().toString(36).substring(2);
  res.cookie('csrfState', csrfState, { maxAge: 60000 });
  let url = `https://www.tiktok.com/auth/authorize/`;
  url += `?client_key=${CLIENT_KEY}`;
  url += '&scope=user.info.basic,video.list';
  url += '&response_type=code';
  url += `&redirect_uri=https://open-api.tiktok.com/oauth/access_token/`;
  url += '&state=' + csrfState;
  console.log(url)
  res.redirect(url);
})

app.get('/redirect', (req, res) => {
  console.log('redirect request received')

  const { code, state } = req.query;
  const { csrfState } = req.cookies;

  if (state !== csrfState) {
    res.status(422).send('Invalid state');
    return;
  }

  let url_access_token = 'https://open-api.tiktok.com/oauth/access_token/';
  url_access_token += '?client_key=' + CLIENT_KEY;
  url_access_token += '&client_secret=' + CLIENT_SECRET;
  url_access_token += '&code=' + code;
  url_access_token += '&grant_type=authorization_code';

  fetch(url_access_token, {method: 'post'})
    .then(res => res.json())
    .then(json => {
      res.send(json);
    });
})