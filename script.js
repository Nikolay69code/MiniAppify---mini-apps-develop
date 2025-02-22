document.addEventListener('DOMContentLoaded', function() {
    // Кнопка прокрутки наверх
    const scrollButton = document.getElementById('scrollToTop');
    
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollButton.style.display = "block";
        } else {
            scrollButton.style.display = "none";
        }
    };

    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Мобильное меню
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    burgerMenu.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Обработка формы
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = {
                name: contactForm.querySelector('#name').value,
                phone: contactForm.querySelector('#phone').value,
                email: contactForm.querySelector('#email').value,
                description: contactForm.querySelector('#description').value
            };

            try {
                const response = await fetch('/api/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                alert(result.message);
                
                if (response.ok) {
                    // Очищаем форму после успешной отправки
                    contactForm.reset();
                }
            } catch (error) {
                console.error('Ошибка при отправке формы:', error);
                alert('Произошла ошибка при отправке формы');
            }
        });
    }
}); 