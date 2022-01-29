import { Fragment, useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { CircularProgress, Button } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit";


function Crewmember() {
    const crewmember = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [crewmemberData, setCrewmemberData] = useState({
        data: '',
        loading: false,
        loaded: false,
    });

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('');
    const [movieId, setMovieId] = useState('');

    async function fetchCrewmember() {
        setCrewmemberData(function setState(prevState) {
            return { ...prevState, loading: true };
        });

        try {
            const response = await fetch(`http://localhost:8080/api/sequelize/get-crewmember/${crewmember.crewmemberId}`);

            const data = await response.json();
            setCrewmemberData({ data: data, loading: false, loaded: true });
            console.log(data);
        } catch (err) {
            setCrewmemberData(function setState(prevState) {
                return { ...prevState, loading: false, loaded: false };
            });
            console.error(err);
        }
    }

    useEffect(function insideEffect() {
        if (!crewmemberData.loaded) {
            fetchCrewmember();
        }
    }, [crewmemberData.loaded]);


    function setNewCrewmember(crewmemberData) {
        setId(crewmemberData.data.CrewMemberId);
        setName(crewmemberData.data.Name);
        setRole(crewmemberData.data.Role);
        setMovieId(crewmemberData.data.MovieId);
    }

    async function updateCrewmember() {
        const updatedCrewMember = {
            Name: name,
            Role: role,
            MovieId: movieId,
        }

        try {
            const addNewCrewmember = await fetch(`http://localhost:8080/api/sequelize/update-crewmember/${crewmember.crewmemberId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCrewMember)
            }).then((response) => {
                response.json().then((res) => alert(res)).then(_ => {
                    setId(-1);
                    setName('');
                    setRole('')
                    setMovieId('');
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
            {crewmemberData.loading && <CircularProgress />}
            {crewmemberData.loaded &&
                <div>
                    <h4 className="form">
                        {`CrewMember Id: ${crewmemberData.data.CrewMemberId}`}
                    </h4>
                    <h4 className="form1">

                        {`Name:                `}
                        <input type="text" defaultValue={crewmemberData.data.Name}
                            onChange={(ev) => setName(ev.target.value)}></input>
                    </h4>
                    <h4 className="form1">

                        {`Role:                `}
                        <input type="text" defaultValue={crewmemberData.data.Role}
                            onChange={(ev) => setRole(ev.target.value)}></input>
                    </h4>
                    <h4 className="form1">

                        {`Movie Id:                `}
                        <input type="number" defaultValue={crewmemberData.data.MovieId}
                            onChange={(ev) => setMovieId(ev.target.value)}></input>
                    </h4>

                </div>
            }
            <Button color="secondary"
                startIcon={<EditIcon></EditIcon>}
                onClick={function onClick() {
                    updateCrewmember(crewmember.crewMemberId);
                }}>
                Update</Button>
        </Fragment>
    );
}
export default Crewmember;