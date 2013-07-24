$(document).ready(function(){ 

	$('body').removeClass('no_js').addClass('yes_js'); 
	
	$('a.no-link').click(function(){return false;});
    
    $('#nav li > ul.sub-menu li').each(function(){
        n = $('ul.sub-menu', this).length;
        
        if(n) $(this).addClass('sub');
    });
    
    var show_dropdown = function()
    {        
        var options;
        
        containerWidth = $('#header').width();
        marginRight = $('#nav ul.level-1 > li').css('margin-right');
        submenuWidth = $('#nav ul.sub-menu').width();
        offsetMenuRight = $(this).position().left + submenuWidth;
        leftPos = -18;
        
        if ( offsetMenuRight > containerWidth )
            options = { left:leftPos - ( offsetMenuRight - containerWidth ) };    
        else
            options = {};
        
        $('ul.sub-menu:not(ul.sub-menu li > ul.sub-menu), ul.children:not(ul.children li > ul.children)', this).css(options).stop(true, true).fadeIn(300);    
    }
    
    var hide_dropdown = function()
    {
        $('ul.sub-menu:not(ul.sub-menu li > ul.sub-menu), ul.children:not(ul.children li > ul.children)', this).fadeOut(300);    
    }
        
    $('#nav ul > li').hover( show_dropdown, hide_dropdown );              
    
    $('#nav ul > li').each(function(){
        if( $('ul', this).length > 0 )
            $(this).children('a').append('<span class="sf-sub-indicator"> &raquo;</span>')
    }); 
    
    $('#nav li ul.sub-menu li, #nav li ul.children li').hover(
        function()
        {                  
            var options;
            
            containerWidth = $('#header').width();
            containerOffsetRight = $('#header').offset().left + containerWidth;
            submenuWidth = $('ul.sub-menu, ul.children', this).parent().width();
            offsetMenuRight = $(this).offset().left + submenuWidth * 2;
            leftPos = -10;
            
            if ( offsetMenuRight > containerOffsetRight )
                $(this).addClass('left');
                
            $('ul.sub-menu, ul.children', this).stop(true, true).fadeIn(300);
        },
    
        function()
        {
            $('ul.sub-menu, ul.children', this).fadeOut(300);
        }
    ); 
    
    $('body.isMobile:not(.iPhone, .iPad) .sf-sub-indicator').parent().parent().toggle( show_dropdown, function(){ document.location = $(this).children('a').attr('href') } );
    
    $('#slider.cycle').hover(
        function()
        {
            $('.next, .prev', this).stop(true, true).fadeIn(300);
        },
    
        function()
        {
            $('.next, .prev', this).fadeOut(300);
        }
    );
	
	lightbox();
    
    // video in slider
    $('.slide .video-container').each(function(){
        var id = $('div', this).attr('id');
        var regex_video = /video-(vimeo|youtube)-([a-zA-Z0-9-]+)/gi;       
        match = regex_video.exec( id );
        
        video_type = match[1];
        video_id   = match[2];
    
        if ( video_type == 'vimeo' )
            video_url = "http://vimeo.com/moogaloop.swf?clip_id="+video_id+"&amp;server=vimeo.com&amp;color=00adef&amp;fullscreen=1";
        else if ( video_type == 'youtube' )
            video_url = "http://www.youtube.com/e/"+video_id;
              
        swfobject.embedSWF(video_url, id, "447", "252", "8", null, null, { allowScriptAccess: "always", wmode: "transparent" }, { id: id+"-player" } );
	});
    
	// searchform on header    // autoclean labels
	$elements = $('#header #s, .autoclear');
    
	$elements.each(function(){
        if( $(this).val() != '' )	
			$(this).prev().css('display', 'none');
    }); 
    $elements.focus(function(){
        if( $(this).val() == '' )	
			$(this).prev().css('display', 'none');
    }); 
    $elements.blur(function(){ 
        if( $(this).val() == '' )	
        	$(this).prev().css('display', 'block');
    }); 
                               
    if ( 'tipsy' in $ ) {   
        $('a.socials, a.socials-small').tipsy({fade:true, gravity:'s'});
    }
    
    $('.toggle-content:not(.opened), .content-tab:not(.opened)').hide(); 
    $('.tab-index a').click(function(){           
        $(this).parent().next().slideToggle(300, 'easeOutExpo');
        $(this).parent().toggleClass('tab-opened tab-closed');
        $(this).attr('title', ($(this).attr('title') == 'Close') ? 'Open' : 'Close');
        return false;
    });   
    
    // tabs
	$('#product-tabs').tabs({
        tabNav  : 'ul.tabs',
        tabDivs : '.containers',
        currentClass : 'active'
    });
	$('.tabs-container').tabs({
        tabNav  : 'ul.tabs',
        tabDivs : '.border-box'
    });
	$('.testimonials-list').tabs({
        tabNav  : 'ul.tabs',
        tabDivs : '.border-box',
        currentClass : 'active'
    }); 
    
    $('#slideshow images img').show();
    
    $('.shipping-calculator-form').show();
    
    // gallery hover
    $(".gallery-wrap .internal_page_item .overlay").css({opacity:0});
	$(".gallery-wrap .internal_page_item").live( 'mouseover mouseout', function(event){ 
		if ( event.type == 'mouseover' ) $('.overlay', this).show().stop(true,false).animate({ opacity: 1 }, "fast"); 
		if ( event.type == 'mouseout' )  $('.overlay', this).animate({ opacity: 0 }, "fast", function(){ $(this).hide() }); 
	});
	
	// map tab
	$('.header-map .tab-label').click(function(){
        var mapWrap = $('#map-wrap');
        var text = $(this).text();
        var label = $(this);
        var height = 400;
        
        if ( $(window).height() - 100 < height )
            height = $(window).height() - 100;
        
        //console.log( text + ' - ' + header_map.tab_open + ' - ' + header_map.tab_close );
        
        if ( $(this).hasClass('closed') ) {
            mapWrap.show().animate({height:height}, 500, function(){
                label.removeClass('closed').addClass('opened').text(header_map.tab_close);
            });
            
        } else if ( $(this).hasClass('opened') ) {
            mapWrap.animate({height:0}, 500, function(){ 
                $(this).hide();
                label.removeClass('opened').addClass('closed').text(header_map.tab_open);
            });
        }             
        
        return false;
    });
    
    $('.home-sections .section').each(function(){
        if ( $('.section-content', this).height() < $('.section-title', this).height() )
            $(this).css('min-height', $('.section-title', this).height() );
    });
    
    // more project widget
    $('.more-projects-widget').each(function(){
        var slider_wrap = $(this);
        var height_item = $('li', slider_wrap).outerHeight();
        var height_ul   = $('ul', slider_wrap).height();
        var height_wrap = $('.sliderWrap', slider_wrap).height();
        var n_items     = $('li', slider_wrap).length;
        var visible     = 3;
    
        $('.controls, .top', slider_wrap).show();
    
        // adjust height, according to visible item
        $('.sliderWrap', slider_wrap).css('height', height_item * visible - 6);
    
        function check_position() {    
            var margin_top_ul = $('ul', slider_wrap).css('margin-top');
            var max_offset  = ( n_items - visible ) * height_item * -1;
    
            if ( margin_top_ul == '0px' ) {
                $('.prev', slider_wrap).addClass('disabled');
            }
    
            if ( margin_top_ul == max_offset+'px' ) {
                $('.next', slider_wrap).addClass('disabled');
            }
        }
    
        check_position();
    
        $('.next:not(.disabled)', slider_wrap).live('click',function(){
            $('ul', slider_wrap).animate( {marginTop:'-='+height_item}, 200, function(){ check_position(); } );
            $('.prev', slider_wrap).removeClass('disabled');
            return false;
        });
    
        $('.prev:not(.disabled)', slider_wrap).live('click',function(){
            $('ul', slider_wrap).animate( {marginTop:'+='+height_item}, 200, function(){ check_position(); } );
            $('.next', slider_wrap).removeClass('disabled');
            return false;
        });
    
        $('.disabled', slider_wrap).live('click', function(){
            return false;
        });
    });                  
                                       
    /* twitter slider in footer */   
    $('#twitter-slider .tweets-list').tweetable({
        username: 'YIW',
        items: 5,
        time: true,
        loaded: function(){      
            $('.tweets-list ul').addClass('slides');
            $('.tweets-list').flexslider({
                animation: "slide",
                slideDirection: "vertical",
                slideshowSpeed: 5000,
                animationDuration: 500,
                directionNav: false,             
                controlNav: false,             
                keyboardNav: false
            });
        }
    });  
    
    /* testimonial slider in home section */   
   // if ( 'cycle' in $ ) {         
        $(".cites").cycle({
            fx: "scrollHorz",
            width: "100%",
            slideResize: true,
            fit: 1,
            timeout: 8000,
            containerResize: false,
            animOut: {
                opacity:0
            },
            animIn: {
                opacity:1
            },
            before: function(currSlideElement, nextSlideElement, options, forwardFlag) {
                var i = $(nextSlideElement).index();
                $("ul.testimonials li").removeClass("active");
                $("ul.testimonials li:eq("+i+")").addClass("active");
                if ( typeof Cufon != "undefined" )
                    Cufon.refresh();
            }
        });
        $("ul.testimonials li").click(function(){
            var i = $(this).index();
            $(".cites").cycle(i);       
            $("ul.testimonials li").removeClass("active");
            $("ul.testimonials li:eq("+i+")").addClass("active");
            if ( typeof Cufon != "undefined" )
                Cufon.refresh();
        });
    //}
    
    /* works slider in home page */   
    if ( 'flexslider' in $ ) {           
        $('.works-slider').flexslider({
            animation: "slide",
            directionNav: true,             
            controlNav: false,             
            keyboardNav: false
        });
    }
    
    /* featured projects widget */     
    if ( 'cycle' in $ ) {         
        $('.featured-projects-widget ul').cycle({
            fx: 'scrollLeft',
            //easing: 'none',
            timeout: 8000,
            speed: 300
        });
    }
    
    /* accordion slider of staff page */ 
    if ( 'hrzAccordion' in $ ) {                                        
    	$(".accordion-slider").hrzAccordion({
    		openOnLoad		   : 1,
    		handlePosition     : "left"
        });
    }
    
    /* portfolio slider */
    if ( 'jcarousel' in $ ) { 
        $('.portfolio-slider').jcarousel();
    }
});         

