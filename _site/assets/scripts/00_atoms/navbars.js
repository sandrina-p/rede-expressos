/*
example to trigger a navbar (data-navbar-open):
<button type="button" name="button" data-navbar-open="right"> open navbar</button>

and to close it:
<button type="button" data-close="navbar">close modal</button>

the nav parent has the ID id="NavBar-[MyNav]"

*/


function openNavBar(nameNavBar) {
    var $body = $('body');
    $('.NavBar-bg, .NavBar-close').remove();
    $('#NavBar-'+nameNavBar).addClass('js-isNavOpen'); //show task
    $body.addClass('js-isNoScroll');
}

function closeNavBar() {
    $('.NavBarBg').hide();
    $('.js-isNavOpen').removeClass('js-isNavOpen');
    $('body').removeClass('js-isNoScroll');
}


$('body').on('click', '[data-navbar-open]', function(e) {
    e.preventDefault();
    openNavBar($(this).data('navbar-open'));
    var $navBarClose = $('<div class="NavBar-bg" data-close="navbar"></div> <i class="NavBar-close fa fa-times" data-close="navbar"></i>');
    $(this).after($navBarClose);
});

$(document).on('click', '[data-close=navbar], .NavBar-ul', function() {
    closeNavBar();
});
