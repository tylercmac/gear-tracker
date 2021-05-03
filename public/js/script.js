document.querySelector("#loginForm").addEventListener("submit",event=>{
  event.preventDefault();
  const fetchObj = {
      email:document.querySelector("#loginEmail").value,
      password:document.querySelector("#loginPassword").value,
  }
  console.log(fetchObj);
  fetch("/user/login",{
      method:"POST",
      body:JSON.stringify(fetchObj),
      headers:{
          "Content-Type":"application/json"
      }
  }).then(res=>{
      console.log(res);
      if(res.ok){
          console.log("logged in successfully!")
          location.replace("/dashboard")
      } else {
          alert("log in failed!")
          location.reload();
      }
  })
})

document.querySelector("#signupForm").addEventListener("submit",event=>{
  event.preventDefault();
  const fetchObj = {
      email:document.querySelector("#signupEmail").value,
      password:document.querySelector("#signupPassword").value,
      username:document.querySelector("#signupUsername").value,
  }
  console.log(fetchObj);
  fetch("/user/signup",{
      method:"POST",
      body:JSON.stringify(fetchObj),
      headers:{
          "Content-Type":"application/json"
      }
  }).then(res=>{
      console.log(res);
      if(res.ok){
          console.log("signed up successfully!")
          location.replace("/dashboard")
      } else {
          alert("signup failed!")
          location.reload();
      }
  })
})