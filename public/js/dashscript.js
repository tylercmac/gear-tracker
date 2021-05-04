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
          alert("signup failed!")
          location.reload();
      }
  })
})

document.querySelector("#logoutbtn").addEventListener("click", logoutUser) 
if (document.querySelector(".deletebtn")) {
  document.querySelector(".deletebtn").addEventListener("click", deleteItem);
} 