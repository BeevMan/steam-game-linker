



let objSteam; // where the parsed steam json is stored
		let arrSingleId = []; // used in the findGame function to save reddit markdown ready links
		let arrMultipleId = [];
		let arrNotFound = [];
		let userList = [] // users input saved in the saveList function
		
	    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
                objSteam = JSON.parse(xhttp.responseText);
				console.log(objSteam.applist.apps);
            }
        };
        xhttp.open("GET", "steamGames.json", true);  // need to run node live server to get data from json file https://youtu.be/wI1CWzNtE-M?t=1300
        xhttp.send();
	
	
	    function saveList(){ // triggered upon button press, saves the user's list than calls findGame() function
		    let stringUserList = document.getElementById('raw').value;
            userList = stringUserList.split("\n");			
			console.log("userList saved during saveList function");
			findGame();
		}
		
		
	    function findGame(){  // loops through steam variable looking for a name match, adds each match to foundId array , when loop finishes checks length of foundId and then calls makeLists() function
		console.log("findGame function triggered"); console.log(userList);
		    
			for (let j=0; j<userList.length;j++){
				let foundId = [];
			    for (let i=0; i<objSteam.applist.apps.length;i++){
			        console.log("for loop triggered!");
			        if (userList[j] === objSteam.applist.apps[i].name) {
				        console.log("found a match!!! hoo fucking rah!!");
			            foundId.push("[" + userList[j] + "]" + "(" + "https://store.steampowered.com/app/" + objSteam.applist.apps[i].appid + ")"); // pushes reddit markdown ready links to the array
					    console.log(foundId);
				    }
			    }
				if (foundId.length > 1){
			        arrMultipleId.push(foundId); console.log("it found more than 2 matches for 1 game!");
			    }  else if (foundId.length === 1) {
				    arrSingleId.push(foundId); console.log("1 match, nice");
			    }  else {
				    arrNotFound.push(userList[j]); console.log("it didn't find a match");  
			    };
			}
		    console.log("for loop finished!");
       		
			
			
			
			makeLists();
		}
	    
		
		function makeLists(){ // currently only makes the li elements for single matches
		    for (let i=0; i<arrSingleId.length; i++){
			   	let listedLink = document.createElement("li"); // makes a <li></li> element learned from https://youtu.be/K3jb8_pPlRQ?t=2389
				    console.log(listedLink);
				let test = document.createTextNode(arrSingleId[i]); // creates a text node?? idk have to look into it more
				    console.log(test);
				listedLink.appendChild(test); // adds the test variable to the <li> created above
				    console.log(listedLink); console.log("li should have been logged twice now!");
				document.getElementById("displayedList").appendChild(listedLink); // adds the newly created <li> to the html's ul
			        console.log("list item should be made!");
				}	
		}
	
	
	
	/*
	  TO DO,
	    X need to find how to access json, 
		 X search json by game name,
		   the games can currently be found but only with the same name and punctuation as listed in the JSON, for useability I should convert all letters to same case? Most names copied from hb keys list match however HIVESWAP: Act 1 doesn't match with the JSON because ACT is all capitilized 
		   need to remove ® (copyright symbol)from the search & and possibly end the game name at : ? a few games seem to only match when the name before ":" is used example - Override: Mech City Brawl is only found with Override but HIVESWAP: ACT 1 is only found with the ":"
		X once appID is returned I can add it to https://store.steampowered.com/app/
		  X find reddits way of formatting links, [test link](https://www.google.com) must be inputted from markdown mode
		
        X need to seperate into 3 lists,  1. games found with a single match  2. games found with multiple matches   3. games with no matches found 
		  need to generate <li> elements for all 3 lists
		get it working for multiple names at a time
		  if the user has multiple copy of the same game I need to track that too?
        set it up to run locally i.e if hosted on a site, frontend javascript will call 	https://api.steampowered.com/ISteamApps/GetAppList/v2/	or site updates list every so often? 
		need to add a status to the button to tell user's that it is busy working
        user's text input area currently starts one space in, need to remove that space		
	*/