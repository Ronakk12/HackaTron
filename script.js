

$('.card-header').on('click', function()
 {
 
  $(this).toggleClass('closed');
  $(this).toggleClass('opened');
});

$(document).ready(function() {
  $("#toggle").click(function() {
    var elem = $("#toggle").text();
    if (elem == "Read More") {
      //Stuff to do when btn is in the read more state
      $("#toggle").text("Read Less");
      $("#hello").slideDown();
      $("#hellonext").slideDown();
    } else {
      //Stuff to do when btn is in the read less state
      $("#toggle").text("Read More");
      $("#hello").slideUp();
      $("#hellonext").slideUp();
    }
  });
});

$('#toggle').on('click', function() {
  $('#clp4').toggleClass('d-none d-md-block')
});

$('#toggle').on('click', function() {
  $('#clp5').toggleClass('d-none d-md-block')
});

$('#toggle').on('click', function() {
  $('#clp6').toggleClass('d-none d-md-block')
});