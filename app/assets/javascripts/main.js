$(window).load(function(){
	$.ajax({
		type: 'GET',
        url: '/assets/test_movies.json',
        success: function (data) {
         loadContent(data);
         $(".movie-info-box:first").css("display","block");
         $(".single-movie-box").hover(function(){
			 $(this).css("border","5px solid #E62D20");
			 $(this).css("box-shadow","5px 5px 0px #D4D6D6");
			 $(this).children(".single-movie-overlay").css("display","none");
		 },function(){
			 $(this).css("border","none");
			 $(this).css("box-shadow","none");
			 $(this).children(".single-movie-overlay").css("display","block");
			 $(".movie-info-box").css("display","none");
			 $(".movie-title").css("display","block");
		 });
		 $(".single-movie-box").click(function(){
		 	$(".movie-info-box").css("display","none");
			$(this).children(".movie-info-box").css("display","block");
			$(this).children(".thumb-movie-cont").children(".movie-title").css("display","none");
		 });
        },
        error: function(data){
         loadErrorContent();
        }
	});


	$(".top-nav-icon").hover(function(){
		$(this).children(".icon-message").css("display","block");
	},function(){
		$(this).children(".icon-message").css("display","none");
	});
	$(".user-container").hover(function(){
		$(this).siblings(".user-options").css("display","block");
	},function(){
		$(this).siblings(".user-options").css("display","none");
	});


});
function loadContent(movies){
	// var json_data=JSON.parse(movies);
	var moviesList=movies.movies;
	var moviesCont="<ul id='movies-list'>"
	if (moviesList.length>0) {
		for(i = 0; i < moviesList.length; i++) {
			if (i==0) {loadFirstBanner(moviesList[i]);};
			newTitle=moviesList[i].title.split(' ').join('-');
			moviesCont+="<li class='single-movie-box' id='list-"+newTitle+"'' data-url='"+moviesList[i].trailer+"'>"
			moviesCont+="<div class='single-movie-overlay'></div>"
			moviesCont+="<div class='thumb-movie-cont'>"
			moviesCont+="<img class='thumb-movie-image' src='"+moviesList[i]["thumb-image"]+"'>"
			moviesCont+="<div class='movie-likes fav_icon'><img src='assets/icons_logos/fav_white_icon.png'><div class='likes-count'>"+moviesList[i].favorites+"</div></div>"
			moviesCont+="<div class='movie-download'><img src='assets/icons_logos/download_movie.png'></div>"
			moviesCont+="<div class='movie-title'>"+moviesList[i].title+"</div>"
			moviesCont+="</div>"

			moviesCont+="<div class='movie-info-box'>"

			moviesCont+="<div class='cover-image'><img src='"+moviesList[i]["cover-image"]+"'></div>"

			moviesCont+="<div class='movie-main-info'>"
			moviesCont+="<div class='movie-info-title'>"+moviesList[i].title+"</div>"
			moviesCont+="<div class='movie-info-synopsis'>"+moviesList[i].synopsis+"</div>"
			moviesCont+="<div class='movie-info-watch-button'>Watch Trailer</div>"
			moviesCont+="<div class='movie-info-add-fav'>Add to favorites</div>"
			moviesCont+="</div>"

			moviesCont+="<div class='movie-secondary-info'>"
			moviesCont+="<div class='movie-info-director-box'><div class='movie-director-title'>Director</div><div class='movie-info-dir'>"+moviesList[i].director+"</div></div>"
			moviesCont+="<div class='movie-info-writters-box'><div class='movie-writters-title'>Writters</div><div class='movie-info-write'>"+moviesList[i].writters+"</div></div>"
			moviesCont+="<div class='movie-info-cast-box'><div class='movie-cast-title'>Stars</div><div class='movie-info-cast'>"+moviesList[i].cast+"</div></div>"
			moviesCont+="</div>"

			moviesCont+="</div>"

			moviesCont+="<div class='similar-movies-box'>"
			simMovs=moviesList[i]["similar-movies"]
			maxSimilarMovies=6
			if (simMovs.length<maxSimilarMovies) {
				maxSimilarMovies=simMovs.length;
			};
			for(j = 0; j < maxSimilarMovies; j++) {
				newSimTitle=simMovs[j].title.split(' ').join('-');
				moviesCont+="<div class='similar-movie-box' id='similar-"+newSimTitle+"'>"
				moviesCont+="<div class='similar-movie-title'>"+simMovs[j].title+"</div>"
				moviesCont+="<div class='similar-movie-cover'><img src='"+simMovs[j]["cover-image"]+"'></div>"
				moviesCont+="</div>"
			}
			moviesCont+="</div>"

			moviesCont+="</li>"
		}
	moviesCont+="</ul>"
	} else{
		moviesCont="<h1>Movies Library empty, please check later</h1>"
	};
	
	$("#movies-box").html(moviesCont)

}
function loadErrorContent(){
	$("#banner-container").html("No movies found, please try again later");
}
function loadFirstBanner(firstMovie){
	$(".banner-image").html("<img src='"+firstMovie["banner-image"]+"'>")
	$(".banner-title").html(firstMovie.title)
	$("#movie-info-released").html(firstMovie.released)
	$("#movie-info-runtime").html(firstMovie.runtime)
	$("#movie-info-score").html(firstMovie.score)
	$("#movie-info-likes").html(firstMovie.favorites)
	var videoSource=firstMovie["trailer"];
	if (videoSource.indexOf("youtube.com")>-1) {
		videoSource= videoSource.replace("watch?v=", "embed/"); 
	};
	$("#video-container iframe").attr("src",videoSource)
}