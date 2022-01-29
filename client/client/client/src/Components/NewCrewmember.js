import { Fragment, useState } from "react";
import { useNavigate } from "react-router";


function NewCrewmember() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [movieId, setMovieId] = useState('');

    async function addCrewmember() {
        const newCrewmember = {
            Name: name,
            Role: role,
            MovieId: movieId,
        }

        try {
            const addNewMovie = await fetch("http://localhost:8080/api/sequelize/create-crewmember", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCrewmember)
            }).then((response) => {
                response.json().then((res) => alert(res))

                if (response.status === 200) {
                    navigate("/");
                }
            })
        } catch (err) {
            console.error(err);
        }
    }

    function cancel() {
        navigate("/");
    }


    return (

        <Fragment>
            <div className="form">Add crewmember</div>
            <div>

                <div className="form1">
                    <input type="text" placeholder="Name"
                        onChange={(event) => setName(event.target.value)}></input>
                </div>
                <div className="form1">
                    <input type="text" placeholder="Role"
                        onChange={(event) => setRole(event.target.value)}></input>
                </div>
                <div className="form1">
                    <input type="number" placeholder="Movie Id"
                        onChange={(event) => setMovieId(event.target.value)}></input>
                </div>
                <div className="form1">
                    <input type="button" value="Add Crewmember" onClick={addCrewmember} />
                    <input type="button" value="Cancel" onClick={cancel} />
                </div>

            </div>
        </Fragment >
    );
}

export default NewCrewmember;