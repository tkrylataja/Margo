'use strict';

(function($){
	$(document).ready(function() {
		// Code
		let SERVER_URL = 'https://my-json-server.typicode.com/tkrylataja/Margo', 
			$models = []; // ajax request db.json

		$.ajax({
			url: `${SERVER_URL}/models`,
			type: 'GET'
		}).then((data) => {
			$models = data;
			console.log(data);
			// TODO: drawDOM element
			$models.forEach((model) => {
				$('.catalog').append(drawCatalog(model));
			});

		});

		function drawCatalog(models) {
			let catalogDOM = `<a href="${models.url}.html" class="catalog__photo" data-id="${models.id}">
								<img src="${models.img}" class="catalog__img">
								<div class="catalog__text">
									<p class="catalog__texts catalog__name">${models.name}</p>
									<p class="catalog__texts">${models.age}</p>
									<p class="catalog__texts"> ${models.height}</p>
								</div>
							</a>`;

			return catalogDOM;
		}



		$('.filter').on('click', '.filter__button', function() {
			let filterValue = $(this).attr('data-filter');
			let $filteredModels = $models.filter(item => item.filter.toLowerCase().includes(filterValue));
			// TODO: drawDOM element

			$('.catalog__photo').remove();

			$filteredModels.forEach((model) => {
				$('.catalog').append(drawCatalog(model));
			});
		});

		$('.cards__photo').fancybox({
			buttons: [
				"fullScreen",
				"download",
				"thumbs",
				"close"
			],
			animationEffect: "zoom-in-out",
			animationDuration: 900,
			transitionEffect: "circular",
			transitionDuration: 800,
			loop: true,
		});

		$('.home1').on('mouseover', function() {
			$('.home__img').addClass('blur');
		});
		$('.home1').on('mouseleave', function() {
			$('.home__img').removeClass('blur');
		});

		$('.home').on('mouseover', function() {
			$('.home1__img').addClass('blur');
		});
		$('.home').on('mouseleave', function() {
			$('.home1__img').removeClass('blur');
		});

		//slider

		$('.slider').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: true
		});
	});
})(jQuery);

