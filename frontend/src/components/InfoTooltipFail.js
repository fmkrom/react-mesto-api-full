import InfoTooltip from './InfoTooltip';
import tooltipImageFail from "../images/__graphics/graphics__fail.png";

function InfoTooltipFail(props){
    return(
        <InfoTooltip
            isOpen={props.isOpen}
            isClosed={props.isClosed}
            notificationImage={tooltipImageFail}
            popupText='Что-то пошло не так! Попробуйте еще раз'
        />
    )    
}

export default InfoTooltipFail;