const Title = ({className, colorBar, titleName}) => {
    return (
        <h3><span className="theme-color" style={{backgroundColor: colorBar}}></span>{titleName}</h3>
    )
}

export default Title;