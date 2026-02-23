const renderReviews = async () => {
    const reviewList = document.getElementById('reviews-list')

    const response = await fetch('http://localhost:3000/home/reviews');
    if(response.ok){
        data = await response.json();
        const reviews = data.reviews;

        for(const review of reviews){
            const reviewCard = document.createElement('div');
            reviewCard.className = 'review-card';

            const authorField = document.createElement('h3');
            authorField.className = 'author-field';
            authorField.innerHTML = review.author;

            const reviewText = document.createElement('p');
            reviewText.className = 'review-text';
            reviewText.innerHTML = review.content;

            reviewCard.append(authorField);
            reviewCard.append(reviewText);
            reviewList.append(reviewCard);
        }
    }
}

renderReviews();