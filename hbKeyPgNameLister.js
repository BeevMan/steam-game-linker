function findNames (){
	let myGames = [];
	let lastPage = document.getElementsByClassName("js-jump-to-page jump-to-page").length-2; // how to find the length of the pages tab, document.getElementsByClassName("js-jump-to-page jump-to-page")[8].innerText; the second to last button for key page selection always seems to have the page total. the last button is usually the button to click to next page?
	let pages = document.getElementsByClassName("js-jump-to-page jump-to-page")[lastPage].innerText; // removes the text from the selected element using lastPage as the index
	let pageCount = Number(pages); // converts pages to a number
	
	for (let j = 0; j< pageCount;j++){ // loops through hb's key pages 
		for (let i = 0; i < document.querySelectorAll("h4").length; i++) { // loops through all "h4" 's. <h4> is where the game names are stored
		    myGames.push(document.getElementsByTagName('h4')[i].innerHTML); // pushes the games name to the array
		}
		if (j < pageCount -1){
			document.getElementsByClassName("hb hb-chevron-right")[0].click(); // navigates one page to the right on humbles key page
	    }
	}
	
    let games = myGames.toString(); // converts myGames to a string
    let laidout = games.replace(/,/g, '\n'); // replaces "," with a linebreak, using this method removes "," from game names like The Haunted Island, a Frog Detective Game making them not found in my app
    let test = laidout.replace(/\n /g, ', '); // re adds "," & " " to game names that previously had it removed
    copy(test); // copies the string to users clipboard
    alert("Game names copied to clipboard!!");
}
findNames();
