
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
// +'<img src=images/star.png/><span>'+ 'I am attending this event.'+ '</span>'+
        var main_info ='<h1 class=eventName>' + evt.name + '</h1>';
        main_info += '<p>' + evt.description + '</p>';
        main_info += '<p> Date: ' + convertDate(evt.startDate) + '</p>';
            // main_info += '<button class="eventsButton">View Event Details</button>';

        var secondary_info = '<h1 class="">' + evt.templateInfo.title + '</h1>';
            secondary_info += '<p class="">' + evt.description + '</p>';
            secondary_info += '<p class="" >Date: ' + convertDate(evt.createdDate) + '</p>';
            secondary_info += '<p class=""> Can I invite others to this event? ' + evt.guestsCanInviteOthers + '</p>';

            $.each(evt.locations, function (i, location){

              // this makes sure that only the items appended to the site have values
              // and currently isn't working 
              if (location.city !== ""){
                main_info += '<p class=inline>'+ location.city +'</p>';
              }


              if (location.state !== '' ){
                main_info += '<p>State: ' + location.state + '</p>'
              }
            

              if (location.tags.specialGuest !== "" ){
                main_info += '<p>Special Guest: ' + location.tags.specialGuest + '</p>'; 
                // console.log(location.tags.specialGuest)
              }
                         
              if ( location.tags.host !== ""){
                main_info += '<p>Host: ' + location.tags.host + '</p>';
              };
              if (location.tags.cohost!== '' ){
                main_info += '<p>Co-Host: ' + location.tags.cohost + '</p>';
              }







              //Secondary Info to be sorted based off value.

              if (location.contactGivenName !== '' ){
                secondary_info += '<p>Contact Name: ' + location.contactGivenName  + location.contactFamilyName + '</p>';
              };

              if (location.contactGivenName !== '' ){
                secondary_info += '<p>Address: ' + location.address1 +  location.address2 + location.postalCode +'</p>';
              };

              if ( location.contactPhone !== '' ){
                secondary_info += '<p>Contact by phone: ' + location.contactPhone + '</p>';
              };

              if ( location.contactEmail !== '' ){
                secondary_info += '<p>Contact by email: ' + location.contactEmail + '</p>';
              };

              if ( location.tiers[i].description !== '0' || location.tiers[i].description !== '' || location.tiers[i].description  !== 'undefined' || location.tiers[i].description  !== null ){
                secondary_info += '<p>Location: ' + location.tiers[i].description + '</p>';
              };   

              if ( location.tiers[i].price !== 'nan' ){
                secondary_info += '<p>Price: $' + location.tiers[i].price+ '</p>';
              };

              if ( location.tiers[i].raiser === false  ){
                secondary_info += '<p>Is this a fundraiser?  No </p>';
              } else{
                secondary_info += '<p>Is this a fundraiser?  Yes </p>';
              }

              if ( location.numberSpacesRemaining  !== null ){
                secondary_info += '<p>Open spaces remaining for this event: ' + location.numberSpacesRemaining + '</p>';
              };


              // Break up start date
              if (location.tiers[i].startDate  !== null || location.tiers[i].endDate !== null){
                  secondary_info += '<p>Shifts: ' +' Start shift: '+ location.tiers[i].startDate+ " End shift: "+ location.tiers[i].endDate  +'</b>' + '</p>';
              };


            });

        
        $("div.content").append("<div class=event><div class=main_info>"+ main_info 
            +'<button class=eventsButton>'+'View Event Details'+'</button>'
            +"<div class=secondary_info>"+ secondary_info +"<input class=attending type=checkbox>"
            +"I am attending this event."+"</>"+"</div></div></div>");

      });

      $(".eventsButton").on("click",function(){
        $(this).next('div').slideToggle("slow");


        if ($.trim($(this).text()) === 'View Event Details') {
            $(this).next('div').show();
            $(this).text('Show Fewer Details');

        } else {

            $(this).text('View Event Details');
            $(this).next('div').hide();        
        }
        
      }); 
          // Attending Event

          $("input[type=checkbox]").each(function () {
              $(this).change(updateCount);

            });

            updateCount();

            function updateCount () {
              var count = $("input[type=checkbox]:checked").size();  

              $("#count").text(count);
              $("#status").show();
            }

            // this is my solution for showing at the top level on the events details
            $('input.attending').change(function(){
              // I want to replace the console log with appending a gold star to the event title.
                var starImage = "<img class=starImage src=../images/star.png>"
                var star= $(this).parents('.main_info').prepend(starImage);
                var noStar= "no star";
                var toStarOrNotToStar = this.checked ? star : noStar;


            });

    }
});