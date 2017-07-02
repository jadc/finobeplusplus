// ==UserScript==
// @name         Finobe++ DEV KIT
// @namespace    Jad Chehimi
// @version      1.2.1
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
var version = "1.2.1";
console.log("?? Connection established with Finobe++ server");
console.log("?? You are running Finobe++ version " + version);

// functions & variables
var url = window.location.href;
var signedIn;
var name;
var owos = $(".n-money-text a").text();
var activeOnly = false;

// this function, when used like this
// dir()
// will return whatever is after the slash in the URL
// ex. if im on 'fi.nobelium.xyz/forum' then this function returns 'forum' as a string
function dir() {var parts = url.split("/"); return (url.lastIndexOf('/') !== url.length - 1 ? parts[parts.length - 1] : parts[parts.length - 2]);}

function o(str){console.log("[F++] " + str);}

// anything in here is combined into one string and inserted into <head> as a stylesheet
var styles = [
	"@keyframes rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }",
	".frontpage-card { display: inline-flex; margin: 0 10px 0 10px; }",
	"#frontUI { display: flex; justify-content: center; align-items: center; align-content: center; flex-wrap: wrap;}",
	"#pluschar { transition: 1s transform; }",
	"#pluschar:hover { transform: scale(1.1) }",
	"@keyframes janky { 0%, 50%, 100% { background: url(img/homeback.jpg) no-repeat center center fixed } }"
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
		name = $("#navbar-collapse > ul.nav.navbar-nav.my-2.my-lg-0 > li.nav-item.dropdown > a").text().substring(5);
		o("User is signed in.");
	}else{
		signedIn = false;
		name = "???";
		o("User is NOT signed in.");
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
	if(dir() == "fi.nobelium.xyz"){ // if your on the landing page
	// Modifying giant logo on landing page
	$("#app > div.container.main-content > div:nth-child(1) > img")
		.attr("src","http://fi.nobelium.xyz/img/BUSY.png")
		.css({
		"animation" : "5s rainbow infinite linear",
		"padding" : "1em 0 1em 0",
		"width" : "12em",
		"height" : "21em"
	});
	
	// remove finobe info when signed in
	if(signedIn){
		$("#app > div.container.main-content > div.text-center.mb-4.card").hide();
	}
	
	// background still
	$("body").css("animation","0 !important");
		
	// circle buttons & black
	$("#app > div.container.main-content > div:nth-child(2) > a").css({
		"border-radius":"100%",
		"width":"64px",
		"height":"64px",
		"line-height":"42px",
		"margin":"0 3px 0 3px"
	});
		
	// transparent navbar
	$("nav").css({
		"background":"none",
		"border":"none"
	});
	
	
	// new cards on the landing page!!
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
				src: "https://fi.nobelium.xyz/img/diu_16.png",
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
		
		//createCard("buttonscard","Navigation",frontUI);
		//$("#buttonscard")
			//.addClass("frontpage-card")
			//.addClass("card mb-4");
		
		// ////////////////////////////////////////////////////////////////
		
		//  NOW new buttons!
		//$("<p>more things will be put here in the next update</p>").appendTo($("#buttonscard .card-block"));
		
	}
}

function settingsPage(){
	if(dir() == "settings"){
		$(".btn-info").text("toggle darkly (may not work with Finobe++)");
	}
}



function gamesPage(){
	// plan: new layout for games
	if(dir() == "games"){ //if on games page
		// online games only
		$(".custom-control-indicator:not(#activeonly)").click();
		
		// new option, games with players only
		if(true){
		$("<label />", {
			"class":"custom-control custom-checkbox n-checkbox-small",
			"id":"activeonly"
		}).append("<input name=\"aoinput\" type=\"checkbox\" true-value=\"true\" class=\"custom-control-input\">")
		.append("<span class=\"custom-control-indicator\"></span>")
		.append("<span class=\"custom-control-description\">Active Only</span>")
		.appendTo($(".col-md-2 > .card > .card-block"));
		
			$('input[name=aoinput]').click(function(){
				if($('input[name=aoinput]').is(':checked')){
					o("Active Only Filtering ENABLED. activeOnly was = " + activeOnly);
					activeOnly = true;
				
					$(".gameleft > p > span").each(function(i){
						if($(this).text() == "Online |  0"){
							$(this).parent().parent().parent().parent().hide();
						}
					});
				}else{
					o("Active Only Filtering DISABLED. activeOnly was = " + activeOnly);
					activeOnly = false;
				
					$(".gameleft > p > span").each(function(i){
						if($(this).text() == "Online |  0"){
							$(this).parent().parent().parent().parent().show();
						}
					});
				}
			});
		}
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
