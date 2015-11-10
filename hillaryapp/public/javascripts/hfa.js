$(document).ready(function(){

// var hilEvents=["events"]
// 	$.ajax({
// 	  dataType: "json",
// 	  url: "https://s3.amazonaws.com/interview-api-samples/events-results.json",
// 	  data: hilEvents,
// 	  success: success
// 	});

	$.ajax(
	{
	    url: 'https://s3.amazonaws.com/interview-api-samples/events-results.json',
	    cache: false,
	    dataType: 'json',
	    type: 'GET',
	    data: ({ 'events' : [] }),
	    success: hillEvents,
	    error: function(e, xhr)
	    {
	        console.log(e);
	    }

	});

	function hillEvents(data)
		{
		    $('#hillEvents').html(data.Date);
		    console.log(data);
		}

	// $(".eventsButton").on("click",function(){
	// 	console.log("success!")
	// })






}
);


