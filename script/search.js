'use strict';

const tableBodyEl = document.getElementById('tbody');
const inputId = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputType = document.getElementById('input-type');
const inputBreed = document.getElementById('input-breed');
const inputVaccinated = document.getElementById('input-vaccinated');
const inputDewormed = document.getElementById('input-dewormed');
const inputSterilized = document.getElementById('input-sterilized');
const findBtn = document.getElementById('find-btn');

// Lấy dữ liệu từ localStorage và hiển thị ra giao diện
const petArr = getFromStorage('petArr') ?? [];

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
                        `;
    tableBodyEl.appendChild(row);
  }
};

// Hàm hiển thị breed theo type
const renderBreed = function (breedArr) {
  inputBreed.innerHTML = '<option>Select Breed</option>';
  breedArr.forEach(breed => {
    const option = document.createElement('option');
    option.innerHTML = breed.breed;
    inputBreed.appendChild(option);
  });
};

// Lấy breed
const breedData = getFromStorage('breedArr', []);

// Thay đổi breed hiển thị theo loại
inputType.addEventListener('change', function () {
  const breedArr = breedData.filter(breed => breed.type === inputType.value);
  renderBreed(breedArr);
});

const searchPets = function (
  id,
  name,
  type,
  breed,
  vaccinatedInput,
  dewormedInput,
  sterilizedInput
) {
  const filteredPets = petArr.filter(pet => {
    // Lấy giá trị từ các input và chuyển đổi thành lowercase để so sánh không phân biệt chữ hoa chữ thường
    const idValue = pet.id.toLowerCase();
    const nameValue = pet.name.toLowerCase();

    // Lấy giá trị từ các ô checkbox
    const vaccinated = pet.vaccinated;
    const dewormed = pet.dewormed;
    const sterilized = pet.sterilized;

    // Điều kiện so sánh với giá trị nhập vào từ form và ô checkbox
    const matchesID = idValue.includes(id.toLowerCase());
    const matchesName = nameValue.includes(name.toLowerCase());
    const matchesType = pet.type === type || type === 'Select Type';
    const matchesBreed = pet.breed === breed || breed === 'Select Breed';
    const matchesVaccinated =
      !vaccinatedInput || vaccinated === vaccinatedInput;
    const matchesDewormed = !dewormedInput || dewormed === dewormedInput;
    const matchesSterilized =
      !sterilizedInput || sterilized === sterilizedInput;

    // Kết hợp tất cả các điều kiện sử dụng toán tử && (AND)
    return (
      matchesID &&
      matchesName &&
      matchesType &&
      matchesBreed &&
      matchesVaccinated &&
      matchesDewormed &&
      matchesSterilized
    );
  });

  return filteredPets;
};

findBtn.addEventListener('click', function () {
  // Lấy giá trị từ các trường input
  const id = inputId.value.trim();
  const name = inputName.value.trim();
  const type = inputType.value;
  const breed = inputBreed.value;
  const vaccinated = inputVaccinated.checked;
  const dewormed = inputDewormed.checked;
  const sterilized = inputSterilized.checked;

  // Gọi hàm tìm kiếm và hiển thị kết quả
  const filteredPets = searchPets(
    id,
    name,
    type,
    breed,
    vaccinated,
    dewormed,
    sterilized
  );

  renderTableData(filteredPets);
});
