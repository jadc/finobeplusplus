// ==UserScript==
// @name         Finobe++ Installer
// @namespace    Jad Chehimi
// @version      FINAL
// @description  Makes improvements to Finobe in function and esthetics.
// @author       Jad Chehimi
// @match        https://fi.nobelium.xyz/*
// @grant        none
// ==/UserScript==
//////////////////////////////////////////////

console.log("!! Finobe++ Installer has been initialized.");

var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://rawgit.com/jadc/finobeplusplus/master/downloads/latestfinobe.user.js";
script.onreadystatechange = success();
script.onload = success();
head.appendChild(script);

function success(){
	console.log("!! Finobe++ has successfully been installed for this session.");
}