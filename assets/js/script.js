$(function () {
  // listener for click events on the save button
  $(document).on("click", ".saveBtn", function() {
    // save the hour from the div id and the description
    let parentId = $(this).closest("div").prop("id");
    // get the hour - second element in id name
    let hour = parentId.split('-')[1];
    // get the description value from the textarea
    let description = $("#" + parentId + ">.description").val();
    
    //save the event
    saveEvent(hour, description);
  });

  // applies the past, present, or future class to each time block
  // by comparing the id to the current hour.
  let currentHour = dayjs().hour();
  $("#hours").children().each(function() {
    let id = $(this).prop('id');
    let idHour = id.split('-')[1];
    
    if (idHour == currentHour) $(this).addClass("present");
    else if (currentHour > idHour) $(this).addClass("past");
    else $(this).addClass("future");

  });

  // adds code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements.
  let events = getEvents();
  events.forEach((event) => {
    $("#hour-" + event.hour + ">.description").val(event.description);
  });



  // displays the current date in the header of the page.
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // getEvents function - gets events from local storage
  //       and parses json
  function getEvents() {
      return JSON.parse(localStorage.getItem("events"));
  }

  
  // adds current event to any objects already in local storage and
  // converts events objects to string and stores in Local Storage
  function saveEvent(hour,description) {
      let events = getEvents();
      let thisEvent = [{"hour": hour, "description": description}];
      if (events == null) { 
          localStorage.setItem("events", JSON.stringify(thisEvent));
      } else {
          // delete events that already have this hour
          events = events.filter(event => {
            return event.hour != hour;
          });
          let allEvents = thisEvent.concat(events);
          localStorage.setItem("events", JSON.stringify(allEvents));
      }
  }

});
