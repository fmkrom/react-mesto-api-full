import '../components/styles/InfoTooltip.css';

function InfoTooltip(props){

    return (
        <section className={`popup popup_type-${props.name} ${props.isOpen ? "popup_open" : ""}`}>
            <div className="popup__overlay popup__overlay_light">
                <div className="popup__content-block">
                    <button className="popup__button-close" type="button" onClick={props.isClosed}></button>
                    <div className="popup__form-container">
                            <img src={props.notificationImage} className="info-tooltip-image-notification" alt={`Уведомление: ${props.popupText}`} />
                        <h3 className="info-tooltip-popup__text">{props.popupText}</h3>
                    </div>
                </div>
            </div>
        </section>
        )
    };
    
export default InfoTooltip;