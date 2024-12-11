function loadDragons() {
    if (typeof window !== 'undefined') {
        console.log(typeof window);
        console.log(typeof window !== 'undefined');
        fetch('./js/gallery.json') // Adjust path as needed
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load JSON: ${response.status}`);
                }
                return response.json();
            })
            .then((dragons) => {
                const navCardContainer = document.getElementById('nav-card');
                navCardContainer.innerHTML = ''; // Clear any existing content

                // Function to display dragons
                function displayDragons(dragons) {
                    navCardContainer.innerHTML = ''; // Clear the container before adding new cards

                    dragons.forEach((dragon) => {
                        // Create the card container
                        const card = document.createElement('div');
                        card.className = 'card';

                        // Add the image
                        const img = document.createElement('img');
                        img.src = dragon.img;
                        img.alt = `A depiction of ${dragon.name}`;

                        // Add the article content
                        const article = document.createElement('article');

                        const header = document.createElement('h3');
                        header.className = 'header';
                        header.textContent = dragon.name;

                        const body = document.createElement('p');
                        body.className = 'body';
                        body.textContent = dragon.description;

                        // Append header and body to the article
                        article.appendChild(header);
                        article.appendChild(body);

                        // Append the image and article to the card
                        card.appendChild(img);
                        card.appendChild(article);

                        // Append the card to the nav-card container
                        navCardContainer.appendChild(card);
                    });
                }

                // Initially display all dragons
                displayDragons(dragons);

                // Add event listener to the search input
                const searchInput = document.getElementById('search');

                // Show all cards when the search bar is focused
                searchInput.addEventListener('focus', function () {
                    navCardContainer.style.display = 'grid'; // Show all cards on focus
                });

                // Filter dragons as the user types in the search bar
                searchInput.addEventListener('input', function (event) {
                    // console.log(event);
                    console.log(event.target.value);
                    const searchTerm = event.target.value.toLowerCase(); // Convert search term to lowercase for case-insensitive matching
                    console.log(searchTerm);

                    // Filter dragons based on name
                    const filteredDragons = dragons.filter((dragon) =>
                        dragon.name.toLowerCase().includes(searchTerm)
                    );

                    // Display the filtered dragons
                    displayDragons(filteredDragons);

                    // Hide nav-card if no dragons match
                    if (filteredDragons.length === 0 && searchTerm !== "") {
                        navCardContainer.style.display = 'none';
                    } else {
                        navCardContainer.style.display = 'grid';
                    }
                });

                // Hide nav-card when search input loses focus
                searchInput.addEventListener('blur', function () {
                    if (searchInput.value === "") {
                        navCardContainer.style.display = 'none'; // Hide nav-card if the search is empty
                    }
                });

            })
            .catch((error) => {
                console.error('Error fetching and parsing JSON:', error);
            });
    } else {
        console.error('This script is designed to run in the browser, not Node.js.');
    }
}

export { loadDragons };