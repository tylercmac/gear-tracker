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

const loadGearTotal = () => {
    const tripIds = document.querySelectorAll('.gear-weight');
    console.log(tripIds[0].dataset.id);
    for (const tripId of tripIds) {
        fetch(`/api/trips/${tripId.dataset.id}`, {
            method: 'GET',
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const values = data.GearItems.map(item => item.weight_oz)
            
                function sum(a){
                    return (a.length && parseFloat(a[0]) + sum(a.slice(1))) || 0;
                }
        
                let gearTotal = sum(values).toFixed(1)
                console.log("Gear total", gearTotal)
                const poundConv = (gearTotal / 16).toFixed(2)
                tripId.textContent = `BASEWEIGHT: ${poundConv} lbs`
            })
    }
}
    

loadGearTotal();

