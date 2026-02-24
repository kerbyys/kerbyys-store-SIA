
const tableBody = document.getElementById('table-body');
const modal = document.getElementById('product-modal');
const closeBtn = document.querySelector('.close-btn');


const modalTitle = document.getElementById('modal-title');
const modalImg = document.getElementById('modal-img');
const modalPrice = document.getElementById('modal-price');
const modalCategory = document.getElementById('modal-category');
const modalRating = document.getElementById('modal-rating');
const modalReviews = document.getElementById('modal-reviews');
const modalDesc = document.getElementById('modal-desc');


fetch('https://fakestoreapi.com/products')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(products => {

        products.forEach(product => {
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${product.id}</td>
                <td>${product.title}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.category}</td>
                <td><img src="${product.image}" class="product-thumbnail" alt="${product.title}"></td>
                <td>⭐${product.rating.rate} (${product.rating.count} reviews)</td>
            `;

            row.addEventListener('click', () => {
                openModal(product);
            });

            tableBody.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

function openModal(product) {
    modalTitle.textContent = product.title;
    modalImg.src = product.image;
    modalPrice.textContent = product.price.toFixed(2);
    modalCategory.textContent = product.category;
    modalRating.textContent = product.rating.rate;
    modalReviews.textContent = product.rating.count;
    modalDesc.textContent = product.description;
    
    modal.style.display = 'block';
}

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

