var InputValidation = function() {

    var self = this,
        label = '.LabelPlaceholder',
        labelActive = 'js-LabelPlaceholder-isActive',
        labelNotValidated = '', //TODO: for now there is no class.
        inputValidatedClass = 'js-inputValidated',
        inputNoValidatedClass = 'js-inputNotValidated',
        selectIgnore = 'select:not(.js-labelIgnore)',
        verificationClass = 'fa-asterisk'; //this is what tells if the input is or not validated on submit


    this.setInputAndLabel = function($input) {
        //I wrote these var so many times that i had to create a function
        var $inputID = $input.attr('id');
        var $label = $("label[for="+$inputID+"]");
        return [$inputID, $label];
    }

    // ------ ----------------------------- ------ //
    // ------ --- validations functions --- ------ //
    // ------ ----------------------------- ------ //

    this.inputValidated = function($input) {
        var $inputID = $input.attr('id');
        var $label = $("label[for="+$inputID+"]");

        if ($input.is('select') ) {
            $input.parent().addClass(inputValidatedClass).removeClass(labelNotValidated, inputNotValidated);
        };

        $input.addClass(inputValidatedClass).removeClass(inputNoValidatedClass);
        $label.removeClass(labelNotValidated);
        $input.removeClass(verificationClass, verificationClass);
    }

    //validation has 2 lvls - keyup: when user is typing; focusout: when user finish typing;
    // the differences between lvl1 and lvl2 is:
    //lvl1 = only changes icon (verificationClass);
    //lvl2 = change input and label styling

    this.inputNotValidatedLvl1  = function($input) {
        $input.removeClass(inputValidatedClass).addClass(verificationClass);
    }

    this.inputNotValidatedLvl2  = function($input) {
        self.inputNotValidatedLvl1($input);
        var $inputID = $input.attr('id');
        var $label = $("label[for="+$inputID+"]");
        if ($input.is('select') ) {
            $input.parent().addClass(inputNoValidatedClass);
        } else {
            $input.addClass(inputNoValidatedClass);
        }
        $('label').addClass(labelNotValidated);
    }


    // ------ ------------------------------------- ------ //
    // ------ on page load to check inputs with val ------ //
    // ------ ------------------------------------- ------ //

    this.activateLabel = function($input) {
        [$inputID, $label] = self.setInputAndLabel($input);
        $label.addClass(labelActive);
        $input.removeClass(verificationClass);
    }

    $('select').each(function(){
        var $input = $(this);
        if (!$input[0].selectedIndex == 0) {
            activateLabel($input);
        }
    });

    $('input, textarea').each(function(){
        var $input = $(this);
        if($input.val().length>0) {
            self.activateLabel($input);
        }
    });


    // ------ ----------------------------- ------ //
    // ------ when interact with each input ------ //
    // ------ ----------------------------- ------ //

    //on label click, active it
    $(document).on('click', label, function() {
        $(this).addClass(labelActive);
    });

    // animate input's label on focus in
    $(document).on('focusin change', 'input, select, textarea', function() {
        [$inputID, $label] = self.setInputAndLabel($(this));
        if (!$(this).is(':radio') ) { // doesn't apply to radio buttons
            $label.addClass(labelActive);
        }
    });

    // animate input's label on focusout only if this value is empty
    $(document).on('focusout change', 'input, textarea', function(){
        if(!$(this).is(':radio') && !$(this).val().length>0) {  // doesn't apply to radio buttons or value = 0
            [$inputID, $label] = self.setInputAndLabel($(this));
            $label.removeClass(labelActive);
        }
    });

    // animate input's label on focusin only if this value is 0
    $(document).on('focusin change', selectIgnore, function(){
        [$inputID, $label] = self.setInputAndLabel($(this));
        if ($(this)[0].selectedIndex === 0) {
            $label.removeClass(labelActive);
        } else {
            $label.addClass(labelActive);
        }
    });

    //animate input's label on focusout only if this value is 0
    $(document).on('focusout change', selectIgnore, function(){
        [$inputID, $label] = self.setInputAndLabel($(this));

        if ($(this)[0].selectedIndex === 0) {
            $label.removeClass(labelActive);
        }
    });

    //when user press Enter key automatically focusout the input
    $(document).on('keypress', 'input', function(e){
        if(e.which == 13){
            $(this).blur();
        }
    });


    // ------ ----------------------------- ------ //
    // ------ ----- mandatory inputs ------ ------ //
    // ------ ----------------------------- ------ //

    var inputNotNull = '.js-mandatory-notnull';
    var inputSelect = '.js-mandatory-select';
    var inputDate = '.js-mandatory-date';
    var inputDatePartial = '.js-mandatoryPartial-date';
    var inputLength = '.js-mandatory-length';

    // validate inputNotNull
    $(document).on('keyup change', inputNotNull, function(){
        var $xthis = $(this);
        if( $(this).val().length>0 ) { //validated
            self.inputValidated($xthis);
            return true;
        } else {
            self.inputNotValidatedLvl1($xthis);
            return false;
        }
    });

    $(document).on('focusout', inputNotNull, function(){
        var $xthis = $(this);
        if( $(this).val().length>0 ) { //validated
            self.inputValidated($xthis);
            return true;
        } else {
            self.inputNotValidatedLvl2($xthis);
            return false;
        }
    });


    // validate inputSelect
    $(document).on('change', inputSelect, function(){
        var $xthis = $(this);
        if ( $(this)[0].selectedIndex === 0 ) {
            self.inputNotValidatedLvl1($xthis);
            return true;
        } else {  //validated
            self.inputValidated($xthis);
            return false;
        }
    }).trigger('change');


    $(document).on('focusout', inputSelect, function(){
        var $xthis = $(this);
        if ($xthis[0].selectedIndex === 0) { // not validated
            self.inputNotValidatedLvl1($xthis);
        } else {
            self.inputValidated($xthis);
            return false;
        }
    });


    // validate input datePartial
    $(document).on('keyup change', inputDate, function(){
        var $xthis = $(this);
        if (this.value.length === 10) {  //validated
            self.inputValidated($xthis);
            return true;
        } else {
            self.inputNotValidatedLvl1($xthis);
            return false;
        }
    });

    // validate input datePartial
    $(document).on('focusout change', inputDate, function(){
        var $xthis = $(this);
        if (this.value.length === 10) {  //validated
            self.inputValidated($xthis);
            return true;
        } else {
            self.inputNotValidatedLvl2($xthis);
            return false;
        }
    });

    // validate input datePartial
    $(document).on('focusout change', inputDatePartial, function(){
        var $xthis = $(this);
        if (this.value.length === 10 || this.value.length === 0) {  //validated
            self.inputValidated($xthis);
            return true;
        } else {
            self.inputNotValidatedLvl2($xthis);
            return false;
        }
    });


    // validate input char length
    $(document).on('keyup change', inputLength, function(){
        var $xthis = $(this);
        var $minLength = $xthis.attr('minlength');
        var $maxLength = $xthis.attr('maxlength');
        var $val = $xthis.val().length;

        if ($val >= $minLength && $val <= $maxLength ) {  //validated
            self.inputValidated($xthis);
            return true;
        } else {
            self.inputNotValidatedLvl1($xthis);
            return false;
        }
    });

    $(document).on('focusout', inputLength, function(){
        var $xthis = $(this);
        var $minLength = $xthis.attr('minlength');
        var $maxLength = $xthis.attr('maxlength');
        var $val = $xthis.val().length;

        if ($val >= $minLength && $val <= $maxLength ) {  //validated
            self.inputValidated($xthis);
            return true;
        } else {
            self.inputNotValidatedLvl2($xthis);
            return false;
        }
    });
}
