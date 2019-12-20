
javascript:
(function(){
	let strGames = '';
	let elJumpTo = document.getElementsByClassName('js-jump-to-page jump-to-page');
	let intLastPage = elJumpTo.length-2;
	let intPageCount = Number(elJumpTo[intLastPage].innerText) || 0;
	console.log('pre loop');
	for (let j = 0; j< intPageCount;j++){
	    let elH4 = document.querySelectorAll('h4');
		for (let i = 0; i < elH4.length; i++) {
		    strGames += elH4[i].innerHTML + '\n';
		}
		if (j < intPageCount -1){
			document.getElementsByClassName('hb hb-chevron-right')[0].click();
	    }
	}
	function textToClipboard (text) {
    let dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
    }
	textToClipboard(strGames);
    alert('Game names copied to clipboard!!');
})();

