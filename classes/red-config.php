<?php
/**
 * UAEL Config.
 *
 * @package UAEL
 */

namespace RedElementor\UltimateElementor\Classes;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// use UltimateElementor\Classes\UAEL_Helper;

/**
 * Class UAEL_Config.
 */
class Red_Config {


	/**
	 * Widget List
	 *
	 * @var widget_list
	 */
	public static $widget_list = null;

	/**
	 * Get Widget List.
	 *
	 * @since 0.0.1
	 *
	 * @return array The Widget List.
	 */
	public static function get_widget_list() {
		if ( null === self::$widget_list ) {
			self::$widget_list = array(
        'Red_Video_Gallery'    => array(
          'slug'      => 'red-video-gallery',
          'title'     => __( 'Red Video Gallery', RED_ELEMENTOR_TEXT_DOMAIN ),
          'keywords'  => [ 'uael', 'video', 'youtube', 'gallery', 'vimeo', 'red' ],
          'icon'      => 'uael-icon-video-gallery',
          'title_url' => '#',
          'default'   => true,
          'doc_url'   => 'https://uaelementor.com/docs-category/widgets/video-gallery/?utm_source=uael-pro-dashboard&utm_medium=uael-menu-page&utm_campaign=uael-pro-plugin',
        ),
			);
		}

		return self::$widget_list;
	}