function lightbox()
{   
    if ( 'prettyPhoto' in $ ) {
        $('a.thumb').hover(
                                
            function()
            {
                $('<a class="zoom">zoom</a>').appendTo(this).css({
    				dispay:'block', 
    				opacity:0, 
    				height:jQuery(this).children('img').height(), 
    				width:jQuery(this).children('img').width(),
    				'top':jQuery(this).css('padding-top'),
    				'left':jQuery(this).css('padding-left'),
    				padding:0}).animate({opacity:0.4}, 500);
            },
            
            function()
            {           
                $('.zoom').fadeOut(500, function(){$(this).remove()});
            }
        );
    	$("a[rel^='prettyPhoto']").prettyPhoto({
            slideshow:5000,
            theme: 'pp_default', 
            autoplay_slideshow:false,
            deeplinking: false,
            show_title:false
        });        
    }
} 

// tabs plugin
(function($) {
    $.fn.tabs = function(options) {
        // valori di default
        var config = {
            'tabNav': 'ul.tabs',
            'tabDivs': '.containers',
            'currentClass': 'current'
        };      
 
        if (options) $.extend(config, options);
    	
    	this.each(function() {   
        	var tabNav = $(config.tabNav, this);
        	var tabDivs = $(config.tabDivs, this);
        	var activeTab;
        	var maxHeight = 0;
        	
        	// height of tabs
//         	$('li', tabNav).each(function(){
//                 var tabHeight = $(this).height();
//                 if ( tabHeight > maxHeight )
//                     maxHeight = tabHeight;
//             });
//             $('li h4', tabNav).each(function(){
//                 $(this).height(maxHeight-40);
//             });
        	
            tabDivs.children('div').hide();
    	
    	    if ( $('li.'+config.currentClass+' a', tabNav).length > 0 )
               activeTab = $('li.'+config.currentClass+' a', tabNav).attr('href'); 
        	else
        	   activeTab = $('li:first-child a', tabNav).attr('href');
                        
        	$(activeTab).show().addClass('showing');
            $('a[href="'+activeTab+'"]', tabNav).parents('li').addClass(config.currentClass);
        	
        	$('a', tabNav).click(function(){
        		var id = $(this).attr('href');
        		var thisLink = $(this);
        		
        		$('li.'+config.currentClass, tabNav).removeClass(config.currentClass);
        		$(this).parents('li').addClass(config.currentClass);
        		
        		$('.showing', tabDivs).fadeOut(200, function(){
        			$(this).removeClass('showing');
        			$(id).fadeIn(200).addClass('showing');
        		});
        		
        		return false;
        	});   
        });
    }
})(jQuery);     

