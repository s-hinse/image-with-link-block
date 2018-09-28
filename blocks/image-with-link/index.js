/**
 * Block dependencies
 */
import icons from './icons';
import './editor.scss';
import './style.scss';




/**
 * Internal block libraries
 */
const {__} = wp.i18n;
const {
    registerBlockType,
} = wp.blocks;
const {Fragment} = wp.element;
const {
    Editable,
    MediaUpload,
    URLInput
} = wp.editor;
const {
    Button,
    Tooltip,
    TextControl,
} = wp.components;


/**
 * Register block
 */
export default registerBlockType(
    'shinse/image-with-link',
    {
        title: __('Image with link text on it'),
        description: __(''),
        category: 'common',
        icon: 'heart',

        keywords: [],
        attributes: {
            //attributes for image
            imgURL: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: 'img',
            },
            imgID: {
                type: 'number',
            },
            imgAlt: {
                type: 'string',
                source: 'attribute',
                attribute: 'alt',
                selector: 'img',

            },
            //attributes for link
            text: {
                type: 'string',
                source: 'text',
                selector: 'h2',
            },
            url: {
                type: 'string',
                source: 'attribute',
                attribute: 'href',
                selector: 'a',
            },
        },

        edit: props => {
            const {
                attributes: {imgID, imgURL, imgAlt, url, text},
                className, setAttributes, isSelected
            } = props;
            const onSelectImage = img => {
                console.log(img);
                setAttributes({
                    imgID: img.id,
                    imgURL: img.sizes.large.url,
                    imgAlt: img.alt,
                });
            };
            const onRemoveImage = () => {
                setAttributes({
                    imgID: null,
                    imgURL: null,
                    imgAlt: null,
                });
            }
            const urlAndTextInput = <Fragment> <TextControl
                id="example-input-field"
                label={__('Link Text', 'jsforwpblocks')}
                value={text}
                onChange={text => setAttributes({text})}
            />

                <URLInput
                    className="url"
                    value={url}
                    onChange={url => setAttributes({url})}
                /></Fragment>

            return (
                <Fragment>
                    <div className={className}>


                        {!imgID ? (

                            <MediaUpload
                                onSelect={onSelectImage}
                                type="image"
                                value={imgID}
                                render={({open}) => (
                                    <Button
                                        className={"button button-large"}
                                        onClick={open}
                                    >
                                        {icons.upload}
                                        {__(' Upload Image', '')}
                                    </Button>
                                )}
                            >
                            </MediaUpload>


                        ) : (

                            <Fragment>
                                <img
                                    src={imgURL}
                                    alt={imgAlt}
                                    className={'wp-image-'+imgID}

                                />
                                <div className="text-wrap"><h2 className="text">{text}</h2></div>

                                {isSelected ? (

                                    <Button
                                        className="remove-image"
                                        onClick={onRemoveImage}
                                    >
                                        {icons.remove}
                                    </Button>

                                ) : null}

                            </Fragment>
                        )}

                    </div>
                    {isSelected && urlAndTextInput}</Fragment>
            );
        },
        save: props => {
            const {imgID, imgURL, imgAlt, url, text} = props.attributes;
            return (<div>
                <a href={url}> <img
                    src={imgURL}
                    alt={imgAlt}
                    className={'wp-image-'+imgID}
                /></a>
                <div className="text-wrap"><h2 className="text">{text}</h2></div>
            </div>)

        },
    },
);