	// /**
	//  * Returns Script array.
	//  *
	//  * @return array()
	//  * @since 0.0.1
	//  */
	// public static function get_widget_script() {
	// 	$folder = UAEL_Helper::get_js_folder();
	// 	$suffix = UAEL_Helper::get_js_suffix();
  //
	// 	$js_files = array(
	// 		'uael-frontend-script'  => array(
	// 			'path'      => 'assets/' . $folder . '/uael-frontend' . $suffix . '.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-cookie-lib'       => array(
	// 			'path'      => 'assets/' . $folder . '/js_cookie' . $suffix . '.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-modal-popup'      => array(
	// 			'path'      => 'assets/' . $folder . '/uael-modal-popup' . $suffix . '.js',
	// 			'dep'       => [ 'jquery', 'uael-cookie-lib' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-offcanvas'        => array(
	// 			'path'      => 'assets/' . $folder . '/uael-offcanvas' . $suffix . '.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-twenty-twenty'    => array(
	// 			'path'      => 'assets/' . $folder . '/jquery_twentytwenty' . $suffix . '.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-move'             => array(
	// 			'path'      => 'assets/' . $folder . '/jquery_event_move' . $suffix . '.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-fancytext-typed'  => array(
	// 			'path'      => 'assets/' . $folder . '/typed' . $suffix . '.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-fancytext-slidev' => array(
	// 			'path'      => 'assets/' . $folder . '/rvticker' . $suffix . '.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-google-maps'      => array(
	// 			'path'      => 'assets/' . $folder . '/uael-google-map' . $suffix . '.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-hotspot'          => array(
	// 			'path'      => 'assets/' . $folder . '/tooltipster' . $suffix . '.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-posts'            => array(
	// 			'path'      => 'assets/' . $folder . '/uael-posts' . $suffix . '.js',
	// 			'dep'       => [ 'jquery', 'imagesloaded' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-isotope'          => array(
	// 			'path'      => 'assets/js/isotope.pkgd.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-woocommerce'      => array(
	// 			'path'      => 'assets/' . $folder . '/uael-woocommerce' . $suffix . '.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-datatable'        => array(
	// 			'path'      => 'assets/js/jquery.datatables.min.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-table'            => array(
	// 			'path'      => 'assets/' . $folder . '/uael-table' . $suffix . '.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-particles'        => array(
	// 			'path'      => 'assets/' . $folder . '/uael-particles' . $suffix . '.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		/* Libraries */
	// 		'uael-element-resize'   => array(
	// 			'path'      => 'assets/lib/jquery-element-resize/jquery_resize.min.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-isotope'          => array(
	// 			'path'      => 'assets/lib/isotope/isotope.min.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-infinitescroll'   => array(
	// 			'path'      => 'assets/lib/infinitescroll/jquery.infinitescroll.min.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-fancybox'         => array(
	// 			'path'      => 'assets/lib/fancybox/jquery_fancybox.min.js',
	// 			'dep'       => [ 'jquery' ],
	// 			'in_footer' => true,
	// 		),
	// 		'uael-justified'        => array(
	// 			'path'      => 'assets/lib/justifiedgallery/justifiedgallery.min.js',
	// 			'dep'       => [ 'jquery', 'uael-frontend-script' ],
	// 			'in_footer' => true,
	// 		),
	// 	);
  //
	// 	return $js_files;
	// }
  //
	// /**
	//  * Returns Style array.
	//  *
	//  * @return array()
	//  * @since 0.0.1
	//  */
	// public static function get_widget_style() {
	// 	$folder = UAEL_Helper::get_css_folder();
	// 	$suffix = UAEL_Helper::get_css_suffix();
  //
	// 	if ( UAEL_Helper::is_script_debug() ) {
	// 		$css_files = array(
	// 			'uael-info-box'          => array(
	// 				'path' => 'assets/css/modules/info-box.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-heading'           => array(
	// 				'path' => 'assets/css/modules/heading.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-ba-slider'         => array(
	// 				'path' => 'assets/css/modules/ba-slider.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-buttons'           => array(
	// 				'path' => 'assets/css/modules/buttons.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-marketing-buttons' => array(
	// 				'path' => 'assets/css/modules/buttons.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-modal-popup'       => array(
	// 				'path' => 'assets/css/modules/modal-popup.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-offcanvas'         => array(
	// 				'path' => 'assets/css/modules/offcanvas.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-content-toggle'    => array(
	// 				'path' => 'assets/css/modules/content-toggle.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-caf-styler'        => array(
	// 				'path' => 'assets/css/modules/caf-styler.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-business-hours'    => array(
	// 				'path' => 'assets/css/modules/business-hours.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-cf7-styler'        => array(
	// 				'path' => 'assets/css/modules/cf-styler.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-gf-styler'         => array(
	// 				'path' => 'assets/css/modules/gform-styler.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-hotspot'           => array(
	// 				'path' => 'assets/css/modules/hotspot.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-post'              => array(
	// 				'path' => 'assets/css/modules/post.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-post-card'         => array(
	// 				'path' => 'assets/css/modules/post-card.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-post-event'        => array(
	// 				'path' => 'assets/css/modules/post-event.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-post-feed'         => array(
	// 				'path' => 'assets/css/modules/post-feed.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-post-news'         => array(
	// 				'path' => 'assets/css/modules/post-news.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-post-carousel'     => array(
	// 				'path' => 'assets/css/modules/post-carousel.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-post-business'     => array(
	// 				'path' => 'assets/css/modules/post-business.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-video-gallery'     => array(
	// 				'path' => 'assets/css/modules/video-gallery.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-fancybox'          => array(
	// 				'path' => 'assets/css/modules/jquery.fancybox.min.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-price-list'        => array(
	// 				'path' => 'assets/css/modules/price-list.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-price-table'       => array(
	// 				'path' => 'assets/css/modules/price-table.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-table'             => array(
	// 				'path' => 'assets/css/modules/table.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-image-gallery'     => array(
	// 				'path' => 'assets/css/modules/image-gallery.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-common'            => array(
	// 				'path' => 'assets/css/modules/common.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-timeline'          => array(
	// 				'path' => 'assets/css/modules/timeline.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-video'             => array(
	// 				'path' => 'assets/css/modules/video.css',
	// 				'dep'  => [],
	// 			),
	// 			'uael-particles'         => array(
	// 				'path' => 'assets/css/modules/particles.css',
	// 				'dep'  => [],
	// 			),
	// 		);
	// 	} else {
	// 		$css_files = array(
	// 			'uael-frontend' => array(
	// 				'path' => 'assets/min-css/uael-frontend.min.css',
	// 				'dep'  => [],
	// 			),
	// 		);
	// 	}
  //
	// 	if ( is_rtl() ) {
	// 		$css_files = array(
	// 			'uael-frontend' => array(
	// 				// This is autogenerated rtl file.
	// 				'path' => 'assets/min-css/uael-frontend-rtl.min.css',
	// 				'dep'  => [],
	// 			),
	// 		);
	// 	}
  //
	// 	if ( class_exists( 'WooCommerce' ) ) {
	// 		$css_files['uael-woocommerce'] = array(
	// 			'path' => 'assets/' . $folder . '/uael-woocommerce' . $suffix . '.css',
	// 			'dep'  => [],
	// 		);
	// 	}
  //
	// 	return $css_files;
	// }
}
