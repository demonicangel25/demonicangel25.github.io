var locations = ["Cottage"/*0*/, "North Yard"/*1*/, "North-East Yard"/*2*/, "East Yard"/*3*/, "South-East Yard"/*4*/, "South Yard"/*5*/, "South-West Yard"/*6*/, "West Yard"/*7*/, "North-West Yard"/*8*/, "North Forest Edge"/*9*/, "Southern Lake"/*10*/, "West Forest Edge"/*11*/, "Northern Trail"/*12*/, "South Graveyard Flower Patch"/*13*/, "Graveyard"/*14*/, "East Graveyard Flower Patch"/*15*/, "North Forest"/*16*/, "Base of Treehouse"/*17*/, "Treehouse"/*18*/, "Campsite"/*19*/, "Ropebridge"/*20*/, "East Lookout"/*21*/, "Cave Entrance"/*22*/, "Cave"/*23*/, "Cellar"/*24*/];
var locationNum = 0;
/* The current location value*/
var nullns = [0,1,2,2,2,2,3,4,1,0,-1,-2,-1,-1,0];
var nullwe = [-2,-2,-2,-1,0,1,1,1,2,3,-1,0,1,2,2];
/*0 WFE, 1 SGFP, 2 Graveyard, 3 EGFP, 4 NFE, 5 N Trail, 6 N Forest, 7 Treehouse Base, 8 Campsite, 9 E Lookout, 10 SW Yard, 11 S Lake, 12 SE Yard, 13 Cave, 14 is Ropebridge*/


var storyInv = [0,0,0,0,0,0,0,0,0];
/*0 is book, 1 is paper_lakeBird, 2 is paper_northYard, 3 is paper_cave, 4 is paper_southWestYard, 5 is paper_cellar, 6 is paper_eastGraveFlower, 7 is paper_northEastYard, 8 is paper_cottage*/
var paperLoc = [10,1,23,6,24,15,2,0];
var storyInfo = ["No pages", "a character who has the ability to lockpick, which it use to sneak into their enemy's base", "a character who is able to fashion simple tools, like a basic torch out of a stick, some cloth, and gas or animal fat as fuel", "a character who fought against the forces of evil", "a character's enemy, who wishes to take control of the forest and exploit its resources", "a character falling under a curse, turning their memories into pages in a book", "a character's epic fight with their archnemesis, who had found their one true weakness", "a character's cottage, which was hidden away in case their weakness was exploited", "a character who lost their memories after the pages from its story was torn out. This paper looks like the last page of a book", "your ability to lockpick, which aided you in breaking into the base of an enemy", "your ablity to fashion simple tools, like a basic torch out of a stick, some cloth, and gas or animal fat as fuel", "your life of fighting evil, in order to protect those you love", "your enemy, who wishes to take control of the forest and exploit its resources", "you falling under a curse, turning your memories into pages in a book. There are a total of 8 pages", "your epic fight with your archnemesis, who had found your one true weakness", "your cottage, which you had hidden away in case your weakness was exploited",  "you losing your memories after the pages of your story was ripped out"];
var bookInfo = ["It is a book missing all of it's pages. The title on the spine reads 'The Hero of the Forest'.", "It is a book that housed your story/memories."];

var paperCount = 0;
var paperMax = 8;
var doIt = 0;

var itemInv = [0,0,0,0,0,0,0,0,0,0,0];
/*0 is worm, 1 is fishing rod, 2 is fish, 3 is wood board, 4 is gas can, 5 is large stick, 6 is rag, 7 is torch, 8 is ladder, 9 is shovel, 10 is the bobby pin*/
var itemInfo = ["It's just a worm","It's a fishing rod. It looks old, but still works", "It's a fishing rod with a worm as bait", "It's just a fish", "It's a wood board, and it looks really sturdy", "It's a small gas can with some gas inside", "It's a large stick, about the size of an axe handle.","It's a rag. It's bone dry","It's an unlit torch you made. It's useless until it's lit","It's a lit torch you made. It casts a large light","It's a small ladder, just tall enough to reach gutters", "It's a shovel with a weak handle", "It's just a bobby pin"];

var empty = "e";
var input = "";
var commands = ["help","inspect area", "check inventory", "grab book", "inspect book", "grab paper", "inspect paper", "enter treehouse", "exit treehouse", "enter cave", "exit cave", "enter cellar", "exit cellar", "grab worm", "inspect worm", "grab fishing rod", "inspect fishing rod", "put worm on fishing rod", "start fishing", "inspect fish", "give fish to bird", "grab board", "inspect board", "fix bridge", "grab gas can", "inspect gas can", "grab stick", "inspect stick", "grab rag", "inspect rag", "make torch", "inspect torch", "light torch", "grab ladder", "inspect ladder", "place ladder", "grab shovel", "inspect shovel", "dig up x", "grab bobby pin", "inspect bobby pin", "pick lock", "put book on lectern"];
var locinf = "";
var inputbox = document.getElementById("inputbox");

inputbox.addEventListener("keyup", function(event) {
	if(event.keyCode === 13) {
		event.preventDefault();
		document.getElementById("enter").click();
		document.getElementById("inputbox").value = "";
	}
});

document.addEventListener("keydown", function(event) {
	if(event.keyCode !== 13) {
		document.getElementById("inputbox").focus();
	}
});

function reset() {
	sessionStorage.count = 0;
	sessionStorage.ecount = 0;
	locationNum = 0;
	locinf = "";
	altloc = 0;
}

window.onload = reset()

function grabInput() {
	input = document.getElementById("inputbox").value;
	input = input.toLowerCase();
	if (commands.some(check) == true) {
		infoChange(input, commands);
	} else {
		alert("I can't do that");
	}
}

function check(loreum) {
	return loreum == input;
}
	

