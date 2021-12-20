// fade

jQuery(function($) {
  $("body").css("display", "none");
  $("body").fadeIn(2000);
  $("div.transition").click(function(event){
  event.preventDefault();
  linkLocation = this.href;
  $("body").fadeOut(2000, redirectPage);
  });
  function redirectPage() {
  window.location = linkLocation;
  }
  });