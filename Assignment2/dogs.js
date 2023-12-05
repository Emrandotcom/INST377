document.addEventListener("DOMContentLoaded", function () {
    let audioStatus = true;

    const toggleAudio = () => {
        audioStatus = !audioStatus;
        document.querySelector('.audio-status').innerText = `Audio is currently ${audioStatus ? 'on' : 'off'}.`;
    }

    document.getElementById('turn-on-audio').addEventListener('click', () => {
        annyang.start();
        toggleAudio();
    });

    document.getElementById('turn-off-audio').addEventListener('click', () => {
        annyang.abort();
        toggleAudio();
    });

    annyang.addCommands({
        'hello': function () {
            alert('Hello!');
        },
        'alerts with hello world': function () {
            alert('Hello, World!');
        },
        'change the color to :color': function (color) {
            document.body.style.backgroundColor = color;
        },
        'navigate to :page': function (page) {
            navigateTo(page.toLowerCase() + '.html');
        },
    });

    const navigateTo = (page) => {
        window.location.href = page;
    };

    const fetchRandomDogImages = async () => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random/10');
            const data = await response.json();
            const carouselContainer = document.getElementById('dog-carousel');

            data.message.forEach(image => {
                const img = document.createElement('img');
                img.src = image;
                carouselContainer.appendChild(img);
            });

            new SimpleSlider('.dog-carousel', {
                auto: true,
                time: 5000,
                pauseOnHover: false,
            });
        } catch (error) {
            console.error('Error fetching dog images:', error);
        }
    };

    const fetchDogBreeds = async () => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/list/all');
            const data = await response.json();
            const breedsContainer = document.querySelector('.dog-breeds');

            Object.keys(data.message).forEach(breed => {
                const button = document.createElement('button');
                button.innerText = breed;
                button.setAttribute('class', 'custom-button');
                button.addEventListener('click', () => {
                    showDogInfo(breed);
                });

                breedsContainer.appendChild(button);
            });
        } catch (error) {
            console.error('Error fetching dog breeds:', error);
        }
    };

    const showDogInfo = async (breed) => {
        try {
            const infoResponse = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`);
            const infoData = await infoResponse.json();

            if (infoData.length > 0) {
                const breedInfo = infoData[0];
                const infoContainer = document.getElementById('dog-info-container');
                infoContainer.innerHTML = '';

                const title = document.createElement('h2');
                title.innerText = breed;
                infoContainer.appendChild(title);

                const description = document.createElement('p');
                description.innerText = `Breed Description: ${breedInfo.description || 'Not available'}`;
                infoContainer.appendChild(description);

                const minLife = document.createElement('p');
                minLife.innerText = `Min Life: ${breedInfo.life_span || 'Not available'}`;
                infoContainer.appendChild(minLife);

                const maxLife = document.createElement('p');
                maxLife.innerText = `Max Life: ${breedInfo.life_span || 'Not available'}`;
                infoContainer.appendChild(maxLife);
            } else {
                console.error(`Breed information not found for ${breed}`);
            }
        } catch (error) {
            console.error('Error fetching dog information:', error);
        }
    };

    annyang.addCommands({
        'load dog breed :breed': showDogInfo,
    });

    fetchRandomDogImages();
    fetchDogBreeds();
});