function infoChange() {
	var tempc = JSON.parse(JSON.stringify(commands));
	doIt = 0;
	switch (input) {
		case commands[0]:
			if (storyInv[0]<1 || locationNum!==24|| paperCount!==paperMax) {	
				tempc.splice(42,1);
			}
			if (itemInv[10]!==1 || locationNum!==6 || storyInv[1]!==2) {	
				tempc.splice(41,1);
			}
			if (itemInv[10]!==1) {	
				tempc.splice(40,1);
			}
			if (itemInv[10]>0 || locationNum!==4) {	
				tempc.splice(39,1);
			}
			if (itemInv[9]!==1 || locationNum!==6) {	
				tempc.splice(38,1);
			}
			if (itemInv[9]!==1) {	
				tempc.splice(37,1);
			}
			if (itemInv[9]>0 || locationNum!==14) {	
				tempc.splice(36,1);
			}
			if (itemInv[8]!==1 || locationNum!==1) {	
				tempc.splice(35,1);
			}
			if (itemInv[8]!==1) {	
				tempc.splice(34,1);
			}
			if (itemInv[8]>0 || locationNum!==14) {	
				tempc.splice(33,1);
			}
			if (itemInv[7]!==1 || locationNum!==19) {	
				tempc.splice(32,1);
			}
			if (itemInv[7]<1) {
				tempc.splice(31,1);
			}
			if ((itemInv[4]||itemInv[5]||itemInv[6])!==1||(storyInv[2]!==2)) {
				tempc.splice(30,1);
			}
			if (itemInv[6]!==1) {
				tempc.splice(29,1);
			}
			if (itemInv[6]!==0 || locationNum!== 9) {
				tempc.splice(28,1);
			}
			if (itemInv[5]!==1) {
				tempc.splice(27,1);
			}
			if (itemInv[5]!==0 || locationNum!==16) {
				tempc.splice(26,1);
			}
			if (itemInv[4]!==1) {
				tempc.splice(25,1);
			}
			if (itemInv[4]!==0 || locationNum!==21) {
				tempc.splice(24,1);
			}
			if (itemInv[3]!==1 || locationNum!==20) {
				tempc.splice(23,1);
			}
			if (itemInv[3]!==1) {
				tempc.splice(22,1);
			}
			if (itemInv[3]!==0 || locationNum!==19) {
				tempc.splice(21,1);
			}
			if (itemInv[2]!==1 || locationNum !== 10) {
				tempc.splice(20,1);
			}
			if (itemInv[2]!==1) {
				tempc.splice(19,1);
			}
			if (itemInv[0]!==2 || locationNum !== 10 || itemInv[2]!==0) {
				tempc.splice(18,1);
			}
			if (itemInv[1]!==1||itemInv[0]!==1) {
				tempc.splice(17,1);
			}
			if (itemInv[1]!==1) {
				tempc.splice(16,1);
			}
			if (itemInv[1]>=1||locationNum!==18) {
				tempc.splice(15,1);
			}
			if (itemInv[0]!==1) {
				tempc.splice(14,1);
			}
			if (itemInv[0]>=1||locationNum!==13) {
				tempc.splice(13,1);
			}
			
			if ((locationNum!==1) && (locationNum!==24)) {
				tempc.splice(11,2);
			} else if (locationNum==1) {
				tempc.splice(12,1);
			} else if (locationNum==24) {
				tempc.splice(11,1);
			}
			if ((locationNum!==22) && (locationNum!==23)) {
				tempc.splice(9,2);
			} else if (locationNum==22) {
				tempc.splice(10,1);
			} else if (locationNum==23) {
				tempc.splice(9,1);
			}
			if ((locationNum!==17) && (locationNum!==18)) {
				tempc.splice(7,2);
			} else if (locationNum==17) {
				tempc.splice(8,1);
			} else if (locationNum==18) {
				tempc.splice(7,1);
			}
			
			
			if (paperCount==0||storyInv[0]==1) {
				tempc.splice(6,1);
			}
			for (x=1;x<storyInv.length;x++) {
				switch (x) {
					case 1:
					if ((locationNum==paperLoc[x-1])==false||(storyInv[x]>=1 && locationNum == paperLoc[x-1])||
					(itemInv[2]!==2)) {
						doIt = doIt+1;
					}
					break;
					case 2:
					if ((locationNum==paperLoc[x-1])==false||(storyInv[x]>=1 && locationNum == paperLoc[x-1])||
					(itemInv[8]!==2)) {
						doIt = doIt+1;
					}
					break;
					case 4:
					if ((locationNum==paperLoc[x-1])==false||(storyInv[x]>=1 && locationNum == paperLoc[x-1])||
					(itemInv[10]!==2)) {
						doIt = doIt+1;
					}
					break;
					default:
					if ((locationNum==paperLoc[x-1])==false||(storyInv[x]>=1 && locationNum == paperLoc[x-1])) {
						doIt = doIt+1;
					}
				}
			}
			if (doIt==(storyInv.length-1)) {
				tempc.splice(5,1);
			}
			if (storyInv[0]==0) {
				tempc.splice(4,1);
			}
			if (locationNum!==0 || storyInv[0]==1) {
				tempc.splice(3,1);
			}

			document.getElementById("locainfo").innerHTML = tempc.join(", ");
		break;
		
		case commands[1]:
			locationinfo();
		break;
		
		case commands[2]:
			inventory();
		break;
		
		case commands[3]:
			if (storyInv[0] == 0 && locationNum == 0) {
			storyInv[0] = 1;
				for (x=1;x<storyInv.length;x++) {
					if (storyInv[x]==1) {
					storyInv[x]=2;
					}
				}
				if (storyInfo[0]=="Have paper") {
					document.getElementById("locainfo").innerHTML = "You grab the book and add the pages you have to it. The events they detail are acutally your memories, and you have to find the rest!";
				} else {
					document.getElementById("locainfo").innerHTML = "You grab the book";
				}
			} else {
			alert("I can't do that");
			}
		break;
		
		case commands[4]:
			if (storyInfo[0]=="No pages") {
				document.getElementById("locainfo").innerHTML = bookInfo[0]
			} else {
				locinf = [bookInfo[1]+" It has "+paperCount];
				for (x=1;x<storyInv.length;x++) {
					if (storyInv[x]>0) {
						locinf.push(storyInfo[x+8]);
					}
				}
				if (locinf.length == 2) {
					locinf[0]=locinf[0]+" paper."
				locinf.splice(1,0,"It is a recount of ");
					document.getElementById("locainfo").innerHTML = locinf.join(" ")+".";
				} else if (locinf.length == 3) {
					locinf[0]=locinf[0]+" papers. They detail "+locinf[1];
					locinf.splice(1,1);
					locinf[locinf.length-1] = "and " + locinf[locinf.length-1] + ".";
					document.getElementById("locainfo").innerHTML = locinf.join(" ");
				} else {
					locinf[0]=locinf[0]+" papers. They detail "+locinf[1];
					locinf.splice(1,1)
					locinf[locinf.length-1] = "and " + locinf[locinf.length-1] + ".";
					document.getElementById("locainfo").innerHTML = locinf.join(", ");
				}
				
			}
		break;
		
		case commands[5]:
			for (x=1;x<storyInv.length;x++) {
				switch (x) {
					case 1:
					if ((storyInv[x]<1 && locationNum == paperLoc[x-1]) === false || itemInv[2]!==2) {
						doIt = doIt+1;
						continue;
					} else {
						if (storyInv[0]==1 && storyInfo[0]!=="Have paper") {
							storyInv[x]=2;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper from the bird and add it to the book. The events it details are acutally your memories, and you have to find the rest!";
							paperCount = paperCount+1;
						}
						if (storyInv[0]==1 && storyInfo[0]=="Have paper") {
							storyInv[x]=2;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper from the bird and add it to the book.";
							paperCount = paperCount+1;
						}
						if (storyInv[0]==0) {
							storyInv[x]=1;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper from the bird";
							paperCount = paperCount+1;
						}
						storyInfo[0] = "Have paper";
					}
					break;
					case 2:
					if ((storyInv[x]<1 && locationNum == paperLoc[x-1]) === false || itemInv[8]!==2) {
						doIt = doIt+1;
						continue;
					} else {
						if (storyInv[0]==1 && storyInfo[0]!=="Have paper") {
							storyInv[x]=2;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper from the gutter and add it to the book. The events it details are acutally your memories, and you have to find the rest!";
							paperCount = paperCount+1;
						}
						if (storyInv[0]==1 && storyInfo[0]=="Have paper") {
							storyInv[x]=2;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper from the gutter and add it to the book.";
							paperCount = paperCount+1;
						}
						if (storyInv[0]==0) {
							storyInv[x]=1;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper from the gutter";
							paperCount = paperCount+1;
						}
						storyInfo[0] = "Have paper";
					}
					break;
					case 3:
					if ((storyInv[x]<1 && locationNum == paperLoc[x-1]) === false || itemInv[7]!==2) {
						doIt = doIt+1;
						continue;
					} else {
						if (storyInv[0]==1 && storyInfo[0]!=="Have paper") {
							storyInv[x]=2;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper and add it to the book. The events it details are acutally your memories, and you have to find the rest!";
							paperCount = paperCount+1;
						} 
						if (storyInv[0]==1 && storyInfo[0]=="Have paper") {
							storyInv[x]=2;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper and add it to the book.";
							paperCount = paperCount+1;
						}
						if (storyInv[0]==0) {
							storyInv[x]=1;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper";
							paperCount = paperCount+1;
						}
						storyInfo[0] = "Have paper";
					}
					break;
					case 4:
					if ((storyInv[x]<1 && locationNum == paperLoc[x-1]) === false || itemInv[10]!==2) {
						doIt = doIt+1;
						continue;
					} else {
						if (storyInv[0]==1 && storyInfo[0]!=="Have paper") {
							storyInv[x]=2;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper from the treasure chest and add it to the book. The events it details are acutally your memories, and you have to find the rest!";
							paperCount = paperCount+1;
						}
						if (storyInv[0]==1 && storyInfo[0]=="Have paper") {
							storyInv[x]=2;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper from the treasure chest and add it to the book.";
							paperCount = paperCount+1;
						}
						if (storyInv[0]==0) {
							storyInv[x]=1;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper from the treasure chest";
							paperCount = paperCount+1;
						}
						storyInfo[0] = "Have paper";
					}
					break;
					default:
					if ((storyInv[x]<1 && locationNum == paperLoc[x-1]) === false) {
						doIt = doIt+1;
						continue;
					} else {
						if (storyInv[0]==1 && storyInfo[0]!=="Have paper") {
							storyInv[x]=2;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper and add it to the book. The events it details are acutally your memories, and you have to find the rest!";
							paperCount = paperCount+1;
						} 
						if (storyInv[0]==1 && storyInfo[0]=="Have paper") {
							storyInv[x]=2;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper and add it to the book.";
							paperCount = paperCount+1;
						}
						if (storyInv[0]==0) {
							storyInv[x]=1;
							document.getElementById("locainfo").innerHTML = "You grab the piece of paper";
							paperCount = paperCount+1;
						}
						storyInfo[0] = "Have paper";
					}
				}
			}
			if (doIt==(storyInv.length-1)) {
			alert("I can't do that");
			}
		break;
		
		case commands[6]:
			if (paperCount>=1 && storyInv[0]==0) {
				locinf = ["You have "+paperCount];
				for (x=1;x<storyInv.length;x++) {
					if (storyInv[x]>0) {
						locinf.push(storyInfo[x]);
					}
				}
				if (locinf.length == 2) {
					locinf[0]=locinf[0]+" paper."
					locinf.splice(1,0,"It details");
					document.getElementById("locainfo").innerHTML = locinf.join(" ")+".";
				} else if (locinf.length == 3) {
					locinf[0]=locinf[0]+" papers. They detail "+locinf[1];
					locinf.splice(1,1);
					locinf[locinf.length-1] = "and " + locinf[locinf.length-1] + ".";
					document.getElementById("locainfo").innerHTML = locinf.join(" ");
				} else {
					locinf[0]=locinf[0]+" papers. They detail "+locinf[1];
					locinf.splice(1,1)
					locinf[locinf.length-1] = "and " + locinf[locinf.length-1] + ".";
					document.getElementById("locainfo").innerHTML = locinf.join(", ");
				}
			} else if (paperCount>1 && storyInv[0]==1){
				alert("I can't do that because they are in the book");
			} else {
				alert("I can't do that");
			}
		break;
		
		/*Enter Sub-Area*/
		case commands[7]:/*treehouse*/
		case commands[9]:/*cave*/
		case commands[11]:/*Cellar*/
			altloc = 1;
			loc();
			loccap();
		break;
		
		/*Exit Sub-Area*/
		case commands[8]:/*treehouse*/
		case commands[10]:/*cave*/
		case commands[12]:/*Cellar*/
			altloc = 0;
			loc();
			loccap();
		break;
		
		case commands[13]:
			if (locationNum==13 && itemInv[0]==0) {
				itemInv[0]=1;
				document.getElementById("locainfo").innerHTML ="You grab the worm";
			} else if (itemInv[0]==1) {
				alert("I already have it");
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[14]:
			if (itemInv[0]==1) {
				document.getElementById("locainfo").innerHTML = itemInfo[0];
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[15]:
			if (locationNum==18 && itemInv[1]==0) {
				itemInv[1]=1;
				document.getElementById("locainfo").innerHTML ="You grab the fishing rod";
			} else if (itemInv[1]==1) {
				alert("I already have it");
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[16]:
			if (itemInv[1]==1 && itemInv[0]!==2) {
				document.getElementById("locainfo").innerHTML = itemInfo[1];
			} else if (itemInv[1]==1 && itemInv[0]==2){
				document.getElementById("locainfo").innerHTML = itemInfo[2];
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[17]:
			if (itemInv[0]==1 && itemInv[1]==1) {
				itemInv[0]=2;
				document.getElementById("locainfo").innerHTML = "You bait the fishing rod using the worm. You're ready to go fishing!";
			} else if (itemInv[0]==2 && itemInv[1]==1) {
				alert("I already did that");
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[18]:
			if (itemInv[0]==2 && locationNum == 10) {
				itemInv[1]=2;
				itemInv[2]=1;
				document.getElementById("locainfo").innerHTML = "You catch a fish, but break the old fishing rod in the process. You see a bird land, interested in the fish you just caught. It looks hungry.";
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[19]:
			if (itemInv[2]==1) {
				document.getElementById("locainfo").innerHTML = itemInfo[3];
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[20]:
			if (itemInv[2]==1 && locationNum == 10) {
				itemInv[2] = 2;
				document.getElementById("locainfo").innerHTML = "You give the fish to the poor bird and it happily takes it, flying off. However it quickly returns with a piece of paper!";
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[21]:
			if (itemInv[3]==0 && locationNum == 19) {
				itemInv[3] = 1;
				document.getElementById("locainfo").innerHTML = "You grab the wood board. It feels sturdy and strong.";
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[22]:
			if (itemInv[3]==1) {
				document.getElementById("locainfo").innerHTML = itemInfo[4];
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[23]:
			if (itemInv[3]==1 && locationNum == 20) {
				itemInv[3] = 2;
				document.getElementById("locainfo").innerHTML = "You repair the bridge using the wooden board, making it safe to cross!";
				loccap();
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[24]:
			if (itemInv[4]<1 && locationNum == 21) {
				itemInv[4] = 1;
				document.getElementById("locainfo").innerHTML = "You grab the gas can. You can hear gas still inside";
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[25]:
			if (itemInv[4]==1) {
				document.getElementById("locainfo").innerHTML = itemInfo[5];
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[26]:
			if (itemInv[5]<1 && locationNum == 16) {
				itemInv[5] = 1;
				document.getElementById("locainfo").innerHTML = "You grab the large stick. It's about the size of an axe handle";
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[27]:
			if (itemInv[5]==1) {
				document.getElementById("locainfo").innerHTML = itemInfo[6];
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[28]:
			if (itemInv[6]<1 && locationNum == 9) {
				itemInv[6] = 1;
				document.getElementById("locainfo").innerHTML = "You grab the rag. It feels very dry.";
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[29]:
			if (itemInv[6]==1) {
				document.getElementById("locainfo").innerHTML = itemInfo[7];
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[30]:
			if((itemInv[4]&&itemInv[5]&&itemInv[6])==1&&(storyInv[2]==2)) {
				itemInv[4]=2;
				itemInv[5]=2;
				itemInv[6]=2;
				itemInv[7]=1;
				document.getElementById("locainfo").innerHTML = "You soak the cloth in gas and attach it to the end of the stick using the knowlege from your survival memories";
			} else if ((itemInv[4]!==1||itemInv[5]!==1||itemInv[6]!==1)&&(storyInv[2]==2)) {
				locinf = ["I can't because I am missing"];
				if (itemInv[4]!==1) {
					locinf.push("fuel like gas or oil");}
				if (itemInv[5]!==1) {
					locinf.push("a long stick");}
				if (itemInv[6]!==1) {
					locinf.push("something to soak in the fuel");}
				locinf[(locinf.length-1)] = locinf[(locinf.length-1)]+".";
				document.getElementById("locainfo").innerHTML = locinf.join(" ");
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[31]:
			if (itemInv[7]==1) {
				document.getElementById("locainfo").innerHTML = itemInfo[8];
			} else if (itemInv[7]==2){
				document.getElementById("locainfo").innerHTML = itemInfo[9];
			} else {
				alert("I can't do that");
			}
		break;
		
		case commands[32]:
			if (locationNum==19 && itemInv[7]==1) {
				itemInv[7]=2;
				document.getElementById("locainfo").innerHTML = "You light the torch using the campfire, setting it ablaze. You can now see in dark areas.";
			} else {
				alert("I can't do that");
			}
		break;
		case commands[33]:
			if (itemInv[8]<1 && locationNum == 14) {
				itemInv[8] = 1;
				document.getElementById("locainfo").innerHTML = "You grab the ladder and collapse it down. It's fairly light.";
			} else {
				alert("I can't do that");
			}
		break;
		case commands[34]:
			if (itemInv[8]==1) {
				document.getElementById("locainfo").innerHTML = itemInfo[10];
			} else {
				alert("I can't do that");
			}
		break;
		case commands[35]:
			if (itemInv[8]==1 && locationNum ==1) {
				itemInv[8]=2;
				document.getElementById("locainfo").innerHTML = "You set up ladder against the house, allowing you to reach the piece of paper.";
			}
		break;
		case commands[36]:
			if (itemInv[9]<1 && locationNum == 14) {
				itemInv[9] = 1;
				document.getElementById("locainfo").innerHTML = "You grab the shovel. It's handle is a bit weak, but still usable";
			} else {
				alert("I can't do that");
			}
		break;
		case commands[37]:
			if (itemInv[9]==1) {
				document.getElementById("locainfo").innerHTML = itemInfo[11];
			} else {
				alert("I can't do that");
			}
		break;
		case commands[38]:
			if (itemInv[9]==1 && locationNum==6) {
				itemInv[9]=2;
				document.getElementById("locainfo").innerHTML = "You dig up a treasure chest! Unfortunatly, you broke the shovel in the process, and the treasure chest is locked."
			} else {
				alert("I can't do that");
			}
		break;
		case commands[39]:
			if (itemInv[10]<1 && locationNum == 4) {
				itemInv[10] = 1;
				document.getElementById("locainfo").innerHTML = "You grab the bobby pin.";
			} else {
				alert("I can't do that");
			}
		break;
		case commands[40]:
			if (itemInv[10]==1) {
				document.getElementById("locainfo").innerHTML = itemInfo[12];
			} else {
				alert("I can't do that");
			}
		break;
		case commands[41]:
			if (itemInv[10]==1 && storyInv[1]==2 && locationNum==6) {
				itemInv[10]=2;
				document.getElementById("locainfo").innerHTML = "You manage to pick the lock! Unfortunatly you broke the bobby pin in the process. Inside the chest is a piece of paper, and that's it.";
			} else if (storyInv[1]<2) {
				document.getElementById("locainfo").innerHTML = "I don't know how.";
			} else {
				alert("I can't do that");
			}
		break;
		case commands[42]:
			if (storyInv[0]==1 && paperCount==paperMax && locationNum==24) {
				document.getElementById("locainfo").innerHTML = "You return the book of your memories to their rightful place, and the book flies open. Pages begin flipping one after another, turing to golden dust and swirling around you. Once they've all turned to dust, the book slams shut and the dust glows brightly before disappearing. CONGRATS, YOU DID IT!!!";
				document.getElementById("inputbox").disabled = true;
				document.getElementById("north").disabled = true;
				document.getElementById("north").style.cursor = "not-allowed";
				document.getElementById("east").disabled = true;
				document.getElementById("east").style.cursor = "not-allowed";
				document.getElementById("south").disabled = true;
				document.getElementById("south").style.cursor = "not-allowed";
				document.getElementById("west").disabled = true;
				document.getElementById("west").style.cursor = "not-allowed";
			} else {
				alert("I can't do that");
			}
		break;
	}
}

function north() {
	if (typeof(Storage) !== "undefined") {
		if (sessionStorage.count) {
			sessionStorage.count = Number(sessionStorage.count)+1;
		} else {
			sessionStorage.count = 1;
		}
			if (sessionStorage.count>0) {
			document.getElementById("cou").innerHTML = "You are "+sessionStorage.getItem("count")+" feet north and ";
			} else if (sessionStorage.count<0){
			document.getElementById("cou").innerHTML = "You are "+Math.abs(sessionStorage.getItem("count"))+" feet south and ";
			} else {
			document.getElementById("cou").innerHTML = "You are centered north to south and "
			}
	} else {
		document.getElementById("cou").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
	loccap();
}

function south() {
	if (typeof(Storage) !== "undefined") {
		if (sessionStorage.count) {
			sessionStorage.count = Number(sessionStorage.count)-1;
		} else {
			sessionStorage.count = -1;
		}
			if (sessionStorage.count>0) {
			document.getElementById("cou").innerHTML = "You are "+sessionStorage.getItem("count")+" feet north and ";
			} else if (sessionStorage.count<0){
			document.getElementById("cou").innerHTML = "You are "+Math.abs(sessionStorage.getItem("count"))+" feet south and ";
			} else {
			document.getElementById("cou").innerHTML = "You are centered north to south and "
			}
	} else {
		document.getElementById("cou").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
	loccap();
}

function east() {
	if (typeof(Storage) !== "undefined") {
		if (sessionStorage.ecount) {
			sessionStorage.ecount = Number(sessionStorage.ecount)+1;
		} else {
			sessionStorage.ecount = 1;
		}
			if (sessionStorage.ecount>0) {
			document.getElementById("coue").innerHTML =sessionStorage.getItem("ecount")+" feet east.";
			} else if (sessionStorage.ecount<0){
			document.getElementById("coue").innerHTML =Math.abs(sessionStorage.getItem("ecount"))+" feet west.";
			} else {
			document.getElementById("coue").innerHTML = "centered east to west."
			}
	} else {
		document.getElementById("coue").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
	loccap();
}

function west() {
	if (typeof(Storage) !== "undefined") {
		if (sessionStorage.ecount) {
			sessionStorage.ecount = Number(sessionStorage.ecount)-1;
		} else {
			sessionStorage.ecount = -1;
		}
			if (sessionStorage.ecount>0) {
			document.getElementById("coue").innerHTML =sessionStorage.getItem("ecount")+" feet east.";
			} else if (sessionStorage.ecount<0){
			document.getElementById("coue").innerHTML =Math.abs(sessionStorage.getItem("ecount"))+" feet west.";
			} else {
			document.getElementById("coue").innerHTML = "centered east to west."
			}
	} else {
		document.getElementById("cou").innerHTML = "Sorry, your browser does not support Web Storage...";
	}
	loccap();
}

north();
south();
east();
west();

function loccap() {
	if ((sessionStorage.count==nullns[2] && sessionStorage.ecount==nullwe[2]) ||
	(sessionStorage.count==nullns[3] && sessionStorage.ecount==nullwe[3]) ||
	(sessionStorage.count==nullns[4] && sessionStorage.ecount==nullwe[4]) ||
	(sessionStorage.count==nullns[7] && sessionStorage.ecount==nullwe[7]) ||
	(sessionStorage.count==nullns[8] && sessionStorage.ecount==nullwe[8]) ||
	(sessionStorage.count==nullns[9] && sessionStorage.ecount==nullwe[9]) ||
	(altloc==1)) {
		document.getElementById("north").disabled = true;
		document.getElementById("north").style.cursor = "not-allowed";
	} else {
		document.getElementById("north").disabled = false;
		document.getElementById("north").style.cursor = "pointer";
	}

	if ((sessionStorage.count==nullns[5] && sessionStorage.ecount==nullwe[5]) || 
	(sessionStorage.count==nullns[6] && sessionStorage.ecount==nullwe[6]) ||
	(sessionStorage.count==nullns[7] && sessionStorage.ecount==nullwe[7]) || 
	(sessionStorage.count==nullns[8] && sessionStorage.ecount==nullwe[8]) || 
	(sessionStorage.count==nullns[9] && sessionStorage.ecount==nullwe[9]) || 
	(sessionStorage.count==nullns[11] && sessionStorage.ecount==nullwe[11]) || 
	(sessionStorage.count==nullns[13] && sessionStorage.ecount==nullwe[13]) ||
	((sessionStorage.count==nullns[14] && sessionStorage.ecount==nullwe[14]) && itemInv[3]!==2) ||
	(altloc==1)) {
		document.getElementById("east").disabled = true;
		document.getElementById("east").style.cursor = "not-allowed";
	} else {
		document.getElementById("east").disabled = false;
		document.getElementById("east").style.cursor = "pointer";
	}
	
	if ((sessionStorage.count==nullns[0] && sessionStorage.ecount==nullwe[0]) ||
	(sessionStorage.count==nullns[9] && sessionStorage.ecount==nullwe[9]) ||
	(sessionStorage.count==nullns[10] && sessionStorage.ecount==nullwe[10]) ||
	(sessionStorage.count==nullns[11] && sessionStorage.ecount==nullwe[11]) ||
	(sessionStorage.count==nullns[12] && sessionStorage.ecount==nullwe[12]) ||
	(sessionStorage.count==nullns[13] && sessionStorage.ecount==nullwe[13]) ||
	(altloc==1)) {
		document.getElementById("south").disabled = true;
		document.getElementById("south").style.cursor = "not-allowed";
	} else {
		document.getElementById("south").disabled = false;
		document.getElementById("south").style.cursor = "pointer";
	}

	if ((sessionStorage.count==nullns[0] && sessionStorage.ecount==nullwe[0]) ||
	(sessionStorage.count==nullns[1] && sessionStorage.ecount==nullwe[1]) ||
	(sessionStorage.count==nullns[2] && sessionStorage.ecount==nullwe[2]) ||
	(sessionStorage.count==nullns[6] && sessionStorage.ecount==nullwe[6]) ||
	(sessionStorage.count==nullns[7] && sessionStorage.ecount==nullwe[7]) ||
	(sessionStorage.count==nullns[10] && sessionStorage.ecount==nullwe[10]) ||
	(sessionStorage.count==nullns[11] && sessionStorage.ecount==nullwe[11]) ||
	(altloc==1)) {
		document.getElementById("west").disabled = true;
		document.getElementById("west").style.cursor = "not-allowed";
	} else {
		document.getElementById("west").disabled = false;
		document.getElementById("west").style.cursor = "pointer";
	}
}

function loc() {
	if (sessionStorage.count==0 && sessionStorage.ecount==0) {
	locationNum = 0;
	locationinfo();}

	else if (sessionStorage.count==1 && sessionStorage.ecount==0){
		if (altloc!==1) {
		locationNum = 1;
		document.getElementById("map").src="images/GameMap.jpg";
		locationinfo();
		} else {
		locationNum = 24;
		document.getElementById("map").src="images/GameMap_Cellar.jpg";
		locationinfo();}}

	else if (sessionStorage.count==1 && sessionStorage.ecount==1){
	locationNum = 2;
	locationinfo();}

	else if (sessionStorage.count==0 && sessionStorage.ecount==1){
	locationNum = 3;
	locationinfo();}

	else if (sessionStorage.count==-1 && sessionStorage.ecount==1){
	locationNum = 4;
	locationinfo();}

	else if (sessionStorage.count==-1 && sessionStorage.ecount==0){
	locationNum = 5;
	locationinfo();}
	
	else if (sessionStorage.count==-1 && sessionStorage.ecount==-1){
	locationNum = 6;
	locationinfo();}

	else if (sessionStorage.count==0 && sessionStorage.ecount==-1){
	locationNum = 7;
	locationinfo();}

	else if (sessionStorage.count==1 && sessionStorage.ecount==-1){
	locationNum = 8;
	locationinfo();}
	
	else if (sessionStorage.count==2 && sessionStorage.ecount==0){
	locationNum = 9;
	locationinfo();}
	
	else if (sessionStorage.count==-2 && sessionStorage.ecount==0){
	locationNum = 10;
	locationinfo();}
	
	else if (sessionStorage.count==0 && sessionStorage.ecount==-2){
	locationNum = 11;
	locationinfo();}
	
	else if (sessionStorage.count==2 && sessionStorage.ecount==1){
	locationNum = 12;
	locationinfo();}
	
	else if (sessionStorage.count==1 && sessionStorage.ecount==-2){
	locationNum = 13;
	locationinfo();}
	
	else if (sessionStorage.count==2 && sessionStorage.ecount==-2){
	locationNum = 14;
	locationinfo();}
	
	else if (sessionStorage.count==2 && sessionStorage.ecount==-1){
	locationNum = 15;
	locationinfo();}
	
	else if (sessionStorage.count==3 && sessionStorage.ecount==1){
	locationNum = 16;
	locationinfo();}
	
	else if (sessionStorage.count==4 && sessionStorage.ecount==1){
		if (altloc!==1) {
		locationNum = 17;
		document.getElementById("map").src="images/GameMap.jpg";
		locationinfo();
		} else {
		locationNum = 18;
		document.getElementById("map").src="images/GameMap_Treehouse.jpg";
		locationinfo();}}
	
	else if (sessionStorage.count==1 && sessionStorage.ecount==2){
	locationNum = 19;
	locationinfo();}
	
	else if (sessionStorage.count==0 && sessionStorage.ecount==2){
	locationNum = 20;
	locationinfo();}
	
	else if (sessionStorage.count==0 && sessionStorage.ecount==3){
	locationNum = 21;
	locationinfo();}
	
	else if (sessionStorage.count==-1 && sessionStorage.ecount==2){
		if (altloc!==1) {
		locationNum = 22;
		document.getElementById("map").src="images/GameMap.jpg";
		locationinfo();
		} else {
		locationNum = 23;
		document.getElementById("map").src="images/GameMap_Cave.jpg";
		locationinfo();}}
	
	else {
	document.getElementById("location").innerHTML = "You are lost.";
	}
}

function locationinfo() {
	switch (locationNum) {
	case 0:
		locinf = ["You are in the "+locations[0]+". The house feels very empty, with barely any decoration and furniture"];
			if (storyInv[0] == 0) {
				locinf.push("The book is still on the ground");
			}
			if (storyInv[(storyInv.length-1)] == 0) {
				locinf.push("The paper is still on the ground");
			}
			if (empty == "e") {
				locinf.push(" ");
			}
	break;
	case 1:
		locinf = ["You are in the "+locations[1]+". You can see an open cellar door. There is also the edge of a forest to the north that you can see"];
		if (storyInv[2]<1) {
			locinf.push("You can see a small piece of paper hanging from a gutter");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 2:
		locinf = ["You are in the "+locations[2]+". You can see a trail that leads into the woods to the north, and can hear a fire crackling to the east"];
		if (storyInv[7]<1) {
			locinf.push("You can see a piece of paper sticking to the wall of the cottage");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 3:
		locinf = ["You are in the "+locations[3]+". You can see a small valley with a bridge to cross in the east"];
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 4:
		locinf = ["You are in the "+locations[4]+". You can see a small rock formation to the east"];
		if (itemInv[10]<1) {
			locinf.push("You can see a small peice of metal on the ground. It looks like a bobby pin");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 5:
		locinf = ["You are in the "+locations[5]+". You can hear water flowing and a bird's call to the south"];
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 6:
		locinf = ["You are in the "+locations[6]];
		if (itemInv[9]<2) { 
			locinf.push("You can see two sticks making an X in the corner of the yard");
		} else if (itemInv[10]<2) {
			locinf.push("The treasure chest is still in the hole, unopened");
		} else {
			locinf.push("The treasure chest sits in the hole you made, opened");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 7:
		locinf = ["You are in the "+locations[7]+". You an see the edge of a forest to the west"];
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 8:
		locinf = ["You are in the "+locations[8]+". You can see a flower patch to the north and west, as well as a graveyard to the north-west"];
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 9:
		locinf = ["You are at the "+locations[9]+". You can see a flower patch to the west and the beginning of a trail to the east"];
		if (itemInv[6]<1) {
			locinf.push("You can see a rag hanging from a branch");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 10:
		locinf = ["You are at the "+locations[10]+". It's a beautiful day outside, and the lake has a nice white beach on its edge"];
		if (itemInv[2]<1) {
			locinf.push("You can see a bird circling overhead, looking for food");
		} else if (itemInv[2]==1) {
			locinf.push("You can see the bird looking at you, wanting the fish");
		}
		if (itemInv[1]<2) {
			locinf.push("This looks like a wonderful place to go fishing");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 11:
		locinf = ["You are at the "+locations[11]+". You can see a flower patch to the north"];
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 12:
		locinf = ["You are on the "+locations[12]+". You can see a trail lead into the forest to the north, as well as hear a fire snap and crackle to the south-east"];
		if (empty == "e") {
			locinf.push(" ");
		}
	
	break;
	case 13:
		locinf = ["You are in the "+locations[13]+". The flowers are all white lilies, and looking at them fill you with a sense of sadness.  You can see a small graveyard to the north, and more flowers to the north-east"];
		if (itemInv[0]<1) {
			locinf.push("You can see a worm in the dirt wriggling around");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 14:
		locinf = ["You are in the "+locations[14]+". The graves all fill you with a vauge sense of grief, but you can't remember why. There is a small caretaker shed tucked away in the corner of the graveyard"];
		if (itemInv[8]<1 && itemInv[9]<1) {
			locinf.push("You can see a few tools leaned against the caretaker shed, including a ladder and shovel");
		} else if (itemInv[8]>=1 && itemInv[9]<1) {
			locinf.push("You can see a few tools leaned against the caretaker shed, including a shovel");
		}  else if (itemInv[8]<1 && itemInv[9]>=1) {
			locinf.push("You can see a few tools leaned against the caretaker shed, including a ladder");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 15:
		locinf = ["You are in the "+locations[15]+". The flowers are a white stargazer lilies, and there are quite a lot of them. You can see a graveyard to the west, and the edge of a forest to the east"];
		if (storyInv[6]<1) {
			locinf.push("You can see a piece of paper caught on a rosebush");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 16:
		locinf = ["You are in the "+locations[16]+". The forest gets too thick to traverse off the trail you're on, and the canopy blocks out much of the sunlight, making the trail the only place you can easily see. To the north, you can see a large oak tree with a small treehouse in it"];
		if (itemInv[5]<1) {
			locinf.push("You can see a large stick off to the side of the beaten trail");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 17:
		locinf = ["You are at the "+locations[17]+". The forest surronds the treehouse, keeping this little grove concealed. There is small inscriptions on the tree, names you can vaugely recognize"];
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 18:
		locinf = ["You are in the "+locations[18]+" You see pictures of people, and you're in them. They must be your friends, but it's hard to remember. The treehouse looks like a teenager hangout spot, with some small chairs and decorations of groups and people. Out of the window, you can see just over the trees, and it looks like you're up on a mountain that's surrounded by forest"];
		if (itemInv[1]<1) {
			locinf.push("You can see a fishing rod in the corner of the treehouse");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 19:
		locinf = ["You are at the "+locations[19]+". There is a nice fire going in the fire pit, with some empty tents set up around it. There seems to be no sign of the people who were here. To the south you can see a bridge across a small valley, and to the north-west a trail into the forest"];
		if (itemInv[3]<1) {
			locinf.push("You can see a large wooden board propped up against a set of logs");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 20:
		locinf = ["You are at the "+locations[20]+". You can see a river at the bottom of the valley that leads south-west. Across the bridge is a lookout point on a overlook. To the north you hear a crackling fire and to the south you can see a rock formation jutting out of the ground"];
		if (itemInv[3]<2) {
			locinf.push("You can't safely cross because the bridge is missing a large board");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 21:
		locinf = ["You are at the "+locations[21]+". You can see the entire mountain range from here, as well as the forest below. It's stunning, but you feel like something is missing. The rock you're on is a bit too flat to be natural"];
		if (itemInv[4]<1) {
			locinf.push("You can see a small gas can abandoned on the rocks");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 22:
		locinf = ["You are at the "+locations[22]+". You can see into the dark abyss of the cave, and hear the wind whistling across the entrance and in the cave"];
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 23:
		locinf = ["You are in the "+locations[23]+". The sound of the wind is loud, but not deafeningly so. It's like a small melody, surpsingly. Like there's order in the chaos of sound"];
		if (itemInv[7]<2) {
			locinf.push("You can't see becuase it's too dark");
		} else if (storyInv[3]<1) {
			locinf.push("The torch you're carrying helps you see a piece of paper on the cave's floor");
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	case 24:
		locinf = ["You are in the "+locations[24]+". The cellar is full of shelves of junk, but has a lectern in the middle of it, directly under the only light in the room"];
		if (storyInv[5]<1) {
			locinf.push("You can see a paper on the lectern.")
		} else if (storyInv[5]==2 && paperCount!==paperMax) {
			locinf.push("You still need to find "+(paperMax-paperCount)+" papers")
		} else if (storyInv[5]==2 && paperCount==paperMax) {
			locinf.push("You can see the lectern giving off a faint glow. The book is pulling you toward it")
		}
		if (empty == "e") {
			locinf.push(" ");
		}
	break;
	}
	document.getElementById("locainfo").innerHTML = locinf.join(". ") ;
}

function inventory() {
	locinf = ["You have"];
	if (storyInv[0] == 1 && paperCount==0) {
		locinf.push("a book");
	} else if (storyInv[0] == 0 && paperCount>0) {
		if (paperCount==1){
		locinf.push(paperCount+" paper");
		} else {
		locinf.push(paperCount+" papers");}
	} else if (storyInv[0] == 1 && paperCount>0){
		locinf.push("your story book with");
		if (paperCount==1){
		locinf.push(paperCount+" paper inside");
		} else {
		locinf.push(paperCount+" papers inside");}
	}
		
	if (locinf.length == 2) {
		locinf[1] = locinf[1] + ".";
		locinf = locinf.join(" ");
	} else if (locinf.length == 3){
		locinf[2] = "and "+locinf[2]+".";
		locinf = locinf.join(" ");
	}
	if (locinf == "You have") {
		locinf = locinf[0]+" no important documents.";}

	locinf = locinf.split();
	if (itemInv.includes(1)){
		locinf.push("You also have");
		if (itemInv[0]==1) {
			locinf.push("a worm");
		} else if (itemInv[0]==2 && itemInv[1]==1) {
			locinf.push("a fishing rod baited with a worm");
		}
		if (itemInv[1]==1 && itemInv[0]!==2) {
			locinf.push("a fishing rod");
		}
		if (itemInv[2]==1) {
			locinf.push("a fish");
		}
		if (itemInv[3]==1) {
			locinf.push("a wood board");
		}
		if (itemInv[4]==1) {
			locinf.push("a gas can");
		}
		if (itemInv[5]==1) {
			locinf.push("a large stick");
		}
		if (itemInv[6]==1) {
			locinf.push("a rag");
		}
		if (itemInv[7]==1) {
			locinf.push("an unlit torch");
		}
		if (itemInv[7]==2) {
			locinf.push("a lit torch");
		}
		if (itemInv[8]==1) {
			locinf.push("a ladder");
		}
		if (itemInv[9]==1) {
			locinf.push("a shovel");
		}
		if (itemInv[10]==1) {
			locinf.push("a bobby pin");
		}
		
	}
	
	if (locinf.length == 3) {
		locinf[2] = locinf[2]+".";
		locinf = locinf.join(" ");
	} else if (locinf.length == 4){
		locinf[3] = "and "+locinf[3]+".";
		locinf = locinf.join(" ");
	} else if (locinf.length>4) {
		locinf[0]=locinf[0]+" "+locinf[1]+" "+locinf[2];
		locinf.splice(1,2);
		locinf[(locinf.length-1)]="and "+locinf[(locinf.length-1)]+".";
		locinf = locinf.join(", ");
	}
	
	document.getElementById("locainfo").innerHTML = locinf;
}
