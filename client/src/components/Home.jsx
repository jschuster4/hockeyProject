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
            <h1>All teams</h1>
                <div>
                    {
                        teams ? teams.map((team, i) => <div>
                            <p>{team.locationName} {team.teamName} <Link to={`/roster/${team.id}/${team.teamName}`}>Roster</Link></p>
                        </div>) : ""
                    }
                </div>

        </div>
    );
}

export default Home