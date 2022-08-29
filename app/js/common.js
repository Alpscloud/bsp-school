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

	// Popup
	$('.js-open-popup-form-btn').on('click',function(e) {
		e.preventDefault();
		var price = $(this).attr('data-package-price');
		var packageTitle = $(this).attr('data-package-title');

		var imgSrc = $('.package[data-package='+packageTitle+'] img').attr('src');
		var content = $('.package[data-package='+packageTitle+'] .package-back__content').clone();

		$('.js-popup').find('input[name=form_subject]').val('Тариф ' + packageTitle).trigger('change');
		$('.js-popup').find('input[name=price]').val(price).trigger('change');
		$('.js-popup').find('img').attr('src', imgSrc);
		$('.js-popup').find('.package-title').html(packageTitle);
		$('.js-popup').find('.popup-package__content').empty();
		$('.js-popup').find('.popup-package__content').append(content);

		
		$('.js-popup').fadeIn(300);
		$('html').addClass('is-fixed');
	});


	$('.js-close-popup-btn').on('click',function(e) {
		e.preventDefault();
		$(this).parents('.js-popup').fadeOut(300);
		$('html').removeClass('is-fixed');
	});

	$('.popup__overflow').on('click', function(e) {
		e.stopPropagation();

		var content = $(this).find('.popup__body');

		if(!content.is(e.target) && content.has(e.target).length === 0) {
			$('html').removeClass('is-fixed');
			$('.js-popup').fadeOut(300);
		}

	});
// ========= =========== =========== ===========



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

// ========= Ajax form ===========
$('.js-required-input').on('focus',function() {
	if($(this).hasClass('is-error')) {
		$(this).removeClass('is-error');
	}
});

$('form').submit(function(e) {
	e.preventDefault();

	var that = $(this);
	inputs = that.find('.js-required-input'),
	flag = true;

	// Validate
	$(inputs).each(function() {
		if(!$(this).val() || $(this).val() == "") {
			$(this).addClass('is-error');
			flag = false;
		}
	});

	if(!flag) {return false;}

	$.ajax({
		type: "POST",
		url: "mail.php", //Change
		data: that.serialize()
	}).done(function() {
		// add active clases
		setTimeout(function() {
			// remove active classes
			that.trigger("reset");
		}, 2000);
	});

});
// ========= =========== =========== ===========

$("input[type=tel]").inputmask({"mask": "+38 (999) 999-9999","clearIncomplete": false});

});
