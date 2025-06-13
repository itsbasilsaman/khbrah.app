// Language switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const languageToggle = document.getElementById('languageToggle');
    const languageToggleMobile = document.getElementById('languageToggleMobile');
    const htmlElement = document.documentElement;
    
    // Function to handle language switch
    function handleLanguageSwitch(isChecked) {
        const language = isChecked ? 'ar' : 'en';
        switchLanguage(language);
        localStorage.setItem('language', language);
    }
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'ar') {
        if (languageToggle) languageToggle.checked = true;
        if (languageToggleMobile) languageToggleMobile.checked = true;
        switchLanguage('ar');
    }
    
    // Add event listeners for both toggles
    if (languageToggle) {
        languageToggle.addEventListener('change', function() {
            handleLanguageSwitch(this.checked);
            // Sync mobile toggle
            if (languageToggleMobile) languageToggleMobile.checked = this.checked;
        });
    }
    
    if (languageToggleMobile) {
        languageToggleMobile.addEventListener('change', function() {
            handleLanguageSwitch(this.checked);
            // Sync desktop toggle
            if (languageToggle) languageToggle.checked = this.checked;
        });
    }
    
    function switchLanguage(language) {
        // Force header and all its contents to stay LTR
        const header = document.querySelector('.header');
        if (header) {
            // Set header and all its contents to LTR
            header.setAttribute('dir', 'ltr');
            header.querySelectorAll('*').forEach(element => {
                element.setAttribute('dir', 'ltr');
            });
            
            // Specifically target navigation menu items
            const navItems = header.querySelectorAll('.nav-item-wrapper, .nav-link, .header-navigation li');
            navItems.forEach(item => {
                item.style.direction = 'ltr';
                item.style.textAlign = 'left';
            });
        }

        // Keep home-about-us and testimonials sections in LTR
        const fixedSections = document.querySelectorAll('.home-about-us, .testimonials');
        fixedSections.forEach(section => {
            section.setAttribute('dir', 'ltr');
            section.querySelectorAll('*').forEach(element => {
                element.setAttribute('dir', 'ltr');
            });
        });
        
        // Set direction for the rest of the document
        document.querySelectorAll('body > *:not(.header):not(.home-about-us):not(.testimonials)').forEach(element => {
            element.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
        });
        
        // Update all elements with data attributes
        document.querySelectorAll('[data-en], [data-ar]').forEach(element => {
            const text = element.getAttribute(`data-${language}`);
            if (text) {
                element.textContent = text;
            }
        });
    }
}); 