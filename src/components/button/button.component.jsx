import './button.style.scss';

const BUTTON_TYPES_CLASESS = {
    google:'google-sign-in',
    inverted:'inverted',

}

const Button = ({children, buttonType, ...otherProps}) => {
    return (
        <button className={`button-container ${BUTTON_TYPES_CLASESS[buttonType]}`} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;