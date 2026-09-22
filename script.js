const barValues = [8, 25, 45, 62, 88, 100];
const barsContainer = document.getElementById('bars');

barValues.forEach((val, i) => {
  const row = document.createElement('div');
  row.className = 'bar-row';
  row.innerHTML = `
    <span class="bar-label">M${i + 1}</span>
    <div class="bar-track">
      <div class="bar-fill" style="width:${val}%"></div>
    </div>
  `;
  barsContainer.appendChild(row);
});

const leadRate = document.getElementById('leadRate');
const leadRateVal = document.getElementById('leadRateVal');
leadRate.addEventListener('input', () => {
  leadRateVal.textContent = leadRate.value + '%';
});

const prospectRate = document.getElementById('prospectRate');
const prospectRateVal = document.getElementById('prospectRateVal');
prospectRate.addEventListener('input', () => {
  prospectRateVal.textContent = prospectRate.value + '%';
});
