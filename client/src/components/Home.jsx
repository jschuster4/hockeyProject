import { useEffect } from "react"
import { useState } from "react"
import axios from 'axios'
import { Link } from 'react-router-dom'


const Home = props => {
    const [teams, setTeams] = useState(null)

    useEffect(() => {
        axios.get("https://statsapi.web.nhl.com/api/v1/teams")
        .then(res => {
            setTeams(res.data.teams)})
        .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <h3 style={{color: 'mintcream', paddingBottom: '15px'}}>All Teams</h3>
                <div className="container">
                    <table className="table table-dark table-striped" style={{border: '10px solid', borderColor: 'orangered'}}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Active Roster</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            teams ? teams.map((team, i) =><tr>
                                    <td>{team.locationName} {team.teamName}</td>
                                    <td><Link to={`/roster/${team.id}/${team.locationName} ${team.teamName}`}><button className="btn btn-primary">Roster</button></Link></td>
                                </tr>) : ""
                            }
                        </tbody>
                    </table>
                
                    
                </div>

        </div>
    );
}

export default Home