function PopupWithForm(props){

return (
    <section className={`popup popup_type-${props.name} ${props.isOpen ? "popup_open" : ""}`}>
        <div className="popup__overlay popup__overlay_light">
            <div className="popup__content-block">
                <button className="popup__button-close" type="button" onClick={props.isClosed}></button>
                <div className="popup__form-container">
                    <h3 className="popup__title">{props.popupTitle}</h3>
                        <form className="form" name={props.name} onSubmit={props.onSubmit} noValidate>
                            {props.children}
                            <button className="form__button-save" type="submit">{props.buttonText}</button>
                        </form>
                </div>
            </div>
        </div>
    </section>
    )
};

export default PopupWithForm;