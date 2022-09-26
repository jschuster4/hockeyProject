import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"


const OneGoalie = props =>{
    const { _playerID } = useParams();
    const [player, setPlayer] = useState(null);
    const [ad, setAd] = useState(null);
    const [rank, setRank] = useState(null);

    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${_playerID}`)
        .then(res =>{
            setPlayer(res.data)})
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${_playerID}/stats?stats=statsSingleSeason&season=20202021`)
        .then(res => setAd(res.data))
        .catch(err => console.log(err));
    }, [])

    // useEffect(() => {
    //     axios.get(`https://statsapi.web.nhl.com/api/v1/people/${_playerID}/stats?stats=regularSeasonStatRankings&season=20202021`)
    //     .then(res => setRank(res.data))
    //     .catch(err => console.log(err))
    // }, [])

    return(
        <div>
            <div>
                <h1>General Player Information</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Current Team</th>
                            <th>Position</th>
                            <th>Born</th>
                            <th>Age</th>
                            <th>Nationality</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Dominant Hand</th>
                        </tr>
                    </thead>
                    <tbody>{
                        player ?<tr>
                            <td>{player.people[0].fullName}</td>
                            <td>{player.people[0].currentTeam.name}</td>
                            <td>{player.people[0].primaryPosition.name}</td>
                            <td>{player.people[0].birthDate}</td>
                            <td>{player.people[0].currentAge}</td>
                            <td>{player.people[0].nationality}</td>
                            <td>{player.people[0].height}</td>
                            <td>{player.people[0].weight}</td>
                            <td>{player.people[0].shootsCatches}</td>
                        </tr>: <tr></tr>
                        }</tbody>
                </table>
            </div>

            <div>
                <h1>2020 - 2021 Season</h1>
                
                    {
                        ad && ad.stats[0] && ad.stats[0].splits[0] ? <table>
                    <thead>
                        {
                            player ? <tr>
                                <th>Shutouts</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Ties</th>
                                <th>Save Percentage</th>
                                <th>Goals Against</th>
                            </tr> : ""
                        }
                    </thead>
                        <tbody>
                            <tr>
                                <td>{ad.stats[0].splits[0].stat.shutouts}</td>
                                <td>{ad.stats[0].splits[0].stat.wins}</td>
                                <td>{ad.stats[0].splits[0].stat.losses}</td>
                                <td>{ad.stats[0].splits[0].stat.ties}</td>
                                <td>{ad.stats[0].splits[0].stat.savePercentage}</td>
                                <td>{ad.stats[0].splits[0].stat.goalsAgainst}</td>
                            </tr>
                        </tbody>
                    </table> : "Season Stats Not Available"
                    }
            </div>
        </div>
    )
}

export default OneGoalie;