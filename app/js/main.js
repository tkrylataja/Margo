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
			let catalogDOM = `<a href="#" class="catalog__photo" data-id="${models.id}">
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

			let $filteredModels = $models.filter(item => item.filter === filterValue);

			// TODO: drawDOM element
		});
	});
})(jQuery);
