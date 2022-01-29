import { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { Button, CircularProgress } from "@material-ui/core"

function SortedMovies() {

    const navigate = useNavigate();
    const movie = useParams();
    const [moviesData, setMoviesData] = useState({
        data: {},
        loading: false,
        loaded: false,
    });


    async function fetchAllMovies() {
        setMoviesData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch(`http://localhost:8080/api/sequelize/get-movie-asc`);
            const data = await response.json();
            setMoviesData({ data: data, loading: false, loaded: true });
            console.log(data);

        } catch (err) {
            setMoviesData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });

            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!moviesData.loaded) {
            fetchAllMovies();
        }
    }, [moviesData.loaded]);

    return (
        <Fragment>
            <div className="movies">The list of movies</div>
            {moviesData.loading && <CircularProgress></CircularProgress>}
            {moviesData.loaded && moviesData.data.map(function renderMovie(movie) {
                return (
                    <h4
                        className="element"
                        key={movie.MovieId}>
                        <div> {`Movie: ${movie.MovieId}`} </div>
                        <div> {`Title: ${movie.Title}`} </div>
                        <div> {`Publication Date: ${movie.PublicationDate}`} </div>
                        <div> Crew: </div>
                        {movie.CrewMembers.map(function renderCrewMember(crewmember) {
                            return (
                                <div className="element"
                                    key={crewmember.CrewMemberId}
                                >
                                    {`Crewmember ${crewmember.CrewMemberId} | Name: ${crewmember.Name} | Role: ${crewmember.Role}`}
                                </div>
                            );
                        })}
                    </h4>
                );
            })}

        </Fragment >
    );
}

export default SortedMovies;