const checkURL = () => {
  let dashURL = window.location.href
  let isDashboard = false;
  //  Check to see if on main dashboard
  if (dashURL === 'http://localhost:3001/dashboard/') {
    isDashboard = true;
  }
  if (!isDashboard) {
    document.querySelector('#tripform').classList.add('hide');
  }
}

checkURL();

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
  
  let dashURL = window.location.href
  let isDashboard = false;
  
  //  Check to see if on main dashboard
  if (dashURL === 'http://localhost:3001/dashboard') {
    isDashboard = true;
  }
  // Grabs currently loaded trip ID
  let currTripId = document.querySelector('.currentTripBox').dataset.id

  // If on dashboard, alerts that no trip to add item to
  if (isDashboard === true) {
    alert('no trip to assign this item to!')
    return;
  } 
  //  Upates gear item to that trip on page NOT WORKING
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "id": currTripId
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`/api/gear/${currentItemId}`, requestOptions)
    .then(response => response.text())
    .then(result => {
      location.reload();
    })
    .catch(error => console.log('error', error));

}



// this will find the parent gear element and fetch request to remove it from API
const deleteItem = (e) => {
  e.stopPropagation();
  const gear = e.target;
  
  const gearId = gear.dataset.id;

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
  fetch("/api/gear", {
      method: "POST",
      body: JSON.stringify(fetchObj),
      headers: {
          "Content-Type": "application/json"
      }
  }).then(res => {
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

//if (document.querySelector(".deletebtn")) {
  document.querySelector(".gear-bank").addEventListener("click", (event) => {
    if (event.target.className.indexOf("deletebtn") > -1) {
      deleteItem();
    }
    if (event.target.className.indexOf("addToTrip") > -1) {
      addToTrip(event);
    }
  });
//   document.querySelector(".deletebtn").addEventListener("click", deleteItem);
// //} 

// if (document.querySelector(".addToTrip")) {
//   document.querySelector(".addToTrip").addEventListener("click", addToTrip);
// }