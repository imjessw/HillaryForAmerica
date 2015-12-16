$(document).ready(function(){
// Getting all the data from AWS link
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
	    // console.log(data);
	    // debugger;
	    // console.log(data.events)
	    // console.log("success");
	    // console.log(data.events.startDate);


// Sorting events based off dates

	    	var events= data.events;

				events.sort(function(a, b) {
					// if A is bigger
				  if (a.startDate > b.startDate) {
				  	  return 1;
				  }
				  // if B is bigger
				  if (a.startDate < b.startDate) {
				  	return -1;
				  }
				  // if neither of those is true, they must be the same
				  return 0
			
			}); 

			

			$.each(data.events, function(i,startEvent){
				console.log(startEvent.startDate);
			});



								

	    $.each(data.events, function(i, evt){


	    	var main_info = '<h1 class="mainInfo">' + evt.templateInfo.title + '</h1>'
	    	main_info += '<p class="mainInfo">' + evt.description + '</p>';
            main_info += '<p class="mainInfo"> Date: ' + evt.startDate+ '</p>';


            var secondary_info = '<h1 class="">' + 'hello'+ '</h1>'
            secondary_info += '<p class="hide">' + evt.description + '</p>';
            secondary_info += '<p class="hide">' + evt.createdDate + '</p>';

            main_info += '<button class="eventsButton">View Event Details</button>';
            $(main_info).appendTo(".upcomingEvents");
            $(secondary_info).appendTo(".upcomingEvents");

            

            var official = evt.official;
            console.log(official)



            });

            



        
	}
	console.log("done")



}
);
