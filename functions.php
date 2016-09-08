<?php

function my_scripts() {

	function register_vendor_script($script, $path) {
		wp_register_script($script, get_stylesheet_directory_uri().'/node_modules/'.$path);
	}

    //     <script src="node_modules/core-js/client/shim.min.js"></script>

    // <script src="node_modules/zone.js/dist/zone.js"></script>
    // <script src="node_modules/reflect-metadata/Reflect.js"></script>
    // <script src="node_modules/systemjs/dist/system.src.js"></script>

    // <script src="systemjs.config.js"></script>

	register_vendor_script('shim', 'core-js/client/shim.min.js');
	register_vendor_script('zone', 'zone.js/dist/zone.js');
	register_vendor_script('Reflect', 'reflect-metadata/Reflect.js');

	register_vendor_script('system', 'systemjs/dist/system.src.js');
	// register_vendor_script('Rx', 'rxjs/bundles/Rx.js');
	// register_vendor_script('angular2', 'angular2/bundles/angular2.dev.js');
    //     register_vendor_script('angular2-http', 'angular2/bundles/http.dev.js');

	wp_enqueue_script(
        	'system-start',
        	get_stylesheet_directory_uri().'/systemjs.config.js',
        	array('shim', 'zone', 'Reflect', 'system')
        );

	wp_localize_script(
		'system-start',
		'baseUrl',
		trailingslashit(get_template_directory_uri())
	);

}
add_action( 'wp_enqueue_scripts', 'my_scripts');

?>