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

let addTweet=() => {
    let tweet = {
        id:id, // unique value 
        contents: textArea.value
    }
    tweetList.push(tweet);

    
    render(tweetList);
    id++;

}

let retweet =(originid) =>{

    // 1. find the tweet that you want to retweet
    let originTweet = tweetList.find((item)=> item.id == originid)

    // 2. make the retweet object and it will have same contents with original tweet and parents id 
    let retweetObject = {
        id:id,
        contents: originTweet.contents,
        originTweetID:originid  // referencing
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
let deleteTweet = (deleteId) =>{
    // 1. remove original tweeter id and retweet id 
    tweetList = tweetList.filter(e=> e.id !== deleteId && e.originTweetID !== deleteId )
    
    // 2. show again. 
    render(tweetList);

}


// Show on screen 
let render= (array) =>{
    let htmlForTweet = array.map((item)=>`<div class="tweet-wrap">
	<div class="tweet-header">
		<img src="https://toppng.com/uploads/preview/roger-berry-avatar-placeholder-11562991561rbrfzlng6h.png"
			alt="" class="avator">
		<div class="tweet-header-info">
			* based snow bunny <span>@yumjeezy</span><span>. Jun 27
			</span>
			<p id="tweetText">🔥${item.contents}
				</p>
		</div>
	</div>
	<div class="tweet-info-counts">

		<div class="comments">

			<svg class="feather feather-message-circle sc-dnqmqq jxshSx onclick"
				xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
				fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
				stroke-linejoin="round" aria-hidden="true">
				<path
					d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">
				</path>
			</svg>
			<div class="comment-count">33</div>
		</div>

		<div class="retweets">
			<svg class="feather feather-repeat sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg"
				width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
				stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<polyline points="17 1 21 5 17 9"></polyline>
				<path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
				<polyline points="7 23 3 19 7 15"></polyline>
				<path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
			</svg>
			<div class="retweet-count">397</div>
		</div>

		<div class="likes">
			<svg class="feather feather-heart sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg"
				width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
				stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<path
					d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
				</path>
			</svg>
			<div class="likes-count">
				2.6k
			</div>
		</div>

		<div class="message">
			<svg class="feather feather-send sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg"
				width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
				stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
				<line x1="22" y1="2" x2="11" y2="13"></line>
				<polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
			</svg>
		</div>
	</div>
</div>`).join('')
    document.getElementById('tweetCards').innerHTML= htmlForTweet

}



//Follow Button Effect
$(document).ready(

	function iniciar() {
		$('.follow').on("click", function () {
			$('.follow').css('background-color', '#34CF7A');
			$('.follow').html('<div class="icon-ok"></div> Following');
		});
	}

);