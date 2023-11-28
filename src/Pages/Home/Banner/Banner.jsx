
import "../../../styles/HomeStyles.css";

const Banner = () => {
    return (
        <div className="header" style={{ backgroundImage: `url(https://i.ibb.co/zPmFm5k/hero-img.jpg)` }}>
            <div className="headerContainer">
                <input type="text" placeholder="Search here...."/>
                <button className="">Search</button>
            </div>
        </div>

    );
};

export default Banner;