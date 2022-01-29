import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit";


function Movie() {
    const movie = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [movieData, setMovieData] = useState({
        data: '',
        loading: false,
        loaded: false,
    });

    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [publicationDate, setPublicationDate] = useState('');

    async function fetchMovie() {
        setMovieData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch(`http://localhost:8080/api/sequelize/get-movie/${movie.movieId}`);

            const data = await response.json();
            setMovieData({ data: data, loading: false, loaded: true });

        } catch (err) {
            setMovieData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });
            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!movieData.loaded) {
            fetchMovie();
        }
    }, [movieData.loaded]);


    function setNewMovie(movieData) {
        setId(movieData.data.MovieId);
        setTitle(movieData.data.Title);
        setCategory(movieData.data.Category);
        setPublicationDate(movieData.data.PublicationDate);
    }

    async function updateMovie() {
        const updatedMovie = {
            Title: title,
            Category: category,
            PublicationDate: publicationDate,
        }

        try {
            const addNewMovie = await fetch(`http://localhost:8080/api/sequelize/update-movie/${movie.movieId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedMovie)
            }).then((response) => {
                response.json().then((res) => alert(res)).then(_ => {
                    setId(-1);
                    setTitle('');
                    setCategory('')
                    setPublicationDate('');
                    navigate('/');
                });
            });
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <Fragment>
            <h3 src={location?.state} alt={""}></h3>
            {movieData.loading && <CircularProgress />}
            {movieData.loaded &&
                <div>
                    <h4 className="form">
                        {`Movie Id: ${movieData.data.MovieId}`}
                    </h4>
                    <h4 className="form1">

                        {`Title:                `}
                        <input type="text" defaultValue={movieData.data.Title}
                            onChange={(ev) => setTitle(ev.target.value)}></input>
                    </h4>
                    <h4 className="form1">

                        {`Category:                `}
                        <input type="text" defaultValue={movieData.data.Category}
                            onChange={(ev) => setCategory(ev.target.value)}></input>
                    </h4>
                    <h4 className="form1">

                        {`Publication Date:                `}
                        <input type="text" defaultValue={movieData.data.PublicationDate}
                            onChange={(ev) => setPublicationDate(ev.target.value)}></input>
                    </h4>

                </div>
            }
            <Button color="secondary"
                startIcon={<EditIcon></EditIcon>}
                onClick={function onClick() {
                    updateMovie(movie.movieId);
                }}>
                Update</Button>
        </Fragment>
    );
}
export default Movie;