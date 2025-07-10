import { store, getContext, getElement } from '@wordpress/interactivity';

const { state } = store( 'buntywp/the-guide-block', {
	state: {
		get showPrev() {
			const context = getContext();
			return context.currentStep > 1;
		},

		get showNext() {
			const context = getContext();
			return context.currentStep < context.totalSteps;
		},
	},
	actions: {
		gotoNextStep: () => {
			const context = getContext();

			if ( ! context.guideComplete ) {
				context.currentStep += 1;
			}

			if ( context.currentStep >= context.totalSteps ) {
				context.guideComplete = true;
			}
		},

		gotoPrevStep: () => {
			const context = getContext();
			context.guideComplete = false;

			if ( context.currentStep <= 1 ) {
				return;
			}

			context.currentStep -= 1;
		},

		showStepImage: () => {
			const context = getContext();

			state.stepImageSrc = context.imageUrl;
			state.isStepPopupOpen = true;
		},

		hideStepImage: () => {
			state.stepImageSrc = '';
			state.isStepPopupOpen = false;
		},
	},
	callbacks: {
		initClass: () => {
			const { ref } = getElement();

			ref.querySelector( '.step-card:first-child' ).classList.add(
				'show'
			);
		},

		watchContext: () => {
			const { currentStep } = getContext();
			const { ref } = getElement();

			const allStepCards = ref.querySelectorAll( '.step-card' );
			allStepCards.forEach( ( card ) => card.classList.remove( 'show' ) );
			ref.querySelector(
				'div[data-index="' + currentStep + '"]'
			).classList.add( 'show' );

			window.addEventListener( 'keydown', ( event ) => {
				if ( 'Escape' === event.key ) {
					store( 'buntywp/the-guide-block' ).actions.hideStepImage();
				}
			} );
		},
	},
} );
