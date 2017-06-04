// ==UserScript==
// @name         Finobe++ DEV KIT
// @namespace    Jad Chehimi
// @version      1.1.1
// @description  !!!!!!!!!!!!!!IF YOU'RE READING THIS, YOU'RE INSTALLING THE WRONG FINOBE++!!!!!!!!!!!
// @author       Jad Chehimi
// @match        https://fi.nobelium.xyz/*
// @grant        none
// @require http://code.jquery.com/jquery-3.2.1.js
// ==/UserScript==
//////////////////////////////////////////////
/*

This userscript is by Jad.
By using this userscript, you agree to not distribute it with modifications, regardless if you claim it as your own or not. (that means you, Carrot)
The only source that this userscript should be downloaded from is my github @ github.com/jadc/finobeplusplus

*///////////////////////////////////////////////

// extension info
var version = "1.1.1";
console.log("?? You are running Finobe++ version " + version);

// functions & variables
var url = window.location.href;
var signedIn;
var name;
var owos = $(".n-money-text a").text();

// this function, when used like this
// dir()
// will return whatever is after the slash in the URL
// ex. if im on 'fi.nobelium.xyz/forum' then this function returns 'forum' as a string
function dir() {var parts = url.split("/"); return (url.lastIndexOf('/') !== url.length - 1 ? parts[parts.length - 1] : parts[parts.length - 2]);}

// anything in here is combined into one string and inserted into <head> as a stylesheet
var styles = [
	"@keyframes rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }",
	".frontpage-card { display: inline-flex; margin: 0 10px 0 10px; }",
	"#frontUI { display: flex; justify-content: center; align-items: center; align-content: center; flex-wrap: wrap;}",
	"#pluschar { transition: 1s transform; }",
	"#pluschar:hover { transform: scale(1.1) }",
];

// modifications that effect the whole site
function universal(){
	// converts array "styles" (above) into a stylesheet
	var stylecontent = "<style>"; for(i=0; i < styles.length; i++){ stylecontent = stylecontent + " " + styles[i] + " ";} stylecontent = stylecontent + " </style>"; $("head").append(stylecontent);
	
	// removes footer background & border
	$(".footer .container").css({
		"background": "none",
		"border": "none",
		"text-align": "center",
		"font-size": "12px"
	});
	
	$(".footer .container").children(":first").append("<b> | Finobe++ version:</b> " + version);
	
	//this boolean checks if your signed in or not, and modifies the boolean 'signedIn'
	if($("#navbar-collapse > ul.nav.navbar-nav.my-2.my-lg-0 > li.nav-item.dropdown > a").length){
		signedIn = true;
		name = $("#navbar-collapse > ul.nav.navbar-nav.my-2.my-lg-0 > li.nav-item.dropdown > a").text();
		console.log("user is signed in");
	}else{
		signedIn = false;
		name = "???";
		console.log("user is not signed in");
	}
}

// kind of a derivitive of universal(), just focussing on the navbar mainly. contains some code that modifies the landing page however
function navigationBar(){
	// navbar icon gets rainbow
	$(".navbar-brand").css("animation","5s rainbow infinite linear");
	// finobe in navbar is now FANCY thanks to p4ris and miksa
	$(".navbar-brand").html("<img src=\"https://vgy.me/8II9w7.png\" alt=\"Finobe\" class=\"navbar-brandimg d-inline-block align-top mr-2\" style=\"width:8em;\">");
}

// creates cards, cleans up shit significantly
function createCard(classID, title, location){
	$("<div />", {
		"class": "card",
		id: classID
	}).appendTo(location)
		.append(
		$("<div />", {
			"class": "card-header card-primary card-inverse",
			text: title
		})).append(
		$("<div />", {
			"class": "card-block"
		}
		 ));
}

