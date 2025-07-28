import Card from "../../basic/Card"

const CardStatistics = ({title, value, style, className}) => {
    return (
        <Card style={{backgroundColor: style}} className={`card ${className}`}>
        <div className='text'>
            <p>{title}</p>
            <h1>${value}</h1>
        </div>
        </Card>     
    )
}

export default CardStatistics