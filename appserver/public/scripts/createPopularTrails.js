 const createPopular = async() => {   
    const container = document.getElementById('routesSlider');

    const response = await fetch('/trails/popular');
    if(response.ok){
        const data = await response.json();
        const trails = data.trails;
        const images = data.images;

        for(const trail of trails){
            const article = document.createElement('article');
            article.className ='route-card';

            const imageContainer = document.createElement('div'); 
            imageContainer.className = 'route-image'

            const link = document.createElement('a');
            link.href = 'trails/' + trail.id;

            const imageTag = document.createElement('img');
            imageTag.src = '/images/scenery/' + trail.image_source;
            link.append(imageTag);
            imageContainer.append(link);

            trailName = document.createElement('h3')
            trailName.className = 'route-title'
            trailName.innerHTML = trail.name;

            article.append(imageContainer);
            article.append(trailName);
            container.append(article);
        }
    }
}

createPopular();