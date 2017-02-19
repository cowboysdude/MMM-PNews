
  /* Magic Mirror
   * Module: MMM-PNews
   *
   * By Cowboysdude
   * MIT Licensed.
   */
  var NodeHelper = require('node_helper');
  var request = require('request');
  
 
 module.exports = NodeHelper.create({

start: function() {
    	console.log("Starting module: " + this.name);
    },
    
     getNews: function (url) {
         request({ url: url, method: 'GET' }, (error, response, body) => {
             if (!error && response.statusCode == 200) {
                 var result = JSON.parse(body);
                 this.sendSocketNotification('PNEWS_RESULT', result);
           }
         });
     },
 
     socketNotificationReceived: function(notification, payload) {
         if (notification === 'GET_PNEWS') {
             this.getNews(payload);
             
         }
     }
 });
 
