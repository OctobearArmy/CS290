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
$(document).ready(function() {
  $('.button').click(function() {
    const button = $(this).text();
    $.ajax({ //it is sooooo much easier to use jQery for this. I wish I had tried this sooner
      type: 'POST',
      url: '/flashcard',
      data: JSON.stringify({ button }),
      contentType: 'application/json',
      success: function(response) {
        $('#definition').text(response.definition);
      },
      error: function() {
        $('#definition').text('Definition not found');
      }
    });
  });
});