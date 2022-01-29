import { Fragment, useState } from "react";
import { useNavigate } from "react-router";

function NewCategory() {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [publicationDate, setPublicationDate] = useState('');

    async function addMovie() {
        const newMovie = {
            Title: title,
            Category: category,
            PublicationDate: publicationDate,
        }

        try {
            const addNewMovie = await fetch("http://localhost:8080/api/sequelize/create-movie", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMovie)
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
            <div className="form">Add movie</div>
            <div>

                <div className="form1">
                    <input type="text" placeholder="Title"
                        onChange={(event) => setTitle(event.target.value)}></input>
                </div>
                <div className="form1">
                    <input type="text" placeholder="Category"
                        onChange={(event) => setCategory(event.target.value)}></input>
                </div>
                <div className="form1">
                    <input type="text" placeholder="Date"
                        onChange={(event) => setPublicationDate(event.target.value)}></input>
                </div>
                <div className="form1">
                    <input type="button" value="Add Movie" onClick={addMovie} />
                    <input type="button" value="Cancel" onClick={cancel} />
                </div>

            </div>
        </Fragment >
    );

}
export default NewCategory;