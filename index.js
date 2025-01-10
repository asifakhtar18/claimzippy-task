async function loadContent() {
    try {
        const response = await fetch('data.json');
        const contentData = await response.json();
        renderContent(contentData);
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

function renderContent(contentData) {
    const container = document.getElementById('content');
    const sections = ['introduction', 'causes', 'effects', 'solutions', 'statistics'];

    sections.forEach(section => {
        const data = contentData[section];
        const card = document.createElement('div');
        card.className = 'card';
        card.id = section;

        card.innerHTML = `
            <h2>${data.title}</h2>
            <p>${data.description}</p>
            ${data.points ? `
                <ul>
                    ${data.points.map(point => {
            const p = point.split(':');
            if (p.length === 2) return `<li><strong>${p[0]}</strong>: ${p[1]}</li>`;
            return `<li>${p[0]}</li>`;
        }).join('')}
                </ul>
            ` : ''}
        `;

        container.appendChild(card);
    });


}

function checkAQI() {
    const cityInput = document.getElementById('city-input');
    const resultDiv = document.getElementById('aqi-result');

    const trimmedCity = cityInput.value.trim();
    if (!trimmedCity) {
        resultDiv.innerHTML = 'Please enter a city name';
        return;
    }

    const apiKey = 'fcbc860c2330dbbe0714b9ee3e0ac5fea7c7ca8e';
    const url = `https://api.waqi.info/feed/${trimmedCity}/?token=${apiKey}`;

    fetch(url)
        .then(response => response.ok ? response.json() : Promise.reject(response))
        .then(data => {
            if (data.status === 'error') {
                resultDiv.innerText = 'City not found';
            } else {
                resultDiv.innerText = `The AQI for ${data.data.city.name}: ${data.data.aqi}`;
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultDiv.innerText = 'An error occurred while fetching data';
        })
}



document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});


document.addEventListener('DOMContentLoaded', loadContent);