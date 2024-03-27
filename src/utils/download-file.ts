export function downloadFile(text: string) {
  const filetype = 'data:image/svg+xml;charset=utf-8,';

  const element = document.createElement('a');
  element.setAttribute('href', filetype + encodeURIComponent(text));
  element.setAttribute('download', 'download.svg');
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
