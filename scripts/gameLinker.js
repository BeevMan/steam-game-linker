




let arrApps = [];
let objIndex = {};
let arrKeys;
let arrSingleId = []; // used in the findGame function to save reddit markdown ready links
let arrMultipleId = [];
let arrNotFound = [];
let arrUserList = []; // users input saved in the saveList function
let regRemove = /®|™|THE |:|-/g;
		
      	
const xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) { // to be performed when the document is ready:
		let objSteam = JSON.parse(xhttp.responseText);
		console.log(objSteam.applist.apps);
		arrApps = objSteam.applist.apps;
		let appsLen = arrApps.length;
		for (let i = 0; i<appsLen ;i++){ // mutates arrApps.name
			let appName = arrApps[i].name;
			appName = appName.toUpperCase().replace(regRemove, '');
			appName = appName.replace(/  /g," ");
			let nameLen = appName.length;
			if (appName[0] === " "){
				appName = appName.slice(1,nameLen-1);
			} else if (appName[nameLen-1] === " "){
				appName = appName.slice(0,nameLen-2);
			}
			arrApps[i].name = appName;
		}
		arrApps.sort(function(a, b) {
			let nameA = a.name.toUpperCase(); // ignore upper and lowercase
			let nameB = b.name.toUpperCase();
			if (nameA < nameB) {
			return -1;
			}
			if (nameA > nameB) {
			return 1;
			}
			return 0;	// names must be equal
		});
		for (let i = 0; i<appsLen ;i++){ // indexes games by the first two letters
			let appName = arrApps[i].name;
			let ab = appName.slice(0,2);
			
			if (objIndex["Z`"] === undefined){
				if (objIndex.hasOwnProperty(ab) === false){
					objIndex[ab] = i;
				}
			}
	    }
		arrKeys = Object.keys(objIndex);
	}
};
xhttp.open("GET", "steamGames.json", true);  // need to run node live server to get data from json file https://youtu.be/wI1CWzNtE-M?t=1300 , could also place the api call here???
xhttp.send();
	
function saveList(){ // triggered upon button press, saves the user's list than calls findGame() function
	let strUserList = document.getElementById('raw').value;
	arrUserList = strUserList.split("\n");
	findGame();
};
/*const options = { // options for fuseJS // options need refining currently super slow :( 
	shouldSort: true,
	includeScore: true,
	threshold: 0.15,
	location: 0,
	distance: 50,
	maxPatternLength: 64,
	minMatchCharLength: 1,
	keys: [
	  "name"
	]
};*/

function findGame(){
    
	//let fuse = new Fuse(arrApps, options); // "arrApps" is the item array
    //var result = fuse.search("rust");
	for (let j=0; j<arrUserList.length;j++){ // loops through users list
		let foundId = [];
        let nameA = arrUserList[j].toUpperCase();
		nameA = nameA.replace(regRemove, "");
		nameA = nameA.replace(/  /g," ");
		let aLen = nameA.length;
		if (nameA[0] === " "){
				nameA = nameA.slice(1,aLen-1);
		} else if (nameA[aLen-1] === " "){
			nameA = nameA.slice(0,aLen-2);
		}
		
		
		
		console.log("------------------",nameA);
		
		
		let ab = objIndex[nameA.slice(0,2)];
		let ac = arrKeys.indexOf(nameA.slice(0,2)) + 1;
		ac = objIndex[arrKeys[ac]];
		console.log("ab as index=",ab,"-",ac);
		for (let i = ab; i<ac; i++){
			let nameB = arrApps[i].name;
			if (nameA === nameB) {
				console.log("found a match!!");
				foundId.push("- [" + arrUserList[j] + "]" + "(" + "https://store.steampowered.com/app/" + arrApps[i].appid + ")"); // pushes reddit markdown ready links to the array
				console.log(foundId);
			}
		}
		let strReSearch; // only here temporarily
		if (foundId.length === 0) {
		    strReSearch = arrUserList[j];
			// will possibly turn the fuseJS search into an optional search for the arrNotFound list? Still need to play with the search options more to possibly optimize but it's currently very slow
			/*let objFuzzy = fuse.search(strReSearch); // saves search results of fuseJS
			console.log(objFuzzy,objFuzzy.length);
			if (objFuzzy[0] === []){
				let intScoreKeep = objFuzzy[0].score; // sets lowest search score
				let intFuzzyLen = objFuzzy.length; // declaring outside of the loop is suppose to help performance
				console.log("fuzzy search ran");
				for (let i=0;i<intFuzzyLen;i++){ console.log("sorting fuzz");
					if (intScoreKeep === objFuzzy[i].score){ 
						foundId.push("- [" + strReSearch + "]" + "(" + "https://store.steampowered.com/app/" + objFuzzy[i].item.appid + ")");
					}
				}
			}*/
			
		}
		if (foundId.length > 1){
			arrMultipleId.push(foundId); console.log("it found more than 2 matches for 1 game!");
		}  else if (foundId.length === 1) {
			arrSingleId.push(foundId); console.log("1 match, nice");
		}  else {
			arrNotFound.push(strReSearch); console.log("it didn't find a match");
		}
	};
	console.log("for loop finished!");
	
	makeLists(arrSingleId);
	makeLists(arrNotFound);
};

function makeLists(arrToList){ // need to make it generate all lists at once / apply them all to the DOM at once for performance
    let strToList = "";
	let singleLen = arrToList.length;
	for (let i=0; i<singleLen; i++){
		strToList += "<li>"+ arrToList[i] + "</li>"
		}
	if (arrToList === arrSingleId){
		document.getElementById("oneMatch").innerHTML = strToList;
	} else {
		document.getElementById("noMatch").innerHTML = strToList;
	}
};
	

let arrAppsThatHave = []; 
function doAppsHave(check){
	for (let i = 0; i<arrApps.length ;i++){
	    if (arrApps[i].name.includes(check)){
			arrAppsThatHave.push(arrApps[i]);
		}
	}
}
