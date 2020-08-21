window.onload=function(){
  const input = document.querySelector('input[type=file]');
  const preview = document.querySelector('.preview');

  input.addEventListener('change', updateImageDisplay);

  function updateImageDisplay() {
    while (preview.firstChild) {
      preview.removeChild(preview.firstChild);
    }
    const curFiles = input.files;
    if (curFiles.length > 5) {
      const para = document.createElement('p');
      para.textContent = 'Trường có số hình ảnh tối đa được chọn là 5. Vui lòng chọn lại!';
      preview.appendChild(para);
    } else {
      const list = document.createElement('ol');
      preview.appendChild(list);
      for (const file of curFiles) {
        const listItem = document.createElement('li');
        const para = document.createElement('p');
        if (validFileType(file)) {
          para.textContent = `File ${file.name}`;
          listItem.appendChild(para);
        } else {
          para.textContent = `File ${file.name}: Không đúng định dạng file ảnh. Vui lòng lựa chọn lại.`;
          listItem.appendChild(para);
        }
        list.appendChild(listItem);
      }
    }
  }

  const fileTypes = [
    "image/apng",
    "image/bmp",
    "image/gif",
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "image/svg+xml",
    "image/tiff",
    "image/webp",
    "image/x-icon"
  ];

  function validFileType(file) {
    return fileTypes.includes(file.type);
  }
};

