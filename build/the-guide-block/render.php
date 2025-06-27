<?php
/**
 * Render block.
 *
 * @package HowToGuide
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$context = array(
	'post_id'        => get_the_ID(),
	'steps'          => isset( $attributes['steps'] )
		? array_map(
			function ( $step, $key ) {
				if ( ! is_array( $step ) ) {
					return array(
						'index'       => $key + 1,
						'step'        => '',
						'description' => '',
					);
				}
				return array(
					'index'       => $key + 1,
					'step'        => isset( $step['step'] ) ? $step['step'] : '',
					'description' => isset( $step['description'] ) ? $step['description'] : '',
					'imageUrl'    => isset( $step['imageUrl'] ) ? $step['imageUrl'] : '',
				);
			},
			$attributes['steps'],
			array_keys( $attributes['steps'] )
		)
		: array(),
	'totalSteps'     => isset( $attributes['steps'] ) ? count( $attributes['steps'] ) : 0,
	'currentStep'    => 1,
	'guideComplete'  => false,
	'showStep'       => false,
	'successMessage' => $attributes['successMessage'],
	'blockId'        => $attributes['blockId'],
);

wp_interactivity_state(
	'buntywp/how-to-guide',
	array(
		'isStepPopupOpen' => false,
		'stepImageSrc'    => '',
	)
);

?>

<div
	<?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>
	data-wp-interactive="buntywp/how-to-guide"
	<?php echo wp_kses_data( wp_interactivity_data_wp_context( $context ) ); ?>
	data-wp-init--class="callbacks.initClass"
	data-wp-watch--context="callbacks.watchContext"
>
	<div class="steps-list"data-wp-each--step="context.steps">
		<?php
		if ( ! empty( $context['steps'] ) && is_array( $context['steps'] ) ) {

			foreach ( $context['steps'] as $step ) {

				if ( empty( $step ) || ! is_array( $step ) ) {
					continue;
				}
				?>
				<div data-wp-key="<?php echo esc_attr( $step['index'] ); ?>" data-wp-init="callbacks.logTimeInit" class="step-card <?php echo ( 1 === intval( $step['index'] ) ) ? 'show' : ''; ?>" data-index="<?php echo esc_attr( $step['index'] ); ?>">
					<div class="step-title"><?php echo esc_html( $step['step'] ); ?></div>

					<?php if ( ! empty( $step['imageUrl'] ) ) : ?>
					<div class="step-image" <?php echo wp_kses_data( wp_interactivity_data_wp_context( $step ) ); ?>>
						<img class="step-image" src="<?php echo esc_url( $step['imageUrl'] ); ?>" alt="<?php echo 'Step ' . esc_attr( $step['index'] ); ?>" loading="lazy">
						<button
							class="step-lightbox-trigger"
							type="button"
							aria-haspopup="dialog"
							aria-label="Enlarge"
							data-wp-on--click="actions.showStepImage"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="12"
								height="12"
								fill="none"
								viewBox="0 0 12 12"
							>
								<path
									fill="#fff"
									d="M2 0a2 2 0 0 0-2 2v2h1.5V2a.5.5 0 0 1 .5-.5h2V0H2Zm2 10.5H2a.5.5 0 0 1-.5-.5V8H0v2a2 2 0 0 0 2 2h2v-1.5ZM8 12v-1.5h2a.5.5 0 0 0 .5-.5V8H12v2a2 2 0 0 1-2 2H8Zm2-12a2 2 0 0 1 2 2v2h-1.5V2a.5.5 0 0 0-.5-.5H8V0h2Z"
								/>
							</svg>
						</button>
					</div>
					<?php endif; ?>

					<div class="step-text"><?php echo wp_kses_post( $step['description'] ); ?></div>
				</div>
				<?php
			}
		}
		?>
		<div class="step-buttons">
			<button class="back-step-btn" data-wp-class--no-visible="!state.showPrev" data-wp-on--click="actions.gotoPrevStep">
				<img src="<?php echo esc_url( trailingslashit( BB_TGB_URL ) . 'assets/image/arrow-left.svg' ); ?>" alt="<?php esc_attr_e( 'Back', 'the-guide-block' ); ?>" loading="lazy">
			</button>
			<h3 class="step-heading">Step <span data-wp-text="context.currentStep"></span> of <span data-wp-text="context.totalSteps"></span></h3>
			<button class="next-step-btn" data-wp-class--no-visible="!state.showNext" data-wp-on--click="actions.gotoNextStep">
				<img src="<?php echo esc_url( trailingslashit( BB_TGB_URL ) . 'assets/image/arrow-right.svg' ); ?>" alt="<?php esc_attr_e( 'Next', 'the-guide-block' ); ?>" loading="lazy">
			</button>
		</div>
	</div>
	<?php if ( ! empty( $attributes['showSuccessMessage'] ) ) : ?>
		<div class="guide-complete" data-wp-class--hide="!context.guideComplete"><p data-wp-text="context.successMessage"></p></div>
	<?php endif; ?>
	<div
		class="step-images-grid single-image"
		data-wp-class--hide="!state.isStepPopupOpen"
	>
		<div class="step-image-item full-width">
			<img data-wp-bind--src="state.stepImageSrc" />
			<button
				type="button"
				aria-label="<?php esc_attr_e( 'Press ESC to Cloese', 'the-guide-block' ); ?>"
				class="remove-popup-button"
				data-wp-on-async--click="actions.hideStepImage"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="20"
					height="20"
					aria-hidden="true"
					focusable="false"
				>
					<path d="m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z"></path>
				</svg>
			</button>
		</div>
	</div>
</div>
