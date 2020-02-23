const axios = require('axios');
axios.defaults.withCredentials = true;
fs = require('fs');

//--------
// NOBODY MESS WITH THIS FILE. 
// Running it likely won't work, because the token and session cookies are hardcoded. 
//You can pull your own out of the browser
//--------

const tokenCookie = 'c426ba10e854fdfcdf45427b8801db74';
const forumSessionCookie = 'OVltRWg4ZTlESlNzcXhBaFRBaEE1cHBhdVVYcnY4dXBRcEllNFIxck1pbm1ZaFJXb3pFZ0RTWVJMOGYyYWRtVy9LQ3JNMFZYamxNMkJHbUcremRJRnFvdUF5a2cyWXFkTXNOTk5YZWYxbDdwWGdmNVkrRGFiRkVER2tCelRFdGZ4MXBEd3hCOG4wL2tIUkkrVkR6YTRxMCtaU2pBSzZWbFVPQ0dUVXA0bjA4a1crS254NTdrLzhwbHlnZ0tkTVZDLS0vLzYvRDIwVis0bmxiUERoWFkzcVdnPT0';
const cookieString = `_t=${tokenCookie}; _forum_session=${forumSessionCookie};`;

const rootURL = 'http://discuss.fullstackacademy.com/';
const subRootURL = 'http://discuss.fullstackacademy.com/c/foundations/FullstackTestFirst.json';

const rootURLs = [
  'http://discuss.fullstackacademy.com/c/foundations/general-questions.json',
  'http://discuss.fullstackacademy.com/c/foundations/System-Setup.json',
  'http://discuss.fullstackacademy.com/c/foundations/08Recursion.json',
  'http://discuss.fullstackacademy.com/c/foundations/06Functional.json',

]

const scrapeURLs = async() => {
  const postURLs = [];

  for (let i = 0; i < rootURLs.length; i++) {
    const response = await axios.get(rootURLs[i], { headers: { Cookie: cookieString } });
    const topicList = response.data.topic_list.topics;
    topicList.forEach(topic => {
      postURLs.push(`http://discuss.fullstackacademy.com/t/${topic.slug}/${topic.id}.json`);
    });
  }
  return postURLs;
};


const scrapePostContent = async () => {
  const postURLs = await scrapeURLs();
  const postContent = {};

  for (let i = 0; i < postURLs.length; i++) {
    const response = await axios.get(postURLs[i], { headers: { Cookie: cookieString } });
    postContent[response.data.slug] = [];
    const postObj = response.data.post_stream.posts;
    postObj.forEach(post => {
      postContent[response.data.slug].push(post.cooked);
     });
  }
  return postContent;
}

scrapePostContent()
  .then(postContent => JSON.stringify(postContent))
  .then(data => {
    fs.writeFile('postsByTitle.json', data, (e) => {
      if (e) console.log(e)
      console.log('write success')
    })
  })

