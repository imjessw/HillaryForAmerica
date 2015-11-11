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
            content = '<p>' + evt.createdDate + '</p>';

            $(content).appendTo(".upcomingEvents");
          });
        
	}



}
);
