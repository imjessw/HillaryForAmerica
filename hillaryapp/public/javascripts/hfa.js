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
	    console.log(data);
	    // debugger;
	    console.log(data.events)
	    console.log("success");

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
				// var time= Date.parse(data.events.startDate)
				// console.log(time)
			
				var timeStr = "2010-01-13T18:31:16Z";
				var date = new Date(timeStr);
				var day = date.getDate();
				var year = date.getFullYear();
				var month = date.getMonth()+1;
				var dateStr = month+"/"+day+"/"+year;

				console.log(dateStr)

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

            // $('.eventsButton').on('click',function(){
            // 	console.log("bam");
            // 	$secondary_info.toggle();
            // 	if () {};
            	$(this).show()
            	// $(secondary_info).appendTo(".moreDetails")
            	// $(this).show($(".moreDetails"));

            var official = evt.official;
            console.log(official)

            // if official = true{

            // }


            });

            

          // });

        
	}
	console.log("done")



}
);
