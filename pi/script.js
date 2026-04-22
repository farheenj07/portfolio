// Scroll reveal motion
const revealItems = document.querySelectorAll(
  '.section, .card, .experience-item, .stat, .intro-text, .intro-image'
);

revealItems.forEach(item => {
  item.classList.add('reveal');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.12
});

revealItems.forEach(item => observer.observe(item));

// Animated counters
const counters = document.querySelectorAll('.stat h2[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const counter = entry.target;
      const target = +counter.getAttribute('data-target');
      const suffix = target === 1 ? '' : '+';
      let current = 0;
      const increment = Math.max(1, Math.ceil(target / 40));

      const updateCounter = () => {
        current += increment;
        if(current >= target){
          counter.textContent = target + suffix;
        } else {
          counter.textContent = current;
          requestAnimationFrame(updateCounter);
        }
      };

      if(!counter.dataset.animated){
        counter.dataset.animated = 'true';
        updateCounter();
      }
    }
  });
}, {
  threshold: 0.4
});

counters.forEach(counter => counterObserver.observe(counter));