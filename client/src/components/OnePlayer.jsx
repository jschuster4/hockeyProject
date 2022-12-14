import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";



const OnePlayer = props =>{
    const { _playerID } = useParams();
    const [player, setPlayer] = useState(null);
    const [ad, setAd] = useState(null);
    const [ad1, setAd1] = useState(null);
    const [ad2, setAd2] = useState(null);

    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${_playerID}`)
        .then(res =>{
            setPlayer(res.data)})
        .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${_playerID}/stats?stats=statsSingleSeason&season=20212022`)
        .then(res => setAd(res.data))
        .catch(err => console.log(err));
    }, [])
    
    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${_playerID}/stats?stats=statsSingleSeason&season=20202021`)
        .then(res => setAd1(res.data))
        .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${_playerID}/stats?stats=statsSingleSeason&season=20192020`)
        .then(res => setAd2(res.data))
        .catch(err => console.log(err));
    }, [])


    return(
        <div className="container">
            <div >
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                    <h3>General Player Information</h3>
                    {
                        player ? <Link to={`/roster/${player.people[0].currentTeam.id}/${player.people[0].currentTeam.name}`}>
                        <button className="btn btn-secondary" style={{marginTop: '15px'}}>Back to Roster</button></Link> : ""
                    }
                </div>

                <table className="table table-dark table-striped" style={{border: '10px solid', borderColor: 'orangered'}}>
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
                <h3>Player Statistics 2019-2022</h3>
                {
                    ad && ad.stats[0] && ad.stats[0].splits[0] ?<table className="table table-dark table-striped" style={{border: '10px solid', borderColor: 'orangered'}}>
                    <thead>
                        {
                            player ? <tr>
                                <th>Season</th>
                                <th>Goals</th>
                                <th>Assists</th>
                                <th>PIM</th>
                                <th>+/-</th>
                                <th>Shots</th>
                                <th>Hits</th>
                                <th>Points</th>
                                <th>Games</th>
                                <th>Average Ice Time</th>
                            </tr> : ""
                        }
                    </thead>
                    <tbody>
                            <tr>
                                <td>{ad.stats[0].splits[0].season}</td>
                                <td>{ad.stats[0].splits[0].stat.goals} </td>
                                <td>{ad.stats[0].splits[0].stat.assists} </td>
                                <td>{ad.stats[0].splits[0].stat.pim} </td>
                                <td>{ad.stats[0].splits[0].stat.plusMinus} </td>
                                <td>{ad.stats[0].splits[0].stat.shots} </td>
                                <td>{ad.stats[0].splits[0].stat.hits} </td>
                                <td>{ad.stats[0].splits[0].stat.points} </td>
                                <td>{ad.stats[0].splits[0].stat.games} </td>
                                <td>{ad.stats[0].splits[0].stat.timeOnIcePerGame} </td>
                            </tr>
                            {
                                ad1 && ad1.stats[0] && ad1.stats[0].splits[0]? <tr>
                                <td>{ad1.stats[0].splits[0].season}</td>
                                <td>{ad1.stats[0].splits[0].stat.goals} </td>
                                <td>{ad1.stats[0].splits[0].stat.assists} </td>
                                <td>{ad1.stats[0].splits[0].stat.pim} </td>
                                <td>{ad1.stats[0].splits[0].stat.plusMinus} </td>
                                <td>{ad1.stats[0].splits[0].stat.shots} </td>
                                <td>{ad1.stats[0].splits[0].stat.hits} </td>
                                <td>{ad1.stats[0].splits[0].stat.points} </td>
                                <td>{ad1.stats[0].splits[0].stat.games} </td>
                                <td>{ad1.stats[0].splits[0].stat.timeOnIcePerGame} </td>
                            </tr> : <tr>
                                    <td> Stats Not Available</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                </tr>
                            }
                            {
                                ad2 && ad2.stats[0] && ad2.stats[0].splits[0] ? <tr>
                                <td>{ad2.stats[0].splits[0].season}</td>
                                <td>{ad2.stats[0].splits[0].stat.goals} </td>
                                <td>{ad2.stats[0].splits[0].stat.assists} </td>
                                <td>{ad2.stats[0].splits[0].stat.pim} </td>
                                <td>{ad2.stats[0].splits[0].stat.plusMinus} </td>
                                <td>{ad2.stats[0].splits[0].stat.shots} </td>
                                <td>{ad2.stats[0].splits[0].stat.hits} </td>
                                <td>{ad2.stats[0].splits[0].stat.points} </td>
                                <td>{ad2.stats[0].splits[0].stat.games} </td>
                                <td>{ad2.stats[0].splits[0].stat.timeOnIcePerGame} </td>
                            </tr> : <tr>
                                    <td> Stats Not Available</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                    <td>n/a</td>
                                </tr>
                            }
                        </tbody>
                    </table>: <h3>Season Stats Not Available</h3>
                        }
            </div>
        </div>
    )
}

export default OnePlayer;

