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
            
            // Добавляем проверку заполнения полей
            const name = contactForm.querySelector('#name').value.trim();
            const phone = contactForm.querySelector('#phone').value.trim();
            const email = contactForm.querySelector('#email').value.trim();
            const description = contactForm.querySelector('#description').value.trim();

            // Проверяем заполнение всех полей
            if (!name || !phone || !email || !description) {
                alert('Пожалуйста, заполните все поля формы');
                return;
            }

            const formData = {
                name,
                phone,
                email,
                description
            };

            try {
                console.log('Отправка данных:', formData); // Добавляем логирование

                const response = await fetch('/api/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Ответ сервера:', result); // Добавляем логирование
                
                alert(result.message);
                
                if (response.ok) {
                    contactForm.reset();
                }
            } catch (error) {
                console.error('Ошибка при отправке формы:', error);
                alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
            }
        });
    } else {
        console.error('Форма не найдена на странице');
    }
}); 