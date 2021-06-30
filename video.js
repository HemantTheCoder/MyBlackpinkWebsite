
// Grab data attributes from video-wrapper
var videoID = $(".video-wrapper").data("video-id");
var videoYouTubeLink = $(".video-wrapper").data("video-youtube-link");
var videoStart = $(".video-wrapper").data("video-start");
var videoEnd = $(".video-wrapper").data("video-end");
var videoWidthAdd = $(".video-wrapper").data("video-width-add");
var videoHeightAdd = $(".video-wrapper").data("video-height-add");

// Create video script element
var tag = document.createElement('script');
	tag.src = 'https://www.youtube.com/player_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Prepend expander if data attr is yes
if (videoYouTubeLink === 'y') {
	$(".video-wrapper").prepend('<a href="https://www.youtube.com/watch?v=' + videoID + '" class="video-expand" target="_blank">View on Youtube</a>');
}

// Setup the Youtube TV with player defaults
var tv,
	playerDefaults = {autoplay: 0, autohide: 1, modestbranding: 1, rel: 0, showinfo: 0, controls: 0, disablekb: 1, enablejsapi: 0, iv_load_policy: 3};
var vid = {'videoId': videoID, 'startSeconds': videoStart, 'endSeconds': videoEnd, 'suggestedQuality': 'hd720'};

function onYouTubePlayerAPIReady(){
	tv = new YT.Player('tv', {events: {'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange}, playerVars: playerDefaults});
}

function onPlayerReady(){
	tv.loadVideoById(vid);
	tv.mute();
}

function onPlayerStateChange(e) {
	if (e.data === 1){
		$('#tv').addClass('active');
	} else if (e.data === 0){
		tv.seekTo(vid.startSeconds)
	}
}

function vidRescale(){
	var w = $(window).width() + videoWidthAdd,
		h = $(window).height() + videoHeightAdd;
	if (w/h > 16/9){
		tv.setSize(w, w/16*9);
		$('.tv .screen').css({'left': '0px'});
	} else {
		tv.setSize(h/9*16, h);
		$('.tv .screen').css({'left': -($('.tv .screen').outerWidth()-w)/2});
	}
}

$(window).on('load resize', function(){
	vidRescale();
});
