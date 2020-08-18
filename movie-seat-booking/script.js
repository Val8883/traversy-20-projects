const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

// console.log(JSON.parse(localStorage.getItem('selectedSeats')));

// Update total and count
const updateSelectedCount = () => {
  const selectedSeats = container.querySelectorAll('.row .seat.selected');

  const seatsIndex = [...selectedSeats].reduce(
    (acc, seat) =>
      [...seats].indexOf(seat) >= 0 ? [...acc, [...seats].indexOf(seat)] : acc,
    []
  );

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  localStorage.setItem(
    'selected-movie',
    JSON.stringify(movieSelect.selectedIndex)
  );

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

const loadFromStorage = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const selectedMovie = JSON.parse(localStorage.getItem('selected-movie'));

  [...seats].forEach((seat, idx) =>
    selectedSeats.includes(idx) ? seat.classList.add('selected') : null
  );

  movieSelect.selectedIndex = selectedMovie;
  ticketPrice = +movieSelect.value;
  updateSelectedCount();
};

// Movie select event
movieSelect.addEventListener('change', ({ target }) => {
  ticketPrice = +target.value;
  updateSelectedCount();
});

// Seat click event
container.addEventListener('click', ({ target: { classList } }) => {
  if (
    classList.contains('seat') &&
    !classList.contains('showcase-item') &&
    !classList.contains('occupied')
  ) {
    classList.toggle('selected');
    updateSelectedCount();
  }
});

loadFromStorage();
