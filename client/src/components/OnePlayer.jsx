import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom"


const OnePlayer = props =>{
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

    useEffect(() => {
        axios.get(`https://statsapi.web.nhl.com/api/v1/people/${_playerID}/stats?stats=regularSeasonStatRankings&season=20202021`)
        .then(res => setRank(res.data))
        .catch(err => console.log(err))
    }, [])

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
                    ad && ad.stats[0] && ad.stats[0].splits[0] && rank && rank.stats[0] && rank.stats[0].splits[0] ?<table>
                    <thead>
                        {
                            player ? <tr>
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
                                <td>{ad.stats[0].splits[0].stat.goals} (Rank:{rank.stats[0].splits[0].stat.rankGoals})</td>
                                <td>{ad.stats[0].splits[0].stat.assists} (Rank:{rank.stats[0].splits[0].stat.rankAssists})</td>
                                <td>{ad.stats[0].splits[0].stat.pim} (Rank:{rank.stats[0].splits[0].stat.rankPenaltyMinutes})</td>
                                <td>{ad.stats[0].splits[0].stat.plusMinus} (Rank:{rank.stats[0].splits[0].stat.rankPlusMinus})</td>
                                <td>{ad.stats[0].splits[0].stat.shots} (Rank:{rank.stats[0].splits[0].stat.rankShots})</td>
                                <td>{ad.stats[0].splits[0].stat.hits} (Rank:{rank.stats[0].splits[0].stat.rankHits})</td>
                                <td>{ad.stats[0].splits[0].stat.points} (Rank:{rank.stats[0].splits[0].stat.rankPoints})</td>
                                <td>{ad.stats[0].splits[0].stat.games} (Rank:{rank.stats[0].splits[0].stat.rankGamesPlayed})</td>
                                <td>{ad.stats[0].splits[0].stat.timeOnIcePerGame} </td>
                            </tr>
                        </tbody>
                    </table>: "Season Stats Not Available"

                        }
            </div>
        </div>
    )
}

export default OnePlayer;

// ad && rank ? <tr>
//                                 <td>{ad.stats[0].splits[0].stat.goals} (Rank: {rank.stats[0].splits[0].stat.rankGoals})</td>
//                                 <td>{ad.stats[0].splits[0].stat.assists} (Rank: {rank.stats[0].splits[0].stat.rankAssists})</td>
//                                 <td>{ad.stats[0].splits[0].stat.pim} (Rank: {rank.stats[0].splits[0].stat.rankPenaltyMinutes})</td>
//                                 <td>{ad.stats[0].splits[0].stat.plusMinus} (Rank: {rank.stats[0].splits[0].stat.rankPlusMinus})</td>
//                                 <td>{ad.stats[0].splits[0].stat.shots} (Rank: {rank.stats[0].splits[0].stat.rankShots})</td>
//                                 <td>{ad.stats[0].splits[0].stat.hits} (Rank: {rank.stats[0].splits[0].stat.rankHits})</td>
//                                 <td>{ad.stats[0].splits[0].stat.points} (Rank: {rank.stats[0].splits[0].stat.rankPoint})</td>
//                                 <td>{ad.stats[0].splits[0].stat.games} (Rank: {rank.stats[0].splits[0].stat.rankGamesPlayed})</td>
//                                 <td>{ad.stats[0].splits[0].stat.timeOnIcePerGame}</td>
//                             </tr> : ""