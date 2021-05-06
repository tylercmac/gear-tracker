



var ctx = document.getElementById('myChart').getContext('2d');

fetch(`api/trips/5`, {
    method: 'GET',
  }).then(function (response) {
    return response.json();
  })
  .then(function (data){

    console.log(data.GearItems)
    data.GearItems.forEach(element => {
        console.log(element.general_name)
        labels = element.general_name
        return labels
    });
    data.GearItems.forEach(element =>{
        console.log(element.weight_oz)
        values = element.weight_oz
        return values
    })
    
      
  }) 


var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
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
});



// for (i=0; i< data.GearItems; i++){
    //     product = data.GearItems[i].general_name
    //     return product
    //   }