// All blocks page only: labels each block with its name, taken from the
// <!-- BLOCK: name --> comment above it. Click a label to copy the name.
// Labels are added here at runtime, so the blocks' own markup stays clean.

const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_COMMENT);
const blocks = [];
while (walker.nextNode()) {
  const name = walker.currentNode.data.match(/^\s*BLOCK:\s*(.+?)\s*$/)?.[1];
  if (name) blocks.push([walker.currentNode, name]);
}

blocks.forEach(([comment, name]) => {
  let block = comment.nextSibling;
  while (block && block.nodeType !== 1) block = block.nextSibling;
  if (!block) return;

  const label = document.createElement('button');
  label.type = 'button';
  label.className = 'block-label';
  label.textContent = name;
  label.title = 'Copy block name';
  label.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(name);
      label.dataset.copied = '';
      setTimeout(() => delete label.dataset.copied, 1200);
    } catch {}
  });

  block.classList.add('has-block-label');
  block.append(label);
});
