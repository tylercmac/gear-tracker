let deleteTrip = (ev) => {
    ev.stopPropagation();
    const tripId = ev.currentTarget.dataset.id;
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

const deleteTripBtns = document.querySelectorAll(".delete-trip");

if (deleteTripBtns) {
    for (const btn of deleteTripBtns) {
        btn.addEventListener("click", (event) => {
            console.log('clicked');
            deleteTrip(event);

        });

    }

}

