( function( $ ) {

	"use strict";

	var ee = {

		isAdminBar : function() {
			return $('body').is('.admin-bar');
		},

		init : function() {

			var widgets = {
				'ee-red-switcher.classic': 			ee.Switcher
			};

			// var globals = {
			// 	'sticky': 						ee.Sticky,
			// 	'parallax': 					ee.ParallaxElement,
			// 	'global-tooltip': 				ee.GlobalTooltip,
			// };
			//
			// var sections = {
			// 	'parallax-background': 			ee.ParallaxBackground,
			// };

		// 	$.each( widgets, function( widget, callback ) {
		// 		if ( 'object' ===  typeof callback ) {
		// 			$.each( callback, function( index, cb ) {
		// 				elementorFrontend.hooks.addAction( 'frontend/element_ready/' + widget, cb );
		// 			});
		// 		} else {
		// 			elementorFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
		// 		}
		// 	});
		//
		// 	$.each( globals, function( extension, callback ) {
		// 		elementorFrontend.hooks.addAction( 'frontend/element_ready/global', callback );
		// 	});
		//
		// 	$.each( sections, function( extension, callback ) {
		// 		elementorFrontend.hooks.addAction( 'frontend/element_ready/section', callback );
		// 	});
		},
		//
		getRefreshableWidgets : function() {
			if ( ! elementorExtrasFrontendConfig )
				return false;

			return elementorExtrasFrontendConfig.refreshableWidgets;
		},

		getGlobalSettings : function( section ) {

			if ( section in elementorFrontendConfig.settings ) {
				return elementorFrontendConfig.settings[section];
			}

			return false;
		},

		getItems : function ( items, itemKey ) {
			if ( itemKey) {
				var keyStack = itemKey.split('.'),
					currentKey = keyStack.splice(0, 1);

				if ( ! keyStack.length ) {
					return items[ currentKey ];
				}

				if ( ! items[ currentKey ] ) {
					return;
				}

				return this.getItems( items[ currentKey ], keyStack.join('.'));
			}

			return items;
		},

		getElementSettings : function( $element, setting ) {

			var elementSettings = {},
				modelCID 		= $element.data( 'model-cid' );

			if ( elementorFrontend.isEditMode() && modelCID ) {
				var settings 		= elementorFrontend.config.elements.data[ modelCID ],
					type 			= settings.attributes.widgetType || settings.attributes.elType,
					settingsKeys 	= elementorFrontend.config.elements.keys[ type ];

				if ( ! settingsKeys ) {
					settingsKeys = elementorFrontend.config.elements.keys[type] = [];

					jQuery.each( settings.controls, function ( name, control ) {
						if ( control.frontend_available ) {
							settingsKeys.push( name );
						}
					});
				}

				jQuery.each( settings.getActiveControls(), function( controlKey ) {
					if ( -1 !== settingsKeys.indexOf( controlKey ) ) {
						elementSettings[ controlKey ] = settings.attributes[ controlKey ];
					}
				} );
			} else {
				elementSettings = $element.data('settings') || {};
			}

			return ee.getItems( elementSettings, setting );
		},

		getElementType : function ( $element ) {
			if ( 'section' === $element.data( 'element_type' ) || 'column' === $element.data( 'element_type' ) ) {
				return $element.data( 'element_type' );
			}

			return 'widget';
		},

		getElementSkin : function ( $element ) {
			return $element.attr('data-widget_type').split('.')[1];
		},

		getUniqueScopeId : function( $scope ) {
			var scopeId = $scope.data('id'),
				$clones = $( '[data-id="' + scopeId + '"]' );

			if ( ! ee.hasMultipleScopeId( scopeId ) ) {
				return scopeId;
			}

			$clones.each( function( index ) {
				$(this).attr( 'data-offcanvas-index', index );
			});

			scopeId = scopeId + '_' + $scope.data('offcanvas-index');

			return scopeId;
		},

		refreshWidgets : function( $container, refreshable ) {
			$container.each( function() {
				$(this).find( '.elementor-widget' ).each( function() {
					ee.refreshWidget( $(this), refreshable );
				});
			});
		},

		refreshWidget : function( $widget, refreshable ) {
			var widgetType = $widget.data('widget_type');

			if ( refreshable ) { // Refresh only if it's an extras refreshable widgets
				$.each( ee.getRefreshableWidgets(), function( index, widget ) {
					if ( widget === widgetType ) {
						elementorFrontend.elementsHandler.runReadyTrigger( $widget );
					}
				});
			} else {
				elementorFrontend.elementsHandler.runReadyTrigger( $widget );
			}
		},

		hasMultipleScopeId : function( scopeId ) {
			var $clones = $( '[data-id="' + scopeId + '"]' );

			if ( 1 === $clones.length ) {
				return false;
			}

			return true;
		},

		getWindow : function() {
			return elementorFrontend.isEditMode() ? window.elementor.$previewContents : $(window);
		},

		onElementRemove : function( $element, callback ) {
			if ( elementorFrontend.isEditMode() ) {
				// Make sure sticky is destroyed when element is removed in editor mode
				elementor.channels.data.on( 'element:before:remove', function ( model ) {
					if ( $element.data('id') === model.id ) {
						callback();
					}
				});
			}
		},

		////////////////////////////////////////////
		// Switcher 							////
		////////////////////////////////////////////

		Switcher : function( $scope, $ ) {

			ee.Switcher.elementSettings 	= ee.getElementSettings( $scope );

			var $media 			= $scope.find( '.ee-switcher__media-wrapper' ),
				$content 		= $scope.find( '.ee-switcher__titles' ),
				switcherArgs 	= {
					mediaEffect 		: ee.Switcher.elementSettings.effect_media,
					contentEffect 		: ee.Switcher.elementSettings.effect_title,
					entranceAnimation 	: 'yes' === ee.Switcher.elementSettings.effect_entrance,
					contentEffectZoom 	: 'yes' === ee.Switcher.elementSettings.effect_media_zoom,
					contentStagger		: 'yes' === ee.Switcher.elementSettings.effect_title_stagger,
					autoplay 			: 'yes' === ee.Switcher.elementSettings.autoplay,
					loop 				: 'yes' === ee.Switcher.elementSettings.loop,
					cancelOnInteraction : 'yes' === ee.Switcher.elementSettings.autoplay_cancel,
					changeBackground 	: 'yes' === ee.Switcher.elementSettings.background_switcher,
				},
				mediaParallaxArgs = {
					type 	: 'mouse',
					mouse 	: {
						relative : 'viewport',
						axis 	 : ee.Switcher.elementSettings.parallax_pan_axis,
					},
					speed 	: {
						desktop: 0.20
					},
				},
				titleParallaxArgs = {
					type 	: 'mouse',
					invert 	: true,
					mouse 	: {
						relative : 'viewport',
						axis 	 : ee.Switcher.elementSettings.parallax_pan_axis,
					},
					speed 	: {
						desktop: 0.20
					},
				};

			ee.Switcher.maybeDestroy = function() {
				if ( $scope.data( 'eeSwitcher' ) ) {
					$scope.data( 'eeSwitcher' ).destroy();
				}

				if ( $media.data( 'parallaxElement' ) ) {
					$media.data( 'parallaxElement' ).destroy();
				}

				if ( $content.data( 'parallaxElement' ) ) {
					$content.data( 'parallaxElement' ).destroy();
				}
			};

			ee.Switcher.init = function() {

				if ( elementorFrontend.isEditMode() ) {
					switcherArgs.scope 			= window.elementor.$previewContents;
					mediaParallaxArgs.scope 	= window.elementor.$previewContents;
					mediaParallaxArgs.scope 	= window.elementor.$previewContents;

					if ( 'yes' === ee.Switcher.elementSettings.autoplay && 'yes' !== ee.Switcher.elementSettings.autoplay_preview ) {
						switcherArgs.autoplay = false;
					}

					if ( 'yes' === ee.Switcher.elementSettings.effect_entrance && 'yes' !== ee.Switcher.elementSettings.effect_entrance_preview ) {
						switcherArgs.entranceAnimation = false;
					}
				}

				if ( 'yes' === ee.Switcher.elementSettings.autoplay ) {
					if ( ee.Switcher.elementSettings.duration.size ) {
						switcherArgs.duration = ee.Switcher.elementSettings.duration.size;
					}
				}

				if ( ee.Switcher.elementSettings.speed.size ) {
					switcherArgs.speed = ee.Switcher.elementSettings.speed.size;
				}

				if ( 'yes' === ee.Switcher.elementSettings.parallax_enable ) {
					if ( 'undefined' !== typeof ee.Switcher.elementSettings.parallax_amount && '' !== ee.Switcher.elementSettings.parallax_amount.size ) {
						mediaParallaxArgs.speed.desktop = ee.Switcher.elementSettings.parallax_amount.size;
						titleParallaxArgs.speed.desktop = ee.Switcher.elementSettings.parallax_amount.size;
					}

					$media.parallaxElement( mediaParallaxArgs );
					$content.parallaxElement( titleParallaxArgs );
				}

				switch ( ee.Switcher.elementSettings.background_switcher_element ) {
					case 'widget':
						switcherArgs.background = $scope.find('.elementor-widget-container');
						break;
					case 'section':
						switcherArgs.background = $scope.parents('.elementor-section').first();
						break;
					default:
						switcherArgs.background = elementorFrontend.isEditMode() ? switcherArgs.scope.find('body') : $('body');
				}

				$scope.eeSwitcher( switcherArgs );

				ee.onElementRemove( $scope, function() {
					ee.Switcher.maybeDestroy();
				});
			};

			ee.Switcher.maybeDestroy();
			ee.Switcher.init();
		},
	};

	// var ElementorExtrasUtils = {
	//
	// 	timer : null,
	//
	// 	countDecimals : function ( value ) {
	// 		if( Math.floor( value ) === value ) return 0;
	// 		return value.toString().split(".")[1].length || 0;
	// 	},
	//
	// 	parseValue : function ( value, _default ) {
	// 		var _value = value;
	//
	// 		if ( 'string' === typeof _value ) {
	// 			_value = _value.replace(/\s/g, '');
	// 			_value = _value.replace( ',', '.' );
	//
	// 			if ( _value.indexOf('/') > -1 ) {
	// 				var _div_value = _value.split('/');
	//
	// 				if ( ! isNaN( _div_value[0] ) && ! isNaN( _div_value[1] ) ) {
	// 					_div_value = parseInt(_div_value[0]) / _div_value[1];
	// 					_value = _div_value * 100;
	// 					_value = _value.toFixed( 0 );
	// 				}
	// 			}
	// 		}
	//
	// 		if ( ! isNaN( _value ) ) {
	// 			_value = Math.abs( parseFloat( _value ) );
	// 		} else {
	// 			_value = _default;
	// 		}
	// 		return _value;
	// 	},
	//
	// 	findObjectByKey : function( array, key, value ) {
	// 		for ( var i = 0; i < array.length; i++ ) {
	// 			if ( array[ i ][ key ] === value ) {
	// 				return array[ i ];
	// 			}
	// 		}
	// 		return null;
	// 	},
	//
	// 	moveDecimal : function( n, x ) {
	// 		var v = n / Math.pow( 10, x );
	// 			v = ( v > 1 ) ? Math.round( v ) : Math.round( v * Math.pow ( 10, x + 1 ) ) / Math.pow ( 10, x + 1 );
	// 		return v;
	// 	},
	//
	// 	trackLeave : function (ev) {
	// 		if ( ev.clientY > 0 ) {
	// 			return;
	// 		}
	//
	// 		if ( ElementorExtrasUtils.timer ) {
	// 			clearTimeout( ElementorExtrasUtils.timer );
	// 		}
	//
	// 		if ( $.exitIntent.settings.sensitivity <= 0 ) {
	// 			$.event.trigger('exitintent');
	// 			return;
	// 		}
	//
	// 		ElementorExtrasUtils.timer = setTimeout( function() {
	// 			ElementorExtrasUtils.timer = null;
	// 			$.event.trigger( 'exitintent' );
	// 		}, $.exitIntent.settings.sensitivity );
	// 	},
	//
	// 	serializeObject : function( data ) {
	// 		var o = {};
	// 		var a = data.serializeArray();
	//
	// 		$.each(a, function() {
	// 			if (!this.value) return;
	// 			if (o[this.name]) {
	// 				if (!o[this.name].push) {
	// 					o[this.name] = [o[this.name]];
	// 				}
	// 				o[this.name].push(this.value || '');
	// 			} else {
	// 				o[this.name] = this.value || '';
	// 			}
	// 		});
	// 		return o;
	// 	},
	//
	// 	trackEnter : function() {
	// 		if ( ElementorExtrasUtils.timer ) {
	// 			clearTimeout( ElementorExtrasUtils.timer );
	// 			ElementorExtrasUtils.timer = null;
	// 		}
	// 	},
	// };
	//
	// window.ElementorExtrasOffcanvas = function() {
	// 	var self = this;
	//
	// 	self.initialized 	= false;
	// 	self.controller 	= null;
	//
	// 	self.init = function() {
	// 		self.controller = new slidebars();
	// 		self.controller.init();
	// 		self.initialized = true;
	// 	};
	// };
	//
	// var offcanvas = new ElementorExtrasOffcanvas();
	//
	// elementorFrontend.eeOffcanvas = offcanvas;
	//
	// window.eeTooltips = function() {
	// 	var self = this;
	//
	// 	self.remove = function( $scope ) {
	//
	// 		if ( $scope.length ) {
	// 			// Remove just the tooltips within the scope
	// 			var scopeId = $scope.data('id'),
	// 				$hotips = $( '.hotip-tooltip[data-target-id="' + scopeId + '"]' );
	// 		} else {
	//
	// 			// Remove all tooltips on page
	// 			$hotips = $( '.hotip-tooltip' );
	// 		}
	//
	// 		if ( $hotips.length ) {
	// 			$hotips.remove();
	// 		}
	// 	};
	// };
	//
	// window.eeSticky = function( $scope, settings ) {
	// 	var self            = this,
	// 		$stickyParent 	= null,
	// 		$stickyElement 	= $scope,
	// 		$column 		= $scope.closest('.elementor-column'),
	// 		$section 		= $scope.closest('.elementor-section'),
	// 		$selector 		= null,
	// 		$window 		= ee.getWindow(),
	// 		$body 			= elementorFrontend.isEditMode() ? window.elementor.$previewContents.find('body') : $('body'),
	//
	// 		customParent 	= false,
	// 		timeout 		= null,
	// 		instance 		= null,
	// 		breakpoint 		= 'tablet' === settings.sticky_unstick_on ? 1023 : 767,
	//
	// 		stickyArgs 		= {
	// 			top 			: ( ee.isAdminBar() ) ? 32 : 0,
	// 			stickyClass 	: 'ee-sticky--stuck',
	// 			followScroll	: 'yes' === settings.sticky_follow_scroll,
	// 			bottomEnd		: 0,
	// 			responsive		: {},
	// 		};
	//
	// 	self.isEnabled = function() {
	// 		return 'yes' === settings.sticky_enable;
	// 	};
	//
	// 	self.getStickyContainer = function() {
	//
	// 		var $container = $scope.parent();
	//
	// 		if ( '' === settings.sticky_parent ) { // Column
	// 			$container = ( 'widget' === ee.getElementType( $scope ) ) ? $column : $container;
	// 		} else if ( 'section' === settings.sticky_parent ) { // Section
	// 			$container = ( 'widget' === ee.getElementType( $scope ) ) ? $section : $container;
	// 		} else if ( 'body' === settings.sticky_parent ) { // Body
	// 			$container = $('body');
	// 		} else if ( 'custom' === settings.sticky_parent && '' !== settings.sticky_parent_selector ) { // Custom
	// 			if ( $scope.closest( settings.sticky_parent_selector ).length ) {
	// 				$container = $scope.closest( settings.sticky_parent_selector );
	// 			}
	// 		}
	// 		return $container;
	// 	};
	//
	// 	self.setStickyParent = function() {
	// 		$stickyParent = $scope.parent();
	// 		$stickyParent.addClass( 'ee-sticky-parent' );
	// 		stickyArgs.stickTo = $stickyParent.get(0);
	// 	};
	//
	// 	self.getBottomEndValue = function( $element ) {
	// 		return ( ( $element.offset().top + $element.outerHeight() ) - ( $stickyParent.offset().top + $stickyParent.outerHeight() ) ) * -1;
	// 	};
	//
	// 	self.getBottomEnd = function() {
	// 		var bottomEnd = 0;
	//
	// 		bottomEnd += self.getBottomEndValue( self.getStickyContainer() );
	//
	// 		if ( settings.sticky_offset_bottom ) {
	// 			bottomEnd += settings.sticky_offset_bottom.size;
	// 		}
	//
	// 		return bottomEnd;
	// 	};
	//
	// 	self.setBottomEnd = function() {
	// 		stickyArgs.bottomEnd = self.getBottomEnd();
	// 	};
	//
	// 	self.events = function() {
	// 		self.getStickyContainer()._resize( self.onResize );
	//
	// 		ee.onElementRemove( $scope, function() {
	// 			$stickyElement.hcSticky( 'detach' );
	// 		});
	// 	};
	//
	// 	self.onResize = function() {
	// 		self.setBottomEnd();
	// 		self.update();
	// 	};
	//
	// 	self.update = function() {
	// 		$stickyElement.hcSticky( 'update', stickyArgs );
	// 	};
	//
	// 	self.init = function() {
	//
	// 		if ( $stickyElement.data( 'hcSticky' ) )
	// 			$stickyElement.hcSticky( 'destroy' );
	//
	// 		// Exit if sticky not enabled
	// 		if ( ! self.isEnabled() || ! $stickyElement.length )
	// 			return;
	//
	// 		// Set sticky parent element
	// 		self.setStickyParent();
	//
	// 		if ( ! $stickyParent.length )
	// 			return;
	//
	// 		self.setBottomEnd();
	//
	// 		stickyArgs.onStart = function() {
	// 			$stickyParent.addClass( 'ee-sticky-parent--stuck' );
	// 		};
	//
	// 		stickyArgs.onStop = function() {
	// 			$stickyParent.removeClass( 'ee-sticky-parent--stuck' );
	// 		};
	//
	// 		stickyArgs.onResize = self.onResize();
	//
	// 		// Set offset option
	// 		if ( settings.sticky_offset ) {
	// 			stickyArgs.top += settings.sticky_offset.size;
	// 		}
	//
	// 		// Set responsive options
	// 		if ( 'none' !== settings.sticky_unstick_on ) {
	// 			stickyArgs.responsive[ breakpoint ] = {
	// 				disable: true
	// 			};
	// 		}
	//
	// 		$stickyElement
	// 			.addClass( 'ee-sticky' )
	// 			.hcSticky( stickyArgs );
	//
	// 		if ( elementorFrontend.isEditMode() ) {
	// 			self.update();
	// 		}
	//
	// 		self.events();
	// 	};
	// };
	//
	// $.exitIntent = function( enable, options ) {
	// 	$.exitIntent.settings = $.extend($.exitIntent.settings, options);
	//
	// 	if ( enable == 'enable' ) {
	// 		$(window).mouseleave( ElementorExtrasUtils.trackLeave );
	// 		$(window).mouseenter( ElementorExtrasUtils.trackEnter );
	// 	} else if ( enable == 'disable' ) {
	// 		trackEnter(); // Turn off any outstanding timer
	// 		$(window).unbind( 'mouseleave', ElementorExtrasUtils.trackLeave );
	// 		$(window).unbind( 'mouseenter', ElementorExtrasUtils.trackEnter );
	// 	} else {
	// 		throw "Invalid parameter to jQuery.exitIntent -- should be 'enable'/'disable'";
	// 	}
	// }
	//
	// $.exitIntent.settings = {
	// 	'sensitivity': 300
	// };

	// $( window ).on( 'elementor/frontend/init', ee.init );

	$( window ).on( 'elementor/frontend/init', function () {
		elementorFrontend.hooks.addAction("frontend/element_ready/ee-red-switcher.classic", ee.Switcher);
	});

}( jQuery ) );

// Custom JS
( function( $ ) {
	$(document).ready(function() {

		var slideNum = 1; // Starting slide position
		var prevArrow = $('.ee-arrow--prev');
		var nextArrow = $('.ee-arrow--next');
		var arrows = $('.ee-switcher__arrows');
		var animationTime = 2500; // 2.5 seconds

		prevArrow.on('click', function(e) {
			slideNum -= 1;
			arrowPointerEvents();
			updateGroupNumber(slideNum, e);
		});
		nextArrow.on('click', function(e) {
			slideNum += 1;
			arrowPointerEvents();
			updateGroupNumber(slideNum, e);
		});

		// Helper Functions
		function arrowPointerEvents() {
			arrows.css('pointer-events', 'none');
			setTimeout(function() {
				arrows.css('pointer-events', 'auto');
			}, animationTime);
		}

		// Update Switcher Functions
		function updateGroupNumber(num, event) {
			var container = $(event.target).closest('.elementor-widget-ee-red-switcher');
			var currentNumber = container.find('.ee-switcher__group-number .current-number');
			currentNumber.fadeOut();
			currentNumber.text(num);
			currentNumber.fadeIn();
		}

	});
})(jQuery);
