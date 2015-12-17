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



			// var city= evt.locations[1].city;

			// console.log(evt.locations[i].city);

			// console.log(evt.locations[i]['city']);




			evt.locations.forEach(function(locations, i, array) {
				var city= evt.locations[i].city;
				var state= evt.locations[i].state;
				var timeZone= evt.locations[i].timezone;
				var contactPhone= evt.locations[i].contactPhone;
				var contactEmail= evt.locations[i].contactEmail;
				var contactName= evt.locations[i].contactName;
				var address1= evt.locations[i].address1;
				var address2= evt.locations[i].address2;
				var postalCode= evt.locations[i].postalCode;

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


				console.log(tierQuantity);


				// If any value is equal to null, '', undefined or 
				//nan do not show the append the class hide;
				


				
			    
			});




			// Adding content to the page

	    	var main_info = '<h1 class="mainInfo">' + evt.name + '</h1>'
	    	main_info += '<p class="mainInfo">' +  evt.templateInfo.title + '</p>';
	    	main_info += '<p class="mainInfo">' + evt.description + '</p>';
	    	// main_info += '<p class="mainInfo">' + evt.locations.city + ','+ evt.locations.state'</p>';
      //       main_info += '<p class="mainInfo"> Date: ' + dateString + " "+ timeOfEvent+ '</p>';



            main_info += '<button class="eventsButton">View Event Details</button>';


            main_info += '<h1 class="secondary_info">' + 'hello'+ '</h1>';
            main_info += '<p class="secondary_info">' + evt.description + '</p>';
            main_info += '<p class="secondary_info">' + evt.createdDate + '</p>';
            main_info += '<p class="secondary_info">' + evt.createdDate + '</p>';
            main_info += '<p class="secondary_info">' + evt.guestsCanInviteOthers + '</p>';




            
            $(main_info).appendTo(".upcomingEvents");
            
            // $('.eventsButton').on('click', function(){
            // 	this.('.secondary_info').show();

            // });

            

            // var official = evt.official;
            // console.log(official)


            // Make attending state persist
   //          var createCookie = function(name, value, days) {
			//     var expires;
			//     if (days) {
			//         var date = new Date();
			//         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			//         expires = "; expires=" + date.toGMTString();
			//     }
			//     else {
			//         expires = "";
			//     }
			//     document.cookie = name + "=" + value + expires + "; path=/";
			// }

			// function getCookie(c_name) {
			//     if (document.cookie.length > 0) {
			//         c_start = document.cookie.indexOf(c_name + "=");
			//         if (c_start != -1) {
			//             c_start = c_start + c_name.length + 1;
			//             c_end = document.cookie.indexOf(";", c_start);
			//             if (c_end == -1) {
			//                 c_end = document.cookie.length;
			//             }
			//             return unescape(document.cookie.substring(c_start, c_end));
			//         }
			//     }
			//     return "";
			// }



            });

            



        
	}
	console.log("done")



}
);
