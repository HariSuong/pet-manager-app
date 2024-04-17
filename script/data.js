'use strict';

const importData = document.getElementById('import-btn');
const exportData = document.getElementById('export-btn');
const inputFile = document.getElementById('input-file');

// Export
function saveStaticDataToFile() {
  // Lấy dữ liệu từ localStorage và hiển thị ra giao diện
  const petArr = getFromStorage('petArr') ?? [];

  const textPlain = 'text/plain;charset=utf-8';

  const jsonType = {
    type: textPlain,
  };
  const blob = new Blob([JSON.stringify(petArr)], jsonType);
  saveAs(blob, 'petData.json');
}

// Import
const importFileHandle = function () {
  const file = inputFile.files[0];
  const reader = new FileReader();
  if (!file) alert('File not found');

  reader.onload = e => {
    const fileData = e.target.result;
    // fileData chứa dữ liệu đọc được

    const data = JSON.parse(fileData);

    // Lấy danh sách hiện tại
    const currentData = JSON.parse(localStorage.getItem('petArr')) || [];

    if (currentData.length > 0) {
      alert('Import dữ liệu thành công');
    } else {
      alert('Import dữ liệu KHÔNG thành công');
    }

    // Thêm mới hoặc cập nhật dữ liệu
    data.forEach(pet => {
      const index = currentData.findIndex(p => p.id === pet.id);
      if (index !== -1) {
        currentData[index] = pet;
      } else {
        currentData.push(pet);
      }
    });

    // Lưu lại vào storage
    localStorage.setItem('petArr', JSON.stringify(currentData));
  };
  const blob = new Blob([file]);
  reader.readAsText(blob);
};

exportData.addEventListener('click', saveStaticDataToFile);
importData.addEventListener('click', importFileHandle);
