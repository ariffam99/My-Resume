// script.js - interactions for accordion, modal, mobile menu, and project previews

// Accordion (accessible)
document.querySelectorAll('.acc-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    // toggle
    btn.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      panel.hidden = true;
      btn.querySelector('.chev').style.transform = 'rotate(0deg)';
    } else {
      panel.hidden = false;
      btn.querySelector('.chev').style.transform = 'rotate(180deg)';
      // ensure panel scrollHeight used if you want smooth open (optional)
    }
  });
});

// Mobile side toggle
const menuToggle = document.getElementById('menu-toggle');
const side = document.getElementById('side');
menuToggle && menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  if (!expanded) {
    side.style.display = 'block';
    side.scrollIntoView({behavior:'smooth', block:'start'});
  } else {
    side.style.display = '';
  }
});

// Project preview modal
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.proj .view').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const container = e.currentTarget.closest('.proj');
    const title = e.currentTarget.dataset.title || container.querySelector('h3')?.innerText || 'Project';
    const desc = container.dataset.desc || container.querySelector('p')?.innerText || '';
    openModal(title, desc);
  });
});

function openModal(title, desc) {
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalClose && modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
});

// small enhancement: collapse panels on load (they are hidden by default)
document.querySelectorAll('.acc-btn').forEach(btn => {
  const panel = document.getElementById(btn.getAttribute('aria-controls'));
  if(panel) panel.hidden = true;
});

// On larger screens ensure side visible
function handleResize(){
  if(window.innerWidth >= 900){
    side.style.display = '';
    menuToggle.setAttribute('aria-expanded', 'false');
  }
}
window.addEventListener('resize', handleResize);
handleResize();
