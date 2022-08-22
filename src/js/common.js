$(document).ready(function() {
	//  ========= Variables =========
	var body = $('body'),
	html = body.width(),
			timer; // for disable scroll
	// ========= =========== =========== ===========

	var countDown = function () {
		var countDate = new Date($('.timer').attr('data-date')).getTime();
		var now = new Date().getTime();
		var gap = countDate - now;

		var second = 1000;
		var minute = second * 60;
		var hour = minute * 60;
		var day = hour * 24;

		var textDays = Math.floor(gap / day);
		var textHours = Math.floor((gap % day) / hour);
		var textMinutes = Math.floor((gap % hour) / minute);

		$('.js-timer-days').html(textDays);
		$('.js-timer-hours').html(textHours);
		$('.js-timer-minutes').html(textMinutes);
	}

	countDown();
	setInterval(countDown, 1000);

	

	// ========= Smooth scrolling to the acnhors ===========
	$('.js-smooth-scroll-link').on('click', function (e) {
		e.preventDefault();
		var id = $(this).attr('href'),
		top = $(id).offset().top - 40;

		if ($('.js-open-mobile-menu-btn').hasClass('is-active')) {
			$('.js-open-mobile-menu-btn').removeClass('is-active');
			$('.js-nav').removeClass('is-opened');
			$('html').removeClass('is-fixed');
		}

		$('html, body').animate({scrollTop: top}, 300);
	});	

	$('.js-open-mobile-menu-btn').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('is-active');
		$('.js-nav').toggleClass('is-opened');

		$('html').toggleClass('is-fixed');
	});

	$('.feedbacks-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: true,
		nextArrow: $('.js-feedbacks-slider-btn'),
		dots: true,
		appendDots: $('.js-feedbacks-slider-pagination'),
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 2
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 1
				}
			}
		]
	});



	AOS.init({
		once: true,
		duration: 800
	});

});
