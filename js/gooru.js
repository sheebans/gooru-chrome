/* Constant properties */
var GOORU_REST_ENDPOINT = 'http://www.goorulearning.org/gooruapi/rest';
var HOME_URL = 'http://www.goorulearning.org';
var API_KEY = 'ASERTYUIOMNHBGFDXSDWERT123RTGHYT';
var USER = {
  sessionToken: 'a2adaf96-beee-11e2-ba82-123141016e2a'
};
var pageNum = 0;
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
  activateScrollDown:function(){
     //Load data on scroll 
   $contentLoadTriggered = false;
   $(window).scroll(function(){
        if  ($(window).scrollTop() == $(document).height() - $(window).height()){
	  $("#scrollContentLoader").addClass("loading");
	    helper.loadSearchResults($("#gooruChromeSearchTextField").val(),++pageNum,true);
        }
   }); 
  },
  loadFeaturedCollection:function() {
      $.ajax ({
	  type : 'GET',
	  url  : GOORU_REST_ENDPOINT + '/featured/theme?sessionToken='+USER.sessionToken,
	  cache: false,
	  dataType:'jsonp',
	  success:function(data){
	    EJS.ext=".template";
	    var featuredCollectionTemplate = new EJS({url:'templates/resource/featured-collection'}).render({data:data});
	  
	      $("#gooruChromeSearchResultContainer").html(featuredCollectionTemplate);
    
	      $(".featuredCollectionBox").mouseover(function(){
		$(this).find(".featuredCollectionDetailBox").stop(true, true).fadeIn(700);		
		$(this).find(".featuredCollectionDetailBox").css("display","block");
		$(this).find(".playIcon").css("display","block");
	      }); 
	      $(".featuredCollectionBox").mouseout(function(){
		$(this).find(".featuredCollectionDetailBox").stop(true, true).fadeOut(500);
		$(this).find(".featuredCollectionDetailBox").css("display","none");
		$(this).find(".playIcon").css("display","none");
	      });
	      
	  }, 
	error : function(data) {
	  
	}
      });    
  },
   loadSearchResults:function(searchKeyword,pageNum,append) {
   
      $.ajax ({
	  type : 'GET',
	  url  : GOORU_REST_ENDPOINT + "/search/scollection",
	  cache: false,
	  data:{
	    sessionToken:USER.sessionToken,
	    query:searchKeyword,
	    pageSize:20,
	    pageNum:pageNum
	  },
	  dataType:'jsonp',
	  success:function(data){
	    EJS.ext=".template";
 	    var featuredCollectionTemplate = new EJS({url:'templates/resource/collection-search-result'}).render({data:data});
	  if(append){
	       $("#gooruContentDiv").append(featuredCollectionTemplate);
	  }else{
	    
	      $("#gooruContentDiv").html(featuredCollectionTemplate);
	      helper.activateScrollDown();
	  }
	   $("#scrollContentLoader").removeClass("loading");
	  }, 
	error : function(data) {
	  
	}
      });    
  }
};

$(document).ready(function() {
   helper.userSignin();
   helper.loadFeaturedCollection();
   
   $("#gooruChromeSearchTextField").keyup(function(event){
      if(event.which == 13) {
	var searchKeyword= $(this).val();
	helper.loadSearchResults(searchKeyword,1,false);
      }
  });
  
});

