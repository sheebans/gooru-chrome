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