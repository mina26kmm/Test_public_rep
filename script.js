// Konfiguracja - wpisz tutaj swoją nazwę użytkownika na GitHubie
const GITHUB_USERNAME = 'TWOJA_NAZWA_UZYTKOWNIKA';

async function fetchRepos() {
    const listElement = document.getElementById('repo-list');
    const loadingElement = document.getElementById('loading');

    try {
        // Pobieranie danych z publicznego API GitHub
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated`);
        
        if (!response.ok) throw new Error('Nie udało się pobrać danych');

        const repos = await response.json();

        // Usuwamy komunikat o ładowaniu
        loadingElement.style.display = 'none';

        // Renderujemy listę repozytoriów
        repos.forEach(repo => {
            const listItem = document.createElement('li');
            listItem.className = 'repo-item';
            
            listItem.innerHTML = `
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                <p>${repo.description || 'Brak opisu.'}</p>
                <small>⭐ Gwiazdki: ${repo.stargazers_count} | Język: ${repo.language || 'Nieokreślony'}</small>
            `;
            
            listElement.appendChild(listItem);
        });

    } catch (error) {
        console.error('Błąd:', error);
        loadingElement.innerText = 'Wystąpił błąd podczas ładowania projektów.';
    }
}

// Uruchom funkcję po załadowaniu strony
window.onload = fetchRepos;
