const getAppState = () => {
	return (
	  JSON.parse(localStorage.getItem("data")) || {
		status: false,
		id: 0,
		tweets: [],
		loggedInUser: "null",
		loggedInName: "null"
	  }
	);
  };

  let appState = getAppState();

  const getAPI = async () => {

	document.getElementById("displayHandle").innerText =
	  `@${appState.loggedInUser}`;
	  document.getElementById("displayName").innerText =
	  `${appState.loggedInName}`;
  }

getAPI();

let textArea = document.getElementById('contentsBox');
let tweetList = []
let id = 0;

let countChar = () => {
	let remainingChar = 140 - textArea.value.length;
	if (remainingChar < 0) {
		document.getElementById('charCountArea').innerHTML = `${remainingChar}`.fontcolor('red');

	} else {
		document.getElementById('charCountArea').innerHTML = `${remainingChar}`

	}
}

textArea.addEventListener('input', countChar);

//Turn hashtags into links
function linkify(str){
    // order matters
    var re = [
        "\\b((?:https?|ftp)://[^\\s\"'<>]+)\\b",
        "\\b(www\\.[^\\s\"'<>]+)\\b",
        "\\b(\\w[\\w.+-]*@[\\w.-]+\\.[a-z]{2,6})\\b", 
        "#([a-z0-9]+)"];
	re = new RegExp(re.join('|'), "gi");
	
    return str.replace(re, function(match, url, www, mail, twitler){
        if(url)
            return "<a href=\"" + url + "\">" + url + "</a>";
        if(www)
            return "<a href=\"http://" + www + "\">" + www + "</a>";
        if(mail)
            return "<a href=\"mailto:" + mail + "\">" + mail + "</a>";
        if(twitler)
            return "<a href=\"foo?bar=" + twitler + "\">#" + twitler + "</a>";

        // shouldnt get here, but just in case
        return match;
    });
}

let addTweet = () => {
	text = linkify(textArea.value);

	let tweet = {
		id: id, // unique value 
		contents: text,
		date: new Date(),
		liked: false
	}
	tweetList.push(tweet);

	console.log(tweet)
	render(tweetList);
	id++;

}

let retweet = (originid) => {

	// 1. find the tweet that you want to retweet
	let originTweet = tweetList.find((item) => item.id == originid)

	// 2. make the retweet object and it will have same contents with original tweet and parents id 
	let retweetObject = {
		id: id,
		contents: originTweet.contents,
		originTweetID: originid,  // referencing
		liked: false
	}

	//3. push retweet object into tweetList
	tweetList.push(retweetObject);

	//5.after everything done, make sure increase the id 
	id++

	//6. render tweetList 
	render(tweetList)
	console.log(tweetList);
}

//delete TWeet 
let deleteTweet = (deleteId) => {
	// 1. remove original tweeter id and retweet id 
	tweetList = tweetList.filter(e => e.id !== deleteId && e.originTweetID !== deleteId)

	// 2. show again. 
	render(tweetList);

}

//like Tweet
function like(a) {
	let index = tweetList.findIndex((item)=> item.id == a)
	const getTweet = tweetList[index];
	getTweet.liked = !getTweet.liked;

	!getTweet.liked
		? (document.getElementById(`like-${a}`).innerHTML = "currentColor")
		: (document.getElementById(`like-${a}`).innerHTML = "pink");
	render(tweetList);
}

// Show on screen 
let render = (array) => {
	let htmlForTweet = array.map((item) => `<div class="tweet-wrap" style="border-radius:20px">
	<div class="tweet-header">
		<img src="https://i1.sndcdn.com/avatars-000500544273-6kcyh0-t500x500.jpg"
			alt="" class="avator">
		<div class="tweet-header-info">
			${appState.loggedInName} <span>@${appState.loggedInUser}</span><span> ${moment(item.date).fromNow()}
			</span>
			<p id="tweetText" style="word-warp:break-word">🔥${item.contents}
				</p>
		</div>
	</div>
	<div class="tweet-info-counts">

		<div class="comments">
			<button style="background: white; border: none;"> 
			<svg class="feather feather-message-circle sc-dnqmqq jxshSx onclick"
				xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
				fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
				stroke-linejoin="round" aria-hidden="true">
				<path
					d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">
				</path>
			</svg>
			</button>
			<div class="comment-count">33</div>
		</div>

		<div class="retweets">
		<button onclick="retweet(${item.id})" style="background: white; border: none;"> 
			<svg class="feather feather-repeat sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg"
				width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
				stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<polyline points="17 1 21 5 17 9"></polyline>
				<path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
				<polyline points="7 23 3 19 7 15"></polyline>
				<path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
			</svg></button>
			<div class="retweet-count">397</div>
		</div>

		<div class="likes">
		<button onclick="like(${item.id})" style="background: white; border: none;"> 
			<svg id="like-${
		item.id
		}" class="feather feather-heart sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg"
				width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${!item.liked ? "currentColor" : "pink"}"
				stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path
					d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
				</path>
			</svg>
			</button>
			<div class="likes-count">
				2.6k
			</div>
		</div>

		<div class="message">
		<button onclick="deleteTweet(${item.id})" style="background: white; border: none;"> 
			<svg class="feather feather-send sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg"
				width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
				stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<line x1="22" y1="2" x2="11" y2="13"></line>
				<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
			</svg>
			</button>
		</div>
	</div>
</div>`).join('')
	document.getElementById('tweetCards').innerHTML = htmlForTweet

}

//signout function
let signOut = () => {
	appState.status = false;
	appState.loggedInUser = "";
	window.open("index.html");
	saveAppState(appState);
  };
  

//Follow Button Effect
$(document).ready(

	function iniciar() {
		$('.follow').on("click", function () {
			$('.follow').css('background-color', '#34CF7A');
			$('.follow').html('<div class="icon-ok"></div> Following');
		});
	}

);