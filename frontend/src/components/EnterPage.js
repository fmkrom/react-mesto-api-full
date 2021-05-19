import '../index.css';
import '../components/styles/EnterPage.css';

import { Link } from 'react-router-dom';

function EnterPage(props){
  return (
      <section className="enter-form">
              <div className="enter-form__content-block">
                  <div className="enter-form__form-container">
                      <h3 className="enter-form__title">{props.formTitle}</h3>
                          <form className="form" name={props.formName} onSubmit={props.onSubmit} noValidate>
                              {props.children}
                              <button className="enter-form__button-save" type="submit">{props.buttonText}</button>
                          </form>
                          <Link to={props.formSubtitleRoute} className="enter-form__subtitle">{props.formSubtitleText}</Link>
                  </div>
              </div>
    </section>
  )
} 

export default EnterPage;