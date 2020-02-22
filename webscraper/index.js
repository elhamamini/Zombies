const axios = require('axios');
const rp = require('request-promise');
const fetch = require('node-fetch');


axios.get('http://discuss.fullstackacademy.com/t/what-happens-after-final-checkpoint/4684.json', {
    auth: {
        username: 'a.j.morozoff@gmail.com',
        password: 'Leviathan!2200'
      }
    })
    .then(data => console.log(data.data))
        
    