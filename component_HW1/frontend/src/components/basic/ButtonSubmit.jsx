







const ButtonSubmit = ({ name,  className,  onClick}) => {
 



  
    return (
        <button type="submit" onClick={onClick} className={className}>{name}</button>
    );
};

export default ButtonSubmit;