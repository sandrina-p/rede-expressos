$(document).ready(function(){

    $('#ticketFrom, #ticketTo').autoComplete({
        minChars: 3,
        source: function(term, suggest){
            term = term.toLowerCase();
            var choices = estacoes;
            var matches = [];
            for (i=0; i<choices.length; i++)
                if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
            suggest(matches);
        }
    });

    $('input.jq-pickmeup-simple').pickmeup({
        position		: 'bottom',
        format: 'd-m-Y',
        hide_on_select	: true,
        view: 'days',
        min: today,
        locale: {
            days:       [ 'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            daysShort:  [ 'Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            daysMin:    [ 'Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa', 'Do'],
            months:     [ 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthsShort:[ 'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        }
    });


    $("form[name=buyTicket]").on('submit', function(e){
        e.preventDefault();
        var $form = $(this),
            $btnSubmit = $form.find('[name=submit]'),
            $footer = $form.find('.FormFooter'),
            $formUrl = $form.attr('href'),
            $formUrl = $form.attr('action'),
            $formMethod = $form.attr('method'),
            goAjax = false,
            verificationClass = 'fa-asterisk'; //FIXME: search how to access variable inside a js class. (InputValidation.var VerificationClass);

        btnFancy.btnSubmitLoading($btnSubmit, true, null);

        if($form.find('.fa-asterisk').length == 0) { //looks valid
            if (goAjax) {
                $.ajax({
                    url: $formUrl,
                    type: $formMethod,
                    dataType: 'json',
                    data: $form.serialize(),
                    beforeSend: function() {},
                    success: function (data){
                        if(data.status == 'true' || data.status == true){
                            btnFancy.btnFeedback($btnSubmit, 'success');
                        }else{
                            btnFancy.btnFeedback($btnSubmit, 'error');
                        }
                    },
                    error: function(data){
                        btnFancy.btnFeedback($btnSubmit, 'error');
                    }
                });
            } else {
                console.log('Fiz e.preventDefault para demonstração da mensagem de sucesso');
                btnFancy.btnFeedback($btnSubmit, 'success');
            }

        } else {
            setTimeout(function () { //Simulate Ajax call time delay
                e.preventDefault();
                btnFancy.btnFeedback($btnSubmit, 'mandatory');
                $form.find('.fa-asterisk').each(function(){
                    formFancy.inputNotValidatedLvl2($(this));
                });
                return false;
            }, 500);
        }
    });

});
