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

								

	    $.each(data.events, function(i, evt){
	    
	    	// converting date and time.

	    	var eventStart= evt.startDate;
	    	var myDate = new Date(eventStart);
			
	    	// changing myDate to a date string
			var dateString = 
			  myDate.getUTCMonth() +"/"+
			  ("0" + (myDate.getUTCDate()+1)).slice(-2) +"/"+
			  ("0" + myDate.getUTCFullYear()).slice(-2);


			// Converting time from military to standaerd and checking if it is am/pm
			var hours = myDate.getUTCHours();
			var minutes =myDate.getUTCMinutes();

			var timeOfEvent = "" + ((hours >12) ? hours - 12 : hours);
				timeOfEvent += (minutes < 10) ? ":0" + minutes : ":" + minutes;
				timeOfEvent += (hours >= 12) ? " P.M." : " A.M.";



		//getting all nested records
		

    		evt.locations.forEach(function(locations, i, array) {

				//location data
				var city= evt.locations[i].city;
				var state= evt.locations[i].state;
				var timeZone= evt.locations[i].timezone;
				var contactPhone= evt.locations[i].contactPhone;
				var contactEmail= evt.locations[i].contactEmail;
				var contactName= evt.locations[i].contactName;
				var address1= evt.locations[i].address1;
				var address2= evt.locations[i].address2;
				var postalCode= evt.locations[i].postalCode;

				//hosts
				var host= evt.locations[i].tags.host;
				var specialGuest=evt.locations[i].tags.specialGuest;
				var cohost=evt.locations[i].tags.cohost;


				//tiers
				var tierTitle= evt.locations[i].tiers[i].title;
				var tierDecription= evt.locations[i].tiers[i].decription;
				var tierPrice=evt.locations[i].tiers[i].price;
				var tierRaiser=evt.locations[i].tiers[i].raiser;
				var tierMax=evt.locations[i].tiers[i].maxNum;
				var tierQuantity=evt.locations[i].tiers[i].quantity;

				var shiftStart= evt.locations[i].shifts[i].startDate;
				var shiftEnd= evt.locations[i].shifts[i].endDate;

				//Creating variables for schema found within locations

				console.log(evt.locations[i].city)

				//if equal to null/nan/undefined/""

			    
			});


	    	var main_info ='<h1>' + evt.name + '</h1>';
	    	main_info += '<p>' +  evt.templateInfo.title + '</p>';
	    	main_info += '<p>' + evt.description + '</p>';
	    	main_info += '<p> Date: ' + dateString + " "+ timeOfEvent+ '</p>';
            main_info += '<button class="eventsButton">View Event Details</button>';


	    	// only counts first record
	    	// main_info += '<p class="mainInfo">' + evt.locations[i].city + ','+ evt.locations[i].state +'</p>';
            
            

            var secondary_info = '<h1 class="">' + 'hello'+ '</h1>';
            secondary_info += '<p class="">' + evt.description + '</p>';
            secondary_info += '<p class="">' + evt.createdDate + '</p>';
            secondary_info += '<p class="">' + evt.createdDate + '</p>';
            secondary_info += '<p class="">' + evt.guestsCanInviteOthers + '</p>';

            // secondary_info += '<input type="checkbox" name="vehicle" value="Car">'


	    	$(".eventsButton").click(function(){

	    		if ($.trim($(this).text()) === 'View Event Details') {
	    			$(this).next('div').show();
				    $(this).text('Show Fewer Details');
				} else {
				    $(this).text('View Event Details');
				    $(this).next('div').hide();        
				}
            	
            })   



            
	    	// Attending Event

			$("input[type=checkbox]").each(function () {
			    $(this).change(updateCount);

			  });

			  updateCount();

			  function updateCount () {
			    var count = $("input[type=checkbox]:checked").size();
			    

			    $("#count").text(count);
			    $("#status").show();
			  };






	    	// $.each(evt, function (index, record) {


	    		$("div.content").append("<div class=event><div class=main_info>"+ main_info 
	    			+"<div class=secondary_info>"+ secondary_info +"<input class=attending type=checkbox>"
	    			+"I will attend this event"+"</>"+"</div></div></div>");

	    	// })












				// $("div.content").append("<div class=event><div class=main_info><div class=secondary_info></div></div></div>");
			


       	});
        
	}

	console.log("done")

});
