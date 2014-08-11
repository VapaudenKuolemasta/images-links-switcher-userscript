// ==UserScript==
// @name          	Images/links switcher
// @description   	Insert images instead of links, or links instead of images.
// @version 		1.0.1
// @homepageURL 	https://github.com/VapaudenKuolemasta/images-links-switcher-userscript
// @updateURL 		https://github.com/VapaudenKuolemasta/images-links-switcher-userscript/raw/master/images_switcher.user.js
// @grant 			GM_registerMenuCommand
// @grant 			GM_setValue
// @grant 			GM_getValue
// ==/UserScript==

GM_registerMenuCommand('Switch "images/links"', function(){
	var linkToImg = true;
	if( GM_getValue(document.domain) ){
		GM_setValue( document.domain, false );
		linkToImg = false;
	}else{
		GM_setValue( document.domain, true );
	}
	
	toggler( linkToImg );
});

function toggler( linkToImg ){
	for (var key in document.getElementsByTagName('a')){
		var val = document.getElementsByTagName('a')[key];
		if( val.getAttribute('href').search(/(.jpg|.png|.jpeg)/)+1 ){
			if( linkToImg ){
				img = new Image();
				img.onload = function() {
					if(this.height>document.body.clientHeight){
						this.style.height = document.body.clientHeight-30;
					}
					if(this.width>document.body.clientWidth){
						this.style.width = document.body.clientWidth;
					}
				};
				img.src = val.getAttribute('href');
				val.innerHTML = '';
				val.appendChild(img);
			}else{
				val.innerHTML = val.getAttribute('href');
			}
		}
	}
}

if( GM_getValue(document.domain) ) toggler( true );