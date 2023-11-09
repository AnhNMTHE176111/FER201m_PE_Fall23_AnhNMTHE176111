import { useEffect, useState } from "react";

const Movie = () => {
    const [producers, setProducers] = useState([]);
    const [movies, setMovies] = useState([]);
    const [currentMovies, setCurrentMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [movieStars, setMovieStar] = useState([]);
    const [stars, setStar] = useState([]);
    const [directors, setDirectors] = useState([]);
    const [selectedProducer, setSelectedProducer] = useState('');


    useEffect(() => {
        fetch('http://localhost:9999/directors')
            .then((result) => {
                return result.json()
            })
            .then((result) => {
                setDirectors(result);
            })
        fetch('http://localhost:9999/producers')
            .then((result) => {
                return result.json()
            })
            .then((result) => {
                setProducers(result);
            })
        fetch('http://localhost:9999/movies')
            .then((result) => {
                return result.json()
            })
            .then((result) => {
                setMovies(result);
                setCurrentMovies(result);
            })
        fetch('http://localhost:9999/stars')
            .then((result) => {
                return result.json()
            })
            .then((result) => {
                setStar(result)
            })
        fetch('http://localhost:9999/movie_star')
            .then((result) => {
                return result.json()
            })
            .then((result) => {
                setMovieStar(result)
            })
    }, []);


    function handleFilter(s) {
        console.log('click')
        let data = [...movies];
        let list = data.filter(movie => movie.ProducerId == s);
        setCurrentMovies(list);
        setFilteredMovies(list);
        setSelectedProducer(s);
    }

    function handleSearch(searchValue) {
        let data = [];
        if (selectedProducer == '') {
            data = [...movies]
        }
        else {
            data = [...filteredMovies]
        }
        let list = data.filter(product => product.Title.toLowerCase().startsWith(searchValue.toLowerCase()));

        setCurrentMovies(list);
    }

    return (
        <div className="col-12 d-flex justify-content-center my-5">
            <div className="col-2 my-2  ">
                <h2>Producers</h2>
                <ul>
                    {
                        producers.map((p, i) => (
                            <li key={i} onClick={() => handleFilter(p.id)}>

                                <div style={{ color: 'blue' }} onClick={() => handleFilter(p.id)}> {p.Name} </div>

                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="col-10 my-2">
                <div className="col-12 d-flex justify-content-center mb-3">
                    <input className='col-8' placeHolder="Enter movie title to search..." onChange={(e) => handleSearch(e.target.value)}/>
                </div>

                <div className="col-12 d-flex justify-content-center">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>ReleaseDate</th>
                                <th>Description</th>
                                <th>Language</th>
                                <th>Director</th>
                                <th>Stars</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                currentMovies.map((movie, index) => {
                                    let a = movieStars.filter(ms => ms.MovieId == movie.id);
                                    let k = [];
                                    console.log('a', a);
                                    a.map(x => {
                                        let b = stars.filter((s, i) => s.id == x.StarId).map(s => s.FullName);
                                        console.log(b);
                                        k.push(b);
                                    })


                                    return (
                                        <tr key={index}>
                                            <td> {movie.id} </td>
                                            <td> {movie.Title} </td>
                                            <td> {movie.ReleaseDate} </td>
                                            <td> {movie.Description} </td>
                                            <td> {movie.Language} </td>
                                            <td> {
                                                directors.filter(d => d.id == movie.DirectorId).map(d => d.FullName)
                                            } </td>
                                            <td> {
                                                k.map(x => (
                                                    x
                                                ))
                                            } </td>
                                        </tr>
                                    )
                                })

                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Movie