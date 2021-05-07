let currTripId = document.querySelector('.currentTripBox').dataset.id

if (!currTripId){
    console.log("waiting for gear")
}else{
  fetch(`http://localhost:3001/api/trips/${currTripId}`, {
    method: 'GET',
 })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data.GearItems)
        const labels = data.GearItems.map(item => item.general_name)
        console.log("gear items", labels)

        const values = data.GearItems.map(item => item.weight_oz)
        console.log("weight of items", values)
        var ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    label: 'gear weight',
                    data: values,
                    backgroundColor: [
                        'rgb(155, 60, 32, 0.5)',
                        'rgb(41, 95, 19, 0.5)',
                        'rgb(19, 24, 95, 0.5)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgb(155, 60, 32)',
                        'rgb(41, 95, 19)',
                        'rgb(19, 24, 95)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true

                    }
                }
            }
        })



    })
}