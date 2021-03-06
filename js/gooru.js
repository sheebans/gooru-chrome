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
// 	    $("#gooruContentDiv").append("<div class='showDiv'>ihnijnii i i i i i i i i </div>");
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
		$(this).find(".featuredCollectionDetailBox").stop(true, true).fadeIn(400);		
		$(this).find(".featuredCollectionDetailBox").css("display","block");
		$(this).find(".playIcon").css("display","block");
	      }); 
	      $(".featuredCollectionBox").mouseout(function(){
		$(this).find(".featuredCollectionDetailBox").stop(true, true).fadeOut(400);
		$(this).find(".featuredCollectionDetailBox").css("display","none");
		$(this).find(".playIcon").css("display","none");
	      });
	      
	  }, 
	error : function(data) {
	  
	}
      });    
  },
   loadSearchResults:function(searchKeyword,pageNum,append,category,fltSubjectName,fltGrade) {
   var URL = GOORU_REST_ENDPOINT + "/search/scollection";
     if(category !=null ||  fltSubjectName !=null || fltGrade !=null){
       URL+="?";
     }
     if(category !=null){
       URL+="category="+category;
       URL+="&";
    }
    
    if(fltSubjectName !=null){
      URL+="flt.subjectName="+fltSubjectName;
       URL+="&";      
    }
    if(fltGrade !=null){
      URL+="flt.grade="+fltGrade;
       URL+="&";      
    }
    
      $.ajax ({
	  type : 'GET',
	  url  : URL,
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
	    if(data.searchResults.length  == 0){
	      featuredCollectionTemplate='<div class="noResults"> Sorry! No Results Found....</div>';
	    }
	  if(append){
	       $("#gooruContentDiv").append(featuredCollectionTemplate);
	  }else{
	      $("#gooruContentDiv").html(featuredCollectionTemplate);
	      
	        $(".searchCollectionBox").mouseover(function(){
		$(this).find(".collectionImageOverlay, .playIconSmall").stop(true, true).fadeIn(300);		
		$(this).find(".collectionImageOverlay").css("display","block");
		$(this).find(".playIconSmall").css("display","block");
	      }); 
	      $(".searchCollectionBox").mouseout(function(){
		$(this).find(".collectionImageOverlay, .playIconSmall").stop(true, true).fadeOut(300);
-		$(this).find(".collectionImageOverlay").css("display","none");
		$(this).find(".playIconSmall").css("display","none");
	      });
	      helper.activateScrollDown();
	  }
// 	  $(".showDiv").remove();
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
   if ($('.videos').is(":checked")) {
     alert("hi");
    }
   $("#gooruChromeSearchTextField").keyup(function(event){
      if(event.which == 13) {
	var searchKeyword= $(this).val();
	helper.loadSearchResults(searchKeyword,1,false);
      }
  });
   
  $(".category").die().live("click",function(){
//     console.log("asdfaasdfasf");
    var categories="";
      $(".category").each(function(){
	  if($(this).is(":checked")){
	      if(categories.length > 0){
		  categories+=",";
	      }
	      categories+=$(this).val();
	  }
      });
      
      var keyword=$("#gooruChromeSearchTextField").val();
      if(keyword.length > 0 && categories.length > 0 ){
	
	helper.loadSearchResults(keyword,1,false,categories);
      }
  });
  
    $(".fltSubjectName").die().live("click",function(){
    var fltSubjectNames="";
      $(".fltSubjectName").each(function(){
	  if($(this).is(":checked")){
	      if(fltSubjectNames.length > 0){
		  fltSubjectNames+=",";
	      }
	      fltSubjectNames+=$(this).val();
	  }
      });
      
      var keyword=$("#gooruChromeSearchTextField").val();
      if(keyword.length > 0 && fltSubjectNames.length > 0 ){
	
	helper.loadSearchResults(keyword,1,false,null,fltSubjectNames);
      }
  });
  
    
        $(".fltGrade").die().live("click",function(){
	  var fltGrades="";
	  $(".fltGrade").each(function(){
	      if($(this).is(":checked")){
		  if(fltGrades.length > 0){
		      fltGrades+=",";
		  }
		  fltGrades+=$(this).val();
	      }
	  });
      
	  var keyword=$("#gooruChromeSearchTextField").val();
	  if(keyword.length > 0 && fltGrades.length > 0 ){
	    
	    helper.loadSearchResults(keyword,1,false,null,null,fltGrades);
	  }
  });

  
});

