// Event listener for the Search button
document.querySelector('.btn').addEventListener('click', async () => {
    const countInput = document.querySelector('.input');
    const count = parseInt(countInput.value);
    if (isNaN(count) || count < 1 || count > 100) {
        alert('Please enter a number between 1 and 100.');
        return;
    }
    try {
        const imageUrl = await fetchImage(count, true);
        displayImage(imageUrl);
    } catch (error) {
        console.error('Error:', error);
    }
});

// Function to fetch a single image from the API
async function fetchImage(index, httpsUrls) {
    try {
        const response = await fetch(`http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=${httpsUrls}`);
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data[0]; // Return the first (and only) image URL
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Function to display a single image on the webpage
function displayImage(imageUrl) {
    const infoDiv = document.querySelector('.info');
    infoDiv.innerHTML = '';
    const img = document.createElement('img');
    img.src = imageUrl;
    infoDiv.appendChild(img);
}