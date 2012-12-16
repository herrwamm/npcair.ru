/*
-------------------------------------------------
	Configuration:  */

	var config = [];

	config.use_sticky_nav = true;
	/* Whether to use sticky navigation (true | false) */

/*
-------------------------------------------------
*/

// If JavaScript is enabled remove 'no-js' class and give 'js' class
jQuery('html').removeClass('no-js').addClass('js');

// Add .osx class to html if on Os/x
if ( navigator.appVersion.indexOf("Mac")!=-1 ) 
	jQuery('html').addClass('osx');

// When DOM is fully loaded
jQuery(document).ready(function($) {

	(function() {

	/* --------------------------------------------------------	
		Twitter bootstrap - carousel, tooltip, popover 
	   --------------------------------------------------------	*/	

		// initialize carousel
		$('.carousel').carousel({interval:6000})
		
		$('.carousel-pager li').click(function(){
			var i = $(this).index();
			$(this).parents('.carousel').carousel(i);
		})
		$('.carousel').mouseenter(function(){
			$(this).carousel('pause');
		});
		$('.carousel').mouseleave(function(){
			$(this).carousel('cycle');
		});
		$('.carousel').bind("slid", function(){
			var index = $(this).find('.item.active').index();
			$(this).find('.carousel-pager li').removeClass('active').eq(index).addClass('active');
  		});

		// initialize tooltip
		$('[data-tooltip]').tooltip();
		
		// initialize popover
		$('[data-popover]').popover();

	    $('.accordion').on('show', function (e) {
	         $(e.target).prev('.accordion-heading').find('.accordion-toggle').addClass('active');
	    });

	    $('.accordion').on('hide', function (e) {
	        $(this).find('.accordion-toggle').not($(e.target)).removeClass('active');
	    });

	/* --------------------------------------------------------	
		External links
	   --------------------------------------------------------	*/	

	    $(window).load(function() {

			$('a[rel=external]').attr('target','_blank');
			
		});

	})();


/* --------------------------------------------------------	
	Fancybox
   --------------------------------------------------------	*/	


	(function() {

		// Images
		$('.fancybox, .zoom').fancybox({
			type        : 'image',
			openEffect  : 'fade',
			closeEffect	: 'fade',
			nextEffect  : 'fade',
			prevEffect  : 'fade',
			padding		: 2,
			helpers     : {
				title   : {
					type : 'outside'
				},
			overlay : {
				speedIn  : 0,
				speedOut : 300,
				opacity  : 0.9,
				css      : {
					cursor : 'pointer',
					'background-color' : '#2E2929'
				},
				closeClick: true
			},				
				/* 
					// uncomment to enable thumbnail preview in fancybox 

					thumbs   : {
						width	: 64,
						height	: 48
					},
				*/
				/* 
					// uncomment to enable button helpers in fancybox 

					buttons  : {},
				*/
				media    : {}
			},
			beforeLoad: function() {

            	var el, id = $(this.element).data('title-id');
            	if (id) {
                	el = $('#' + id);
                	if (el.length) {
                    	this.title = el.html();
                	}
            	}
        	},

			afterShow : function() {},
			beforeClose : function() {}
		});


	})();

/* --------------------------------------------------------	
	Video
   --------------------------------------------------------	*/	

	(function() {

		// get video source
		var video_source = $('#how-it-works iframe').attr('src');
		
		// clear the source
		$('#how-it-works iframe').attr('src','');

		// play when modal window opens
		$('#how-it-works').on('show', function () {
		  $('#how-it-works iframe').attr('src',video_source);
		})	

		// stop on modal window close
		$('#how-it-works').on('hidden', function () {
		  $('#how-it-works iframe').attr('src','');
		});


	})();


/* --------------------------------------------------------	
	Zoom overlays (e.g. for thumbnails)
   --------------------------------------------------------	*/	

	(function() {

		$(window).load(function() {

			$('.zoom').each(function(){
				var $this = $(this);
				//var $height = $this.find('img').height();
				var span = $('<span>').addClass('zoom-overlay').html('&nbsp;');
				//var span = $('<span>').addClass('zoom-overlay').html('&nbsp;').css('top',$height/2);
				$this.append(span);
			})

		});

	})();


/* --------------------------------------------------------	
	Sticky navigation
   --------------------------------------------------------	*/	
	
	(function() {

		if (config.use_sticky_nav === true) {

			var stickyNavContainer = $('<div />').attr('id','sticky-nav-container').appendTo('body');
			var stickyNav = '<ul class="nav sticky-nav">';

			var $mainNav    = $('.navbar .nav');

			// Responsive nav
			$mainNav.find('a').each(function() {
				
				var $link = $(this);

				if( $link.attr('href') ) {
					stickyNav += '<li><a href="' + $link.attr('href') + '">' + $link.text() + '</a></li>';
				}
			});

			stickyNav += '</ul>';
			stickyNavContainer.html(stickyNav);

			$(window).scroll(function() {

				if($(this).scrollTop() > 600) {
					$('#sticky-nav-container').slideDown('fast');	
				} else {
					$('#sticky-nav-container').slideUp('fast');
				}

			});

		}
			
	})();


/* --------------------------------------------------------	
	Scroll navigation
   --------------------------------------------------------	*/	


	(function() {

		// Images
		$('#header .nav, .sticky-nav').localScroll({duration:400, offset : { top:-20, left:0 }})


	})();

/* --------------------------------------------------------	
	Back to top button
   --------------------------------------------------------	*/	

	(function() {

   			$('<i id="back-to-top"></i>').addClass('hidden-phone').appendTo($('body'));

			$(window).scroll(function() {

				if($(this).scrollTop() > 600) {
					$('#back-to-top').fadeIn();	
				} else {
					$('#back-to-top').fadeOut();
				}

			});
			
			$('#back-to-top').click(function() {
				$('body,html').animate({scrollTop:0},600);
			});	

	})();


/* --------------------------------------------------------	
	Swipe support for slider
   --------------------------------------------------------	*/	

   (function() {

   		var is_touch_device = !!('ontouchstart' in window);

		function swipe( e, direction ) {

			var $carousel = $(e.currentTarget);
			
			if( direction === 'left' )
				$carousel.find('.carousel-control.right').trigger('click');
			
			if( direction === 'right' )
				$carousel.find('.carousel-control.left').trigger('click');
		}
		
		if (is_touch_device === true) {

			$('#slider').swipe({
				allowPageScroll : 'auto',
				swipeLeft       : swipe,
				swipeRight      : swipe
			});

		}

	})();

/* --------------------------------------------------------	
	Keyboard shortcuts
   --------------------------------------------------------	*/	

   (function() {

		$('a[rel=shortcut]').each(function(){

			var $this = $(this);
			var key = $this.data('key');
			var href = $this.attr('href');

			if (key && href) {
				$(document).bind('keydown', key, function(){
					top.location.href = href;
				});
			}
		})

	})();


})