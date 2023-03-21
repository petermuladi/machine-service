
async function loadPage(page, title, url) {
    try {
        const baseUrl = 'http://localhost/machine-service/view/'

        const titleMap = {
            'index.html': 'Főoldal',
            'summary.html': 'Szervíz összesítő',
            'form.html': 'Szervíz leadási lap'
        };

        // Fetch HTML content of the requested page
        const response = await fetch(`${baseUrl}${page}`);
        const html = await response.text();

        // Parse the HTML content and extract the root element
        const parser = new DOMParser();
        const newDocument = parser.parseFromString(html, 'text/html');
        const newContent = newDocument.getElementById('root');

        // Error handling if the requested page has no root element with ID 'root'
        if (!newContent) {
            throw new Error(`Page ${page} has no content element with ID 'root'.`);
        }

        // Get all script tags of the new content
        const newScripts = newDocument.getElementsByTagName('script');

        // Get the main root element of the page
        const content = document.getElementById('root');
        const pageTitle = document.querySelector('title');

        // Replace the content of the main root element with the new content
        content.innerHTML = newContent.innerHTML;

        // Change the page title to the new title
        pageTitle.textContent = title;

        const oldScripts = document.getElementsByTagName('script');

        //remove old script
        for (let i = 0; i < oldScripts.length; i++) {
            oldScripts[i].parentNode.removeChild(oldScripts[i]);
        }

        //make new script
        for (let i = 0; i < newScripts.length; i++) {
            const script = document.createElement('script');
            script.src = newScripts[i].src;
            document.body.appendChild(script);
        }

        window.history.pushState({}, titleMap[page], `${baseUrl}${page}`)

    } catch (error) {
        console.error(error);
    }
}


