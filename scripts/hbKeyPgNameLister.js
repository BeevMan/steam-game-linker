

function findNames (){
	let arrMyGames = [];
	let elJumpTo = document.getElementsByClassName("js-jump-to-page jump-to-page"); // stores the js-jump-to-page to a local variable
	let intLastPage = elJumpTo.length-2; // how to find the length of the pages tab, document.getElementsByClassName("js-jump-to-page jump-to-page")[8].innerText; the second to last button for key page selection always seems to have the page total. the last button is usually the button to click to next page?
	let intPageCount = Number(elJumpTo[intLastPage].innerText) || 0; // converts pages to a number
	
	for (let j = 0; j< intPageCount;j++){ // loops through hb's key pages 
	    let elH4 = document.querySelectorAll("h4");
		for (let i = 0; i < elH4.length; i++) { // loops through all "h4" 's. <h4> is where the game names are stored
		    arrMyGames.push(elH4[i].innerHTML); // pushes the games name to the array
		}
		if (j < intPageCount -1){
			document.getElementsByClassName("hb hb-chevron-right")[0].click(); // navigates one page to the right on humbles key page
	    }
	}
	
    let strGames = arrMyGames.toString(); // converts myGames to a string
    strGames = strGames.replace(/,/g, '\n'); // replaces "," with a linebreak, using this method removes "," from game names like The Haunted Island, a Frog Detective Game making them not found in my app
    strGames = strGames.replace(/\n /g, ', '); // re adds "," & " " to game names that previously had it removed
    
	copy(strGames); // copies the string to users clipboard ALREADY A FUNCTION on HumbleBundle
    
	alert("Game names copied to clipboard!!");
}
findNames();

