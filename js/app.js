Handlebars.registerHelper('uc', function (str) {
        return encodeURIComponent(str);
});



var paragraphForm = document.getElementById('paragraph-form');
var tweetsContainer = document.getElementById('tweets-container');
var backButton = document.getElementById('back-button');
var maxChars = 133;
var tcoChars = 23; 




paragraphForm.addEventListener('submit', function(e) {
    tweetsContainer.innerHTML = '';
	e.preventDefault();
	var text = paragraphForm.elements['text'].value;
	text = text.trim();
	if(text !== "") {
        var sentences = makeSentences(text,maxChars);
        var source = document.getElementById('tweets-container-template').innerHTML;
        var template = Handlebars.compile(source);
        var html = template({sentences: sentences});
        document.getElementById('tweets-container').innerHTML = html;
        paragraphForm.classList.add('hide');
        tweetsContainer.classList.remove('hide');
        document.getElementById('back-button').addEventListener('click' , function(e) {
            tweetsContainer.classList.add('hide');
            tweetsContainer.innerHTML = '';
            paragraphForm.classList.remove('hide');
        });
        var tweetButtons = document.querySelectorAll('.tweet-button');
        Array.prototype.forEach.call(tweetButtons, function(el,i) {
            el.addEventListener('click', function(e) {
                e.preventDefault();
                window.open(el.getAttribute('href'),'','width=400,height=300,personalbar=0,toolbar=0,scrollbars=1,resizable=1'); 

            }, false);
        });
	}	else {
	}
});



function makeSentence(words, ml) {
	var sentence = "";
	var tempSentence = sentence + words[0] + " ";
	while(fitsInTweet(sentence, words[0], ml)&&(words.length !== 0)) {
		sentence = sentence + words[0] + " ";
		words = words.slice(1);
	}
	sentence = sentence.trim(); 
	return{
		sentence:sentence,
		words:words
	};
}



function makeSentences(text,ml) {
	text = text.replace(/\s/g, " ");
	var words = text.split(" ");
	var sentences = [];
	while(words.length)
	{
		result = makeSentence(words,ml);
		sentences.push(result.sentence);
		words = result.words;
	}
    sentences.forEach(function(sentence, index, sentences) {
        sentences[index] += '(' + (index + 1) + '/' + sentences.length + ')'; 
    });
    return sentences;
}


function isURL(str) {

    var httpRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    var normalRegex = /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
    return (str !== undefined) && (str.match(httpRegex) || str.match(normalRegex) ) ? true : false; 
}


function fitsInTweet(sentence, word, ml) {
    return isURL(word) ? (sentence.length + tcoChars) <= ml : (sentence + word).length <= ml;
}
