import {useState, useContext, useEffect} from "react";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

import PopupWithForm from "./PopupWithForm.js";

function EditProfilePopup(props){
    const currentUserData = useContext(CurrentUserContext);
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleNameChange(e){
        setName(e.target.value)
    }

    function handleDescriptionChange(e){
        setDescription(e.target.value)
    }

    useEffect(()=>{
        setName(currentUserData.name);
        setDescription(currentUserData.about);
    }, [currentUserData])

    function handleSubmit(e){
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        })    
    }

    return (
        <PopupWithForm 
              name="edit-profile" 
              popupTitle="Редактировать профиль" 
              buttonText="Сохранить"
              isOpen={props.isOpen}
              isClosed={props.onClose}
              onSubmit={handleSubmit}
              >

              <input value={name} onChange={handleNameChange} required  className="form__field" id="input_editprofile-name" name="editProfileName" placeholder="Имя" type="text" minLength="2" maxlenght="40"/>
              <span className="form-error form-error_hidden" id="input_editprofile-name-error"></span>
              <input value={description} onChange={handleDescriptionChange}  required className="form__field" id="input_editprofile-job" name="editProfileJob" placeholder="Род занятий" type="text" minLength="2" maxlenght="200"/>
              <span className="form-error form-error_hidden" id="input_editprofile-job-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;