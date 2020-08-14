const input = document.querySelector('input[type=file]');
const preview = document.querySelector('.preview');
let checkValid = false;
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
    document.getElementById('submitbtn').disabled = true;
  } else {
    const list = document.createElement('ol');
    preview.appendChild(list);
    for (const file of curFiles) {
      const listItem = document.createElement('li');
      const para = document.createElement('p');
      if (validFileType(file)) {
        para.textContent = `File ${file.name}`;
        listItem.appendChild(para);
        document.getElementById('submitbtn').disabled = false;
      } else {
        para.textContent = `File ${file.name}: Không đúng định dạng file ảnh. Vui lòng lựa chọn lại.`;
        listItem.appendChild(para);
        document.getElementById('submitbtn').disabled = true;
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

function validDate() {
  let startDate = document.getElementById('startDate').value;
  let endDate = document.getElementById('endDate').value;
  if (endDate <= startDate) {
    document.getElementById('endDateValidate').innerHTML = 'Trường có ngày giờ kết thúc không thể lớn hơn hoặc bằng ngày giờ bắt đầu. Vui lòng chọn lại!';
    document.getElementById('submitbtn').disabled = true;
  } else {
    checkValid = true;
    document.getElementById('submitbtn').disabled = false;
  }
}

function alertMessage() {
  let form = document.getElementById('form');
  if (form.checkValidity()) {
    if (checkValid) {
      alert('Đã yêu cầu đấu giá thành công. Vui lòng chờ phê duyệt');
    }
  }
}
