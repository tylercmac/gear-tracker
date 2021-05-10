const deleteTrip = (e) => {

    const tripId = e.target.dataset.id;
    console.log(tripId);


    if (confirm('Are you sure you want to delete this? You cannot undo this action.')) {
        fetch(`/api/trips/${tripId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                location.reload();
            } else {
                alert("unable to process request")
                console.log(res);
            }
        })
    } else {
        return false;
    }
}
const logoutUser = () => {
    console.log('clicked!');

    fetch("/portal/logout", {
        method: 'GET',
    }).then(res => {
        if (res.ok) {
            // alert("Logged out successfully!")
            location.replace("/")
        } else {
            alert("You are not logged in!")
            console.log(res);

        }
    })
}

const deleteTripBtns = document.querySelectorAll(".deleteTrip");

if (deleteTripBtns) {
    for (const btn of deleteTripBtns) {
        btn.addEventListener("click", (event) => {
            console.log('clicked');
            deleteTrip(event);

        });

    }

}

document.querySelector("#logoutbtn").addEventListener("click", logoutUser)
