/*
example to trigger a modal (data-modal-open):
<button type="button" name="button" data-modal-open="task-details"> open modal</button>

and to close it (it has to be inside the modal):
<button type="button" data-close="modal" >close modal</button>

the modal itself has the ID id="modal-'MyModal'"

*/


function openModal(nameModal) {
    var $modalBg = $('<div class="Modal-bg" data-close="modal"></div>');
    var $body = $('body');

    $('#Modal-'+nameModal).addClass('js-isModalVisible'); //show task
    $body.addClass('js-isNoScroll');
    $body.append($modalBg);
}

function closeModal() {
    $('.Modal-bg').remove();
    $('.js-isModalVisible').removeClass('js-isModalVisible');
    $('body').removeClass('js-isNoScroll');
}


$('body').on('click', '[data-modal-open]', function(e) {
    e.preventDefault();
    openModal($(this).data('modal-open'));
});

$('body').on('click', '[data-close=modal]', function() {
    closeModal();
});
