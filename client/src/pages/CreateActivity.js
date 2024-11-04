import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './CreateActivity.css'

const CreateActivity = () => {

    // const [activity, setActivity] = useState({activity: " ", trip_id: 0, num_votes: 0} );
    const {trip_id} = useParams();
    const [activity, setActivity] = useState(""); // Activity as a string
    const num_votes = 0;
   


    // const handleChange = (event) => {
    //     const {name, value} = event.target;
    //     setActivity( (prev) => {
    //         return {
    //             ...prev,
    //             [name]:value,
    //         }
    //     })
    // }

    const handleChange = (event) => {
        setActivity(event.target.value);
    };


    
    
    const createActivity = async (event) => {
        event.preventDefault()

        const payload = {
            activity,       // Activity as a string
            trip_id, // Use the valid trip_id
            num_votes       // Initial votes count
        };
      
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }

        console.log(options)
      
        fetch(`http://localhost:3001/activities/${trip_id}` , options)
        window.location.href = '/'
    }

    return (
        <div>
            <center><h3>Add Activity</h3></center>
            <form>
                <label>Activity</label> <br />
                <input type="text" id="activity" name="activity" value={activity.activity} onChange={handleChange}/><br />
                <br/>

                <label>Trip ID</label><br />
                <input type="number" id="trip_id" name="trip_id" value={trip_id} readOnly/><br />
                <br/>

                <input type="submit" value="Submit" onClick={createActivity} />
            </form>
        </div>
    )
}

export default CreateActivity