const checkURL = () => {
  let dashURL = window.location.href
  let isDashboard = false;
  //  Check to see if on main dashboard
  if (dashURL === 'http://localhost:3001/dashboard/' || dashURL === 'http://localhost:3001/dashboard') {
    isDashboard = true;
  }
  if (!isDashboard) {
    document.querySelector('#tripform').classList.add('hide');
  } else {
    document.querySelector('.currentTripBox').classList.add('hide');
    document.querySelector('.tripLoadout').classList.add('hide');
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
  .then( res => {
    if (res.ok) {
    location.reload()
    }
})
.catch(error => console.log('error', error));
  location.reload();

}



// this will find the parent gear element and fetch request to remove it from API
const deleteItem = (e) => {

  const gearId = e.target.parentElement.dataset.id;
  confirm('Are you sure you want to delete this? You cannot undo this action.')
  if (confirm) {
    fetch(`/api/gear/${gearId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
    }
    }).then(res => {
      if(res.ok) {
        location.reload();
      } else {
        alert("unable to process request")
        console.log(res);
      }
    })
  } else {
    return;
  }
}

const removeItem = (e) => {
  e.stopPropagation();

  let currTripId = document.querySelector('.currentTripBox').dataset.id
  
  const gearId = e.target.dataset.id;

  console.log(gearId);

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  var raw = JSON.stringify({
    "id": gearId
  });
  
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`/api/trips/${currTripId}`, requestOptions)
    // .then(response => response.json.text())
    .then( res => {
      console.log(res);
        if (res.ok) {
        location.reload()
        }
    })
    .catch(error => console.log('error', error));
      location.reload();
  
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
          location.reload();
      } else {
          alert("couldn't add item!")
          location.reload();
          console.log(res);
      }
  })
})


document.querySelector("#logoutbtn").addEventListener("click", logoutUser) 


document.querySelector(".gear-bank").addEventListener("click", (event) => {
  if (event.target.className.indexOf("deletebtn") > -1) {
    deleteItem(event);
  }
  if (event.target.className.indexOf("addToTrip") > -1) {
    addToTrip(event);
  }
});


const removeBtn = document.querySelectorAll(".removebtn");

if (removeBtn) {
  for (const btn of removeBtn) {
    btn.addEventListener("click", (event) => {
      console.log('clicked'); 
      removeItem(event);

    });
    
  }

}

