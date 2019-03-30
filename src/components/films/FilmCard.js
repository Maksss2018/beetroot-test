import React ,{ useMemo} from 'react';
import PropTypes from 'prop-types';
import  Featured from '../../components/FilmCardComponents/Featured'
import  FilmsCardInfo from '../../components/FilmCardComponents/FilmsCardInfo'
import FilmsCardImg from '../../components/FilmCardComponents/FilmsCardImg'
import FilmDescriptionBtn from '../../components/FilmCardComponents/FilmDescriptionBtn'


const  FilmCard = ({
                       featured,
                       eye,
                       ...film
                   }) => {
    let flagEye =   useMemo(()=>eye,[eye]),
        flagFeatured =   useMemo(()=>featured,[featured]);


    return (
        <div
            id={`${film._id}-film-container`}
            className={` ui card `}>
            {
                <Featured
                    id={film._id}
                    featured={flagFeatured}/>
            }

            {
                flagEye?<FilmsCardImg  price={film.price} img={film.img} title={film.title} />
                    :<FilmsCardInfo  description={film.description} />
            }

            <div className="content mh-5" >
                <a className="header">
                    {film.title}
                </a>
                <div className="meta">
                    <i className="icon users"/> {film.director}
                    <span className="right floated">
                <i className="icon wait right"/> {film.duration} min
              </span>
                </div>
                <FilmDescriptionBtn id={film._id} eye={flagEye}/>
            </div>
        </div>
    );
};

FilmCard.propTypes = {
    _id: PropTypes.string.isRequired,
    description: PropTypes.string,
    title: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    img: PropTypes.string.isRequired,
    featured: PropTypes.bool.isRequired,
    eye:PropTypes.bool
};

FilmCard.defaultProps = {
    _id: "",
    description: " No description? So describe it. ",
    title: " Name it ",
    director: " Jora 007 ",
    duration: 0,
    price: 0,
    img: "/img/sketchpad.jpg",
    featured: false,
    eye:true
};


export default React.memo(FilmCard);