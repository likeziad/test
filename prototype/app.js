const mockMeals = [
    {
        id: 1,
        title: "كبسة لحم",
        chef: "مطبخ أم محمد",
        desc: "تُقدم مع صلصة لذيذة جداً، مطبوخة على نار هادئة بالبهارات الخاصة.",
        price: "45",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=200&auto=format&fit=crop",
        requested: 20
    },
    {
        id: 2,
        title: "مندي بو حسين",
        chef: "مندي بو حسين",
        desc: "أشهى مندي بالدجاج الطازج والرز النثري مع الدقوس الحار.",
        price: "35",
        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=200&auto=format&fit=crop",
        requested: 55
    },
    {
        id: 3,
        title: "ورق عنب حامض",
        chef: "أنامل ذهبية",
        desc: "ورق عنب لذيذ بدبس الرمان والليمون، كمية تكفي لـ 3 أشخاص.",
        price: "25",
        image: "https://images.unsplash.com/photo-1541529086526-db283c563270?q=80&w=200&auto=format&fit=crop",
        requested: 120
    },
    {
        id: 4,
        title: "كيكة الزعفران",
        chef: "حلا بيتي",
        desc: "كيكة اسفنجية هشة غنية بصوص الزعفران الأصلي.",
        price: "60",
        image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=200&auto=format&fit=crop",
        requested: 42
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const mealsList = document.getElementById('meals-list');
    
    // Render Meals
    function renderMeals() {
        mealsList.innerHTML = '';
        mockMeals.forEach(meal => {
            const mealCard = document.createElement('div');
            mealCard.className = 'meal-card';
            mealCard.innerHTML = `
                <img src="${meal.image}" alt="${meal.title}" class="meal-image">
                <div class="meal-info">
                    <div class="meal-header">
                        <div>
                            <h3 class="meal-title">${meal.title}</h3>
                            <span class="meal-chef">${meal.chef}</span>
                        </div>
                    </div>
                    <p class="meal-desc">${meal.desc}</p>
                    <div class="meal-footer">
                        <div class="meal-price">${meal.price} <span>ر.س</span></div>
                        <button class="add-btn" onclick="addToCart(event, ${meal.id})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            `;
            mealsList.appendChild(mealCard);
        });
    }

    renderMeals();

    // Category Selection
    const categoryChips = document.querySelectorAll('.category-chip');
    categoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            categoryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            // Simple animation re-trigger
            mealsList.style.opacity = '0';
            setTimeout(() => {
                renderMeals(); // In a real app, we'd filter data here
                mealsList.style.opacity = '1';
            }, 200);
        });
    });

    // Bottom Navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
});

// Global mock function for cart
window.addToCart = function(event, mealId) {
    event.stopPropagation();
    const btn = event.currentTarget;
    btn.innerHTML = '<i class="fas fa-check"></i>';
    btn.style.background = 'var(--primary)';
    
    // Animate cart badge
    const badge = document.querySelector('.cart-badge');
    let count = parseInt(badge.innerText);
    badge.innerText = count + 1;
    
    badge.style.transform = 'scale(1.5)';
    setTimeout(() => {
        badge.style.transform = 'scale(1)';
        btn.innerHTML = '<i class="fas fa-plus"></i>';
        btn.style.background = 'var(--secondary)';
    }, 500);
};
