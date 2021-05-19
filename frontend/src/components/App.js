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

  useEffect(() => {
    handleTokenCheck();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);

  useEffect(()=>{
    Promise.all([
      api.getCards(),  
      api.getUser()
    ])
    .then(([cardsData, userData]) =>{
      setCurrentUser(userData.user);
      setCurrentCards(cardsData.data.reverse());
    }).catch(err => console.log(err));
  }, [loggedIn, history]);

  function hanldeCardClick(cardUrl, cardName){
    setSelectedCard({url: cardUrl, name: cardName});
    handleCardImageClick(true);
  }

  function handleLikeCard(card){
    const isLiked = card.likes.some((item)=> item._id === currentUser._id);

    console.log(card.likes);
    
    api.toggleLikeCard(card.id, !isLiked)
    .then((newCardData)=>{
      setCurrentCards(((state)=> state.map((c) => c._id === card.id ? newCardData : c)))
    })  
  }

  function handleDeleteCard(data){
    api.deleteCard(data.id)
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
      api.addCard(name, link)
      .then((data)=>{
        console.log(data.card);
        setCurrentCards([data.card, ...currentCards])
        closeAllPopups();
      }).catch(err => console.log(err))
  }

  function handleUpdateUser(data){
      api.setUser(data)
      .then((data)=>{
        setCurrentUser(data.updatedUser);
      }).catch(err => console.log(err))
      closeAllPopups();
  };

  function handleUpdateAvatar(data){
    api.editAvatar(data.avatar)
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
        let currentToken = localStorage.getItem('jwt');

        if (currentToken){
          setLoggedIn(true);
          setCurrentUserEmail(email);
          history.push('/');
          return
        }
      }).catch((err)=>{console.log(`Ошибка входа: ${err}. Тип ошибки: ${err.name}`)});
  }
  
  function handleTokenCheck(){
    let currentToken = localStorage.getItem('jwt');
    
    if (currentToken){
        authorization.checkToken(currentToken)
        .then((currentUser)=>{
            setLoggedIn(true);
            setCurrentUserEmail(currentUser.data.email);
            history.push('/');
        })
      }
  }
  
  function handleLogOut(){
          localStorage.removeItem('jwt');
          setLoggedIn(false)
          history.push('/login');
        return
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
