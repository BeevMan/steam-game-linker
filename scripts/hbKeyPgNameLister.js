

function findNames (){
	let strGames = "";
	let elJumpTo = document.getElementsByClassName("js-jump-to-page jump-to-page");
	let intLastPage = elJumpTo.length-2;
	let intPageCount = Number(elJumpTo[intLastPage].innerText) || 0;
	console.log("pre loop");
	for (let j = 0; j< intPageCount;j++){ // loops through hb's key pages 
	    let elH4 = document.querySelectorAll("h4"); // locally stores the "h4" elements
		for (let i = 0; i < elH4.length; i++) { // loops through all "h4" 's. <h4> is where the game names are stored
		    strGames += elH4[i].innerHTML + "\n"; // pushes the games name to the array
		}
		if (j < intPageCount -1){
			document.getElementsByClassName("hb hb-chevron-right")[0].click(); // navigates one page to the right on humbles key page
	    }
	}
    
	function textToClipboard (text) {
    let dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    }
	textToClipboard(strGames); // copies the string to users clipboard
    
	alert("Game names copied to clipboard!!");
}
findNames();

