<?php
/**
 * Plugin's bootstrap file to launch the plugin.
 *
 *
 *
 * @wordpress-plugin
 * Plugin Name: Image Block with link text
 * Plugin URI:  https://gutenberg.courses
  * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

namespace SHinse\ImageWithLinkBlock;

//  Exit if accessed directly.
defined('ABSPATH') || exit;

/**
 * Gets this plugin's absolute directory path.
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_directory() {
	return __DIR__;
}

/**
 * Gets this plugin's URL.
 *
 * @since  2.1.0
 * @ignore
 * @access private
 *
 * @return string
 */
function _get_plugin_url() {
	static $plugin_url;

	if ( empty( $plugin_url ) ) {
		$plugin_url = plugins_url( null, __FILE__ );
	}

	return $plugin_url;
}

// Enqueue JS and CSS
include __DIR__ . '/lib/enqueue-scripts.php';

//add custom image size
function add_custom_img_size(){
	add_image_size( 'image-with-link-block', 400, 400, true );
}

add_action('after_setup_theme',__NAMESPACE__.'\add_custom_img_size');

// Register meta boxes
//include __DIR__ . '/lib/meta-boxes.php';

// Block Templates
//include __DIR__ . '/lib/block-templates.php';
// Dynamic Blocks
//include __DIR__ . '/blocks/12-dynamic/index.php';
