import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DynamicTable = () => {
  const [eventData, setEventData] = useState({});
  const [participantData, setParticipantData] = useState({});

  // on load, fetch from DB TODO: APIGW
  useEffect(() => {

    // get dynamoDB contents of event table
    axios.get(`https://t6r6u8jln4.execute-api.us-east-1.amazonaws.com/main/events/`, {}
    ).then(function (response) {
    // handle success
    console.log(response);
    // setEventData(response);

    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })

    // get dynamoDB contents of participants table
    axios.get(`https://t6r6u8jln4.execute-api.us-east-1.amazonaws.com/main/participants/`, {}
    ).then(function (response) {
    // handle success
    console.log(response);
    // setParticipantData(response);

    })
    .catch(function (error) {
    // handle error
    console.log(error);
    })

  }, []);

// to properly update eventData
  useEffect(() => {
    console.log("eventData updated:", eventData);
  }, [eventData]);

// to properly update participantData
  useEffect(() => {
    console.log("participantData updated:", participantData);
  }, [participantData]);

  return (
    <div>
      <div className="container1">
        <table>
          <thead>
            <tr>
              <th>UUID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Title</th>
              <th>Description</th>
              <th>Host Email</th>
            </tr>
          </thead>
          <tbody>
          {Object.keys(eventData).length === 0 ? (
              <tr>
                <td colSpan="6">No Events Added Yet!</td>
              </tr>
            ) : (
              Object.keys(eventData).map((eventID) => {
                return (
                  <tr key={eventID}>
                    <td>{eventData[eventID].event_id}</td>
                    <td>{eventData[eventID].event_date}</td>
                    <td>{eventData[eventID].event_time}</td>
                    <td>{eventData[eventID].event_title}</td>
                    <td>{eventData[eventID].event_description}</td>
                    <td>{eventData[eventID].event_host_email}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="container2">
        <table>
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Participant ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(participantData).length === 0 ? (
              <tr>
                <td colSpan="6">No Participants Added Yet!</td>
              </tr>
            ) : (
              Object.keys(participantData).map((id) => {
                return (
                  <tr key={id}>
                    <td>{participantData[id].p_event_uuid}</td>
                    <td>{participantData[id].p_participant_uuid}</td>
                    <td>{participantData[id].p_participant_name}</td>
                    <td>{participantData[id].p_participant_email}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;