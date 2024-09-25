
//affichage des trajets pour départ/arrivée/date selectionnés
document.querySelector('#btn-search').addEventListener('click', function () {
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const dateGet = document.getElementById('date').value;
    const date=moment(dateGet).format('YYYY-MM-DD');
    console.log(departure, arrival, date);
    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
        .then(response => response.json())
        .then(data => {
            const tripsCount = data.trips.length;
            if (data) {
                for (let i = 0; i < tripsCount; i++) {
                    const time = moment(data.trips[i].date).format('LT');
                    const price = data.trips[i].price;
                    const dateReturn = data.trip[i].date;
                    document.querySelector('#search-results').innerHTML += ` 
        <div class="row-book">
                <span class="departure">${departure}</span> <span> '>' </span><span class="arrival">${arrival}</span> 
                <span class="time">${time}</span>
                <span class="date">${dateReturn}</span>
                <span class="price">${price} €</span>
                <button id="btn-book">Book</button>
        </div>
      `;
     }
}else {
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
/*document.querySelector('#btn-book').addEventListener('click', function () {
    const departure = document.querySelector('.departure').textContent;
    const arrival = document.querySelector('.arrival').textContent;
    const date = document.querySelector('.date').textContent;
    const dateGet = document.querySelector('.time').textContent;
    fetch(`http://localhost:3000/trips/${departure}/${arrival}/${date}`)
        .then(response => response.json())
        .then(data => {
    
*/


//affichage des trajets dans le panier

