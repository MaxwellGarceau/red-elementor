<?php

/**
 * Plugin Name: RED Elementor Modules
 * Description: Custom Elementor modules made by RED Earth Design
 * Version: 0.0.1
 * Author: redearth
 * Author URI: https://redearthdesign.com
 * Text Domain: red-elementor
 */

if ( ! defined( 'ABSPATH' ) ) exit;
define( 'RED_ELEMENTOR_PATH', plugin_dir_path(__FILE__) );
define( 'RED_ELEMENTOR_URL', plugin_dir_url(__FILE__) );
define( 'RED_ELEMENTOR_TEXT_DOMAIN', 'red-elementor' );

// This file is pretty much a boilerplate WordPress plugin.
// It does very little except including wp-widget.php

require RED_ELEMENTOR_PATH . '/classes/red-config.php';
require RED_ELEMENTOR_PATH . '/uaelementor-integration/red-widget-list.php';

class ElementorCustomElement {

   private static $instance = null;

   public static function get_instance() {
      if ( ! self::$instance )
         self::$instance = new self;
      return self::$instance;
   }

   public function init() {
      add_action( 'elementor/widgets/widgets_registered', array( $this, 'widgets_registered' ), 9999999999 );
      add_action( 'elementor/frontend/after_register_scripts', array( $this, 'register_widget_scripts' ) );
      add_action( 'elementor/frontend/after_register_styles', array( $this, 'register_widget_styles' ) );
   }

   public function widgets_registered() {

     // We check if the Elementor and the UAElementor plugin has been installed / activated.
     // if(defined('ELEMENTOR_PATH') && class_exists('Elementor\Widget_Base') && defined('UAEL_BASE') && class_exists('UltimateElementor\Modules\VideoGallery\Widgets\Video_Gallery')){

         // We look for any theme overrides for this custom Elementor element.
         // If no theme overrides are found we use the default one in this plugin.

         $widget_file = 'plugins/elementor/red-video-gallery.php';
         $template_file = locate_template( $widget_file );
         if ( !$template_file || !is_readable( $template_file ) ) {
            $template_file = plugin_dir_path( __FILE__ ) . '/modules/red-video-gallery.php';
         }
         if ( $template_file && is_readable( $template_file ) ) {
            require_once $template_file;
         }
      // }
   }

   public function register_widget_scripts() {
     wp_enqueue_script( 'red-uaelementor-integration', RED_ELEMENTOR_URL . '/uaelementor-integration/js/red-uaelementor-integration.js', array( 'jquery' ) );
   }
   public function register_widget_styles() {
     wp_enqueue_style( 'red-video-gallery', RED_ELEMENTOR_URL . '/assets/css/modules/red-video-gallery.css' );
   }
}

ElementorCustomElement::get_instance()->init();
