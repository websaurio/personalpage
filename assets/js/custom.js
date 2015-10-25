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

    var btnLoadMore = $('#load-more'), skrollrBody = $('#skrollr-body');
    var hideAfter = worksgrid.data('hide-after') - 1;
    var steps  = worksgrid.data('steps');

    function toggleLoadMoreButton(totalFilteredElements) {
      btnLoadMore[totalFilteredElements <= 0 ? 'hide' : 'show']();
    }

    function applyFilter(totalFilteredElements) {
      worksgrid.isotope({
        filter: ':not(.work-item-hidden, .not-related)',
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });

      toggleLoadMoreButton(totalFilteredElements);
    }

    btnLoadMore.on('click', function() {
      var children = worksgrid.find('.work-item-hidden');
      children.filter(':lt('+steps+')').removeClass('work-item-hidden');

      applyFilter(children.length - steps)
    });

    function layoutComplete() {
        $('#smooth-scroll').height(skrollrBody.height());
    }

    worksgrid.after(btnLoadMore)
      .on('layoutComplete', layoutComplete);

		worksgrid.imagesLoaded(function() {
      var children = worksgrid.children(':gt('+hideAfter+')').addClass('work-item-hidden');

			worksgrid.isotope({
				layoutMode: worksgrid_mode,
				itemSelector: '.work-item',
        filter: ':not(.work-item-hidden, .not-related)'
			});

      toggleLoadMoreButton(children.length);
		});
    layoutComplete();

		$('#filters a').click(function() {
			$('#filters .current').removeClass('current');
			$(this).addClass('current');
			var selector = $(this).attr('data-filter');

      var children = worksgrid.find('li')
        // This prevents isotope to filter elements we don't want
        .removeClass('work-item-hidden not-related')
        .filter(':not('+selector+')')
        .addClass('not-related')
        .end()

        // Add a work-item-hidden class to every element in selector
        .filter(selector)
        .filter(':gt('+hideAfter+')')
        .addClass('work-item-hidden');

			applyFilter(children.length);

			return false;
		});

	});

})(jQuery);