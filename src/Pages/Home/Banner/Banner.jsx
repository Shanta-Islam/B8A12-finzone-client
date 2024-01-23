import PropTypes from 'prop-types'; 
import "../../../styles/HomeStyles.css";
import Tags from "./Tags";

const Banner = ({setSearchVal, handleSearchClick}) => {
   
    return (
        <div className="header">
            <div className="headerContainer">
                <div className='headerText'>
                    <h2>Welcome to Finzone Community</h2>
                </div>
                <form>
                    <input  onChange={(e) => setSearchVal(e.target.value)} type="text" name='search'  placeholder="Search by tags...." />
                    <button  onClick={handleSearchClick} >Search</button>
                </form>
                {/* <Tags></Tags> */}
            </div>
            
        </div>

    );
};

Banner.propTypes = {
    handleSearchClick: PropTypes.func,
    setSearchVal : PropTypes.func,
    Filter : PropTypes.func
}

export default Banner;