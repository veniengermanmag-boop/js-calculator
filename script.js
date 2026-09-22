const totalRevenueInput = document.getElementById('totalRevenue');
const avgOrderValueInput = document.getElementById('avgOrderValue');
const leadRate = document.getElementById('leadRate');
const prospectRate = document.getElementById('prospectRate');

const leadRateVal = document.getElementById('leadRateVal');
const prospectRateVal = document.getElementById('prospectRateVal');

const customersValue = document.getElementById('customersValue');
const leadsValue = document.getElementById('leadsValue');
const prospectsValue = document.getElementById('prospectsValue');

function recalculate() {
  const revenue = parseFloat(totalRevenueInput.value) || 0;
  const avgOrder = parseFloat(avgOrderValueInput.value) || 1;
  const leadResponseRate = parseFloat(leadRate.value) || 1;
  const prospectResponseRate = parseFloat(prospectRate.value) || 1;

  const customers = Math.round(revenue / avgOrder);
  const leads = Math.round(customers * 100 / leadResponseRate);
  const prospects = Math.round(leads * 100 / prospectResponseRate);

  customersValue.textContent = customers;
  leadsValue.textContent = leads;
  prospectsValue.textContent = prospects;

  leadRateVal.textContent = leadRate.value + '%';
  prospectRateVal.textContent = prospectRate.value + '%';
}

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

totalRevenueInput.addEventListener('input', recalculate);
avgOrderValueInput.addEventListener('input', recalculate);
leadRate.addEventListener('input', recalculate);
prospectRate.addEventListener('input', recalculate);

recalculate();
