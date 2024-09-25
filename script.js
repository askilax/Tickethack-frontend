
//affichage des trajets pour départ/arrivée/date selectionnés
document.querySelector('#btn-search').addEventListener('click', function () {
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const dateGet = document.getElementById('date').value;
    const date = moment(dateGet).format('YYYY-MM-DD');
    console.log(departure, arrival, date);
    fetch(`http://localhost:3000/trips/departure/${departure}/${arrival}/${date}`)
        .then(response => response.json())
        .then(data => {
            const tripsCount = data.trips.length;
            if (data) {
                for (let i = 0; i < tripsCount; i++) {
                    const time = moment(data.trips[i].date).format('kk:mm');
                    const price = data.trips[i].price;
                    document.querySelector('#search-results').innerHTML += ` 
        <div class="row-book">
                <span class="departure">${departure}</span> <span> > </span><span class="arrival">${arrival}</span> 
                <span class="time">${time}</span>
                <span class="price">${price} €</span>
                <button id=${data.trips[i]._id} class="book" >Book</button>
        </div>
      `;
                }
                document.querySelector(".book").addEventListener('click', function () {
                    const ID = this.id;
                    console.log(ID);
                    const isPaid = false;
                    fetch(`http://localhost:3000/trips/byId/${ID}`)
                        .then(response => response.json())
                        .then(data => {

                            const newTrip = {
                                departure: data.trip.departure,
                                arrival: data.trip.arrival,
                                schedule: data.trip.date,
                                price: data.trip.price,
                                isPaid: false,
                            };
                            console.log(newTrip);
                            fetch('http://localhost:3000/bookings', {
                                method: "POST",
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(newTrip)
                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data)
                                });
                        });
                });

            } else {
                document.querySelector('#search-result').innerHTML += ` 
           <div id="default-message" class="centered">
                        <img src="images/train.png" alt="Train Icon" class="train-icon">
                        <p>No trip found.</p>
            </div>
          `
            }

        });
    ;
});
// envoi des trajets dans le panier
/*document.querySelector(".book").addEventListener('click', function (){
    const ID = this.id;
    console.log(ID);
    const isPaid=false;
    fetch(`http://localhost:3000/trips/byId/${ID}`)
    .then(response => response.json())
    .then(data => {
            console.log(data);
            const newTrip= {
                departure : data.trip.departure,
                arrival: data.trip.arrival,
                schedule: date.trip.date,
                price: data.trip.price,
                isPaid: false,
            };

            fetch('http://localhost:3000/bookings', {
             method: "POST",
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(newTrip)
            })
        .then(response => response.json())
});
//affichage des trajets dans le panier
    const time= moment(newTrip.schedule).format('kk:mm')
     document.querySelector('#cart-items').innerHTML += `
    <div id="row-cart">
    <span class="route">${newTrip.departure} &gt; ${newTrip.arrival}</span>
    <span class="time">${time}</span>
    <span class="price">${newTrip.price}</span>
    <button class="remove-item">X</button> -->
    </div> `;

});
*/
// envoi des trajets dans les bookings

