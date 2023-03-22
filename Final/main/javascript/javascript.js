const accordianItems = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const accordianToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < accordianItems.length; i++) {
    accordianItems[i].setAttribute('aria-expanded', 'false');
  }
  
  if (accordianToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

accordianItems.forEach(item => item.addEventListener('click', toggleAccordion));

var coll = document.getElementsByClassName("collapsible");
let icon = document.querySelectorAll(".icon")
// console.log("icon:", icon)
    var i;
    
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      // icon.toggle("active")
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
  });
}
//------------------------------------------------------------------------------------------

function getConfirmation() {
  var retVal = confirm("Do you want to leave the page?");
  if( retVal == true ) {
    window.location.replace("quiz.html")
    return true;
  } else {
    alert("Cancel was pressed");
    return false;
  }
}
//------------------------------------------------------------------------------------------

$(document).ready(function() {
  $.getJSON('/termsDefs', function(data) {
    var container = $('<div>').addClass('flashcard-div');
    $('.flash-container').append(container);
    for (var i = 0; i < data.length; i++) {
      var term = data[i].term;
      var def = data[i].definition;
      var termDiv = $('<div>').addClass('term').text(term);
      var defDiv = $('<div>').addClass('definition').text(def);
      var termDefDiv = $('<div>').addClass('term-definition-pair').append(termDiv).append(defDiv);
      container.append(termDefDiv);
      termDefDiv.click(function() {
        var clickedTermDiv = $(this).find('.term');
        var clickedDefinitionDiv = $(this).find('.definition');
        if (clickedTermDiv.is(':visible')) {
          clickedTermDiv.hide();
          clickedDefinitionDiv.show();
          $(this).addClass('flipped');
        } else {
          clickedTermDiv.show();
          clickedDefinitionDiv.hide();
          $(this).removeClass('flipped');
        }
      });
    }
  });
});

