import React from 'react';
import Layout from './layout';
export default ()=>{
    return <>
    <Layout>
     {/* These are the 3 Card dashboard  */}
<div class="row">
  <div class="col-md-4">
    <div class="card-counter danger">
      <i class="fa fa-tasks"></i>
      <span class="count-numbers">Total Jobs Posted</span>
      <span class="count-name">1</span>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card-counter success">
      <i class="fa fa-paw"></i>
      <span class="count-numbers">Total Pets Posted</span>
      <span class="count-name">0</span>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card-counter info">
      <i class="fa fa-hotel"></i>
      <span class="count-numbers">Total Bookings</span>
      <span class="count-name">0</span>
    </div>
  </div>
</div>



<div class="row mt-3">
  <div class="col-md-12">
      <div class="card">
          <div class="card-header">
              <b className="font-16px font-weight-bold">My Recent Orders</b>
          </div>
          <div class="card-body max-400 style-4">
              

          </div>
      </div>
  </div>
</div>
    </Layout>
    </>
}