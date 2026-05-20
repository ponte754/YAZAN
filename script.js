// عناصر DOM
const menuBtn = document.getElementById('menuBtn');
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.navbar a');
const exploreBtn = document.getElementById('exploreBtn');
const contactBtn = document.getElementById('contactBtn');
const contactForm = document.getElementById('contactForm');

// فتح/إغلاق قائمة الجوال
if (menuBtn) {
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        
        // تغيير أيقونة القائمة
        const icon = menuBtn.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// تبديل الأقسام
function switchSection(sectionId) {
    // إخفاء جميع الأقسام
    sections.forEach(section => {
        section.classList.remove('active-section');
    });
    
    // إظهار القسم المطلوب
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active-section');
    }
    
    // تحديث الرابط النشط
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });
    
    // إغلاق القائمة في الجوال بعد الضغط
    if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// إضافة حدث الضغط على روابط التنقل
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        if (sectionId) {
            switchSection(sectionId);
        }
    });
});

// زر استكشف أعمالي
if (exploreBtn) {
    exploreBtn.addEventListener('click', () => {
        switchSection('projects');
    });
}

// زر تواصل معي
if (contactBtn) {
    contactBtn.addEventListener('click', () => {
        switchSection('contact');
    });
}

// تأثير الكتابة التلقائية
const typingElement = document.querySelector('.typing');
if (typingElement) {
    const words = ['مبدع', 'مطور ويب', 'مصمم تجارب', 'محترف'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
        
        const speed = isDeleting ? 100 : 150;
        setTimeout(typeEffect, speed);
    }
    
    typeEffect();
}

// معالجة إرسال النموذج
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // رسالة نجاح مؤقتة
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'تم الإرسال! <i class="fas fa-check"></i>';
        submitBtn.style.background = '#10b981';
        
        // إعادة تعيين النموذج
        contactForm.reset();
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
        }, 3000);
    });
}

// تأثيرات ظهور العناصر عند التمرير (Intersection Observer)
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// مراقبة البطاقات والعناصر الأخرى
document.querySelectorAll('.project-card, .stat-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
});

// حفظ القسم النشط عند تحديث الصفحة (اختياري)
const currentHash = window.location.hash.substring(1);
if (currentHash && ['home', 'about', 'projects', 'contact'].includes(currentHash)) {
    switchSection(currentHash);
} else {
    switchSection('home');
}

// منع غلق القائمة عند الضغط داخلها
if (navbar) {
    navbar.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// غلق القائمة عند الضغط خارجها
document.addEventListener('click', (e) => {
    if (navbar && navbar.classList.contains('active')) {
        if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
            navbar.classList.remove('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});