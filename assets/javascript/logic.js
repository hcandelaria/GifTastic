$(document).ready(function(){

	//Global var
	var topics = ["lion","tiger","elephant","giraffe","gorilla",
				  "hyena","panda","bear","hippopotamus","penguin"];
    var gifResponse;
    //Display all topic buttons
    function displayBtn(){
    	//Empty topics div
    	$("#topics").html("");
    	//Add each topic to the topics div
    	for(var i = 0; i < topics.length; i++){
    		var btn = $("<button>");
    		btn.text(topics[i]);
    		btn.addClass("topicBtn");
    		$("#topics").append(btn);
    	}
    }
    //Add a new topic to the topics array
    function newTopic(){
    	//Get the new topic
    	var newTopic = $("#addTopic").val().trim();
    	//Add the new topic to the topics array
    	topics.push(newTopic);
    	//Empty the addTopic form
    	$("#addTopic").html("");
    	//Display all btn
    	displayBtn();
    }
    //Gets responses from giphy
    function getResponse(i){
    	const api_key = "kkfTt0CzVtWada08UC5GuZgp9h2Wa8Ay";
    	var animal = topics[i]
		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ animal +
						"&api_key="+ api_key +"&limit=10";

		$.ajax({
	        url: queryURL,
	        method: "GET"
	    }).done(function(response) {
	    	gifResponse = response;
	    	console.log(gifResponse);
	    });
    }
    //
	function displayGIF(){
		for (var i = 0; i < gifResponse.data.length; i++) {
			//Create a img tag
			var imgDiv = $("<img>");
			//Add an attribute = still
			imgDiv.attr("status","still");
			//Add the src of the img
			imgDiv.attr("src",gifResponse.data[i].images.fixed_width_still);
			//Add a class to the img
			imgDiv.addClass("gifSettings");
			//Append the img to the div
			$("#gifDiv").append(imgDiv);
		}
	}
	function updateStatus(x){
	}

    $(document).on(".topicBtn","click", displayGIF);
    $(document).on("#addBtn","click", newTopic);
    $(document).on(".gifSettings","click", updateStatus(this));
});