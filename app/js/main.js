'use strict';
function initMap() {
	let map, coords, styles, marker, info, content;
	coords = {
			lat: 49.587478, 
			lng:  34.557180
	};

	content = '<h1 class="info-title">Mar-Go</h1>';

	styles = [
		{
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#f5f5f5"
			}
		  ]
		},
		{
		  "elementType": "labels.icon",
		  "stylers": [
			{
			  "visibility": "off"
			}
		  ]
		},
		{
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#616161"
			}
		  ]
		},
		{
		  "elementType": "labels.text.stroke",
		  "stylers": [
			{
			  "color": "#f5f5f5"
			}
		  ]
		},
		{
		  "featureType": "administrative.land_parcel",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#bdbdbd"
			}
		  ]
		},
		{
		  "featureType": "poi",
		  "stylers": [
			{
			  "visibility": "on"
			}
		  ]
		},
		{
		  "featureType": "poi",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#c0c0c0"
			},
			{
			  "saturation": 70
			},
			{
			  "lightness": 40
			},
			{
			  "visibility": "on"
			},
			{
			  "weight": 0.5
			}
		  ]
		},
		{
		  "featureType": "poi",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#757575"
			}
		  ]
		},
		{
		  "featureType": "poi.park",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#e5e5e5"
			}
		  ]
		},
		{
		  "featureType": "poi.park",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#9e9e9e"
			}
		  ]
		},
		{
		  "featureType": "road",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#ffffff"
			}
		  ]
		},
		{
		  "featureType": "road.arterial",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#757575"
			}
		  ]
		},
		{
		  "featureType": "road.highway",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#dadada"
			}
		  ]
		},
		{
		  "featureType": "road.highway",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#616161"
			}
		  ]
		},
		{
		  "featureType": "road.local",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#9e9e9e"
			}
		  ]
		},
		{
		  "featureType": "transit.line",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#e5e5e5"
			}
		  ]
		},
		{
		  "featureType": "transit.station",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#eeeeee"
			}
		  ]
		},
		{
		  "featureType": "water",
		  "elementType": "geometry",
		  "stylers": [
			{
			  "color": "#c9c9c9"
			}
		  ]
		},
		{
		  "featureType": "water",
		  "elementType": "labels.text.fill",
		  "stylers": [
			{
			  "color": "#9e9e9e"
			}
		  ]
		}
		]

    map = new google.maps.Map(document.getElementById('map'), {
	    center: coords,
		zoom: 16,
		styles: styles,
		disableDefaultUI: true,
		zoomControl: true
		
	});

	marker = new google.maps.Marker({
		position: coords, 
		map: map, 
		icon: 'images/marker.png', 
		draggable: true});

	info = new google.maps.InfoWindow({
		content: content
	});

	marker.addListener('click', function() {
		info.open(map, marker);
	});
}

var inputs = document.querySelectorAll( '.inputfile' );

Array.prototype.forEach.call( inputs, function( input )
{
	var label	 = input.nextElementSibling,
		regx = /\\/,		
		labelVal = label.innerHTML;
	input.addEventListener( 'change', function( e )
	{
		var fileName = '';
	if( this.files && this.files.length > 1 )
		fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
	else
		fileName = e.target.value.split(regx).pop()
	console.log(fileName)

	if( fileName )
		label.innerHTML = fileName;
	else
		label.innerHTML = labelVal;
	});
});

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
			dots: true,
			responsive: [
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		});

		$('.form__btn').on('click', function() {
			let url = "index.html";
			$('.vspl').css('display', 'block');

			setTimeout(() => 
				$(location).attr('href',url), 3000);
		});
	});
})(jQuery);

