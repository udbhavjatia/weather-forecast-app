const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault(); //To prevent the browser from refreshing the page after the form is submitted which is its default behaviour

    const location = search.value; //To make location equal to the value typed by the user in the search box

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = ''; //To ensure this paragraph is empty whenever the user submits a new form

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });

});