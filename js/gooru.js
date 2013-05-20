/* Constant properties */
var GOORU_REST_ENDPOINT = 'http://www.goorulearning.org/gooruapi/rest';
var HOME_URL = 'http://www.goorulearning.org';
var API_KEY = 'ASERTYUIOMNHBGFDXSDWERT123RTGHYT';
var USER = {
  sessionToken: 'a2adaf96-beee-11e2-ba82-123141016e2a'
};

/* core stuff  */
var helper = { 
    userSignin: function(options) { 
    var defaults = { 
      userName: null,
      password: null,
      isGuestUser: true,
      onComplete : function(data) {
      }
    };
    var options = $.extend(defaults, options);
      $.ajax ({
	  type : 'POST',
	  url : GOORU_REST_ENDPOINT + '/account/signin.json',
	  cache: false,
	  data: {isGuestUser: options.isGuestUser, apiKey:API_KEY},
	  dataType:'jsonp',
	  success:function(data){
	    options.onComplete(data);
	  }, 
	error : function(data) {
	}
      });
  },
  loadFeaturedCollection:function() {
      $.ajax ({
	  type : 'GET',
	  url : GOORU_REST_ENDPOINT + '/featured/theme?sessionToken='+USER.sessionToken,
	  cache: false,
	  dataType:'jsonp',
	  success:function(data){
	    EJS.ext=".template";
	    var featuredCollectionTemplate = new EJS({url:'templates/resource/featured-collection'}).render({data:data});
	  
	      $("#gooruChromeSearchResultContainer").html(featuredCollectionTemplate);
	  }, 
	error : function(data) {
	  
	}
      });    
  }
};

$(document).ready(function() {
   helper.userSignin();
   helper.loadFeaturedCollection();
});