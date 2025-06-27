import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import {
	MediaUpload,
	RichText,
	useBlockProps,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	Button,
	TextControl,
	PanelBody,
	ToggleControl,
} from '@wordpress/components';
import { trash, seen, arrowLeft } from '@wordpress/icons';
import Preview from './component/preview';

import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { steps, blockId, isPreview, showSuccessMessage, successMessage } =
		attributes;

	// Set a unique blockId if not already set.
	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { blockId: clientId } );
		}
	}, [ blockId, clientId, setAttributes ] );

	const updateStep = ( index, key, value ) => {
		const newSteps = [ ...steps ];
		newSteps[ index ][ key ] = value;
		setAttributes( { steps: newSteps } );
	};

	const addStep = () => {
		setAttributes( {
			steps: [ ...steps, { description: '', step: '', imageUrl: '' } ],
		} );
	};

	const removeStep = ( index ) => {
		const newSteps = steps.filter( ( _, i ) => i !== index );
		setAttributes( { steps: newSteps } );
	};

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'how-to-guide-block' ) }>
					<ToggleControl
						__nextHasNoMarginBottom
						checked={ showSuccessMessage }
						label={ __(
							'Show Success Message at the end.',
							'how-to-guide-block'
						) }
						onChange={ () => {
							setAttributes( {
								showSuccessMessage: ! showSuccessMessage,
							} );
						} }
					/>
					{ showSuccessMessage && (
						<TextControl
							label={ __(
								'Success Message',
								'how-to-guide-block'
							) }
							value={ successMessage }
							onChange={ ( val ) =>
								setAttributes( { successMessage: val } )
							}
							placeholder={ __(
								'Enter your success message here',
								'how-to-guide-block'
							) }
						/>
					) }
				</PanelBody>
			</InspectorControls>
			<div className="step-header-action">
				{ isPreview ? (
					<Button
						icon={ arrowLeft }
						iconPosition="right"
						className="step-edit-button"
						onClick={ () => setAttributes( { isPreview: false } ) }
					></Button>
				) : (
					<Button
						className="step-preview-button"
						variant="tertiary"
						onClick={ () => setAttributes( { isPreview: true } ) }
						icon={ seen }
					></Button>
				) }
			</div>

			{ isPreview ? (
				<Preview atts={ attributes } />
			) : (
				<>
					<div className="steps-list">
						{ steps.map( ( step, index ) => (
							<div key={ index } className="step-card">
								<h4>Step { index + 1 }</h4>
								<TextControl
									label={ __(
										'Step Title',
										'how-to-guide-block'
									) }
									value={ step.step }
									onChange={ ( val ) =>
										updateStep( index, 'step', val )
									}
								/>
								<div
									className={ `step-image-container ${
										step.imageUrl ? 'has-image' : 'no-image'
									}` }
								>
									<MediaUpload
										onSelect={ ( media ) =>
											updateStep(
												index,
												'imageUrl',
												media.url
											)
										}
										allowedTypes={ [ 'image' ] }
										render={ ( { open } ) => (
											<Button
												onClick={ open }
												variant="primary"
											>
												{ step.imageUrl
													? 'Change Image'
													: 'Upload Image' }
											</Button>
										) }
									/>
									{ step.imageUrl && (
										<img
											src={ step.imageUrl }
											alt=""
											className="step-image"
										/>
									) }
								</div>
								<RichText
									tagName="p"
									className="step-description"
									label={ __(
										'Add Step Description',
										'how-to-guide-block'
									) }
									value={ step.description }
									onChange={ ( val ) =>
										updateStep( index, 'description', val )
									}
									placeholder={ __(
										'Step description',
										'how-to-guide-block'
									) }
								/>
								<div className="step-actions">
									<Button
										className="remove-step-button"
										variant="secondary"
										onClick={ () => removeStep( index ) }
										icon={ trash }
										isDestructive
									></Button>
								</div>
							</div>
						) ) }
					</div>

					<Button
						onClick={ addStep }
						variant="primary"
						style={ { marginTop: 10 } }
					>
						+ Add Step
					</Button>
				</>
			) }
		</div>
	);
}
