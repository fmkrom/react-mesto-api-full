import {useState} from "react";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props){

    const [cardName, setCardName] = useState('');
    const [cardUrl, setCardUrl] = useState('');

    function handleCardNameSubmit(e){
        setCardName(e.target.value)
    }

    function handleCardUrlSubmit(e){
        setCardUrl(e.target.value)
    }

    function handleAddCardSubmit(e){
        e.preventDefault();
        props.onAddPlace(cardName, cardUrl)
        setCardName('');
        setCardUrl('');
    }

    return(
        <PopupWithForm 
              name="add-card" 
              popupTitle="Новое место" 
              buttonText="Добавить"
              isOpen={props.isOpen}
              isClosed={props.isClosed}
              onSubmit={handleAddCardSubmit}
              >
              <input value={cardName} onChange={handleCardNameSubmit} required id="input_addplace-name" className="form__field" name="addPlaceName" placeholder="Название" type="text" minLength="2" maxlenght="30"/>
              <span className="form-error form-error_hidden" id="input_addplace-name-error"></span>
              <input value={cardUrl} onChange={handleCardUrlSubmit} required id="input_addplace-url" className="form__field" name="addPlaceUrl" placeholder="Ссылка на картинку" type="url"/>
              <span className="form-error form-error_hidden" id="input_addplace-url-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;