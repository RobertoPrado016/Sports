$(document).ready(function(){

 
  var status = getUrlParameter('status');

  if (status == 1){
    $.get("/admin/app/templates/no_auth.html", function(data){
        $( "#myConfirmationModal .modal-title" ).empty();
        $( "#modal-confirmation-content" ).empty();
        $( "#modal-confirmation-content" ).html(data);
        $('#myConfirmationModal').modal('show'); 
    });
  }

});
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

