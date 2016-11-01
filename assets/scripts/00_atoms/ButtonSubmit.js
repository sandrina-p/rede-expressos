var ButtonSubmit = function() {
    var self = this,
        errorClass = 'js-errorMandatory',
        successClass = 'js-errorMandatory'; //TODO a different class maybe...

    this.btnSubmitLoading = function($btn, cleanError, classToRemove) {
        var $xthis = $btn;
        if (cleanError) { //if is a btnSubmit with possible message errors.
            $xthis.prev().slideUp().remove();
        }

        $xthis.attr('disabled', 'disabled');
        if (classToRemove == null) { // if doesn't have .fa, add it.
            $xthis.append('<i class="fa fa-spinner fa-spin"></i>');
        } else {
            $xthis.find('.fa').removeClass(classToRemove).addClass('fa-spinner fa-spin');
        }
    }

    this.btnSubmitComplete = function($btn, classToAdd) {
        var $xthis = $btn;

        $xthis.removeAttr('disabled');
        $xthis.focusout();
        if (classToAdd == null) { // if btn doesn't have .fa at all
            $xthis.find('.fa').remove();
        } else {
            $xthis.find('.fa').removeClass('fa-spinner fa-spin').addClass(classToAdd);
        }
    }

    this.btnFeedback = function($btn, $msg) {
        $dataMsg = $btn.data($msg);
        $btn.parent().prepend('<p class="'+errorClass+'">'+$dataMsg+'</p>');
        $('.'+errorClass).hide().slideDown();
        self.btnSubmitComplete($btn, null);
    }
}
