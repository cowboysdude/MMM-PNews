# MMM-News
MM2 News Module

News articles with pictures and brief description.

First go to:

https://newsapi.org/
and get your free api key... free and easy!!

---------------Installation from a terminal window-------------------
~MagicMirror/modules

git clone https://github.com/cowboysdude/MMM-PNews

npm install

---------------------------------------------------------------------

Config.js options:

               {
			 module: 'MMM-PNews',
			 position: 'bottom_bar',
	 	  config: {
		  	key: "xxxxxxxxxxxxxxxxxxxxxxxx",
		  	maxWidth: "100%",
		  	newsSource: "hacker-news"
			  }
		 },
     
   Configurable options:
     maxWidth: can use px or %.... the above configuration would be used for bottom_bar location.
               example top_left or top_right -  250px;
               
     newsSource:  default news source:  "usa-today"
     List of possible sources:
     
"the-next-web"
"time"
"usa-today"
"the-washington-post"
"the-wall-street-journal"
"the-verge"
"the-times-of-india"
"the-sport-bible"
"the-new-york-times"
"the-lad-bible"
"the-huffington-post"
"the-hindu
"the-guardian-uk
"the-guardian-au
"techradar
"techcrunch
"talksport"
"sky-sports-news"
"reuters"
"reddit-r-all"
"recode"
"polygon"
"nfl-news"
"newsweek"
"new-scientist"
"national-geographic"
"mtv-news-uk"
"mtv-news"
"mirror"
"metro"
"mashable"
"ign"
"hacker-news"
"google-news"
"fox-sports"
"four-four-two"
"fortune"
"football-italia"
"financial-times"

Must be entered in your config.js just as shown!

