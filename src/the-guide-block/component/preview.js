import { __ } from '@wordpress/i18n';
import previewImage from '../public/dummy-image.jpg';
import arrowLeft from '../public/arrow-left.svg';
import arrowRight from '../public/arrow-right.svg';

export default function Preview( props ) {

    return (
        <>
        <div className="steps-list">
            <div className="step-card">
                <div className="step-title">{__('Step Title goes here', 'how-to-guide-block')}</div>
                <div className="step-image">
                    <img className="step-image" src={previewImage} alt="Preview Image" loading="lazy" />
                    <button
                        className="step-lightbox-trigger"
                        type="button"
                        aria-haspopup="dialog"
                        aria-label="Enlarge"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={12}
                            height={12}
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
                <div className="step-text">
                    <strong>
                        Go to WP-Admin
                    </strong>
                    <br />
                    <strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry’s standard dummy text
                    ever since the 1500s, when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book.
                    <br />
                    <br />
                    Copy following Command:
                    <br />
                    <code>npx @wordpress/create-block@latest how-to-guide-block</code>
                    <br /><br />
                    It has survived not only five centuries, but also the leap into electronic
                    typesetting, remaining essentially unchanged. It was popularised in the 1960s
                    with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including
                    versions of Lorem Ipsum.
                </div>
            </div>
            <div className="step-buttons">
                <button className="back-step-btn">
                    <img src={arrowLeft} alt="Previous" loading="lazy" />
                </button>
                <h3 className="step-heading">Step 1 of 3</h3>
                <button className="next-step-btn">
                    <img src={arrowRight} alt="Next" loading="lazy" />
                </button>
            </div>
        </div>
        {props.atts.showSuccessMessage && (
            <div className="guide-complete"><p>{props.atts.successMessage}</p></div>
        )}
        </>
    );
}