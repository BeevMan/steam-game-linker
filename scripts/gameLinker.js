        let objSteam = []; // where the parsed steam json is stored
		let objApps = [];
		let arrSingleId = []; // used in the findGame function to save reddit markdown ready links
		let arrMultipleId = [];
		let arrNotFound = [];
		let userList = []; // users input saved in the saveList function
		let intUserLen;
		
      
		
		
	    var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
                objSteam = JSON.parse(xhttp.responseText);
				console.log(objSteam.applist.apps);
				for (let i=0;i<objSteam.applist.apps.length;i++){
					objApps.push(objSteam.applist.apps[i]);
				}
            }
        };
        xhttp.open("GET", "steamGames.json", true);
        xhttp.send();
	

        let options = { // options for fuseJS
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
        };
        let fuse = new Fuse(objApps, options); // "objApps" is the item array
        //var result = fuse.search("rust");

	    function saveList(){ // triggered upon button press, saves the user's list than calls findGame() function
		    let stringUserList = document.getElementById('raw').value;
            userList = stringUserList.split("\n");
            intUserLen = userList.length;			
			console.log("userList saved during saveList function");
			findGame();
		};
		
		
	    function findGame(){  // loops through steam variable looking for a name match, adds each match to foundId array , when loop finishes checks length of foundId and then calls makeLists() function
		console.log("findGame function triggered"); console.log(userList);
		    
			for (let j=0; j<intUserLen;j++){ // loops through users list
				let foundId = [];  
				let objFuzzy = fuse.search(userList[j]); // saves search results of fuseJS
				let intScoreKeep = objFuzzy[0].score; // sets lowest search score
				let intFuzzyLen = objFuzzy.length; // declaring outside of the loop is suppose to help performance
				console.log("fuzzy search ran");
				for (let i=0;i<intFuzzyLen;i++){ console.log("sorting fuzz");
					if (intScoreKeep === objFuzzy[i].score){ 
						foundId.push("[" + userList[j] + "]" + "(" + "https://store.steampowered.com/app/" + objFuzzy[i].item.appid + ")");
					}
				}
			    /* temporarily commented out to play with the fuzzy search also needs some edits
				for (let i=0; i<objSteam.applist.apps.length;i++){
			        console.log("for loop triggered!");
			        if (userList[j] === objSteam.applist.apps[i].name) {
				        console.log("found a match!!! hoo fucking rah!!");
			            foundId.push("[" + userList[j] + "]" + "(" + "https://store.steampowered.com/app/" + objSteam.applist.apps[i].appid + ")"); // pushes reddit markdown ready links to the array
					    console.log(foundId);
				    }
			    } */
				if (foundId.length > 1){
			        arrMultipleId.push(foundId); console.log("it found more than 2 matches for 1 game!");
			    }  else if (foundId.length === 1) {
				    arrSingleId.push(foundId); console.log("1 match, nice");
			    }  else {
				    arrNotFound.push(userList[j]); console.log("it didn't find a match");  
			    };
			};
		    console.log("for loop finished!");
       		
			
			
			
			makeLists();
		};
	    
		
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
		};
	
	
	
	/*
	  TO DO,
	    X need to find how to access json, 
		 X search json by game name,
		   X fuzzy search by https://fusejs.io/
		   need to alphabetize and index objApps to optimize search times?
		X once appID is returned I can add it to https://store.steampowered.com/app/
		  X find reddits way of formatting links, [test link](https://www.google.com) must be inputted from markdown mode
		
        X need to seperate into 3 lists,  1. games found with a single match  2. games found with multiple matches   3. games with no matches found 
		  need to generate <li> elements for all 3 lists
		X get it working for multiple names at a time
		  if the user has multiple copy of the same game I need to track that too?
          api call? https://api.steampowered.com/ISteamApps/GetAppList/v2/	 
		need to add a status to the button to tell user's that it is busy working
        user's text input area currently randomnly starts one space in, need to remove that space		
	*/
