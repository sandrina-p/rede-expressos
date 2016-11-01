// @koala-prepend "../../plugins/jquery/jquery-2.1.4.min.js";
// @koala-prepend "../../plugins/modernizr/modernizr-flexbox.js";
// @koala-prepend "../../plugins/jquery/jquery-pickmeup/js/jquery.pickmeup.js";
// @koala-prepend "../../plugins/jquery/autoComplete/jquery.auto-complete.js";

// @koala-prepend "../00_atoms/todayDate.js";

// @koala-prepend "../00_atoms/arrayEstacoes.js";

// @koala-prepend "../00_atoms/InputValidation.js";
// @koala-prepend "../00_atoms/ButtonSubmit.js";

// @koala-prepend "../00_atoms/modals.js";
// @koala-prepend "../00_atoms/navbars.js";

var formFancy = {};
var btnFancy = {};

$(document).ready(function(){

    // set value on form#buyTicket input#TicketGo;
    // NOTE: this needs to be called before InputValidation to work correctly
    $('#ticketGo').val(today);

    formFancy = new InputValidation(); //this is on InputValidation.js
    btnFancy = new ButtonSubmit(); //this is on ButtonSubmit.js

});


// @koala-append "../03_pages/homepage.js";
