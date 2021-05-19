import {useContext, createRef, useState, useEffect} from "react";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup(props){
   const currentUserData = useContext(CurrentUserContext);

    const [avatar, setAvatar] = useState({});

    const avatarRef = createRef('');

    function handleEditAvatar(e){
        setAvatar(e.target.value)
    }

    useEffect(()=>{
        setAvatar(currentUserData.avatar);
    }, [currentUserData])

    function handleSubmit(e){
        e.preventDefault();
        props.editAvatar({avatar: avatarRef.current.value})
    }

    return (
        <PopupWithForm 
            name="edit-avatar" 
            popupTitle="Редактировать аватар" 
            buttonText="Сохранить аватар"
            isOpen={props.isOpen}
            isClosed={props.isClosed}
            onSubmit={handleSubmit}
        >
            <input value={avatar} ref={avatarRef} onChange={handleEditAvatar} required id="input_edit-avatar" className="form__field" name="avatarUrl" placeholder="Ссылка на новый аватар" type="url"/>
            <span className="form-error form-error_hidden" id="input_edit-avatar-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;