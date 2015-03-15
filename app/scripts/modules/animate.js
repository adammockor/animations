"use strict";

var myApp = myApp || {};
var TimelineMax = TimelineMax || {};
var Back = Back || {};
var Linear = Linear || {};

myApp.animate = (function() {
  
  var lines = {
    line1: {
      from:  {
        x: "60",
        y: "250",
      },
      to: {
        x: "206",
        y: "293"
      }
    },
    line2: {
      from:  {
        x: "177",
        y: "199"
      },
      to: {
        x: "234",
        y: "271"
      }
    },
    line3: {
      from: {
        x: "344",
        y: "176"
      },
      to: {
        x: "271",
        y: "268"
      }
    },
    line4: {
      from:  {
        x: "455",
        y: "290",
      },
      to: {
        x: "268",
        y: "308"
      }
    },
    line5: {
      from:  {
        x: "656",
        y: "149",
      },
      to: {
        x: "512",
        y: "275"
      }
    }
  };
  
  function channgeLoggerText(target, text) {
    $(target).html(text);
  }
  
  function logger(text, desc, duration) {
    var loggerTL = new TimelineMax();
    
    channgeLoggerText("#logger .text", text);
    channgeLoggerText("#logger .desc", desc);
    
    loggerTL
      .to("#logger", 0.5, {autoAlpha: 1})
      .to("#logger", 0.5, {autoAlpha: 0}, "+=" + duration);
  }
  
  function createMessage(color, type) {
    var message = document.createElement("div");
    message.className = "message " + type + " " + color;
    message.innerHTML = '<img src="images/' + type + '-' + color + '.png">';
    message.style.opacity = 0;
    $('.anim-container').append(message);
    
    return message;
  }
  
  function removeMessage(message) {
    message.remove();
  }
  
  function sendMessage(from, to, color, type) {
    var messageTL = new TimelineMax();
    
    var message = createMessage(color,type);
    
    messageTL
      .to(message, 0.25, {autoAlpha: 1})
      .fromTo(message, 1, {x: from.x, y: from.y}, {x: to.x, y: to.y, ease:Linear.easeNone})
      .to(message, 0.25, {autoAlpha: 0})
      .call(removeMessage, [message]);
  }
  
  function action(target, text, duration) {
    var actionTL = new TimelineMax();
    
    channgeLoggerText(target, text);
    
    actionTL
      .to(target, 0.25, {autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.7)})
      .to(target, 0.25, {autoAlpha: 0, scale: 0}, "+=" + duration);  
  }
  
  function init() {    
    var tl = new TimelineMax({delay:1});
    
    tl
      .addLabel("container")
      .from(".anim-container", 1 , {autoAlpha: 0, scale: 0} ) 
        
      .addLabel("url", "container+=1")
      .call(logger, ["open http://fiit.stuba.sk", '', 5], null, "url+=0.5") // 0/5 
      .from("#url", 1 , {autoAlpha: 0}, "url+=1" ) // 1/2
      .staggerFrom(["#notebook", "#switch", "#router", "#dns", "#dhcp", "#webserver"], 1, {autoAlpha: 0, scale: 0.5}, 0.25, "nodes") //
      .staggerFrom(["#network-divider","#line1", "#line2", "#line3", "#line4", "#line5"], 1, {autoAlpha: 0, scale: 0.5}, 0.25, "lines")
      
      // DHCP
      
      .addLabel("dhcp1", "lines+=2")
      .call(action, ["#notebook-action", "Is here any DHCP server?", 3.5], null, "dhcp1+=0.5")
      .call(logger, ["DHCP Discovery", '', 3.5], null, "dhcp1+=0.5") // 0/5 
      .call(sendMessage, [lines.line1.from,  lines.line1.to, "yellow", "request"], null, "dhcp1+=1")
      .call(sendMessage, [lines.line2.to,  lines.line2.from, "yellow", "request"], null, "dhcp1+=2.5")
      .call(sendMessage, [lines.line3.to,  lines.line3.from, "yellow", "request"], null, "dhcp1+=2.5")
      .call(sendMessage, [lines.line4.to,  lines.line4.from, "yellow", "request"], null, "dhcp1+=2.5")
      
      .addLabel("dhcp2", "dhcp1+=5")
      .call(action, ["#dhcp-action", "Sure!", 3.5], null, "dhcp2+=0.5")
      .call(logger, ["DHCP Offer", '', 3.5], null, "dhcp2+=0.5") // 0/5 
      .call(sendMessage, [lines.line3.from,  lines.line3.to, "yellow", "response"], null, "dhcp2+=1")
      .call(sendMessage, [lines.line1.to,  lines.line1.from, "yellow", "response"], null, "dhcp2+=2.5")
      .call(sendMessage, [lines.line2.to,  lines.line2.from, "yellow", "response"], null, "dhcp2+=2.5")
      .call(sendMessage, [lines.line4.to,  lines.line4.from, "yellow", "response"], null, "dhcp2+=2.5")
      
      .addLabel("dhcp3", "dhcp2+=5")
      .call(action, ["#notebook-action", "Can I get IP, mask and DNS please?", 3.5], null, "dhcp3+=0.5")
      .call(logger, ["DHCP Request", '', 3.5], null, "dhcp3+=0.5") // 0/5 
      .call(sendMessage, [lines.line1.from,  lines.line1.to, "yellow", "request"], null, "dhcp3+=1")
      .call(sendMessage, [lines.line2.to,  lines.line2.from, "yellow", "request"], null, "dhcp3+=2.5")
      .call(sendMessage, [lines.line3.to,  lines.line3.from, "yellow", "request"], null, "dhcp3+=2.5")
      .call(sendMessage, [lines.line4.to,  lines.line4.from, "yellow", "request"], null, "dhcp3+=2.5")
      
      .addLabel("dhcp4", "dhcp3+=5")
      .call(action, ["#dhcp-action", "Here you go!", 3.5], null, "dhcp4+=0.5")
      .call(logger, ["DHCP Response", "IP: 192.168.1.100/24<br>DNS: 192.168.1.10", 3.5], null, "dhcp4+=0.5") // 0/5 
      .call(sendMessage, [lines.line3.from,  lines.line3.to, "yellow", "response"], null, "dhcp4+=1")
      .call(sendMessage, [lines.line1.to,  lines.line1.from, "yellow", "response"], null, "dhcp4+=2.5")
      .call(sendMessage, [lines.line2.to,  lines.line2.from, "yellow", "response"], null, "dhcp4+=2.5")
      .call(sendMessage, [lines.line4.to,  lines.line4.from, "yellow", "response"], null, "dhcp4+=2.5")
      
      // ARP DNS
      
      .addLabel("arpdns1", "dhcp4+=5")
      .call(action, ["#notebook-action", "Where is my DNS?", 3.5], null, "arpdns1+=0.5")
      .call(logger, ["ARP Request", 'Who has 192.168.1.10?', 3.5], null, "arpdns1+=0.5") // 0/5 
      .call(sendMessage, [lines.line1.from,  lines.line1.to, "pink", "request"], null, "arpdns1+=1")
      .call(sendMessage, [lines.line2.to,  lines.line2.from, "pink", "request"], null, "arpdns1+=2.5")
      .call(sendMessage, [lines.line3.to,  lines.line3.from, "pink", "request"], null, "arpdns1+=2.5")
      .call(sendMessage, [lines.line4.to,  lines.line4.from, "pink", "request"], null, "arpdns1+=2.5")
      
      
      .addLabel("arpdns2", "arpdns1+=5")
      .call(action, ["#dns-action", "I am here!", 3.5], null, "arpdns2+=0.5")
      .call(logger, ["ARP Response", '192.168.1.1 is at 00:30:05:33:ab:01', 3.5], null, "arpdns2+=0.5") // 0/5 
      .call(sendMessage, [lines.line2.from,  lines.line2.to, "pink", "response"], null, "arpdns2+=1")
      .call(sendMessage, [lines.line1.to,  lines.line1.from, "pink", "response"], null, "arpdns2+=2.5")
      
      // DNS
      
      .addLabel("dns1", "arpdns2+=5")
      .call(action, ["#notebook-action", "Hey DNS, where is fiit.stuba.sk?", 3.5], null, "dns1+=0.5")
      .call(logger, ["DNS Query fiit.stuba.sk", '', 3.5], null, "dns1+=0.5") // 0/5 
      .call(sendMessage, [lines.line1.from,  lines.line1.to, "green", "request"], null, "dns1+=1")
      .call(sendMessage, [lines.line2.to,  lines.line2.from, "green", "request"], null, "dns1+=2.5")
      
      .addLabel("dns2", "dns1+=5")
      .call(action, ["#dns-action", "I found it!", 3.5], null, "dns2+=0.5")
      .call(logger, ["DNS Response", 'IP: 147.175.159.48', 3.5], null, "dns2+=0.5") // 0/5 
      .call(sendMessage, [lines.line2.from,  lines.line2.to, "green", "response"], null, "dns2+=1")
      .call(sendMessage, [lines.line1.to,  lines.line1.from, "green", "response"], null, "dns2+=2.5")
      
      // ARP DG
      
      .addLabel("arpdg1", "dns2+=5")
      .call(action, ["#notebook-action", "Where is my default gateway?", 3.5], null, "arpdg1+=0.5")
      .call(logger, ["ARP Request", 'Who has 192.168.1.1?', 3.5], null, "arpdg1+=0.5") // 0/5 
      .call(sendMessage, [lines.line1.from,  lines.line1.to, "pink", "request"], null, "arpdg1+=1")
      .call(sendMessage, [lines.line2.to,  lines.line2.from, "pink", "request"], null, "arpdg1+=2.5")
      .call(sendMessage, [lines.line3.to,  lines.line3.from, "pink", "request"], null, "arpdg1+=2.5")
      .call(sendMessage, [lines.line4.to,  lines.line4.from, "pink", "request"], null, "arpdg1+=2.5")
      
      .addLabel("arpdg2", "arpdg1+=5")
      .call(action, ["#router-action", "I am here!", 3.5], null, "arpdg2+=0.5")
      .call(logger, ["ARP Response", '192.168.1.1 is at 00:30:05:55:85:dc', 3.5], null, "arpdg2+=0.5") // 0/5 
      .call(sendMessage, [lines.line4.from,  lines.line4.to, "pink", "response"], null, "arpdg2+=1")
      .call(sendMessage, [lines.line1.to,  lines.line1.from, "pink", "response"], null, "arpdg2+=2.5")
      
      // TCP SYN HANDSHAKE
      
      .addLabel("tcpsyn1", "arpdg2+=5")
      .call(action, ["#notebook-action", "Can I connect to fiit.stuba.sk?", 5], null, "tcpsyn1+=0.5")
      .call(logger, ["TCP SYN", '', 5], null, "tcpsyn1+=0.5") // 0/5 
      .call(sendMessage, [lines.line1.from,  lines.line1.to, "red", "request"], null, "tcpsyn1+=1")
      .call(sendMessage, [lines.line4.to,  lines.line4.from, "red", "request"], null, "tcpsyn1+=2.5")
      .call(sendMessage, [lines.line5.to,  lines.line5.from, "red", "request"], null, "tcpsyn1+=4")
      
      .addLabel("tcpsyn2", "tcpsyn1+=6")
      .call(action, ["#webserver-action", "Sure, let's create connection!", 5], null, "tcpsyn2+=0.5")
      .call(logger, ["TCP ACK-SYN", '', 5], null, "tcpsyn2+=0.5") // 0/5 
      .call(sendMessage, [lines.line5.from,  lines.line5.to, "red", "response"], null, "tcpsyn2+=1")
      .call(sendMessage, [lines.line4.from,  lines.line4.to, "red", "response"], null, "tcpsyn2+=2.5")
      .call(sendMessage, [lines.line1.to,  lines.line1.from, "red", "response"], null, "tcpsyn2+=4")
      
      .addLabel("tcpsyn3", "tcpsyn2+=6")
      .call(action, ["#notebook-action", "Ok.", 5], null, "tcpsyn3+=0.5")
      .call(logger, ["TCP ACK", '', 5], null, "tcpsyn3+=0.5") // 0/5 
      .call(sendMessage, [lines.line1.from,  lines.line1.to, "red", "request"], null, "tcpsyn3+=1")
      .call(sendMessage, [lines.line4.to,  lines.line4.from, "red", "request"], null, "tcpsyn3+=2.5")
      .call(sendMessage, [lines.line5.to,  lines.line5.from, "red", "request"], null, "tcpsyn3+=4")
      
      // HTTP
      
      .addLabel("http1", "tcpsyn3+=6")
      .call(action, ["#notebook-action", "Give me /index.html.", 5], null, "http1+=0.5")
      .call(logger, ["HTTP Request", 'GET /index.html HTTP/1.1', 5], null, "http1+=0.5") // 0/5 
      .call(sendMessage, [lines.line1.from,  lines.line1.to, "teal", "request"], null, "http1+=1")
      .call(sendMessage, [lines.line4.to,  lines.line4.from, "teal", "request"], null, "http1+=2.5")
      .call(sendMessage, [lines.line5.to,  lines.line5.from, "teal", "request"], null, "http1+=4")
      
      .addLabel("http2", "http1+=6")
      .call(action, ["#webserver-action", "Here is /index.html.", 5], null, "http2+=0.5")
      .call(logger, ["HTTP Response", 'HTTP/1.1 200 OK<pre><br><br>&lt;html&gt;<br>&nbsp;&lt;body&gt;<br>&nbsp;&nbsp;&lt;h1&gt;FIIT&lt&#x2F;h1&gt;<br>&nbsp;&nbsp;&lt;img src="&#x2F;logo.png"&gt;<br>&nbsp;&lt;&#x2F;body&gt;<br>&lt;&#x2F;html&gt;</pre>', 5], null, "http2+=0.5") // 0/5 
      .call(sendMessage, [lines.line5.from,  lines.line5.to, "teal", "response"], null, "http2+=1")
      .call(sendMessage, [lines.line4.from,  lines.line4.to, "teal", "response"], null, "http2+=2.5")
      .call(sendMessage, [lines.line1.to,  lines.line1.from, "teal", "response"], null, "http2+=4")
      
      .addLabel("http3", "http2+=6")
      .call(action, ["#notebook-action", "I need /logo.png too.", 5], null, "http3+=0.5")
      .call(logger, ["HTTP Request", 'GET /logo.png HTTP/1.1', 5], null, "http3+=0.5") // 0/5 
      .call(sendMessage, [lines.line1.from,  lines.line1.to, "teal", "request"], null, "http3+=1")
      .call(sendMessage, [lines.line4.to,  lines.line4.from, "teal", "request"], null, "http3+=2.5")
      .call(sendMessage, [lines.line5.to,  lines.line5.from, "teal", "request"], null, "http3+=4")
      
      .addLabel("http4", "http3+=6")
      .call(action, ["#webserver-action", "Here is /logo.png.", 5], null, "http4+=0.5")
      .call(logger, ["HTTP Response", 'HTTP/1.1 200 OK<br><br>...PNG Binary Code...', 5], null, "http4+=0.5") // 0/5 
      .call(sendMessage, [lines.line5.from,  lines.line5.to, "teal", "response"], null, "http4+=1")
      .call(sendMessage, [lines.line4.from,  lines.line4.to, "teal", "response"], null, "http4+=2.5")
      .call(sendMessage, [lines.line1.to,  lines.line1.from, "teal", "response"], null, "http4+=4")
      
      // TCP FIN
      
      .addLabel("tcpfin1", "http4+=6")
      .call(action, ["#notebook-action", "Let's end this connection.", 5], null, "tcpfin1+=0.5")
      .call(logger, ["TCP FIN", '', 5], null, "tcpfin1+=0.5") // 0/5 
      .call(sendMessage, [lines.line1.from,  lines.line1.to, "red", "request"], null, "tcpfin1+=1")
      .call(sendMessage, [lines.line4.to,  lines.line4.from, "red", "request"], null, "tcpfin1+=2.5")
      .call(sendMessage, [lines.line5.to,  lines.line5.from, "red", "request"], null, "tcpfin1+=4")
      
      .addLabel("tcpfin2", "tcpfin1+=6")
      .call(action, ["#webserver-action", "Ok.", 1], null, "tcpfin2+=0.5")
      .call(action, ["#webserver-action", "So, end it.", 5.5], null, "tcpfin2+=2")
      .call(logger, ["TCP ACK, TCP FIN", '', 7], null, "tcpfin2+=0.5") // 0/5 
      .call(sendMessage, [lines.line5.from,  lines.line5.to, "red", "response"], null, "tcpfin2+=1")
      .call(sendMessage, [lines.line5.from,  lines.line5.to, "red", "response"], null, "tcpfin2+=2.5")
      .call(sendMessage, [lines.line4.from,  lines.line4.to, "red", "response"], null, "tcpfin2+=2.5")
      .call(sendMessage, [lines.line4.from,  lines.line4.to, "red", "response"], null, "tcpfin2+=4")
      .call(sendMessage, [lines.line1.to,  lines.line1.from, "red", "response"], null, "tcpfin2+=5")
      .call(sendMessage, [lines.line1.to,  lines.line1.from, "red", "response"], null, "tcpfin2+=6.5")
      
      .addLabel("tcpfin3", "tcpfin2+=8.5")
      .call(action, ["#notebook-action", "Ok.", 5], null, "tcpfin3+=0.5")
      .call(logger, ["TCP ACK", '', 5], null, "tcpfin3+=0.5") // 0/5 
      .call(sendMessage, [lines.line1.from,  lines.line1.to, "red", "request"], null, "tcpfin3+=1")
      .call(sendMessage, [lines.line4.to,  lines.line4.from, "red", "request"], null, "tcpfin3+=2.5")
      .call(sendMessage, [lines.line5.to,  lines.line5.from, "red", "request"], null, "tcpfin3+=4");
      
  }
  
  return {
    init: init
  };
})();
