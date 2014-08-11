// ==UserScript==
// @name          	Images/links switcher
// @description   	Insert images instead of links, or links instead of images.
// @version 		1.0
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
				var newImg = document.createElement('img');
				newImg.setAttribute('src', val.getAttribute('href'));
				val.innerHTML = '';
				val.appendChild(newImg);
				if(newImg.clientHeight>document.body.clientHeight){
					newImg.setAttribute('style', 'height:'+(document.body.clientHeight-30)+'px;');
				}
				if(newImg.clientWidth>document.body.clientWidth){
					newImg.setAttribute('style', 'width:'+document.body.clientWidth+'px;');
				}
			}else{
				val.innerHTML = val.getAttribute('href');
			}
		}
	}
}

if( GM_getValue(document.domain) ) expandAllImages( true );