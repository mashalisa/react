const Title = ({className, colorBar, titleName}) => {
    return (
        <h2 className="capitalize m-2"><span className="theme-color" style={{backgroundColor: colorBar}}></span>{titleName}</h2>
    )
}

export default Title;