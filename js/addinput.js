
        $(document).ready(function() {
            $("#add_email").click(function(){
                var contador = $("input[type='email']").length;

                /* $(correo).before('<input type="email" id="email_'+ contador +'" name="email[]" class="form-control"/><button type="button" class="delete_email form-control">Del</button></div>');
                 */
                
               /*  $("#correo").after(' <div> <input type="email" id="correo'+ contador+'" name="email[]" class="form-control" placeholder="Correo" required="required"/><input type="button" class="delete_email add" value = "-"></div>');
                 */$("#correo").after(' <div> <input type="email" id="correo '+ contador+'" name="email[]" class="form-control" placeholder="Correo '+ contador+'" required="required"/></div>');
                $("#add_email").after(' <div><input type="button" id="'+ contador+'" class="delete_email add" value = "-"></div>'); 
            });

            $(document).on('click', '.delete_email', function(){
                var borr = "correo " + this.id
               $(this).parent().remove();
               $(borr).parent().remove();
            });
        });