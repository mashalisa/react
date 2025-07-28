import { Link } from "wouter";

const CardHeader = ({title, btnName, link}) => {
  return (
    <div className="card-title flex-between">
                                <h2 className="capitalize">{title}</h2>
                                <Link to={`/${link}`}><button className="default-btn">{btnName}<span><img src="/img/icons/arrow.png" alt="arrow-right"/></span></button></Link>
                            </div>
  );
};

export default CardHeader;