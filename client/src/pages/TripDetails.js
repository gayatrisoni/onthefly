import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import ActivityBtn from '../components/ActivityBtn';
import DestinationBtn from '../components/DestinationBtn';
import './TripDetails.css'

const TripDetails = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: 0, title: "", description: "", img_url: "", num_days: 0, start_date: "", end_date: "", total_cost: 0.0 })
    const [activities, setActivities] = useState([])
    const [destinations, setDestinations] = useState([])

    useEffect(() => {
        const result = data.filter(item => item.id === parseInt(id))[0];
        if (result) {
            setPost({
                id: parseInt(result.id),
                title: result.title,
                description: result.description,
                img_url: result.img_url,
                num_days: parseInt(result.num_days),
                start_date: result.start_date.slice(0, 10),
                end_date: result.end_date.slice(0, 10),
                total_cost: result.total_cost
            });
        }

        const fetchActivities = async () => {
            try {
                console.log(id)
                const response = await fetch(`http://localhost:3001/activities/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setActivities(data);
                    console.log(data)
                } else {
                    console.error("Failed to fetch activities:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
          }

        const fetchDestinations = async () => {
            try {
                const response = await fetch(`http://localhost:3001/trips_destinations/destinations/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setDestinations(data);
                } else {
                    console.error("Failed to fetch destinations:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching destinations:", error);
            }
        }


        fetchActivities();
        fetchDestinations();

    }, [data, id]);


    return (
        <div className="out">
            <div className="flex-container">

                <div className="left-side">
                    <h3>{post.title}</h3>
                    <p>{"🗓️ Duration: " + post.num_days + " days "}</p>
                    <p>{"🛫 Depart: " + post.start_date }</p>
                    <p>{"🛬 Return: " + post.end_date}</p>
                    <p>{post.description}</p>
                </div>

                <div className="right-side" style={{ backgroundImage:`url(${post.img_url})`}}>
                </div>
            </div>

            <div className="flex-container">
                <div className="activities">
                {
                activities && activities.length > 0 ?
                activities.map((activity,index) => 
                    <ActivityBtn id={activity.id} activity={activity.activity} num_votes={activity.num_votes}/>
                ) : ''
                }
                    <br/>
                    <Link to={'../../activity/create/'+ id }><button className="addActivityBtn">+ Add Activity</button></Link>
                </div>
                <div className="destinations">
                {
                destinations && destinations.length > 0 ?
                destinations.map((destination,index) => 
                    <DestinationBtn id={destination.id} destination={destination.destination} />
                ) : ''
                }
                    <br/>
                    <Link to={'../../destination/new/'+id}><button className="addDestinationBtn">+ Add Destination</button></Link>
                </div>
            </div>
            
        </div>
            


    )
}

export default TripDetails