'use strict';

// Các biến DOM element
const tableBodyEl = document.getElementById('tbody');
const idInput = document.getElementById('input-id');
const nameInput = document.getElementById('input-name');
const ageInput = document.getElementById('input-age');
const typeInput = document.getElementById('input-type');
const weightInput = document.getElementById('input-weight');
const lengthInput = document.getElementById('input-length');
const colorInput = document.getElementById('input-color-1');
const breedInput = document.getElementById('input-breed');
const vaccinatedInput = document.getElementById('input-vaccinated');
const dewormedInput = document.getElementById('input-dewormed');
const sterilizedInput = document.getElementById('input-sterilized');

//  Lấy nút submit
const submitBtn = document.getElementById('submit-btn');

// Lấy dữ liệu từ localStorage và hiển thị ra giao diện
const petArr = getFromStorage('petArr') ?? [];

// Biến lưu danh sách id thú cưng
const petIds = [];
petArr.forEach(pet => petIds.push(pet.id));

// Hàm thêm thú cưng vào danh sách hiển thị
const renderTableData = function (petArr) {
  tableBodyEl.innerHTML = '';

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement('tr');
    row.innerHTML = `<th scope="row">${petArr[i].id}</th>
                        <td>${petArr[i].name}</td>
                        <td>${petArr[i].age}</td>
                        <td>${petArr[i].type}</td>
                        <td>${petArr[i].weight} kg</td>
                        <td>${petArr[i].lengthPet} cm</td>
                        <td>${petArr[i].breed}</td>
                        <td>
                        <i class="bi bi-square-fill" style="color: ${
                          petArr[i].color
                        }"></i>
                        </td>
                        <td><i class="bi bi-${
                          petArr[i].vaccinated ? 'check' : 'x'
                        }-circle-fill"></i></td>
                        <td><i class="bi bi-${
                          petArr[i].dewormed ? 'check' : 'x'
                        }-circle-fill"></i></td>
                        <td><i class="bi bi-${
                          petArr[i].sterilized ? 'check' : 'x'
                        }-circle-fill"></i></td>
                        <td>${petArr[i].date}</td>
                        <td>
                        <button type="button" id="${
                          petArr[i].id
                        }" class="btn btn-danger btn-delete">Delete</button>
                    </td>`;
    tableBodyEl.appendChild(row);

    // Click nút delete gọi hàm deletePet
    const deleteBtn = row.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', function () {
      deletePet(petArr[i].id);
    });
  }
};

// Hàm hiển thị breed theo type
const renderBreed = function (breedArr) {
  breedInput.innerHTML = '<option>Select Breed</option>';
  breedArr.forEach(breed => {
    const option = document.createElement('option');
    option.innerHTML = breed.breed;
    breedInput.appendChild(option);
  });
};

// Hiển thị dữ liệu khi load trang
renderTableData(petArr);

// Lấy breed
const breedData = getFromStorage('breedArr', []);

// Thay đổi breed hiển thị theo loại
typeInput.addEventListener('change', function () {
  const breedArr = breedData.filter(breed => breed.type === typeInput.value);
  renderBreed(breedArr);
});

// Hàm xóa thú cưng
const deletePet = petId => {
  // Confirm before deletePet
  if (confirm('Are you sure?')) {
    const newPet = petArr.filter(pet => pet.id !== petId);

    // Lưu dữ liệu vào localStorage
    saveToStorage('petArr', newPet);

    // Render dữ liệu ra giao diện
    renderTableData(newPet);
  }
};

// Hàm clear data sau khi submit trên form
const clearInput = () => {
  idInput.value = '';
  nameInput.value = '';
  ageInput.value = '';
  weightInput.value = '';
  lengthInput.value = '';
  colorInput.value = '#000000';
  typeInput.value = 'Select Type';
  breedInput.value = 'Select Breed';
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

// Xử lý sự kiện click chuột sau khi click submit
submitBtn.addEventListener('click', function (e) {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    lengthPet: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
    ////////////////////////////////
  };

  // Validate data từ form

  const validateData = function (data) {
    if (!data.id) return alert('Please input for id');
    if (petIds.includes(data.id)) return alert('ID must be unique!');
    if (!data.name) return alert('Please input for name');
    if (!data.age) return alert('Please input for age');
    if (data.age < 1 || data.age > 15)
      return alert('Age must be between 1 and 15!');
    if (data.type === 'Select Type') return alert('Please select Type!');
    if (!data.weight) return alert('Please input for weight');
    if (data.weight < 1 || data.weight > 15)
      return alert('Weight must be between 1 and 15!');
    if (!data.lengthPet) return alert('Please input for lengthPet');
    if (data.lengthPet < 1 || data.lengthPet > 100)
      return alert('Length must be between 1 and 100!');
    if (data.breed === 'Select Breed') return alert('Please select Breed!');
    return true;
  };

  const validate = validateData(data);

  if (validate) {
    // Thêm dữ liệu sau khi submit vào biến dataStorage
    petArr.push(data);

    // Thêm id vào petIds để kiểm tra id bị trùng
    petIds.push(data.id);

    // Xóa các dữ liệu vừa nhập trên Form
    clearInput();

    // Lưu dữ liệu vào localStorage
    saveToStorage('petArr', petArr);

    // Render dữ liệu ra giao diện
    renderTableData(petArr);
  }
});
