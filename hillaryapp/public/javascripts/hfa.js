$(document).ready(function(){

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


	    $.each(data.events, function(i, evt){
	    	var main_info = '<h1 class="mainInfo">' + evt.templateInfo.title + '</h1>'
	    	main_info += '<p class="mainInfo">' + evt.description + '</p>';
            main_info += '<p class="mainInfo">' + evt.createdDate + '</p>';


            var secondary_info = '<h1 class="">' + 'hello'+ '</h1>'
            secondary_info += '<p class="hide">' + evt.description + '</p>';
            secondary_info += '<p class="hide">' + evt.createdDate + '</p>';

            main_info += '<button class="eventsButton">View Event Details</button>';
            $(main_info).appendTo(".upcomingEvents");

            $('.eventsButton').on('click',function(){
            	console.log("bam")
            	$(secondary_info).appendTo(".moreDetails")
            	// $(this).show($(".moreDetails"));


            });

            

          });

        
	}



}
);
