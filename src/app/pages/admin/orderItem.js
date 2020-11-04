import React, { Component, useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, useHistory, useLocation
} from "react-router-dom";
export default () => {
    let location = useLocation();
    const [data, setData] = useState()
    useEffect(() => {
        setData(location.state.row);
        console.log(location.state.row)
        
    }, [])

    
    return      <Card className="pdrdst1">
    <p className="prdsthh1">{location.state.row.product.title}</p>
    <p className="prdstpp1">{location.state.row.product.shortdescription}</p>
    <div className="brdbxt1"></div>

    <div className="row mt-4 mb-3">
        <div className="col-md-6">
            <div style={{ padding: 20 }}>
                <div className="dist-brd"></div>
                <p className="prdt-head-d">Product Details</p>
                <table>
                    <tr>
                        <td><p className="cstDatacot">Inner Dimension Width (W)</p></td>
                        <td><p className="cstDatacotpara">{location.state.row.width}</p></td>
                    </tr>
                    <tr>
                        <td><p className="cstDatacot">Inner Depth (D)</p></td>
                        <td><p className="cstDatacotpara">{location.state.row.depth}</p></td>
                    </tr>
                    <tr>
                        <td><p className="cstDatacot">Inner Dimension Height (H)</p></td>
                        <td><p className="cstDatacotpara">{location.state.row.height}</p></td>
                    </tr>
                    <tr>
                        <td><p className="cstDatacot">Print Run</p></td>
                        <td><p className="cstDatacotpara">{location.state.row.printRun}</p></td>
                    </tr>
                    <tr>
                        <td><p className="cstDatacot">Material</p></td>
                        <td><p className="cstDatacotpara">{location.state.row.material}</p></td>
                    </tr>
                    <tr>
                        <td><p className="cstDatacot">Type Of Printing</p></td>
                        <td><p className="cstDatacotpara">{location.state.row.typeOfprocessing}</p></td>
                    </tr>
                    <tr>
                        <td><p className="cstDatacot">Finishing</p></td>
                        <td><p className="cstDatacotpara">{location.state.row.finishing}</p></td>
                    </tr>
                    <tr>
                        <td><p className="cstDatacot">Finishing Effect</p></td>
                        <td><p className="cstDatacotpara">{location.state.row.finishingEffect}</p></td>
                    </tr>
                 

                </table>
              <div style={{marginTop:40}}>
              <div className="dist-brd"></div>
                <p className="prdt-head-d">Product Details</p>
              </div>
              <table>
                    <tr>
                        <td><p className="cstDatacot">Price</p></td>
                        <td><p className="cstDatacotpara">{location.state.row.purchaseAmount}</p></td>
                    </tr>
                  
                    <tr>
                        <td><p className="cstDatacot">Quantity</p></td>
                        <td><p className="cstDatacotpara">{location.state.row.quantity}</p></td>
                    </tr>
                  
                    <tr>
                        <td><p className="cstDatacot">Total</p></td>
                        <td><p className="cstDatacotpara">{location.state.row.totalAmount}</p></td>
                    </tr>
                  

                </table>
       
            </div>
        </div>
        <div className="col-md-4">
            <div className="img-box-cst1">
                <div className="img-box-cst1-hea">
                    <h3 className="img-box-cst1-hea-h3">Product Peview</h3>
                    <img src="" style={{ width: '100%' }} />
                </div>
                <p className="cstydown-ldbtn"><a>Download Design</a></p>
            </div>
        </div>
    </div>
</Card>

}