function getImgHeight(imgSrc) {
    var newImg = new Image();

    newImg.onload = function() {
        var height = newImg.height;
    }

    newImg.src = imgSrc; // this must be done AFTER setting onload
    
    return height;
}   

function getImgWidth(imgSrc) {
    var newImg = new Image(); 
    var width = 0;

    newImg.onload = function() {
        var width = newImg.width;
    }

    newImg.src = imgSrc; // this must be done AFTER setting onload   
    
    return width;
}

(function($) {                                     
        
    $.fn.sorted = function(customOptions) {
        var options = {
            reversed: false,
            by: function(a) {
                return a.text();
            }
        };

        $.extend(options, customOptions);

        $data = jQuery(this);
        arr = $data.get();
        arr.sort(function(a, b) {

            var valA = options.by($(a));
            var valB = options.by($(b));
    
            if (options.reversed) {
                return (valA < valB) ? 1 : (valA > valB) ? -1 : 0;              
            } else {        
                return (valA < valB) ? -1 : (valA > valB) ? 1 : 0;  
            }
    
        });

        return $(arr);

    };

})(jQuery);

jQuery(function($) {
    
    //lightbox();


    var read_button = function(class_names) {
        
        var r = {
            selected: false,
            type: 0
        };
        
        for (var i=0; i < class_names.length; i++) {
            
            if (class_names[i].indexOf('selected-') == 0) {
                r.selected = true;
            }
        
            if (class_names[i].indexOf('segment-') == 0) {
                r.segment = class_names[i].split('-')[1];
            }
        };
        
        return r;
        
    };

    var determine_sort = function($buttons) {
        var $selected = $buttons.parent().filter('[class*="selected-"]');
        return $selected.find('a').attr('data-value');
    };

    var determine_kind = function($buttons) {
        var $selected = $buttons.parent().filter('[class*="selected-"]');
        return $selected.find('a').attr('data-value');
    };

    var $preferences = {
        duration: 500,
        adjustHeight: 'auto'
    }

    var $list = jQuery('.gallery-wrap');
    var $data = $list.clone();

    var $controls = jQuery('.portfolio-categories, .gallery-categories');

    $controls.each(function(i) {

        var $control = jQuery(this);
        var $buttons = $control.find('a');
        var height_list = $list.height();

        $buttons.bind('click', function(e) {

            var $button = jQuery(this);
            var $button_container = $button.parent();
            var button_properties = read_button($button_container.attr('class').split(' '));      
            var selected = button_properties.selected;
            var button_segment = button_properties.segment;

            if (!selected) {

                $buttons.parent().removeClass();
                $button_container.addClass('selected-' + button_segment);

                var sorting_type = determine_sort($controls.eq(1).find('a'));
                var sorting_kind = determine_kind($controls.eq(0).find('a'));

                if (sorting_kind == 'all') {
                    var $filtered_data = $data.find('li');
                } else {
                    var $filtered_data = $data.find('li.' + sorting_kind);
                }

                var $sorted_data = $filtered_data.sorted({
                    by: function(v) {
                        return $(v).find('strong').text().toLowerCase();
                    }
                });

                $list.quicksand($sorted_data, $preferences, function () {
                        lightbox();
                        //Cufon.replace('#portfolio-gallery h6');   
                        
                        var current_height = $list.height();       
                        $('.hentry-post').animate( { 'min-height':$list.height() }, 300 );
                        
                        
                        
                        var postsPerRow = ( $('.layout-sidebar-right').length > 0 || $('.layout-sidebar-left').length > 0 ) ? 3 : 4;
                        
                        $('.gallery-wrap li')
                            .removeClass('group')
                            .each(function(i){
                                $(this).find('div')
                                    //.removeClass('internal_page_item_first') 
                                    .removeClass('internal_page_item_last');
                                
                                if( (i % postsPerRow) == 0 ) {
                                    //$(this).addClass('group');
                                    //$(this).find('div').addClass('internal_page_item_first'); 
                                } else if((i % postsPerRow) == 2) {
                                    $(this).find('div').addClass('internal_page_item_last');
                                }
                            });
                            
                        $('.gallery-wrap:first').css('height',0);
                        
                });
    
            }
    
            e.preventDefault();
            
        });
    
    }); 
    
});