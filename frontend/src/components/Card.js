import {useContext} from 'react';

import CurrentUserContext from "../contexts/CurrentUserContext.js";

function Card (props){
    console.log(props.likes);

    const currentUserData = useContext(CurrentUserContext);
    const isOwn = props.owner === currentUserData._id;
    const isLiked = props.likes.some((item) => item === currentUserData._id);

    function handleCardClick(){
        props.onCardClick(props.url, props.name);
    }

    function handleLikeClick(){
        props.onLikeClick(props);
    }

    function handleDeleteClick(){
        props.onDeleteClick(props)
    }

    return(
        <div className="template">
            <div className="card">
                <div className="card__rectangle">
                    <button onClick={handleDeleteClick} className={`card__delete-button ${isOwn ? "card__delete-button_shown" : "card__delete-button_hidden"}`} type="button"></button>
                    <div className="card__image-block">
                    <button className="card__open-fullsize-image" onClick={handleCardClick}>
                        <img src={props.url} className="card__image" alt={props.name} />
                    </button>
                    </div>
                        <div className="card__title-block">
                        <h2 className="card__title">{props.name}</h2>
                        <div className="card__like-section">
                            <button onClick={handleLikeClick} className={`card__like-button ${isLiked ? "card__like-button_active" : "card__like-button_inactive"}`} type="button"></button>
                            <p className="card__like-number">{props.likes.length}</p>
                        </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export default Card;