import '../index.css';

import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, } from 'react-router-dom';

import Header from './Header';
import Footer from "./Footer";

import Login from "./Login";
import Register from "./Register";

import Main from "./Main.js";

import ProtectedRoute from './ProtectedRoute';

import * as authorization from '../utils/authorization';

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";

import InfoTooltipSucess from './InfoTooltipSucess.js';
import InfoTooltipFail from './InfoTooltipFail.js';

import api from "../utils/api.js";

import CurrentUserContext from "../contexts/CurrentUserContext.js";

function App(){

  const [currentUser, setCurrentUser] = useState({});
  const [currentCards, setCurrentCards] = useState([]);
  
  const [isPopupEditProfileOpen, handleEditProfileClick] = useState(false);
  const [isPopupAddPlaceOpen, handleAddPlaceClick] = useState(false);
  const [isPopupEditAvatarOpen, handleEditAvatarClick] = useState(false);
  
  const [isPopupWithImageOpen, handleCardImageClick]  = useState(false);
  const [selectedCard, setSelectedCard] = useState({url:"", name:""});

  const [isPopupRegistrationSuccessfulOpen, setPopupRegistrationSuccessfulOpen] = useState(false);
  const [isPopupRegistrationFailedOpen, setPopupRegistrationFailedOpen] = useState(false);

  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const history = useHistory();

  function hanldeCardClick(cardUrl, cardName){
    setSelectedCard({url: cardUrl, name: cardName});
    handleCardImageClick(true);
  }

  function handleLikeCard(card){
    const isLiked = card.likes.some((item)=> item === currentUser._id);

    api.toggleLikeCard(card.id, !isLiked, localStorage.getItem('jwt'))
    .then((likedCard)=>{
      setCurrentCards(((state)=> state.map((c) => c._id === card.id ? likedCard : c)))
    })
  }

  function handleDeleteCard(data){
    api.deleteCard(data.id, localStorage.getItem('jwt'))
    .then(()=>{
      setCurrentCards(currentCards.filter(card => !(card._id === data.id)))
    }).catch(err => console.log(err));
  }

  function closeAllPopups(){
    handleEditProfileClick(false);
    handleAddPlaceClick(false);
    handleEditAvatarClick(false);
    handleCardImageClick(false);
    setPopupRegistrationSuccessfulOpen(false);
    setPopupRegistrationFailedOpen(false);
  }

  function handleAddPlaceSubmit(name, link){
      api.addCard(name, link, localStorage.getItem('jwt'))
      .then((data)=>{
        setCurrentCards([data.card, ...currentCards])
        closeAllPopups();
      }).catch(err => console.log(err))
  }

  function handleUpdateUser(data){
    api.setUser(data, localStorage.getItem('jwt'))
      .then((data)=>{
        console.log(data);
        setCurrentUser(data.updatedUser);
      }).catch(err => console.log(err))
    closeAllPopups();
  };
  

  function handleUpdateAvatar(data){
    api.editAvatar(data.avatar, localStorage.getItem('jwt'))
    .then((data)=>{
      setCurrentUser(data.updatedUser);
    }).catch(err => console.log(err))
    closeAllPopups();
  }

  function handleRegister(email, password){
      authorization.userRegister(email, password)
      .then((res) => {
        setPopupRegistrationSuccessfulOpen(true);
        history.push('/login');
        return res;
      }).catch((err)=>{
        console.log('Ошибка при регистрации: ', err)
        setPopupRegistrationFailedOpen(true);
      })
  }

  function handleLogin(email, password){
    authorization.userLogin(email, password)
      .then((res)=>{
        if (localStorage.getItem('jwt') === res.userToken){
          setLoggedIn(true);
          setCurrentUserEmail(email);
          history.push('/');
          return
        }
      }).catch((err)=>{console.log(`Ошибка входа: ${err}. Тип ошибки: ${err.name}`)});
  }

  useEffect(() => {
    function checkToken(){
      if (localStorage.getItem('jwt')){
        authorization.getContent(localStorage.getItem('jwt'))
        .then((res)=>{
          setCurrentUserEmail(res.user.email);
            setLoggedIn(true);
            history.push('/');
        })
        .catch((err) => { console.log(err) });
      }
    }
    checkToken()
  }, [history]);
    
  useEffect(()=>{
    if(loggedIn) {
      Promise.all([
        api.getUser(localStorage.getItem('jwt')), 
        api.getCards(localStorage.getItem('jwt')),
      ]).then(([userData, cardsData])=>{
        setCurrentUser(userData.user);
        setCurrentCards(cardsData.data.reverse());
      }).catch((err)=>{
        console.log(err);
      });
    }
  }, [loggedIn]);

  function handleLogOut(){
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/login');
    return;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
              
              <Switch>

              <Route path="/login">
                  <Header
                     headerUserEmail=''
                     headerLinkRoute="/register"
                     headerLinkText="Регистрация"
                     isLoggedIn={loggedIn}
                     handleHeaderLink={null}
                 />
                  <Login 
                    onLoginUser={handleLogin}
                  />
                </Route>

                <Route path="/register">
                  <Header
                    headerUserEmail=''
                    headerLinkRoute="/login"
                    headerLinkText="Войти"
                    isLoggedIn={loggedIn}
                    handleHeaderLink={null}
                  />
                  <Register 
                    onRegisterUser={handleRegister}
                    isClosed={closeAllPopups}
                  />
                </Route>  

                <ProtectedRoute
                  path='/'
                  loggedIn={loggedIn}

                  headerUserEmail={currentUserEmail}
                  handleHeaderLink={handleLogOut}

                  component={Main}
                  cards={currentCards}
                  onAddPlace = {handleAddPlaceClick}
                  onEditAvatar = {handleEditAvatarClick}
                  onEditProfile = {handleEditProfileClick}
                  onOpenFullSizeImage = {hanldeCardClick}
                  onLikeClick={handleLikeCard}
                  onDeleteButtonClick={handleDeleteCard}
                />

              </Switch>

              <Footer />

              <ImagePopup
                      url={selectedCard.url}
                      name={selectedCard.name}
                      isOpen={isPopupWithImageOpen}
                      isClosed={closeAllPopups}
              />

              <AddPlacePopup
                      isOpen={isPopupAddPlaceOpen}
                      isClosed={closeAllPopups}
                      onAddPlace={handleAddPlaceSubmit}
              />
                    
              <EditProfilePopup 
                      isOpen={isPopupEditProfileOpen} 
                      onClose={closeAllPopups}
                      onUpdateUser={handleUpdateUser}  
              />

              <EditAvatarPopup 
                      isOpen={isPopupEditAvatarOpen}
                      isClosed={closeAllPopups}
                      editAvatar={handleUpdateAvatar}
              />

              <InfoTooltipSucess 
                  isOpen={isPopupRegistrationSuccessfulOpen} 
                  isClosed={closeAllPopups}
              />
              
              <InfoTooltipFail 
                  isOpen={isPopupRegistrationFailedOpen}
                  isClosed={closeAllPopups}
              />  
        </div>
      </div>
    </CurrentUserContext.Provider>  
  );
}

export default App;
