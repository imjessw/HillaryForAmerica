
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
      return 0;

    
    });
      var convertDate = function(eventStart) {
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

        return dateString + " " + timeOfEvent;
      };
 

      $.each(data.events, function(i, evt){

        var main_info ='<h1>' + evt.name + '</h1>';
        main_info += '<p>' +  evt.templateInfo.title + '</p>';
        main_info += '<p>' + evt.description + '</p>';
        main_info += '<p> Date: ' + convertDate(evt.startDate) + '</p>';
            // main_info += '<button class="eventsButton">View Event Details</button>';

        var secondary_info = '<h1 class="">' + 'hello'+ '</h1>';
            secondary_info += '<p class="">' + evt.description + '</p>';
            secondary_info += '<p class="">' + convertDate(evt.createdDate) + '</p>';
            secondary_info += '<p class="">' + evt.createdDate + '</p>';
            secondary_info += '<p class="">' + evt.guestsCanInviteOthers + '</p>';

            $.each(evt.locations, function (i, location){
              // change vals
              main_info += '<p>State: '+ location.city +' , '+ location.state +'</p>';
              main_info += '<p>ahah: ' + location.contactPhone + '</p>';
              main_info += '<p>Tcsa: ' + location.contactEmail + '</p>';
              main_info += '<p>Timezone: ' + location.contactFamilyName + '</p>';
              main_info += '<p>Timezone: ' + location.contactGivenName + '</p>';
              main_info += '<p>Timezone: ' + location.hostGivenName + '</p>';
              main_info += '<p>Timezone: ' + location.tags.host + '</p>';
              main_info += '<p>Timezone: ' + location.tags.specialGuest + '</p>';
              main_info += '<p>Timezone: ' + location.tags.cohost + '</p>';





              //cahneg vals
              secondary_info += '<p>fsadfsafas: ' +'<b>'+ location.shifts[i].title +'</b>' + '</p>';
              secondary_info += '<p>Location: ' + location.address1 +  location.address2 + location.postalCode +'</p>';
              secondary_info += '<p>Location: ' + location.tiers[i].description + '</p>';
              secondary_info += '<p>Location: ' + location.tiers[i].price+ '</p>';
              secondary_info += '<p>Location: ' + location.tiers[i].raiser+ '</p>';
              secondary_info += '<p>Location: ' + location.numberSpacesRemaining+ '</p>';
              secondary_info += '<p>fsadfsafas: ' +'Start shift'+ location.tiers[i].startDate+ " - End shift" +  +'</b>' + '</p>';


            });

        
        $("div.content").append("<div class=event><div class=main_info>"+ main_info 
            +'<button class=eventsButton>'+'View Event Details'+'</button>'
            +"<div class=secondary_info>"+ secondary_info +"<input class=attending type=checkbox>"
            +"I will attend this event"+"</>"+"</div></div></div>");

        });
      $(".eventsButton").on("click",function(){
        // $(this).next('div').slideToggle("slow");


        if ($.trim($(this).text()) === 'View Event Details') {
            $(this).next('div').show();
            $(this).text('Show Fewer Details');

        } else {

            $(this).text('View Event Details');
            $(this).next('div').hide();        
        }
        console.log("clicked")
        
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


            $('.checkbox').change(function(){
                var star="goldstar";
                var noStar= "no star";
                var toStarOrNotToStar = this.checked ? star : noStar;
              
              
                console.log(toStarOrNotToStar);
            });

    }
});