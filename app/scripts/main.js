"use strict";

var myApp = myApp || {};
var TimelineMax = TimelineMax || {};


myApp.animate = (function() {
  
  function init() {    
    var tl = new TimelineMax({delay:2});
    
    tl
    .to("#url", 1 , {autoAlpha: 1});
  }
  
  return {
    init: init
  };
})();

$(document).ready(function(){
  myApp.animate.init();
});
