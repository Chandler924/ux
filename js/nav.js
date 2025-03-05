document.addEventListener('DOMContentLoaded', () => {
    // 根据当前页面路径设置导航激活状态
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-bottom .nav-item');
    
    navItems.forEach(item => {
        if (item.getAttribute('href')) {
            const href = item.getAttribute('href');
            if (currentPath.endsWith(href)) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        }
    });
}); 