function landingPage(){
	// Modifying giant logo on landing page
	$(".homepage-center p img").css("animation","5s rainbow infinite linear");
	// changes text on landing page depending on if your signed in or not
	if(signedIn){
		$(".homepage-center h2").text("Welcome back, " + name);
	}else{
		$(".homepage-center h2").text("Welcome to Finobe");
	}
	
	// new cards on the landing page!!
	if(dir() == "fi.nobelium.xyz" || dir() == "#"){ // if your on the landing page
		var frontUI = $("<div />", {
			id: "frontUI",
			"class": "container"
		}).appendTo($("#app"));
		
		if(signedIn){ //if they are signed in
			//charpic card
			createCard("charPic", name, frontUI);
			$("#charPic")
				.addClass("frontpage-card")
				.css({ "display":"block", "margin":"0 auto"})
				.appendTo(frontUI);
			
			// pencil icon
			$("<a href=\"/character\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></a>")
				.css({"float":"right","position":"relative", "color":"white"})
				.appendTo($("#charPic .card-header"));
			
			// character thumbnail
			$("<img />", {
				src: "https://fi.nobelium.xyz/user/currentthumb",
				alt: "Character Image",
				width: "202px",
				height: "332px",
				"class": "img-fluid userchr mt-2 pluschar"
			}).appendTo($("#charPic .card-block"));
			
			// divider
			$("<hr/>").appendTo($("#charPic .card-block"));
			
			//currency (owo) count
			$("<div />", {
				id:"owoCountContainer",
				css: {
					"width":"100%",
					"height":"2em"
				}
			}).appendTo($("#charPic .card-block"));
			
			var owoIcon = $("<img />", {
				src: "https://fi.nobelium.xyz/img/owo_16.png",
				css: {
					"width":"32px",
					"height":"32px",
					"image-rendering":"pixelated",
					"float":"left",
					"margin-right":"10px"
				}
			}).appendTo($("#owoCountContainer"));
			
			$("<h1 />", {
				text: owos,
				css: {
					"line-height":"0.75em"
				}
			}).appendTo($("#owoCountContainer"));
		}
		
		createCard("buttonscard","Navigation",frontUI);
		$("#buttonscard")
			.addClass("frontpage-card")
			.addClass("card mb-4");
		
		// ////////////////////////////////////////////////////////////////
		
		//  NOW new buttons!
		$("<p>more things will be put here in the next update</p>").appendTo($("#buttonscard .card-block"));
		
	}
}

function settingsPage(){
	if(dir() == "settings"){
		$(".btn-info").text("toggle darkly (may not work with Finobe++)");
	}
}

var activeOnly = false;

function gamesPage(){
	// plan: new layout for games
	if(dir() == "games"){ //if on games page
		// online games only
		$(".custom-control-indicator").click();
		
		// new option, games with players only
		if(true){
		$("<lable />", {
			"class":"activeonly btn n-games-btn btn-warning n-btn-games-small",
			"text":"Active Only (off)"
		}).appendTo($(".col-md-2 > .card > .card-block"))
			.click(function(){
			//activeOnly mechanism
			console.log("active only pressed");
			if(!activeOnly){
				console.log("activeOnly WAS false");
				$(".activeonly").text("✔ active only").removeClass("btn-warning").addClass("btn-success");
				activeOnly = true;
				console.log("activeOnly = " + activeOnly);
				//
				filterOutInactive();
				setInterval(function(){filterOutInactive(); console.log("filtering out");}, 2000);
			}else{
				console.log("activeOnly WAS true");
				$(".activeonly").text("✖ active only").addClass("btn-warning").removeClass("btn-success");
				activeOnly = false;
				console.log("activeOnly = " + activeOnly);
				//
				filterOutInactive();
			}
		});
		}
		
		// put games side by side
		$(".container").css("width","100%");
		setInterval(function(){
			$(".col-md-10 > div").css({
				"width":"50%",
				"float":"left"
			});
		}, 3000);
	}
}

function filterOutInactive(){
	console.log("filtering");
	if(activeOnly){
		$(".gameleft > p > span").each(function(i){
			if($(this).text() == "Online |  0"){
				$(this).parent().parent().parent().parent().hide();
			}
		});
	}else{
		$(".gameleft > p > span").each(function(i){
			if($(this).text() == "Online |  0"){
				$(this).parent().parent().parent().parent().show();
			}
		});
	}
}

function main(){
	universal();
	//
	landingPage();
	navigationBar();
	gamesPage();
	//
	settingsPage();
}

$(document).ready(main);
