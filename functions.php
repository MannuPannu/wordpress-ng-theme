<?php

function my_scripts() {

	function register_vendor_script($script, $path) {
		wp_register_script($script, get_stylesheet_directory_uri().'/node_modules/'.$path);
	}

	function register_vendor_style($style, $path) {
		wp_register_style($style, get_template_directory_uri().'/'.$path);
	}

	register_vendor_style("normalize", "normalize.css");
	register_vendor_style("skeleton", "skeleton.css");
	register_vendor_style("main", "main.css");

	register_vendor_script('shim', 'core-js/client/shim.min.js');
	register_vendor_script('zone', 'zone.js/dist/zone.js');
	register_vendor_script('Reflect', 'reflect-metadata/Reflect.js');
	register_vendor_script('system', 'systemjs/dist/system.src.js');

	wp_enqueue_script(
        	'system-start',
        	get_stylesheet_directory_uri().'/systemjs.config.js',
        	array('shim', 'zone', 'Reflect', 'system')
        );

    wp_enqueue_style(array('normalize', 'skeleton', 'main'));

	wp_localize_script(
		'system-start',
		'baseUrl',
		trailingslashit(get_template_directory_uri())
	);

}
add_action( 'wp_enqueue_scripts', 'my_scripts');

?>