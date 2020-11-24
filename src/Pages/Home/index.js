import Axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../../Components/Header"
// import Input from "../../Components/Input"
import Resume from "../../Components/Resume"

import './style.css';

var alertTimerId = 0;
const Home = () => {
    const [items, setItems] = useState([]);
    const [text, setText] = useState("");
    const [genres, setGenres] = useState("");
    // const []

    useEffect(() => {
        const textFind = text.trim().split(" ").join("+");
        if (textFind) {
            Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=5c7dcddf369bf1ca6ca337aef26ca42a&language=pt-br&query=${textFind}&page=1`)
                .then(res => {
                    const data = res.data;
                    setItems(data.results);
                })
        } else {
            Axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5c7dcddf369bf1ca6ca337aef26ca42a&language=pt-br&page=1$append_to_response=genre`)
                .then(res => {
                    const data = res.data;
                    setItems(data.results);
                })
        }
    }, [text])

    useEffect(() => {
        Axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=5c7dcddf369bf1ca6ca337aef26ca42a&language=pt-br`)
            .then(res => {
                const data = res.data;

                setGenres(data.genres);
            })
    }, [])

    function handleChangeInput(e) {
        clearTimeout(alertTimerId);
        alertTimerId = setTimeout(() => {
            if (e.target.value.length && e.target.value.length > 2) {
                setText(e.target.value);
            }
        }, 1000);
    }

    return (
        <div>
            <Header />
            <div className="content">
                <input placeholder="Buscar" onChange={handleChangeInput} />
                {items.map((item, index) => {
                    const genero = item.genre_ids.map(item => {
                        if(genres){
                            return genres.find(gen => gen.id === item)
                        }else{
                            return null
                        }
                        }
                        )
                    return <Link to={"/description/" + item.id} key={index}><div>
                        <Resume title={item.title}
                            date={item.release_date}
                            description={item.overview}
                            generos={genero}
                            img={item.poster_path}
                            vote_average={item.vote_average}
                        />
                    </div></Link>
                })}
            </div>
        </div>
    )
}

export default Home;