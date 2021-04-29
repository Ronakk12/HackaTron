document.addEventListener('DOMContentLoaded', () => {

    // Set the date we're counting down to
var countDownDate = new Date("Mar 24, 2020 16:00:00").getTime();
    var now = new Date().getTime();
  var distance = countDownDate - now;

    // Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
      
  // Output the result in an element with id="demo"
  var twoDaysFromNow = distance ;

}, 1000);
    
    var twoDaysFromNow = distance ;

    // Unix timestamp (in seconds) to count down to
//var twoDaysFromNow = (new Date().getTime() / 1000) + (86400 * 2) + 1;
//console.log(twoDaysFromNow);
    
  // Set up FlipDown
  var flipdown = new FlipDown(twoDaysFromNow)

    // Start the countdown
    .start()

    // Do something when the countdown ends
    .ifEnded(() => {
      console.log('The countdown has ended!');
    });

  // Toggle theme
  var interval = setInterval(() => {
    let body = document.body;
    body.classList.toggle('light-theme');
    body.querySelector('#flipdown').classList.toggle('flipdown__theme-dark');
    body.querySelector('#flipdown').classList.toggle('flipdown__theme-light');
  }, 5000);

});
