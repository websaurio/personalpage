(function($){

	/* ---------------------------------------------- /*
	 * Preloader
	/* ---------------------------------------------- */

	$(window).load(function() {
		$('.loader').fadeOut();
		$('.page-loader').delay(0).fadeOut('slow');
	});

	$(document).ready(function() {

    
		/* ---------------------------------------------- /*
		 * Initialization General Scripts for all pages
		/* ---------------------------------------------- */

		var homeSection = $('.home-section'),
			navbar      = $('.navbar-custom'),
			navHeight   = navbar.height(),
			worksgrid   = $('#works-grid'),
			width       = Math.max($(window).width(), window.innerWidth),
			mobileTest;

		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			mobileTest = true;
		}

		buildHomeSection(homeSection);
		navbarAnimation(navbar, homeSection, navHeight);
		
		$(window).resize(function() {
			var width = Math.max($(window).width(), window.innerWidth);
			buildHomeSection(homeSection);
		});

		$(window).scroll(function() {
			effectsHomeSection(homeSection, this);
			navbarAnimation(navbar, homeSection, navHeight);
		});

		/* ---------------------------------------------- /*
		 * Home section height
		/* ---------------------------------------------- */

		function buildHomeSection(homeSection) {
			if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){

			if (homeSection.length > 0) {
				if (homeSection.hasClass('home-full-height')) {
					homeSection.height($(window).height());
				} else {
					homeSection.height($(window).height() * 0.95);
				}
			}
	     	}	 
		}
		 /* ---------------------------------------------- /*
		 * Fix Touch Hover
		/* ----------------------------------------------*/	
	     $('body').bind('touchstart', function() {});
 

		/* ---------------------------------------------- /*
		 * Home section effects
		/* ---------------------------------------------- */
			function effectsHomeSection(homeSection, scrollTopp) {
				if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
				if (homeSection.length > 0) {
					var homeSHeight = homeSection.height();
					var topScroll = $(document).scrollTop();
					if ((homeSection.hasClass('home-parallax')) && ($(scrollTopp).scrollTop() <= homeSHeight)) {
						homeSection.css('top', (topScroll * 0));
					}
			}}		 else {
			
				if (homeSection.length > 0) {
					var homeSHeight = homeSection.height();
					var topScroll = $(document).scrollTop();
					if ((homeSection.hasClass('home-parallax')) && ($(scrollTopp).scrollTop() <= homeSHeight)) {
						homeSection.css('top', (topScroll * 0.35));
					}
				}
		 } 
		} 

		/* ---------------------------------------------- /*
		 * Skrollr
		/* ---------------------------------------------- */
  		window.onload = function() {

		if(!(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i).test(navigator.userAgent || navigator.vendor || window.opera)){
		var s = skrollr.init({
			forceHeight: false,
			smoothScrolling: true
		});
		}			
		};
		/* ---------------------------------------------- /*
		 * Transparent navbar animation
		/* ---------------------------------------------- */

		function navbarAnimation(navbar, homeSection, navHeight) {
			var topScroll = $(window).scrollTop();
			if (navbar.length > 0 && homeSection.length > 0) {
				if(topScroll >= navHeight) {
					navbar.removeClass('navbar-transparent');
				} else {
					navbar.addClass('navbar-transparent');
				}
			}
		}

		/* ---------------------------------------------- /*
		 * Navbar collapse on click
		/* ---------------------------------------------- */

		$(document).on('click','.navbar-collapse.in',function(e) {
			if( $(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle' ) {
				$(this).collapse('hide');
			}
		});
		

		/* ---------------------------------------------- /*
		 * Testimonials, Post sliders
		/* ---------------------------------------------- */

		if ($('.testimonials-slider').length > 0 ) {
			$('.testimonials-slider').flexslider( {
				animation: "slide",
				smoothHeight: true,
			});
		}

		$('.post-images-slider').flexslider( {
			animation: "slide",
			smoothHeight: true,
		});

		/* ---------------------------------------------- /*
		 * Owl slider
		/* ---------------------------------------------- */

		$('.owl-carousel').each(function(i) {

			// Check items number
			if ($(this).data('items') > 0) {
				items = $(this).data('items');
			} else {
				items = 4;
			}

			// Check pagination true/false
			if (($(this).data('pagination') > 0) && ($(this).data('pagination') === true)) {
				pagination = true;
			} else {
				pagination = false;
			}

			// Check navigation true/false
			if (($(this).data('navigation') > 0) && ($(this).data('navigation') === true)) {
				navigation = true;
			} else {
				navigation = false;
			}

			// Build carousel
			$(this).owlCarousel( {
				navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
				navigation: navigation,
				pagination: pagination,
				paginationSpeed: 500,
				singleItem: false,
				items: items,
				slideSpeed: 300,
				autoPlay: false
			});

		});
		

		/* ---------------------------------------------- /*
		 * WOW Animation When You Scroll
		/* ---------------------------------------------- */

			wow = new WOW({
				mobile: false
			});
			wow.init();

        
		/* ---------------------------------------------- /*
		 * Scroll Animation
		/* ---------------------------------------------- */

		$('.section-scroll').bind('click', function(e) {
			var anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top - 65
			}, 1000);
			e.preventDefault();
		});
		
		/* ---------------------------------------------- /*
		 * Portfolio
		/* ---------------------------------------------- */

		var worksgrid_mode;
		if (worksgrid.hasClass('works-grid-masonry')) {
			worksgrid_mode = 'masonry';
		} else {
			worksgrid_mode = 'fitRows';
		}

		worksgrid.imagesLoaded(function() {
			worksgrid.isotope({
				layoutMode: worksgrid_mode,
				itemSelector: '.work-item',
			});
		});

		$('#filters a').click(function() {
			$('#filters .current').removeClass('current');
			$(this).addClass('current');
			var selector = $(this).attr('data-filter');

			worksgrid.isotope({
				filter: selector,
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false
				}
			});

			return false;
		});

	});

})(jQuery);