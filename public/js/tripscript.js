document.querySelector('.tripcard').addEventListener('click', (e) => {
  console.log('clicked!');
  const trip = e.target;
  const tripId = trip.parentElement.dataset.id
  
  fetch(`/trips/${tripId}`, {
    method: 'GET',
  }).then(res => {
    if(res.ok) {
      console.log('successful route!');

    } else {
      console.log(res);
      
    }
  })
})