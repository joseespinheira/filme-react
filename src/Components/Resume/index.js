// import Axios from 'axios';
// import { useEffect } from 'react';
import './style.css'

const Resume = (props) => {

    const generos = props.generos;
    return (
        <div className="containerr">

                <img src={props.img?'https://image.tmdb.org/t/p/w200' + props.img:''} alt={`Capa do filme: `+props.title} />

            <div className="data">
                <div></div>
                <div className="div-title">
                    <div className="title-date">
                        <div className="titler">{props.title}</div>
                        <div>{props.date}</div>
                    </div>
                </div>
                <div className="percent">{props.vote_average * 10}%</div>
                <div className="description">{props.description}</div>
                <div className="list-genero">

                    {Object.values(generos).map((genero, index) => {
                        return <div key={index} className="genero">
                            {genero?genero.name:''}
                            </div>
                    })}
                    
                </div>
            </div>
        </div>
    )
}

export default Resume;