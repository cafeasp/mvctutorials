jQuery(document).ready(function($){   

    var error = true;  
    
    function addLoading( e )
    {
		e.val( 'attendi...' ).attr('disabled', true);
	}    
    
    function removeLoading( e, value_submit )
    {
		e.val(value_submit).attr('disabled', false);  
	}
	
	function addError(msg, e, effect)
	{
		error = true;        
		e.removeClass('icon success');
		e.addClass('icon error'); 
		e.parent().find('.msg-error').text(msg);	            
		if( effect !== undefined && effect == true )
		{
			e.css({position:'relative'}).animate({left:-10}, 100).animate({left:10}, 100).animate({left:-5}, 100).animate({left:5}, 100).animate({left:0}, 100);
		}
	}                 
	
	function addSuccess(e)
	{                                     
		e.parents('li').addClass('icon success');	
	}
	
	function removeError(e)
	{
		error = false;        
		e.parent().find('.msg-error').text('');     
		e.removeClass('icon error');
		addSuccess(e);
	}          
	
	function checkRequired(e) {
        var name = $(e).attr('name');	
        jQuery.globalEval( 'var msg = error_messages.'+name ); 
        
		if( e.val() == '' )
			addError( msg, e );       
		else               
			removeError(e);    
    }     
	
	function checkEmail(e) {
        var expr = /^[_a-z0-9+-]+(\.[_a-z0-9+-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)+$/;     
        var name = $(e).attr('name');
        jQuery.globalEval( 'var msg = error_messages.'+name );	 
		
		if( ( e.val() != '' && !expr.test( e.val() ) ) || ( e.is('.required') && e.val() == '' ) )  
			addError( msg, e );            
		else 
			removeError(e);   
    }
    	
    $('.contact-form').each(function(){
        
        var form = $(this);
        var value_submit = $('.sendmail', form).val();
    
    	$('.required', form).each(function(){  
            $(this).blur(function(){      
                checkRequired( $(this) );    
    		});
    	});                
    	
    	$('.email-validate, form').each(function(){    
            $(this).blur(function(){                
        		checkEmail( $(this) );
    		});
    	});    
        
    	$(form).submit(function(){
    		addLoading( $('input:submit', form) );      
            
            $('input, select, textarea', form).each(function(){
                if ( $(this).hasClass('required') ) checkRequired( $(this) );
                    
                if ( $(this).hasClass('email-validate') ) checkEmail( $(this) );
            });    
             
    		$.post('sendmail.php', $(this).serialize()+'&ajax=1', function(msg) {
                showMessage = function() { $('.usermessagea', form).css({opacity:0}).animate({opacity:1}, 500).html(msg); }      
            
                if ( form.is('#quick-form-footer') ) {
                    $('ul', form).slideUp(500, function(){	
                        showMessage();
    					$( '<a href="#"> Close</a>' ).appendTo( $('.usermessagea', form).find('p') ).addClass('close_msg');
    				});        
                } else showMessage();                 
                  
    		    removeLoading( $('.sendmail', form), value_submit );            
            });                  
            return false;
    	});     
    	
    	$('.close_msg').live( 'click', function(){                
    		$(this).parents('form').find('ul').slideDown(500);
    		$(this).parent().remove();
    		return false;
    	});
    	
    }); 
   
});   