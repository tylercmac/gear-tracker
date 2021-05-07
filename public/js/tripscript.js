// document.querySelector('.userTrips').addEventListener('click', (e) => {
//   console.log('clicked!');
//   const trip = e.target;
//   const tripId = trip.closest('section').dataset.id;
//   console.log(trip);
//   console.log(tripId);
  
//   fetch(`/dashboard/${tripId}`, {
//     method: 'GET',
//   }).then(res => {
//     if(res.ok) {
//       console.log('successful route!');

//     } else {
//       console.log(res);
      
//     }
//   }).then(res => 
//     res.json()
//   )
//   .then(data => { 
//   location.replace(`/dashboard/${data.id}`);
//   })

// })

