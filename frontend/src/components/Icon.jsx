



const Icon = ({iconName, iconColor, regular}) => {
    

    const ui = () => {
        if(regular === true) {
            return <i className={`fa-regular fa-${iconName}`} style={{color: iconColor}} aria-hidden></i>
        }
        return <i className={`fa-solid fa-${iconName}`} style={{color: iconColor}} aria-hidden></i>
    }

    return ui();
}

export default Icon;