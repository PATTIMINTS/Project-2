//Set tomorrow as a variable to filter out any items where "available until" is a past date.
let tomorrow = moment(Date.now() + 1 * 24 * 3600 * 1000).format("YYYY-MM-DD");
console.log(tomorrow)
$.get("/api", function (res) {
  console.log("Data: ", res);
  var data = res.filter(obj => {
    return obj.availableUntil > tomorrow;
  })
  // For each item that our server sends us back
  for (var i = 0; i < data.length; i++) {
    // Create a parent div for the oncoming elements
    var itemSection = $("<div>");
    //Filter out claimed items from "Recently Listed" section.
    if (data[i].claimed === false) {
    // Add a class to this div: 'this'
    itemSection.addClass("this");
    // Add an id to the this to mark which this it is
    itemSection.attr("id", "item-this-" + i);
    // Append the this to the this section
    $("#item-section").append(itemSection);

    // Adds all the items to the page
    $("#item-this-" + i).append("<h2><i class='fas fa-cat'></i> " + data[i].item + "</h2>");

    //$("#item-this-" + i).append("<h3>Area: " + data[i].area + "</h3>");

    $("#item-this-" + i).append(
      "<h3>" + data[i].description + "</h3>"
    );

    // $("#item-this-" + i).append(
    // "<h4>Pickup Instructions: " + data[i].pickup + "</h4>"
    //);
    }

  }
});

//Get data for one specific season/occasion
$.get("/api", function (seasons) {
  console.log("seasons: ", seasons);
  console.log(window.location.href);
  let seasonName = window.location.href;
  seasonName = seasonName.substring(seasonName.lastIndexOf("/") + 1);
  seasonName = seasonName.split("?")[0].split("#")[0].split(".")[0];
  console.log(seasonName);

  var firstList = seasons.filter(obj => {
    return obj.routeName === seasonName;
  })
  var secondList = firstList.filter(obj => {
    return obj.claimed === false;
  })
  var result = secondList.filter(obj => {
    return obj.availableUntil > tomorrow;
  })
  //Check back later if no results; otherwise, loop through the results and display.
  if (result.length === 0) {
    $("#" + seasonName + "-items").html('Sorry, no results today. Check back later!')
  }
  else {
    for (let i = 0; i < result.length; i++) {
      // create a parent div for the oncoming elements
      var itemSection = $("<div>");
      var itemBtn = $("<button>");
      if (result[i].claimed === true || result.length < 1) {
        itemSection.addClass("this");
        itemBtn.addClass("claimBtn");
        itemSection.attr("id", "item-this-" + i);
        itemBtn.attr("id", result[i].id);
        //Display claimed items with a red, disabled button indicating they are currently claimed.
        itemBtn.text("CLAIMED");
        itemBtn.css("background", "red");
        itemBtn.attr("disabled","disabled");
        // Display filtered list of items available to claim.
        $("#" + seasonName + "-items").append(itemSection);
        $("#" + seasonName + "-items").append(itemBtn);

        $("#item-this-" + i).append("<h3><i class='fas fa-cat'></i> " + result[i].item + "</h3>");

        $("#item-this-" + i).append("<h4>Area: " + result[i].area + "</h4>");

        $("#item-this-" + i).append(
          "Description of Item: " + result[i].description + "<br>"
        );

        $("#item-this-" + i).append(
          "Pickup Instructions: " + result[i].pickup + "<br>"
        );
        $("#item-this-" + i).append(
          "Available Until: " + result[i].availableUntil
        );

      }

      else {
        itemSection.addClass("this");
        itemBtn.addClass("claimBtn");
        itemSection.attr("id", "item-this-" + i);
        itemBtn.attr("id", result[i].id);
        itemBtn.text("Claim");
        // Display filtered list
        $("#" + seasonName + "-items").append(itemSection);
        $("#" + seasonName + "-items").append(itemBtn);

        $("#item-this-" + i).append("<h3><i class='fas fa-cat'></i> " + result[i].item + "</h3>");

        $("#item-this-" + i).append("<h4>Area: " + result[i].area + "</h4>");

        $("#item-this-" + i).append(
          "Description of Item: " + result[i].description + "<br>"
        );

        $("#item-this-" + i).append(
          "Pickup Instructions: " + result[i].pickup + "<br>"
        );
        $("#item-this-" + i).append(
          "Available Until: " + result[i].availableUntil
        );

      }

    }

  }
});




