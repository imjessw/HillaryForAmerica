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
	    	content = '<h1 class="mainInfo">' + evt.templateInfo.title + '</h1>'
	    	content += '<p class="mainInfo">' + evt.description + '</p>';
            content += '<p class="mainInfo">' + evt.createdDate + '</p>';
            content += '<button class="eventsButton">View Event Details</button>';
            $(content).appendTo(".upcomingEvents");

            $('.eventsButton').on('click',function(){
            	console.log("bam")
            	$(".moreDetails").show();
            });
            // content = '<h1>' + evt.templateInfo.title + '</h1>'

            // $(content).appendTo(".moreDetails");
            

          });
	    // $("button").on("click", function(){
	    // 	console.log("happy")
	    // })
        
	}



}
);
