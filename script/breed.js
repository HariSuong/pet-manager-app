'use strict';

const tableBodyEl = document.getElementById('tbody');
const inputBreed = document.getElementById('input-breed');
const inputType = document.getElementById('input-type');

//  Lấy nút submit
const submitBtn = document.getElementById('submit-btn');

// Lấy dữ liệu từ localStorage và hiển thị ra giao diện
const breedArr = getFromStorage('breedArr') ?? [];

// Hàm thêm thú cưng vào danh sách hiển thị
const renderTableData = function (breedArr) {
  tableBodyEl.innerHTML = '';

  for (let i = 0; i < breedArr.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `<th scope="row">${i + 1}</th>
                    <td>${breedArr[i].breed}</td>
                    <td>${breedArr[i].type}</td>
                    
                    <td>
                        <button type="button" id="${
                          i + 1
                        }" class="btn btn-danger btn-delete">Delete</button>
                    </td>`;
    tableBodyEl.appendChild(row);

    // Click nút delete gọi hàm deletebreed
    const deleteBtn = row.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', function () {
      deletebreed(i + 1);
    });
  }
};

// Hiển thị dữ liệu khi load trang
renderTableData(breedArr);

// Hàm xóa thú cưng
const deletebreed = breedId => {
  // Confirm before deletebreed
  if (confirm('Are you sure?')) {
    const newbreed = breedArr.filter((breed, i) => i + 1 !== breedId);
    console.log(newbreed);

    // Lưu dữ liệu vào localStorage
    saveToStorage('breedArr', newbreed);

    // Render dữ liệu ra giao diện
    renderTableData(newbreed);
  }
};

// Hàm clear data sau khi submit trên form
const clearInput = () => {
  inputBreed.value = '';
  inputType.value = 'Select Type';
};

// Xử lý sự kiện click chuột sau khi click submit
submitBtn.addEventListener('click', function (e) {
  const data = {
    breed: inputBreed.value,
    type: inputType.value,
  };

  // Validate data từ form
  const validateData = function (data) {
    if (!data.breed) return alert('Please input for breed');
    if (data.type === 'Select Type') return alert('Please select Type!');

    return true;
  };

  const validate = validateData(data);

  if (validate) {
    // Thêm dữ liệu sau khi submit vào biến dataStorage
    breedArr.push(data);

    // Xóa các dữ liệu vừa nhập trên Form
    clearInput();

    // Lưu dữ liệu vào localStorage
    saveToStorage('breedArr', breedArr);

    // Render dữ liệu ra giao diện
    renderTableData(breedArr);
  }
});
