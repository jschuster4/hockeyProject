import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";



const OneGoalie = props =>{
    const { _playerID } = useParams();
    const [player, setPlayer] = useState(null);
    const [ad, setAd] = useState(null);
    const [rank, setRank] = useState(null);
    const [ad1, setAd1] = useState(null)

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
    
    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${_playerID}/stats?stats=statsSingleSeason&season=20192020`)
        .then(res => setAd1(res.data))
        .catch(err => console.log(err));
    }, [])

    return(
        <div className="container">
            <div>
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <h3>General Player Information</h3>
                    {
                        player ? <Link to={`/roster/${player.people[0].currentTeam.id}/${player.people[0].currentTeam.name}`}>
                        <button className="btn btn-secondary" style={{marginTop: '15px'}}>Back to Roster</button></Link> : ""
                    }
                </div>
                <table className='table table-dark table-striped' style={{border: '10px solid', borderColor: 'orangered'}}>
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
                <h3>2020 - 2021 Season Stats</h3>
                    {
                        ad && ad.stats[0] && ad.stats[0].splits[0] ? <table className="table table-dark table-striped" style={{border: '10px solid', borderColor: 'orangered'}}>
                    <thead>
                        {
                            player ? <tr>
                                <th>Games Played</th>
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
                                <td>{ad.stats[0].splits[0].stat.games}</td>
                                <td>{ad.stats[0].splits[0].stat.shutouts}</td>
                                <td>{ad.stats[0].splits[0].stat.wins}</td>
                                <td>{ad.stats[0].splits[0].stat.losses}</td>
                                <td>{ad.stats[0].splits[0].stat.ties}</td>
                                <td>{ad.stats[0].splits[0].stat.savePercentage}</td>
                                <td>{ad.stats[0].splits[0].stat.goalsAgainst}</td>
                            </tr>
                        </tbody>
                    </table> : <h3>Season Stats Not Available</h3>
                    }
            </div>

            <div>
                <h3>2019 - 2020 Season Stats</h3>
                    {
                        ad1 && ad1.stats[0] && ad1.stats[0].splits[0] ? <table className="table table-dark table-striped" style={{border: '10px solid', borderColor: 'orangered'}}>
                    <thead>
                        {
                            player ? <tr>
                                <th>Games Played</th>
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
                                <td>{ad1.stats[0].splits[0].stat.games}</td>
                                <td>{ad1.stats[0].splits[0].stat.shutouts}</td>
                                <td>{ad1.stats[0].splits[0].stat.wins}</td>
                                <td>{ad1.stats[0].splits[0].stat.losses}</td>
                                <td>{ad1.stats[0].splits[0].stat.ties}</td>
                                <td>{ad1.stats[0].splits[0].stat.savePercentage}</td>
                                <td>{ad1.stats[0].splits[0].stat.goalsAgainst}</td>
                            </tr>
                        </tbody>
                    </table> : <h3>Season Stats Not Available</h3>
                    }
            </div>
        </div>
    )
}

export default OneGoalie;