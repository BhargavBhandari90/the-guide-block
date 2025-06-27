<?php
// This file is generated. Do not modify it manually.
return array(
	'the-guide-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'buntywp/the-guide-block',
		'version' => '1.0.0',
		'title' => 'The Guide Block',
		'category' => 'widgets',
		'icon' => 'welcome-learn-more',
		'description' => 'A block to display a step-by-step guide.',
		'example' => array(
			'attributes' => array(
				'steps' => array(
					array(
						'id' => 1,
						'step' => 'Step 1',
						'description' => 'Description for step 1',
						'imageUrl' => ''
					),
					array(
						'id' => 2,
						'step' => 'Step 2',
						'description' => 'Description for step 2',
						'imageUrl' => ''
					)
				),
				'isPreview' => true
			)
		),
		'supports' => array(
			'html' => false,
			'interactivity' => true,
			'shadow' => true,
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true,
				'__experimentalFontFamily' => true
			),
			'color' => array(
				'background' => true,
				'text' => true,
				'heading' => false
			),
			'spacing' => array(
				'margin' => true,
				'padding' => true
			),
			'__experimentalBorder' => array(
				'radius' => true,
				'color' => true,
				'width' => true,
				'style' => true,
				'__experimentalDefaultControls' => array(
					'color' => true,
					'radius' => true
				)
			)
		),
		'attributes' => array(
			'steps' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'blockId' => array(
				'type' => 'string'
			),
			'isPreview' => array(
				'type' => 'boolean',
				'default' => false
			),
			'showSuccessMessage' => array(
				'type' => 'boolean',
				'default' => true
			),
			'successMessage' => array(
				'type' => 'string',
				'default' => 'Congratulations! You\'ve completed the guide.'
			)
		),
		'textdomain' => 'the-guide-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScriptModule' => 'file:./view.js'
	)
);
