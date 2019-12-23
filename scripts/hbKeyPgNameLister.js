

function copyList(){
	let strGames = "";
	let elJumpTo = document.getElementsByClassName("js-jump-to-page jump-to-page");
	let intLastPage = elJumpTo.length-2;
	let intPageCount = 1;
	if(intLastPage > 0){
		intPageCount = Number(elJumpTo[intLastPage].innerText);
		if(elJumpTo[1].innerText === "1"){
			elJumpTo[1].click();
		}
	}
	for (let j = 0; j< intPageCount;j++){
		let elH4 = document.querySelectorAll("h4");
		for (let i = 0; i < elH4.length; i++){
			strGames += elH4[i].innerHTML + "\n";
		}
		if (j < intPageCount -1){
			document.getElementsByClassName("hb hb-chevron-right")[0].click();
		}
	}	
	let dummy = document.createElement("textarea");
	document.body.appendChild(dummy);
	dummy.value = strGames;
	dummy.select();
	document.execCommand("copy");
	document.body.removeChild(dummy);
};
let btn = document.createElement("label");
btn.innerHTML = '<button id ="copier" style = "padding: 0.1em .2em; background-color: red; color: white; text-align: center" >list to clipboard</button>';
document.getElementsByClassName("sort")[0].appendChild(btn);
document.getElementById("copier").addEventListener("click", copyList);