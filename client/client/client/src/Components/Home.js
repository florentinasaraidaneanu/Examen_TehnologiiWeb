import { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";


function Home() {
    const navigate = useNavigate();
    const [moviesData, setMoviesData] = useState({
        data: {},
        loading: false,
        loading: false,
    });


    async function fetchMovies() {
        setMoviesData(function setState(prevState) {
            return { ...prevState, loading: true };
        });
        try {
            const response = await fetch("http://localhost:8080/api/sequelize/get-movies-and-crewmembers");
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
            fetchMovies();
        }
    }, [moviesData.loaded]);


    async function deleteMovie(movieId) {
        await fetch(`http://localhost:8080/api/sequelize/delete-movie/${movieId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            response.json().then((res) => alert(res)).then(_ => {
                window.location.reload();
            });
        });
    }

    async function deleteCrewMember(crewmemberId) {
        await fetch(`http://localhost:8080/api/sequelize/delete-crewmember/${crewmemberId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            response.json().then((res) => alert(res)).then(_ => {
                window.location.reload();
            });
        });
    }

    return (
        <Fragment>
            <h3 className="movies"> List of movies </h3>
            {moviesData.loading && <CircularProgress></CircularProgress>}
            {moviesData.loaded && moviesData.data.map(function renderMovie(movie) {
                return (
                    <h4 className="element"
                        key={movie.MovieId}>
                        {`Movie  ${movie.MovieId}`}
                        <Button color="secondary"
                            startIcon={<DeleteIcon></DeleteIcon>}
                            onClick={function onClick() {
                                deleteMovie(movie.MovieId);
                            }}>
                        </Button>

                        <Button color="primary"
                            startIcon={<EditIcon></EditIcon>}
                            onClick={function onClick() {
                                navigate(`/movie/${movie.MovieId}`);
                            }}>
                        </Button>

                        <div> {`Title: ${movie.Title}`} </div>
                        <div> {`Publication Date: ${movie.PublicationDate}`} </div>
                        <div> Crew: </div>
                        {movie.CrewMembers.map(function renderCrewMember(crewmember) {
                            return (
                                <div className="element"
                                    key={crewmember.CrewMemberId}
                                >
                                    <Button color="secondary"
                                        startIcon={<DeleteIcon></DeleteIcon>}
                                        onClick={function onClick() {
                                            deleteCrewMember(crewmember.CrewMemberId);
                                        }}>
                                    </Button>
                                    <Button color="primary"
                                        startIcon={<EditIcon></EditIcon>}
                                        onClick={function onClick() {
                                            navigate(`/crewmember/${crewmember.CrewMemberId}`)
                                        }}>
                                    </Button>
                                    {`Crewmember ${crewmember.CrewMemberId} | Name: ${crewmember.Name} | Role: ${crewmember.Role}`}
                                </div>
                            );
                        })}
                    </h4>
                );
            })}

            <Button
                color="secondary"
                onClick={function onClick() {
                    navigate(`/movies-sorted`);
                }}

            > SORT MOVIES BY TITLE
            </Button>
            <Button
                startIcon={<AddIcon></AddIcon>}
                color="secondary"
                onClick={function onClick() {
                    navigate("/add-movie");
                }}>
                Add a new movie
            </Button>
            <Button
                startIcon={<AddIcon></AddIcon>}
                color="secondary"
                onClick={function onClick() {
                    navigate("/add-crewmember");
                }}>
                Add a new crewmember
            </Button>
        </Fragment>

    );
}
export default Home;