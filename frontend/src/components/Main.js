import {useContext} from 'react';

import Card from "./Card.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import Header from './Header.js';

function Main(props){
    const currentUserData = useContext(CurrentUserContext);
        
    return(
      <>
       <Header 
        headerUserEmail={props.headerUserEmail}
        headerLinkRoute="/login"
        headerLinkText="Выход"
        isLoggedIn={props.isLoggedIn}
        handleHeaderLink={props.handleHeaderLink}
       />

        <main className="main">
            <section className="profile">
                <div className="profile__avatar">
                    <button className="profile__edit-avatar-link" onClick={props.onEditAvatar}>
                      <img src={currentUserData.avatar} className="profile__image" alt="Фото профиля"/>
                      <div className="profile__avatar-overlay"></div>
                    </button>
                </div>
                <div className="profile__info">
                    <div className="profile__name-block">
                      <h1 className="profile__name">{currentUserData.name}</h1>
                      <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    </div>
                    <p className="profile__job">{currentUserData.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
 
          <section className="cards">
          {
            props.cards.map((card)=>{
              // console.log('This is cards:', props.cards);
              return(
                <Card
                  owner={card.owner}
                  key={card._id}
                  id={card._id}
                  url={card.link}
                  name={card.name}
                  likes={card.likes}
                  onCardClick={props.onOpenFullSizeImage}
                  onLikeClick={props.onLikeClick}
                  onDeleteClick={props.onDeleteButtonClick}
                />
              )
            })
          } 
          </section>
        </main>
      </>
    )
};

export default Main;
