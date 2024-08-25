const menuUrl = 'https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json';

async function getMenu() {
    try {
        const response = await fetch(menuUrl);
        const foodItems = await response.json();
        
        const menuContainer = document.querySelector('.menu-container');
        foodItems.forEach(item => {
            const foodCard = `
                <div class="food-card">
                    <img src="${item.imgSrc}" alt="${item.name}">
                    <h3>${item.name}</h3>
                    <p>Price: $${item.price}</p>
                </div>
            `;
            menuContainer.innerHTML += foodCard;
        });
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
}

function takeOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const foodOptions = ['Burger', 'Pizza', 'Pasta', 'Salad', 'Sandwich'];
            let selectedItems = [];
            for (let i = 0; i < 3; i++) {
                const randomItem = foodOptions[Math.floor(Math.random() * foodOptions.length)];
                selectedItems.push(randomItem);
            }
            resolve({ orderItems: selectedItems });
        }, 2500);
    });
}

function orderPrep() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: false });
        }, 1500);
    });
}

function payOrder() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ order_status: true, paid: true });
        }, 1000);
    });
}

function thankyouFnc() {
    alert('Thank you for eating with us today!');
}

async function handleOrderProcess() {
    try {
        await getMenu();
        const order = await takeOrder();
        console.log('Order:', order);
        const preparedOrder = await orderPrep();
        console.log('Prepared Order:', preparedOrder);
        const payment = await payOrder();
        console.log('Payment:', payment);

        if (payment.paid) {
            thankyouFnc();
        }
    } catch (error) {
        console.error('Error in the order process:', error);
    }
}

document.addEventListener('DOMContentLoaded', handleOrderProcess);
