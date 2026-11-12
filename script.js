document.addEventListener('DOMContentLoaded', () => {
  // Handle Tracking Form
  const trackForm = document.querySelector('section#track form');
  if (trackForm) {
    trackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const regInput = document.getElementById('regno');
      const regNo = regInput ? regInput.value.trim() : '12345678';
      
      const headerTitle = document.querySelector('.card header h4');
      if (headerTitle) {
        headerTitle.textContent = `Registration No. ${regNo}`;
      }

      const resultHeading = document.getElementById('track-result');
      if (resultHeading) {
        resultHeading.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Handle Pickup Form
  const pickupForm = document.querySelector('section#pickup form');
  if (pickupForm) {
    let alertBox = document.createElement('div');
    alertBox.className = 'alert-success';
    alertBox.setAttribute('role', 'alert');
    alertBox.style.display = 'none';
    pickupForm.parentNode.insertBefore(alertBox, pickupForm);

    pickupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('sname')?.value.trim() || 'Student';
      const hostel = document.getElementById('hostel')?.value.trim() || 'Hostel';
      const room = document.getElementById('room')?.value.trim();
      const itemsNote = document.getElementById('items-note')?.value.trim();
      const roomText = room ? `, Room ${room}` : '';
      const itemsText = itemsNote ? ` Items specified: "${itemsNote}".` : '';

      alertBox.textContent = `✓ Pickup request confirmed for ${name} (${hostel}${roomText})!${itemsText} Our staff will collect your items during the upcoming pickup slot.`;
      alertBox.style.display = 'block';
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      pickupForm.reset();
    });
  }

  // Handle FAQ Real-time Search
  const faqSearch = document.getElementById('faq-search');
  if (faqSearch) {
    const faqItems = document.querySelectorAll('main details');
    const categories = document.querySelectorAll('.faq-category');
    const countDisplay = document.getElementById('search-count');

    faqSearch.addEventListener('input', () => {
      const query = faqSearch.value.trim().toLowerCase();
      let matchCount = 0;

      if (!query) {
        faqItems.forEach(item => {
          item.style.display = '';
          item.open = false;
        });
        categories.forEach(cat => cat.style.display = '');
        if (countDisplay) countDisplay.style.display = 'none';
        return;
      }

      faqItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = '';
          item.open = true;
          matchCount++;
        } else {
          item.style.display = 'none';
          item.open = false;
        }
      });

      // Hide category headings if no items in that category match
      categories.forEach(cat => {
        let sibling = cat.nextElementSibling;
        let hasVisible = false;
        while (sibling && !sibling.classList.contains('faq-category') && !sibling.classList.contains('card')) {
          if (sibling.tagName === 'DETAILS' && sibling.style.display !== 'none') {
            hasVisible = true;
            break;
          }
          sibling = sibling.nextElementSibling;
        }
        cat.style.display = hasVisible ? '' : 'none';
      });

      if (countDisplay) {
        countDisplay.textContent = `Found ${matchCount} matching question${matchCount === 1 ? '' : 's'}.`;
        countDisplay.style.display = 'block';
      }
    });
  }
});
