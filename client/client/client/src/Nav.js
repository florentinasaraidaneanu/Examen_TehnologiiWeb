import { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, ButtonGroup } from "@material-ui/core"

function Nav() {
    const navStyleState = useState({ color: "blue" });
    const navigate = useNavigate();
    return (
        <Fragment>
            <AppBar style={{ position: "relative" }, { color: "black" }}>
                <Toolbar style={{ background: "beige" }}>
                    <Typography variant="h6"> Navigate ... </Typography>
                    <ButtonGroup>
                        <Button
                            style={navStyleState[0]}
                            onClick={function onClick() {
                                navigate("/");
                            }}
                        >HOME</Button>
                    </ButtonGroup>
                </Toolbar>
            </AppBar>
        </Fragment>
    );
}

export default Nav;