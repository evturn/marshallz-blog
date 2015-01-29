businessAbstracts = [];
var businessRequest = function() {
	businessSection = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/business/1.json?api-key=' + process.env.NYT_KEY;
	request(businessSection, function(err, response, body) {
		if(!err && response.statusCode === 200) {
			var responseObject = (JSON.parse(body));
			var articleArr     = responseObject.results;
			articleArr.forEach(function(article) {
				businessAbstracts.push(article.abstract);
			});
		pickBusiness();
		} else {
			throw err;
		};
});
};

foodAbstracts = [];
var foodRequest = function() {
	foodSection = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/food/1.json?api-key=' + process.env.NYT_KEY;
	request(foodSection, function(err, response, body) {
		if(!err && response.statusCode === 200) {
			var responseObject = (JSON.parse(body));
			var articleArr     = responseObject.results;
			articleArr.forEach(function(article) {
				foodAbstracts.push(article.abstract);
			});
		pickFood();
		} else {
			throw err;
		};
	});
};

healthAbstracts = [];
var healthRequest = function() {
	healthSection = 'http://api.nytimes.com/svc/mostpopular/v2/mostviewed/health/1.json?api-key=' + process.env.NYT_KEY;
	request(healthSection, function(err, response, body) {
		if(!err && response.statusCode === 200) {
			var responseObject = (JSON.parse(body));
			var articleArr     = responseObject.results;
			articleArr.forEach(function(article) {
				healthAbstracts.push(article.abstract);
			});
		pickHealth();
		} else {
			throw err;
		};
	});
}

var entryContent = function() {
	newEntry = sentenceArr.join(' ');
	console.log(newEntry);
	//Value of body for new entry
};

sentenceArr = [];
var concatenateAbstracts = function() {
	category1 = articleAbstracts[0];
	category2 = articleAbstracts[1];
	category3 = articleAbstracts[2];
	sentence1 = category1[0]
	sentenceArr.push(sentence1)
	sentence2 = category2[0]
	sentenceArr.push(sentence2)
	sentence3 = category3[0]
	sentenceArr.push(sentence3)
	entryContent();
};

articleAbstracts = [];
var pickBusiness = function(){
	threeBusiness = businessAbstracts.slice(1, 4);
	articleAbstracts.push(threeBusiness);
	foodRequest();
};
var pickFood = function(){
	threeFood = foodAbstracts.slice(1, 4);
	articleAbstracts.push(threeFood);
	healthRequest();
};
var pickHealth = function(){
	threeHealth = healthAbstracts.slice(1, 4);
	articleAbstracts.push(threeHealth);
	concatenateAbstracts();
};

//GET request to NYT
businessRequest();