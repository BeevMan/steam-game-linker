
function copyList(){
	let strGames = "";
	let elJumpTo = document.getElementsByClassName("js-jump-to-page jump-to-page");
	let intLastPage = elJumpTo.length-2;
	let intPageCount = 1;
	let monthlies = []; // stores the URLs for monthly choices
	let monthlyInfo = []; // stores name of the monthly and how many choices remaining.  Should have same length as monthlies var
	if(intLastPage > 0){
		intPageCount = Number(elJumpTo[intLastPage].innerText);
		if(elJumpTo[1].innerText === "1"){
			elJumpTo[1].click();
		}
	}
	for (let j = 0; j< intPageCount;j++){
		let elH4 = document.querySelectorAll("h4");
		let elChoiceUrls = document.getElementsByClassName("choice-button");
		let descriptions = document.getElementsByClassName("game-name");
		if (elChoiceUrls.length > 0 ){ // itterates over the monthly choices URL's and pushes them into monthlies var
			for (let i = 0; i < elChoiceUrls.length; i++){
				monthlies.push(elChoiceUrls[i].href);
			};
		};
		for (let i = 0; i < elH4.length; i++){
			if(elH4[i].innerHTML.endsWith("Humble Choice")){ // if its a choice, stores name of the monthly choice and how many choices remaining
				let tempInfo = descriptions[i+1].innerText.split("\n",2);
				tempInfo[1] = tempInfo[1].slice(9);
				tempInfo = tempInfo[0] + "\n" + tempInfo[1];
				monthlyInfo.push(tempInfo);
			} else {
			    strGames += elH4[i].innerHTML + "\n";
			}
		};
		if (j < intPageCount -1){
			document.getElementsByClassName("hb hb-chevron-right")[0].click();
		};
	};
	if (monthlies.length > 0){
		logInOrder(monthlies,strGames,monthlyInfo);
    } else {
		clipboard(strGames);
    }		
};



let btn = document.createElement("label");
btn.innerHTML = '<button id ="copier" style = "padding: 0.1em .2em; background-color: red; color: white; text-align: center" >list to clipboard</button>';
document.getElementsByClassName("sort")[0].appendChild(btn);
document.getElementById("copier").addEventListener("click", copyList);



function clipboard(toCopy){
	
	if (navigator.clipboard){
		navigator.clipboard.writeText(toCopy).then(function() {
			//clipboard successfully set
			alert("Game list copied to clipboard!");
		}, function() {
			// clipboard write failed
			alert("Could not copy list to clipboard.");
		});
	} else {
		// this way will copy my unredeemed list fine (121 lines) but will not copy my entire list (872 lines)
		let dummy = document.createElement("textarea");
		document.body.appendChild(dummy);
		dummy.value = toCopy;
		dummy.select();
		document.execCommand("copy");
		document.body.removeChild(dummy);
		alert("List SHOULD be copied to clipboard.  Older browsers may experience issues copying large lists to clipboard.");
	};
};



async function logInOrder(urls,strGames,monthlyInfo) {
  // fetch all the URLs in parallel
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });
  
  
  let loopInt = 0;
  // log them in sequence
  for (const textPromise of textPromises) {
	let parser = new DOMParser();
	let doc = parser.parseFromString(await textPromise, 'text/html');
	
	
	// Get the monthly data
	let monthlyData = JSON.parse(doc.getElementById("webpack-monthly-product-data").innerText).contentChoiceOptions;
	let choiceData = monthlyData.contentChoiceData.initial.content_choices;
	
	if (monthlyData.hasOwnProperty("contentChoicesMade")) {
		let choicesMade = monthlyData.contentChoicesMade.initial.choices_made;
		
		for (let i = 0; i < choicesMade.length; i++){ //deletes choices made from choiceData
			if(choiceData.hasOwnProperty(choicesMade[i])){
				delete choiceData[choicesMade[i]];
			}
		};
	}
	strGames += monthlyInfo[loopInt] + "\n"; // adds the current monthly info i.e MARCH 2020 HUMBLE CHOICE 4 choices remaining
	let choiceKeys = Object.keys(choiceData);

	for (let i = 0; i < choiceKeys.length; i++){
		let curKey = choiceKeys[i]; //I know choiceData has human name and also steam app id which i could use to link the game to steam website
		strGames += choiceData[curKey].title + "\n";
	};
	loopInt++;
  }
  clipboard(strGames);
};