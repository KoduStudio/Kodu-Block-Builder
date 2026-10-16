// Contact forms (any form with data-contact-form): photo previews (up to 3,
// removable) when the form has a photo input, our own error messages, and a
// demo submit that shows the [data-sent] message.
// For a live site, set the form's action to your form service (e.g.
// Formspree) and remove data-demo; the photos go with the form as normal.

const MAX_PHOTOS = 3;
const X = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';

document.querySelectorAll('[data-contact-form]').forEach(form => {
  const input = form.querySelector('input[type="file"]');
  const drop = input?.closest('.contact-form__drop');
  const list = form.querySelector('.contact-form__previews');
  let photos = [];

  const render = () => {
    if (!input) return;
    const files = new DataTransfer();
    photos.forEach(photo => files.items.add(photo));
    input.files = files.files;

    list.querySelectorAll('img').forEach(img => URL.revokeObjectURL(img.src));
    list.replaceChildren(...photos.map((photo, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<img alt=""><button type="button" aria-label="Remove ${photo.name}">${X}</button>`;
      li.querySelector('img').src = URL.createObjectURL(photo);
      li.querySelector('button').addEventListener('click', () => { photos.splice(i, 1); render(); });
      return li;
    }));
    drop.classList.toggle('is-full', photos.length >= MAX_PHOTOS);
  };

  // Each pick adds to the photos already chosen, up to the limit
  input?.addEventListener('change', () => {
    const picked = [...input.files].filter(file => file.type.startsWith('image/'));
    photos = [...photos, ...picked].slice(0, MAX_PHOTOS);
    render();
  });

  // Our own error messages show instead of the browser's bubbles;
  // the first problem field still gets focus
  form.addEventListener('invalid', e => {
    e.preventDefault();
    if (e.target === form.querySelector(':invalid')) e.target.focus();
  }, true);

  if (form.hasAttribute('data-demo')) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      form.reset();
      photos = [];
      render();
      form.querySelector('[data-sent]').hidden = false;
    });
  }
});
