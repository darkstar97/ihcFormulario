(function ($) {
    "use strict";
		
    var input = $('.validate-input .input100');

    $("#cep").mask("99999-999");

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else if ($(input).attr('type') == 'password' && $(input).val().trim() != '') {
            const pass = $('#password').val();
						const confirm = $('#confirm-password').val();
            let thisAlert = $(input).parent();

            if (pass.localeCompare(confirm) !== 0) {
                thisAlert[0].dataset.validate = 'As senhas devem ser iguais';
                return false;
            }
						
            if (pass.length < 8) {
                thisAlert[0].dataset.validate = 'A senha deve possuir no mínimo 8 dígitos';
                return false;
            }
        }
        else if ($(input).attr('name') == 'cep') {
            console.log($(input).val());
            if($(input).val().trim().match(/^[0-9]{5}-[0-9]{3}$/) == null) {
                return false;
            }
        }
        else if ($(input).attr('name') == 'born') {
            if(!dateValidation($(input).val())){
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                console.log($(input).val());
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

    function dateValidation(value) {
        var check = false;
        var adata = value.split('-');
        var re = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
        if (re.test(value)) {
            var tomorrow = new Date();
            var yyyy = parseInt(adata[0],10);
            var mm = parseInt(adata[1],10);
            var dd = parseInt(adata[2],10);
            var xdata = new Date(yyyy,mm-1,dd);
            if (xdata > tomorrow) {
                return check;
            }
            if ( ( xdata.getFullYear() === yyyy ) && ( xdata.getMonth () === mm - 1 ) && ( xdata.getDate() === dd ) )
                check = true;
            else
                check = false;
        }
        return check;
    }

})(jQuery);