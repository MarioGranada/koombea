$(window).load(function(){
	$.ajax({
		type: 'GET',
        url: '/assets/test_movies.json',
        success: function (data) {
         loadContent(data);
         $(".single-movie-box").hover(function(){
			 $(this).css("border","5px solid #E62D20");
			 $(this).css("box-shadow","5px 5px 0px #e5e7e7");
			 $(this).children(".single-movie-overlay").css("display","none");
			 $(this).css("margin-bottom","20px");
			 $(this).css("margin-right","20px");
		 },function(){
			 $(this).css("border","none");
			 $(this).css("box-shadow","none");
			 $(this).children(".single-movie-overlay").css("display","block");
			 $(".movie-info-box").css("display","none");
			 $(".movie-title").css("display","block");
			 $(this).css("margin-right","30px");
			 $(this).css("margin-bottom","30px");
		 });
		 $(".single-movie-box").click(function(){
		 	$(".single-movie-box").css("border","none");
			$(".single-movie-box").css("box-shadow","none");
			$(this).css("border","5px solid #E62D20");
			$(this).css("box-shadow","5px 5px 0px #e5e7e7");
			$(".arrow-cont").css("display","none");
			$(this).children(".thumb-movie-cont").children(".movie-title").css("display","none");
			updateBanner($(this));
			loadMovieInfo($(this));
			initialTop=$(this).position().top+$(this).height();
			$(this).children(".thumb-movie-cont").children(".arrow-cont").css("display","block");
			displayMovieInfo(initialTop);
		 });
		 // $(".similar-movie-box").click(function(){
		 	// currentId=$(this).attr("id");
		 	// currentId=currentId.replace("similar","list");
		 	// $(currentId).trigger("click");
		 	// closePopup();
		 	// $("html, body").animate($("#movies-list").css("top"), '500', 'swing');

		 // })
		 resizeVideoIframe();
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
	$("#top-watch-trailer").click(function(){
		openPopup();
	});
	$(".movie-info-watch-button").click(function(){
		openPopup();
	})
	$(".close-pop-up").click(function(){
		closePopup();
	})
	$(".master-overlay").click(function(){
		closePopup();
	});
	$("#trailer-pop-up").click(function(){
		closePopup();
	});
	$(this).keyup(function(e){
		if(e.keyCode == 27){
			closePopup();
		}
	})
	$("#pop-up-box").click(function(e){
		e.stopPropagation();
	})

});
$(window).resize(function(){
	resizeVideoIframe();
});
function loadContent(movies){
	// var json_data=JSON.parse(movies);
	var moviesList=movies.movies;
	var moviesCont="<ul id='movies-list'>"
	if (moviesList.length>0) {
		for(i = 0; i < moviesList.length; i++) {
			
			newTitle=moviesList[i].title.split(' ').join('-');
			newTitle=newTitle.split(':').join('');
			moviesCont+="<li class='single-movie-box' id='list-"+newTitle.toLowerCase()+"'' data-url='"+moviesList[i].trailer+"' data-image='"+moviesList[i]["banner-image"]+"'>"
			moviesCont+="<div class='single-movie-overlay'></div>"
			moviesCont+="<div class='thumb-movie-cont'>"
			moviesCont+="<img class='thumb-movie-image' src='"+moviesList[i]["thumb-image"]+"'>"
			moviesCont+="<div class='movie-likes fav_icon'><img src='assets/icons_logos/fav_white_icon.png'><div class='likes-count'>"+moviesList[i].favorites+"</div></div>"
			moviesCont+="<div class='movie-download'><img src='assets/icons_logos/download_movie.png'></div>"
			moviesCont+="<div class='movie-title'>"+moviesList[i].title+"</div>"
			moviesCont+="<div class='arrow-cont'><img src='assets/icons_logos/arrow.png'></div>"
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

			moviesCont+="<div class='movie-additional-info'>"+moviesList[i].released+";"+moviesList[i].runtime+";"+moviesList[i].favorites+";"+moviesList[i].score+"</div>"

			moviesCont+="</div>"

			moviesCont+="<div class='similar-movies-box'>"
			simMovs=moviesList[i]["similar-movies"]
			maxSimilarMovies=6
			if (simMovs.length<maxSimilarMovies) {
				maxSimilarMovies=simMovs.length;
			};
			for(j = 0; j < maxSimilarMovies; j++) {
				newSimTitle=simMovs[j].title.split(' ').join('-');
				newSimTitle=newSimTitle.split(':').join('');
				moviesCont+="<div class='similar-movie-box' id='similar-"+newSimTitle.toLowerCase()+"'>"
				moviesCont+="<div class='similar-movie-cover'><img src='"+simMovs[j]["cover-image"]+"'></div>"
				moviesCont+="<div class='similar-movie-title'>"+simMovs[j].title+"</div>"
				moviesCont+="</div>"
			}
			moviesCont+="</div>"

			moviesCont+="</li>"
		}
	moviesCont+="</ul>"
	} else{
		moviesCont="<h1>Movies Library empty, please check later</h1>"
	};
	
	$("#movies-box").html(moviesCont);
	updateBanner($(".single-movie-box:eq(0)"));

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
function openPopup(){
	$(".master-overlay").css("display","block");
	$("#trailer-pop-up").css("display","block");
}
function closePopup(){
	$(".master-overlay").css("display","none");
	$("#trailer-pop-up").css("display","none");	
}
function updateBanner(movie){
	$(".banner-image").html("<img src='"+$(movie).attr("data-image")+"'>")
	var movieTitle=$(movie).children(".thumb-movie-cont").children(".movie-title").text();
	$(".banner-title").html(movieTitle)
	var adInfo=$(movie).children(".movie-info-box").children(".movie-additional-info").text().split(";")
	$("#movie-info-released").html(adInfo[0])
	$("#movie-info-runtime").html(adInfo[1])
	$("#movie-info-likes").html(adInfo[2])
	// $("#movie-info-score").html(adInfo[3])
	$("#movie-info-score").html(scoreList(adInfo[3]))
	var videoSource=$(movie).attr("data-url");
	if (videoSource.indexOf("youtube.com")>-1) {
		videoSource= videoSource.replace("watch?v=", "embed/"); 
	};
	$("#video-container iframe").attr("src",videoSource)
	$(".pop-movie-title").html(movieTitle);
	$("#similar-movies-list").html($(movie).children(".similar-movies-box").html());
}
function scoreList(score){
	score=parseInt(score);
	var htmlRet="";
	for (var i = 0; i < score; i++) {
		htmlRet+="<div class='scores_icon'><img src='assets/icons_logos/star_red_icon.png'></div>"
	};
	score=5-score;
	for (var i = 0; i < score; i++) {
		htmlRet+="<div class='scores_icon'><img src='assets/icons_logos/star_white_icon.png'></div>"
	};
	return htmlRet;
}
function loadMovieInfo(movie){
	$("#cover-image").html($(movie).children(".movie-info-box").children(".cover-image").html());
	$("#movie-info-title").html($(movie).children(".movie-info-box").children(".movie-main-info").children(".movie-info-title").text());
	$("#movie-info-synopsis").html($(movie).children(".movie-info-box").children(".movie-main-info").children(".movie-info-synopsis").text());
	var score=$(movie).children(".movie-info-box").children(".movie-additional-info");
	score=score.text().split(";")[3];
	$("#movie-general-score").html(scoreList(score));
	$("#movie-general-dir").html($(movie).children(".movie-info-box").children(".movie-secondary-info").children(".movie-info-director-box").children(".movie-info-dir").text())
	$("#movie-general-write").html($(movie).children(".movie-info-box").children(".movie-secondary-info").children(".movie-info-writters-box").children(".movie-info-write").text())
	$("#movie-general-cast").html($(movie).children(".movie-info-box").children(".movie-secondary-info").children(".movie-info-cast-box").children(".movie-info-cast").text());
}
function displayMovieInfo(initialTop){
	initialTop+=18;//arrow icon height
	initialTop+=15;//5px for border top, 5 for border bottom and 5 for box shadow
	initialTop=initialTop.toString()+"px";
	$("#movie-info-overlay").css("top",initialTop);
	$("#movie-info-overlay").css("display","block");
}
function resizeVideoIframe(){
	var windowWidth=$(window).width();
	if (windowWidth<320) {
		$("#video-container iframe").attr("width","210");
		$("#video-container iframe").attr("height","160");
	};
	if (windowWidth>320&&windowWidth<520) {
		$("#video-container iframe").attr("width","470");
		$("#video-container iframe").attr("height","280");
	};
	if (windowWidth>520&&windowWidth<768) {
		$("#video-container iframe").attr("width","420");
		$("#video-container iframe").attr("height","310");
	};
	if (windowWidth>768&&windowWidth<980) {
		$("#video-container iframe").attr("width","720");
		$("#video-container iframe").attr("height","520");
	};
	if (windowWidth>980&&windowWidth<1024) {
		$("#video-container iframe").attr("width","945");
		$("#video-container iframe").attr("height","365");
	};
	if (windowWidth>1024&&windowWidth<1285) {
		$("#video-container iframe").attr("width","945");
		$("#video-container iframe").attr("height","365");
	};
	if (windowWidth>1285) {
		$("#video-container iframe").attr("width","945");
		$("#video-container iframe").attr("height","365");
	};
}