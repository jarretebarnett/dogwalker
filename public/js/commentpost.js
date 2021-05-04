const newFormHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#post-content').value.trim();
    const name = document.querySelector('#comment_name').value

    if (content && name) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({
                content, name }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (response.ok) {
            document.location.replace('/commBoard');
          } else {
            alert('No comment created');
          }
    }
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);