const newFormRequest = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#request-name').value.trim();
    const needed_funding = document.querySelector('#project-funding').value.trim();
    const description = document.querySelector('#request-desc').value.trim();
  
    if (name && needed_funding && description) {
      const response = await fetch(`/api/requests`, {
        method: 'POST',
        body: JSON.stringify({ name, needed_funding, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create request');
      }
    }
  };
  
  const deleteBtn = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/requests/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete request');
      }
    }
};
  
document.querySelector('.new-request-form')
document.addEventListener('submit', newFormRequest);
  
document.querySelector('.request-list')
document.addEventListener('click', deleteBtn);
  