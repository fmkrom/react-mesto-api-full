function ImagePopup(props){

return (
    <section className={`popup popup_type-fullsize-image ${props.isOpen ? "popup_open" : ""}`}>
            <div className="popup__overlay popup__overlay_dark">
                <div className="popup__content-block">
                  <button className="popup__button-close" type="button" onClick={props.isClosed}></button>
                        <div className="fullsize-image">
                            <img src={props.url} className="fullsize-image__image" alt={props.name}/>
                            <div className="fullsize-image__title">{props.name}</div>
                        </div>
                </div>
            </div>
    </section>
    )
};

export default ImagePopup;