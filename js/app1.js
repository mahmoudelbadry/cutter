$(document).ready(function(){
	$("#cutButton").click(function(){
		var tweetsList = $("<ul id='tweetsArea'></ul>");
        	var tweetsContainer = $("<div id = 'tweetsContainer'></div>");
        	var backButton = $("<button id='backButton'>back</button>");
        	var paragraphText  = $("#paragraphArea").val();
        	paragraphText = $.trim(paragraphText);
        	if(paragraphText != "")
        	{
            	var resultedSentences = makeSentences(paragraphText,132);
            	for (var j=0 ; j < resultedSentences.length ; j++)
            	{
            		var tweetsListItem = $("<li></li>");
            		var tweetText = resultedSentences[j] + " (" + (j+1) + "/" +resultedSentences.length + ")";
            		var tweet = $("<blockquote></blockquote>").text(tweetText);
            		var tweetButton = $("<a href = 'https://twitter.com/intent/tweet?text=" +escape(tweetText) +"'class='tweetButton'>tweet</a>");
            		tweet.appendTo(tweetsListItem);
            		tweetButton.appendTo(tweetsListItem);
            		tweetsListItem.appendTo(tweetsList);
            	}
            	$("#paragraphBoxContainer").slideUp("slow");
            	tweetsList.appendTo(tweetsContainer);
            	backButton.appendTo(tweetsContainer);
            	tweetsContainer.appendTo("body");
            	backButton.click(function(){
            		$("#paragraphBoxContainer").slideDown("slow");
            		tweetsContainer.empty();
            		tweetsContainer.remove();
            	});
            	$(".tweetButton").click(function(event){
            		event.preventDefault();
            		var tweetButtonLink = $(this).attr("href");
            		window.open(tweetButtonLink,'','width=400,height=300,personalbar=0,toolbar=0,scrollbars=1,resizable=1'); 
            		return false;
            	});
        	}
        	else
        	{
        	   alert("Y U NO ENTER TEXT???");
        	}
	});
}); 


var makeSentence = function(words,ml){
	var sentence = "";
	var tempSentence = sentence + words[0] + " ";
	while(((sentence + words[0] + " ").length <= ml)&&(words.length !== 0))
	{
		sentence = sentence + words[0] + " ";
		words.remove(0);
	}
	sentence = $.trim(sentence);
	return{
		sentence:sentence,
		words:words
	};
};


var makeSentences = function(text, ml){
	text = text.replace(/\s/g, " ");
	var words = text.split(" ");
	var sentences = [];
	while(words.length)
	{
		result = makeSentence(words,ml);
		sentences.push(result.sentence);
		words = result.words;
	}
    sentences.forEach(function(sentences, index) {
        sentence += ' (' + (index + 1) + '/' + sentences.length + ')'; 
    });
    return sentences;
};

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
	var rest = this.slice((to || from) + 1 || this.length);
	this.length = from < 0 ? this.length + from : from;
	return this.push.apply(this, rest);
};
///
