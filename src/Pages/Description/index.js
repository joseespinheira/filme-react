import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../../Components/Header';

import './style.css';

const Description = (props) => {
    const [movie, setMovie] = useState([]);
    var idioma = '';
    const movieId = props.match.params.id;

    useEffect(() => {
        Axios.get(`https://api.themoviedb.org/3/movie/` + movieId + `?api_key=5c7dcddf369bf1ca6ca337aef26ca42a&language=pt-br&append_to_response=videos`)
            .then(res => {
                const data = res.data;
                setMovie(data);
                console.log(data);
                // setTimeout(() => {

                // }, 2000);
            })
    }, [movieId])

    function duracao(minutos) {
        var horas = minutos / 60 | 0;
        var min = minutos % 60;
        return `${horas}h ${min}min`;
    }

    if(movie.spoken_languages){
        idioma = movie.spoken_languages.find(item => item.iso_639_1 === movie.original_language)
    }

    return (
        <div>
            <Header voltar="true" />
            <div className="card">
                <div className="title">
                    <div><h1>{movie.title}</h1></div>
                    <div className="date">{movie.release_date}</div>
                </div>
                <div className="container">
                    <div className="dados">
                        <section>
                            Sinopse
                        <hr></hr>
                            <p>{movie.overview}</p>
                        </section>
                        <section>
                            Informações
                        <hr></hr>
                            <div className="info">
                                <div><h4>Situação</h4>{movie.status}</div>
                                <div><h4>Idioma</h4>
                                    {idioma.english_name?idioma.english_name:movie.original_language}
                                </div>
                                <div><h4>Duração</h4>{duracao(movie.runtime)}</div>
                                <div><h4>Orçamento</h4>{parseInt(movie.budget).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</div>
                                <div><h4>Receita</h4>{parseInt(movie.revenue).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</div>
                                <div><h4>Lucro</h4>{(movie.revenue - movie.budget).toFixed(2).replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</div>
                            </div>
                        </section>
                        <div className="list-genero">
                            {movie.genres ? movie.genres.map(item => {
                                return <div key={item.id} className="genero">{item.name}</div>;
                            }) : ''}
                        </div>
                        <div>
                            {movie.video}
                        </div>
                    </div>
                    <div className="imagem">

                        <img src={movie.poster_path ? 'https://image.tmdb.org/t/p/w200' + movie.poster_path : ''} alt={`Capa do filme: ` + movie.title} />
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    )
}
// {`https://api.themoviedb.org/3/discover/movie/${item.id}?api_key=5c7dcddf369bf1ca6ca337aef26ca42a&language=en-US`}
export default Description;