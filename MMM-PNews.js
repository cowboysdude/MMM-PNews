
   /* Magic Mirror
    * Module: MMM-PNews
    *
    * By Cowboysdude
    * MIT Licensed.
    */
   
   Module.register("MMM-PNews",{
   
      // Module config defaults.
      defaults: {
          key: "",
          updateInterval: 60*1000, // every 10 minutes
          animationSpeed: 0,
          initialLoadDelay: 5, // 0 seconds delay
          retryDelay: 2500,
          rotate: 20 * 1000,
          maxWidth: "400px", 
          newsSource: "usa-today",
      },
    
      // Define required scripts.
      getScripts: function() {
          return ["moment.js"];
      },
      getStyles: function() {
           return ["MMM-PNews.css"];
       },
  
      // Define start sequence.
      start: function() {
          Log.info("Starting module: " + this.name);
  
          // Set locale.
          var self = this;
          moment.locale(config.language);
          this.today = "";
          this.url = "https://newsapi.org/v1/articles?source=" + this.config.newsSource + "&apiKey=";
          this.news = {};
          this.aItem = 0;
          this.rotate = null;
          this.scheduleUpdate();
      },
      
      getDom: function() {
      	
           var newsdiv = document.createElement("div");
           newsdiv.classList.add("light", "small");
           newsdiv.style.maxWidth = this.config.maxWidth;
           
          var reporter = this.config.newsSource;
          var wrapper = document.createElement("div");
          wrapper.classList.add("dimmed", "light", "small");
          var header = document.createElement("header");
          header.innerHTML = "The News";
          wrapper.appendChild(header);
          
           var keys = Object.keys(this.news);
			if(keys.length > 0){
           	if(this.aItem >= keys.length){
				this.aItem = 0;
			}
         var news = this.news[keys[this.aItem]];
         var newsLogo = document.createElement("div");
         var newsIcon = document.createElement("img");
         newsIcon.src = news.urlToImage;
         newsIcon.classList.add("imgDes");
         newsLogo.appendChild(newsIcon);
         newsdiv.appendChild(newsLogo);

         var title = document.createElement("h3");
         title.classList.add("small", "bright", "p");
         if (news.author === null || news.publishedAt === null){
		 title.innerHTML = news.title;	
		 } else if (news.author != null && news.publishedAt != null){
         title.innerHTML = news.title + "  ~ " + news.author + " - Date: " + moment(news.publishedAt).format('MM/DD/YYYY');
         }
         newsdiv.appendChild(title);

         var des = document.createElement("p");
         des.classList.add("xsmall", "bright", "p");
         des.innerHTML = news.description;
         newsdiv.appendChild(des);
         }
         
          wrapper.appendChild(newsdiv);
          return wrapper;
          }, 
  
       processNews: function(data) {
       	 this.today = data.Today;
         this.news = data.articles;
         this.loaded = true;
     },
      
      sCarousel: function() {
       		console.log("Processing news items..");
	   		this.rotate = setInterval(() => {
				this.aItem++;
				this.updateDom(this.config.animationSpeed);
			}, this.config.rotate);
	   },
     
     scheduleUpdate: function() {
         setInterval(() => {
             this.getNews();
         }, this.config.updateInterval);
         
         this.getNews(this.config.initialLoadDelay);
     },

     getNews: function() {
         this.sendSocketNotification('GET_PNEWS', this.url + this.config.key);
     },

     socketNotificationReceived: function(notification, payload) {
         if (notification === "PNEWS_RESULT") {
             this.processNews(payload);
             if(this.rotate == null){
			   	this.sCarousel();
			   }
             this.updateDom(this.config.animationSpeed);
         }
     },

 });
