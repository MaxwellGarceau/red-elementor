<?php

namespace RedElementor\UltimateElementor\Widget_List;

use RedElementor\UltimateElementor\Classes\Red_Config;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Red_UAElementor_Widget_List {
  public function add_widget_list_filters() {
    add_filter( 'uael_widget_list', array( $this, 'add_to_widget_list' ) );
  }
  public function add_to_widget_list( $uael_widget_list ) {
    $this->red_widget_list = Red_Config::get_widget_list();
    return array_merge( $uael_widget_list, $this->red_widget_list );
  }
}
$red_uael_widget_list = new Red_UAElementor_Widget_List();
$red_uael_widget_list->add_widget_list_filters();
