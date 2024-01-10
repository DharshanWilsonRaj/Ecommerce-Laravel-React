import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Button.scss';
const Button = (props) => {
    const {
        className,
        variant,
        children,
        disabled,
        loading,
        nonBtn,
        ...otherProps
    } = props;

    let styleProps = {
        className: `${!nonBtn ? 'btn' : 'btn non-btn'}  btn-${variant ? variant : 'primary'} ${className || ''}`,
        disabled,
        ...otherProps
    };

    let btnchild = <>
        {loading && <><FontAwesomeIcon icon={faCircleNotch} spin />&nbsp;</>}
        {children}
    </>;

    return (
        <div className='btn_container'>
            <button {...styleProps}>
                {btnchild}
            </button>
        </div>

    );
}

export default Button

