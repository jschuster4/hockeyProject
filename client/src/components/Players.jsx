import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Players = props => {
    const [roster, setRoster] = useState(null);
    const { _id } = useParams();
    const { _teamName } = useParams();
    
    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/teams/${_id}/roster`)
        .then(res => {
            setRoster(res.data.roster)
            console.log(res.data.roster)
        })
        .catch(err => console.log(err));
    }, [])

    return(
        <div className="container">
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                <h3>{_teamName} Roster 2022-2023</h3>
                <Link to={`/home`}><button className="btn btn-secondary" style={{marginTop: '15px'}}>Return to All Teams</button></Link>
            </div>
            <table className="table table-dark table-striped" style={{border: '10px solid', borderColor: 'orangered'}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>{
                    roster ? roster.map((player, i)=><tr>
                        {
                            player.position.name == "Goalie" ? <td>
                                <Link to={`/goalies/${player.person.id}`}>{player.person.fullName}</Link>
                            </td> : <td><Link to={`/players/${player.person.id}`}>{player.person.fullName}</Link></td>
                        }
                        
                        <td>{player.jerseyNumber}</td>
                        <td>{player.position.name}</td>
                    </tr>) : ""}</tbody>
            </table>
        </div>
    )
}

export default Players;