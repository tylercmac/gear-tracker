const logoutUser = () => {
  console.log('clicked!');
  
  fetch("/portal/logout", {
    method: 'GET',
  }).then(res => {
    if(res.ok) {
      alert("Logged out successfully!")
      location.replace("/")
    } else {
      alert("You are not logged in!")
      console.log(res);
      
    }
  })
}

// When item is chosen from gear bank, it will populate spot on current trip gear list
const addToTrip = (e) => {
  const currentItemId = e.target.parentElement.dataset.id;
  
  let urlArr = window.location.href.split('')
  let currTripId = urlArr[urlArr.length - 1]


  console.log(currTripId)
  if (currTripId = "d") {
    alert('no trip to assign this item to!')
    return;
  } 
  //  Upates gear item to that trip on page
  fetch(`/api/gear/${currentItemId}`, {
    method: 'PUT',
    body: JSON.stringify({
      trip_id: currTripId
    }),
    headers: {
      "Content-Type": "application/json"
  }
  }).then(res => {
    if(res.ok) {
      alert("Item added to trip!")
      location.reload();
    } else {
      alert("unable to process request")
      console.log(res);
      
    }
  })
}



// this will find the parent gear element and fetch request to remove it from API
const deleteItem = (e) => {
  e.stopPropagation();
  const gear = e.target;
  console.log(gear.parentElement.dataset.id);
  
  const gearId = gear.parentElement.dataset.id;

  fetch(`/api/gear/${gearId}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
  }
  }).then(res => {
    if(res.ok) {
      alert("Item deleted successfully!")
      location.reload();
    } else {
      alert("unable to process request")
      console.log(res);
      
    }
  })
}

// Add a trip form with fetch req to server
document.querySelector("#tripForm").addEventListener("submit", event => {
  console.log('trip submitted');
  
  event.preventDefault();
  const fetchObj = {
      name: document.querySelector("#name").value,
      location: document.querySelector("#location").value,
      description: document.querySelector("#tripdescription").value,
      starting_date: document.querySelector("#startingdate").value,
      ending_date: document.querySelector("#endingdate").value,
      distance_mi: document.querySelector("#distance").value
  }
  console.log(fetchObj);
  fetch("/api/trips", {
      method: "POST",
      body: JSON.stringify(fetchObj),
      headers: {
          "Content-Type": "application/json"
      }
  }).then(res => 
      res.json()
  )
  .then(data => { 
    location.replace(`/dashboard/${data.id}`);
    
  })
})

// Add a gear item to gear bank through this form
document.querySelector("#bag").addEventListener("submit", event => {
  console.log('form submitted');
  
  event.preventDefault();
  const fetchObj = {
      general_name: document.querySelector("#item").value,
      product_name: document.querySelector("#prodname").value,
      description: document.querySelector("#description").value,
      weight_oz: document.querySelector("#weight").value,
      price: document.querySelector("#price").value,
  }
  console.log(fetchObj);
  fetch("/api/gear", {
      method: "POST",
      body: JSON.stringify(fetchObj),
      headers: {
          "Content-Type": "application/json"
      }
  }).then(res => {
      console.log(res);
      if (res.ok) {
          console.log("added successfully!")
          location.reload();
      } else {
          alert("couldn't add item!")
          location.reload();
          console.log(res);
      }
  })
})

// Save trip with gear items in it?
// document.querySelector("#saveTrip").addEventListener('click', event => {
//   event.preventDefault();
  
  
  
// })

document.querySelector("#logoutbtn").addEventListener("click", logoutUser) 
if (document.querySelector(".deletebtn")) {
  document.querySelector(".deletebtn").addEventListener("click", deleteItem);
} 
if (document.querySelector(".addToTrip")) {
  document.querySelector(".addToTrip").addEventListener("click", addToTrip);
}