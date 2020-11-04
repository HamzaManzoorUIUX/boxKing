import React from 'react';
import {useHistory} from 'react-router-dom';
export default()=>{

        const history=useHistory();
    return <div style={{display:'flex',justifyContent:'center'}}>
        <div className="cgstBoxsa">
            <img className="cntrimg" src={require('../images/cbc1.png')}/>
            <h3 className="cgstrtex">Congratulations !!!</h3>
            <p className="cgtspaarr">We’ve receoved your order and we’ll get back to you with your delivery status through email or provided phone no.</p>
            <button className="btn btn-outline-warning sgtbbutonn" onClick={()=>{history.push('/')}}>Start Another</button>
        </div>
    </div>
}