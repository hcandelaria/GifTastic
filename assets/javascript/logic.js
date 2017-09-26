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
    		btn.addClass("btn btn-secondary");
    		$("#topics").append(btn);
    	}
    }
    //Add a new topic to the topics array
    function newTopic(){
		//Prevent page from refreshing
		event.preventDefault();
    	//Get the new topic
    	var newTopic = $("#addTopic").val().trim();

    	if(checkArray(newTopic)){
    		$("#addTopic").val("");
    		return;
    	} 
    	//Add the new topic to the topics array
    	topics.push(newTopic);
    	//Empty the addTopic form
    	$("#addTopic").html("");
    	//Clear the add topic field
    	$("#addTopic").val("");
    	//Display all btn
    	displayBtn();
    }
    //Gets responses from giphy
    function getResponse(animal){
    	const api_key = "kkfTt0CzVtWada08UC5GuZgp9h2Wa8Ay";
		var queryURL = "http://api.giphy.com/v1/gifs/search?q="+ animal +
						"&api_key="+ api_key +"&limit=10";

		$.ajax({
	        url: queryURL,
	        method: "GET"
	    }).done(function(response) {
	    	gifResponse = response;
	    	displayGIF();
	    });
    }
    //Check if the new topic is in the array
    function checkArray(x){
    	if(x === ""){
    		alert("Enter a valid value!");
    		return true;
    	}
    	for(var i = 0; i < topics.length;i++){
    		if(x === topics[i]){
	    		alert("This animal is already in the zoo!");
    			return true;
    		}
    	}
    	return false;
    }
    //
	function displayGIF(){
		$("#gifDiv").html("");
        console.log(gifResponse);
		for (var i = 0; i < gifResponse.data.length; i++) {
			//Create a img tag
			var imgDiv = $("<img>");
            //Create a label tag
            var labelDiv = $("<label>");
			//Add an attribute = still
			imgDiv.attr("status","still");
            //Add an id 
            imgDiv.attr("id",i);
			//Add the src of the img
			imgDiv.attr("src",gifResponse.data[i].images.fixed_width_still.url);
			//Add a class to the img
			imgDiv.addClass("gifSettings card-img-top");

            labelDiv.html("<b>Rating: </b>" + gifResponse.data[i].rating);

            labelDiv.addClass("text-center");
			//Append the img to the label
            labelDiv.append(imgDiv);
            //Append the label to the div
			$("#gifDiv").append(labelDiv);
		}
	}
	function updateStatus(x){
        i = x.attr("id");
        console.log(x);
        console.log(gifResponse);
        if(x.attr("status") === "still"){
            x.attr("src", gifResponse.data[i].images.fixed_width.url);
            x.attr("status", "animated");
        }else{
            x.attr("src", gifResponse.data[i].images.fixed_width_still.url);
            x.attr("status", "still");
        }
	}
	displayBtn(); 
	$(document).on("click","#addBtn", newTopic);
	$(document).on("click","img", function(){
		updateStatus ($(this));
	}); 
	$(document).on("click",".btn-secondary", function(){
        $("#speciesTittle").html("");
        $("#speciesTittle").html($(this).text());
		getResponse($(this).html());
	});
});