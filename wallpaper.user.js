// ==UserScript==
// @name         wallpaper_finder
// @namespace    http://your.homepage/
// @version      0.1
// @match      http://wallpaperswide.com/*
// ==/UserScript==
function next_page_number(){
k = window.location.href;
var urlarray = k.split('/');
var lastitem = urlarray.pop();
number = parseInt(lastitem);
number += 1;
lastitem = number.toString();
return lastitem;}
function do_next_activity(){
q = window.location.href;

if ( next_page_number() <= 10){q = q.substring(0, q.length - 1);}
    else if ( next_page_number() > 10 &&  next_page_number() <= 100 ){
        q = q.substring(0, q.length - 2);
    } else{
        q = q.substring(0, q.length - 3);
       }      
final_url = q.concat(next_page_number());
window.open(final_url,"_self");
}
function previous_page_number(){
k = window.location.href;
var urlarray = k.split('/');
var lastitem = urlarray.pop();
number = parseInt(lastitem);
number -= 1;
lastitem = number.toString();
return lastitem;}
function do_previous_activity(){
q = window.location.href;
if ( parseInt(previous_page_number()) <= 10){q = q.substring(0, q.length - 1);}
   else if ( next_page_number() > 10 &&  next_page_number() <= 100 ){
        q = q.substring(0, q.length - 2);
    } else{
        q = q.substring(0, q.length - 3);
    } 
final_url = q.concat(previous_page_number());
window.open(final_url,"_self");
}

window.addEventListener("keydown", checkKeyPressed, false);
 
function checkKeyPressed(e) {
    if (e.keyCode == "39") {       
       do_next_activity();
    }
    if (e.keyCode == "37") {        
       do_previous_activity();
    }
}
