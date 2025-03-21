<?php
/**
 * Plugin Name: Renovation Bridge
 * Description: Renovation Bridge application integrated as a WordPress plugin
 * Version: 0.1.0
 * Author: Renovation Bridge Team
 */

// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Register scripts and styles from the Next.js build
function renovationbridge_register_assets() {
    // Get the plugin directory URL
    $plugin_url = plugin_dir_url(__FILE__);
    
    // Register the Next.js application assets
    wp_register_script('renovationbridge-js', $plugin_url . 'out/_next/static/chunks/main.js', array(), '0.1.0', true);
    wp_register_style('renovationbridge-css', $plugin_url . 'out/_next/static/css/main.css', array(), '0.1.0');
}
add_action('wp_enqueue_scripts', 'renovationbridge_register_assets');

// Add shortcode to embed the application
function renovationbridge_shortcode($atts) {
    // Enqueue the assets
    wp_enqueue_script('renovationbridge-js');
    wp_enqueue_style('renovationbridge-css');
    
    // Return the container for the Next.js app
    return '<div id="renovationbridge-root"></div>';
}
add_shortcode('renovationbridge', 'renovationbridge_shortcode');

// Add admin page
function renovationbridge_admin_menu() {
    add_menu_page(
        'Renovation Bridge',
        'Renovation Bridge',
        'manage_options',
        'renovationbridge',
        'renovationbridge_admin_page',
        'dashicons-admin-multisite',
        30
    );
}
add_action('admin_menu', 'renovationbridge_admin_menu');

// Admin page content
function renovationbridge_admin_page() {
    ?>
    <div class="wrap">
        <h1>Renovation Bridge</h1>
        <p>Use the shortcode <code>[renovationbridge]</code> to embed the Renovation Bridge application on any page or post.</p>
        <h2>Instructions</h2>
        <ol>
            <li>The application is built as a static Next.js export</li>
            <li>Files are located in the <code>/out</code> directory of this plugin</li>
            <li>For updates, rebuild the Next.js application and deploy to this plugin directory</li>
        </ol>
    </div>
    <?php
} 