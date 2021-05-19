import InfoTooltip from './InfoTooltip'
import tooltipImageSucess from "../images/__graphics/graphics__sucess.png"

function InfoTooltipSucess(props){
    return(
        <InfoTooltip
            isOpen={props.isOpen}
            isClosed={props.isClosed}
            notificationImage={tooltipImageSucess}
            popupText='Вы успешно зарегистрировались!'
        />
    )    
}

export default InfoTooltipSucess;