<?php

/**
 * Plugin Name: Help Me Help You
 * Version 0.1.0
 */

namespace HMHY;
if ( is_admin() ) {
	add_action( 'init', function () {
		wp_register_script( 'help-me-help-you', plugins_url( 'hmhy.js', __FILE__ ), [ ], null, true );
	} );
	add_action( 'admin_footer', function () {
		wp_localize_script( 'help-me-help-you', 'HMHY', [
			'ids' => apply_filters( 'hmhy_link_ids', [ ] )
		] );
	} );
}

function help_link( $text, $id ) {
	$id   = esc_attr( $id );
	$text = esc_html( $text );
	add_filter( 'hmhy_link_ids', function ( $ids ) use ( $id ) {
		$ids[] = $id;
	} );
	echo "<a href=\"#\" id=\"hmhy_$id\" data-hmhy-id=\"$id\">$text</a>";
	wp_enqueue_script( 'help-me-help-you' );
}
