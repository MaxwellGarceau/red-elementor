( function( $ ) {

  var hotspotInterval = [];
	var hoverFlag = false;
	var isElEditMode = false;
  /**
	 * Video Gallery handler Function.
	 *
	 */
	var WidgetRedUAELVideoGalleryHandler = function( $scope, $ ) {

		if ( 'undefined' == typeof $scope ) {
			return;
		}

		var selector = $scope.find( '.uael-video-gallery-wrap' );
		var layout = selector.data( 'layout' );
		var action = selector.data( 'action' );
		var all_filters = selector.data( 'all-filters' );
		var $tabs_dropdown = $scope.find('.uael-filters-dropdown-list');

		if ( selector.length < 1 ) {
			return;
		}

		$scope.find( '.uael-vg__play_full' ).on( 'click', function( e ) {

			if ( 'inline' == action ) {

				e.preventDefault();

				var iframe 		= $( "<iframe/>" );
				var vurl 		= $( this ).data( 'url' );
				var overlay		= $( this ).closest( '.uael-video__gallery-item' ).find( '.uael-vg__overlay' );
				var wrap_outer = $( this ).closest( '.uael-video__gallery-iframe' );

				iframe.attr( 'src', vurl );
				iframe.attr( 'frameborder', '0' );
				iframe.attr( 'allowfullscreen', '1' );
				iframe.attr( 'allow', 'autoplay;encrypted-media;' );

				wrap_outer.html( iframe );
				wrap_outer.attr( 'style', 'background:#000;' );
				overlay.hide();

			}
		} );

		// If Carousel is the layout.
		if( 'carousel' == layout ) {

			var slider_options 	= selector.data( 'vg_slider' );

			if ( selector.find( '.uael-video__gallery-iframe' ).imagesLoaded( { background: true } ) )
			{
				selector.slick( slider_options );
			}
		}

		$('html').click(function() {
			$tabs_dropdown.removeClass( 'show-list' );
		});

		$scope.on( 'click', '.uael-filters-dropdown-button', function(e) {
			e.stopPropagation();
			$tabs_dropdown.addClass( 'show-list' );
		});

		// If Filters is the layout.
		if( selector.hasClass( 'uael-video-gallery-filter' ) ) {

			var filters = $scope.find( '.uael-video__gallery-filters' );
			var def_cat = '*';
			var hashval = window.location.hash;
			var cat_id 	= hashval.split( '#' ).pop();

			if( '' !== cat_id ) {
				cat_id 		= '.' + cat_id.toLowerCase();
				var select_filter = filters.find("[data-filter='" + cat_id + "']");

				if ( select_filter.length > 0 ) {
					def_cat 	= cat_id;
					select_filter.siblings().removeClass( 'uael-filter__current' );
					select_filter.addClass( 'uael-filter__current' );
				}
			}

			if ( filters.length > 0 ) {

				var def_filter = filters.data( 'default' );

				if ( '' !== def_filter ) {

					def_cat 	= def_filter;
					def_cat_sel = filters.find( '[data-filter="' + def_filter + '"]' );

					if ( def_cat_sel.length > 0 ) {
						def_cat_sel.siblings().removeClass( 'uael-filter__current' );
						def_cat_sel.addClass( 'uael-filter__current' );
					}

					if ( -1 == all_filters.indexOf( def_cat.replace('.', "") ) ) {
						def_cat = '*';
					}
				}
			}

			var $obj = {};

			selector.imagesLoaded( { background: '.item' }, function( e ) {

				$obj = selector.isotope({
					filter: def_cat,
					layoutMode: 'masonry',
					itemSelector: '.uael-video__gallery-item',
				});

				selector.find( '.uael-video__gallery-item' ).resize( function() {
					$obj.isotope( 'layout' );
				});
			});

			$scope.find( '.uael-video__gallery-filter' ).on( 'click', function() {

				$( this ).siblings().removeClass( 'uael-filter__current' );
				$( this ).addClass( 'uael-filter__current' );

				var value = $( this ).data( 'filter' );
				selector.isotope( { filter: value } );
			});
		}
	}

  $( window ).on( 'elementor/frontend/init', function () {
    elementorFrontend.hooks.addAction("frontend/element_ready/red-video-gallery.default", WidgetRedUAELVideoGalleryHandler);
  });
} )( jQuery );
