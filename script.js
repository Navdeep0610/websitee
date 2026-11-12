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
      const roomText = room ? `, Room ${room}` : '';

      alertBox.textContent = `✓ Pickup request confirmed for ${name} (${hostel}${roomText})! Our staff will collect your items during the upcoming pickup slot.`;
      alertBox.style.display = 'block';
      alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      pickupForm.reset();
    });
  }
});
