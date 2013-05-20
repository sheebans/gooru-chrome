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
	    var html ="";
	    for(var i in data) {
	      var imageUrl = data[i].scollections[0].thumbnails.url;
	      var gooruOid = data[i].scollections[0].gooruOid;
	       html += '<div class="featuredCollectionBox featuredOne"><a target="_blank" href="http://www.goorulearning.org/gooru/index.g#!/collection/'+gooruOid+'/play"><img src="'+imageUrl+'" width=380 height=240 /></a></div>';
	    }
	    
	      $("#gooruChromeSearchResultContainer").html(html);
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