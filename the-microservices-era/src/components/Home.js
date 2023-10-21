import InsertEvent from './InsertEvent';
import InsertParticipant from './InsertParticipant';
import DynamicTable from './Dynamictable';
import React, { useState } from 'react';

// for testing initial connection w/ APIGW
import axios from 'axios';


export default function Home() {
    const [showTable, setShowTable] = useState(false);

    const toggleTableVisibility = () => {
        setShowTable((prevShowTable) => !prevShowTable);
    };

    function invokeAPIGW(input1, input2){
       return function (input1, input2) {
        
    
        axios.get(`https://t6r6u8jln4.execute-api.us-east-1.amazonaws.com/Updating/exampleresource/?first_name=${input1}&last_name=${input2}`, {
          
        }
        ).then(function (response) {
            // handle success
            console.log(response);
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
        }
    }

    return (
        <div>
            <h1 style={{marginTop: '4%'}}>Rocking Bussin Layered Architecture :)</h1>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', padding: '3rem'}}>
                {/* Forms directly in the home page for now... maybe tabs or open on button click ? */}
                <InsertEvent />
                <InsertParticipant/> 
            </div>
            <button className = "viewEvents" onClick={toggleTableVisibility}>
                {showTable ? 'Hide Tables' : 'View Tables'}
            </button>
            {showTable && <DynamicTable />}


            {/* for testing initial connection with APIGW */}
            <button onClick={invokeAPIGW("blah","blooh")}>
                TEST APIGW
            </button>

        </div>
    );
}

