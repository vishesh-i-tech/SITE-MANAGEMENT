/**
 * Construction Site Management System - Application Controller Layer
 */

document.addEventListener('DOMContentLoaded', () => {
  // Global State Reference
  const state = {
    currentUser: null,
    activeSiteId: null,
    activeSection: 'dashboard-section',
    attendanceDate: new Date().toISOString().split('T')[0]
  };

  // Cache DOM Elements
  const DOM = {
    // Views
    authView: document.getElementById('auth-view'),
    appView: document.getElementById('app-view'),
    loginForm: document.getElementById('login-form'),
    loginIdentifier: document.getElementById('login-identifier'),
    loginPassword: document.getElementById('login-password'),
    
    // Header Controls
    pageTitle: document.getElementById('page-title'),
    pageSubtitle: document.getElementById('page-subtitle'),
    siteSelect: document.getElementById('active-site-select'),
    btnCreateSite: document.getElementById('btn-create-site'),
    btnLogout: document.getElementById('btn-logout'),
    sidebarUserName: document.getElementById('sidebar-user-name'),
    sidebarUserRole: document.getElementById('sidebar-user-role'),
    menuItems: document.querySelectorAll('.menu-item'),
    sections: document.querySelectorAll('.spa-section'),

    // Dashboard View Components
    siteTypeBadge: document.getElementById('site-type-badge'),
    siteLocation: document.getElementById('site-meta-location'),
    siteStartDate: document.getElementById('site-meta-start-date'),
    siteDuration: document.getElementById('site-meta-duration'),
    siteBudget: document.getElementById('site-meta-budget'),
    dashMetricInvestment: document.getElementById('dash-metric-investment'),
    dashMetricProfit: document.getElementById('dash-metric-profit'),
    dashMetricLoss: document.getElementById('dash-metric-loss'),
    expenseBreakdownBody: document.getElementById('expense-breakdown-body'),
    dashQuickLabor: document.getElementById('dash-quick-labor'),
    dashQuickTools: document.getElementById('dash-quick-tools'),
    dashQuickMachinery: document.getElementById('dash-quick-machinery'),

    // Labor View Components
    laborMetricHeadcount: document.getElementById('labor-metric-headcount'),
    laborMetricPaid: document.getElementById('labor-metric-paid'),
    laborMetricOutstanding: document.getElementById('labor-metric-outstanding'),
    attendanceDateSelect: document.getElementById('attendance-date-select'),
    attendanceTableBody: document.getElementById('attendance-table-body'),
    payLaborerSelect: document.getElementById('pay-laborer-select'),
    payTypeSelect: document.getElementById('pay-type-select'),
    payAmountInput: document.getElementById('pay-amount-input'),
    payOutstandingInput: document.getElementById('pay-outstanding-input'),
    payrollForm: document.getElementById('payroll-log-form'),
    laborPaymentsBody: document.getElementById('labor-payments-ledger-body'),
    btnRegisterWorker: document.getElementById('btn-add-laborer'),

    // Inventory View Components
    btnCreateCatalogItem: document.getElementById('btn-create-catalog-item'),
    dispatchToolSelect: document.getElementById('dispatch-tool-select'),
    dispatchSizeSelect: document.getElementById('dispatch-size-select'),
    dispatchCustomSizeGroup: document.getElementById('dispatch-custom-size-group'),
    dispatchCustomSizeInput: document.getElementById('dispatch-custom-size-input'),
    dispatchQtyInput: document.getElementById('dispatch-qty-input'),
    dispatchRentInput: document.getElementById('dispatch-rent-input'),
    dispatchForm: document.getElementById('tool-dispatch-form'),
    inventoryDeploymentsBody: document.getElementById('inventory-deployments-body'),
    terminalBody: document.getElementById('terminal-body'),

    // Machinery View Components
    materialForm: document.getElementById('material-usage-form'),
    materialTypeSelect: document.getElementById('mat-type-select'),
    materialQtyInput: document.getElementById('mat-qty-input'),
    materialCostInput: document.getElementById('mat-cost-input'),
    materialDateInput: document.getElementById('mat-date-input'),
    materialsLogBody: document.getElementById('materials-log-body'),
    
    machineryForm: document.getElementById('machinery-log-form'),
    machineryTypeSelect: document.getElementById('mach-type-select'),
    machCustomGroup: document.getElementById('mach-custom-group'),
    machCustomName: document.getElementById('mach-custom-name'),
    machineryFuelInput: document.getElementById('mach-fuel-input'),
    machineryFuelCostInput: document.getElementById('mach-fuel-cost-input'),
    machineryHoursInput: document.getElementById('mach-hours-input'),
    machineryRunningCostInput: document.getElementById('mach-run-cost-input'),
    machineryDescInput: document.getElementById('mach-desc-input'),
    machineryTimelineContainer: document.getElementById('machinery-timeline-container'),

    // Site Comparison View Components
    compareSiteA: document.getElementById('compare-site-a'),
    compareSiteB: document.getElementById('compare-site-b'),
    comparePanelA: document.getElementById('compare-panel-a'),
    comparePanelB: document.getElementById('compare-panel-b'),

    // Modals
    modalCreateSite: document.getElementById('modal-create-site'),
    formCreateSite: document.getElementById('form-create-site'),
    modalCreateLaborer: document.getElementById('modal-create-laborer'),
    formCreateLaborer: document.getElementById('form-create-laborer'),
    modalCreateCatalog: document.getElementById('modal-create-catalog'),
    formCreateCatalog: document.getElementById('form-create-catalog'),
    modalReturnTool: document.getElementById('modal-return-tool'),
    formReturnTool: document.getElementById('form-return-tool'),
    modalDamageRepair: document.getElementById('modal-damage-repair'),
    formDamageRepair: document.getElementById('form-damage-repair')
  };

  // Helper function to format Currency
  const formatCurrency = (val) => {
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  // Helper to format Date string
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // ==========================================
  // INITIALIZATION
  // ==========================================
  const initApp = () => {
    // Check session
    const cachedUser = sessionStorage.getItem('indorkar_session');
    if (cachedUser) {
      state.currentUser = JSON.parse(cachedUser);
      setupDashboardView();
    } else {
      DOM.authView.style.display = 'flex';
      DOM.appView.style.display = 'none';
    }

    // Set Default Date Picker
    DOM.attendanceDateSelect.value = state.attendanceDate;
    if (DOM.materialDateInput) {
      DOM.materialDateInput.value = state.attendanceDate;
    }

    // Attach Listeners
    setupEventListeners();
  };

  // ==========================================
  // AUTHENTICATION CONTROLLER
  // ==========================================
  DOM.loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const identifier = DOM.loginIdentifier.value;
    const password = DOM.loginPassword.value;

    const user = window.db.authenticate(identifier, password);
    if (user) {
      state.currentUser = user;
      sessionStorage.setItem('indorkar_session', JSON.stringify(user));
      
      // Visual transition
      DOM.authView.style.animation = 'fadeIn 0.4s reverse ease-out forwards';
      setTimeout(() => {
        setupDashboardView();
        DOM.loginForm.reset();
      }, 300);
    } else {
      alert('❌ Authentication failed. Please check credentials.');
    }
  });

  DOM.btnLogout.addEventListener('click', () => {
    sessionStorage.removeItem('indorkar_session');
    state.currentUser = null;
    DOM.appView.style.display = 'none';
    DOM.authView.style.display = 'flex';
    DOM.authView.style.animation = 'fadeIn 0.6s ease-out forwards';
  });

  const setupDashboardView = () => {
    DOM.authView.style.display = 'none';
    DOM.appView.style.display = 'flex';
    DOM.appView.style.animation = 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards';
    
    // Set profile names
    DOM.sidebarUserName.textContent = state.currentUser.name;
    DOM.sidebarUserRole.textContent = state.currentUser.role;

    // Populate sites lists
    populateSitesDropdowns();
  };

  // ==========================================
  // DROPDOWNS POPULATION
  // ==========================================
  const populateSitesDropdowns = () => {
    const sites = window.db.getSites();
    
    // Active selector dropdown
    DOM.siteSelect.innerHTML = '';
    // Site Comparison dropdowns
    DOM.compareSiteA.innerHTML = '';
    DOM.compareSiteB.innerHTML = '';

    if (sites.length > 0) {
      sites.forEach(site => {
        // Active Select
        const opt = document.createElement('option');
        opt.value = site.id;
        opt.textContent = site.name;
        DOM.siteSelect.appendChild(opt);

        // Comparison A
        const optA = document.createElement('option');
        optA.value = site.id;
        optA.textContent = site.name;
        DOM.compareSiteA.appendChild(optA);

        // Comparison B
        const optB = document.createElement('option');
        optB.value = site.id;
        optB.textContent = site.name;
        DOM.compareSiteB.appendChild(optB);
      });

      // Default active selections
      if (!state.activeSiteId) {
        state.activeSiteId = sites[0].id;
      }
      DOM.siteSelect.value = state.activeSiteId;
      
      // Comparison defaults
      DOM.compareSiteA.value = sites[0].id;
      DOM.compareSiteB.value = sites[1] ? sites[1].id : sites[0].id;
      
      renderActiveSection();
    } else {
      state.activeSiteId = null;
      DOM.siteSelect.innerHTML = '<option value="">(No Project Sites)</option>';
    }
  };

  const populateLaborerDropdowns = () => {
    const laborers = window.db.getLaborers();
    DOM.payLaborerSelect.innerHTML = '';
    
    laborers.forEach(l => {
      const opt = document.createElement('option');
      opt.value = l.id;
      opt.textContent = `${l.name} (₹${l.dailyRate}/day)`;
      DOM.payLaborerSelect.appendChild(opt);
    });
  };

  const populateInventoryDropdowns = () => {
    const catalog = window.db.getInventoryCatalog();
    DOM.dispatchToolSelect.innerHTML = '';
    
    catalog.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.id;
      opt.textContent = `${item.name} (${item.category})`;
      DOM.dispatchToolSelect.appendChild(opt);
    });

    handleCatalogItemChange();
  };

  const handleCatalogItemChange = () => {
    const catalogId = DOM.dispatchToolSelect.value;
    if (!catalogId) return;

    const catalog = window.db.getInventoryCatalog();
    const item = catalog.find(i => i.id === catalogId);
    
    DOM.dispatchSizeSelect.innerHTML = '';
    if (item && item.sizes) {
      item.sizes.forEach(size => {
        const opt = document.createElement('option');
        opt.value = size;
        opt.textContent = size;
        DOM.dispatchSizeSelect.appendChild(opt);
      });
    }

    // Append Custom size choice option
    const customOpt = document.createElement('option');
    customOpt.value = 'Custom Size (Self Write)';
    customOpt.textContent = 'Custom Size (Self Write)';
    DOM.dispatchSizeSelect.appendChild(customOpt);

    // Hide input group initially
    if (DOM.dispatchCustomSizeGroup) {
      DOM.dispatchCustomSizeGroup.style.display = 'none';
      DOM.dispatchCustomSizeInput.removeAttribute('required');
      DOM.dispatchCustomSizeInput.value = '';
    }
  };

  DOM.dispatchToolSelect.addEventListener('change', handleCatalogItemChange);

  DOM.dispatchSizeSelect.addEventListener('change', (e) => {
    if (e.target.value === 'Custom Size (Self Write)') {
      DOM.dispatchCustomSizeGroup.style.display = 'block';
      DOM.dispatchCustomSizeInput.setAttribute('required', 'true');
      DOM.dispatchCustomSizeInput.focus();
    } else {
      DOM.dispatchCustomSizeGroup.style.display = 'none';
      DOM.dispatchCustomSizeInput.removeAttribute('required');
    }
  });

  // ==========================================
  // NAVIGATION ROUTING SYSTEM
  // ==========================================
  DOM.menuItems.forEach(item => {
    item.addEventListener('click', () => {
      DOM.menuItems.forEach(mi => mi.classList.remove('active'));
      item.classList.add('active');
      
      const target = item.getAttribute('data-target');
      state.activeSection = target;
      
      // Update title text
      const viewText = item.textContent.trim().split(' ').slice(1).join(' ');
      DOM.pageTitle.textContent = viewText;
      DOM.pageSubtitle.textContent = `INDORKAR Infrastructure site logistics & financials tracker`;

      renderActiveSection();
    });
  });

  DOM.siteSelect.addEventListener('change', (e) => {
    state.activeSiteId = e.target.value;
    renderActiveSection();
  });

  const renderActiveSection = () => {
    DOM.sections.forEach(sec => {
      sec.style.display = sec.id === state.activeSection ? 'block' : 'none';
    });

    if (!state.activeSiteId && state.activeSection !== 'comparison-section') {
      alert("Please select or create an active project site first!");
      return;
    }

    // Call individual section renderers
    switch(state.activeSection) {
      case 'dashboard-section':
        renderDashboard();
        break;
      case 'labor-section':
        renderLaborAndWages();
        break;
      case 'inventory-section':
        renderInventoryTracking();
        break;
      case 'machinery-section':
        renderMachineryAndMaterials();
        break;
      case 'comparison-section':
        renderSiteComparison();
        break;
    }
  };

  // ==========================================
  // 1. DASHBOARD VIEW RENDERER
  // ==========================================
  const renderDashboard = () => {
    const site = window.db.getSiteById(state.activeSiteId);
    if (!site) return;

    // Spec Sheet Metadata
    DOM.siteTypeBadge.textContent = `Type: ${site.projectType}`;
    DOM.siteLocation.textContent = site.location;
    DOM.siteStartDate.textContent = formatDate(site.startDate);
    
    // Duration Elapsed Calculation
    const start = new Date(site.startDate);
    const today = new Date();
    const elapsedMs = Math.abs(today - start);
    const elapsedDays = Math.ceil(elapsedMs / (1000 * 60 * 60 * 24));
    DOM.siteDuration.textContent = `${elapsedDays} Days Elapsed (Limit: ${site.durationDays})`;
    DOM.siteBudget.textContent = formatCurrency(site.budget);

    // Financial Metrics
    const fin = window.db.getSiteFinancials(state.activeSiteId);
    if (fin) {
      DOM.dashMetricInvestment.textContent = formatCurrency(fin.overallInvestment);
      
      if (fin.profit > 0) {
        DOM.dashMetricProfit.textContent = formatCurrency(fin.profit);
        DOM.dashMetricProfit.parentElement.style.opacity = '1';
        DOM.dashMetricLoss.textContent = '₹0';
        DOM.dashMetricLoss.parentElement.style.opacity = '0.5';
      } else {
        DOM.dashMetricProfit.textContent = '₹0';
        DOM.dashMetricProfit.parentElement.style.opacity = '0.5';
        DOM.dashMetricLoss.textContent = formatCurrency(fin.loss);
        DOM.dashMetricLoss.parentElement.style.opacity = '1';
      }

      // Tabular Expense Breakdown
      const categories = [
        { name: 'Labor Wages & payroll', value: fin.laborCost, color: 'var(--accent-blue)' },
        { name: 'Scaffolding & Tools Rent', value: fin.rentCost, color: 'var(--primary)' },
        { name: 'Equipment Repair Expenses', value: fin.repairCost, color: 'var(--accent-pink)' },
        { name: 'Acquisition of Materials', value: fin.materialCost, color: 'var(--accent-cyan)' },
        { name: 'Machinery Fuel & operations', value: fin.fuelCost + fin.machineryRunningCost, color: 'var(--accent-purple)' }
      ];

      DOM.expenseBreakdownBody.innerHTML = '';
      categories.forEach(c => {
        const pct = fin.overallInvestment > 0 ? ((c.value / fin.overallInvestment) * 100).toFixed(1) : 0;
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="display: inline-block; width: 12px; height: 12px; border-radius: 3px; background: ${c.color}"></span>
              ${c.name}
            </div>
          </td>
          <td style="font-weight: 700;">${formatCurrency(c.value)}</td>
          <td>
            <div style="display: flex; align-items: center; gap: 10px;">
              <div style="flex: 1; background: var(--bg-slate-light); height: 6px; border-radius: 3px; overflow:hidden;">
                <div style="background: ${c.color}; height: 100%; width: ${pct}%"></div>
              </div>
              <span style="font-size: 0.82rem; width: 40px; text-align: right;">${pct}%</span>
            </div>
          </td>
        `;
        DOM.expenseBreakdownBody.appendChild(row);
      });

      // Quick lists summary calculations
      DOM.dashQuickLabor.textContent = `${window.db.getLaborers().length} Crews Profiled`;
      
      const activeDeps = fin.rentCost > 0 ? window.db.getDeployments(state.activeSiteId).filter(d => !d.returnTime).length : 0;
      DOM.dashQuickTools.textContent = `${activeDeps} Active Deployments`;

      const activeMach = window.db.getMachineryLogs(state.activeSiteId).length;
      DOM.dashQuickMachinery.textContent = `${activeMach} Running Operations`;
    }
  };

  // ==========================================
  // 2. LABOR & WAGES VIEW RENDERER
  // ==========================================
  const renderLaborAndWages = () => {
    populateLaborerDropdowns();
    
    // Fetch Attendance entries
    const attendanceLogs = window.db.getAttendanceLogs(state.activeSiteId);
    const activeLog = attendanceLogs.find(a => a.date === state.attendanceDate);

    // Compute Daily Headcount
    let countPresent = 0;
    if (activeLog) {
      Object.values(activeLog.records).forEach(status => {
        if (status === 'Present') countPresent++;
        if (status === 'Half-Day') countPresent += 0.5;
      });
    }
    DOM.laborMetricHeadcount.textContent = countPresent;

    // Wage Stats
    const financials = window.db.getSiteFinancials(state.activeSiteId);
    if (financials) {
      DOM.laborMetricPaid.textContent = formatCurrency(financials.wagesSettled + financials.advancesPaid);
      
      // Calculate outstanding balances (Earned minus Disbursed outstanding)
      const outstandingVal = Math.max(0, financials.laborCost - financials.wagesSettled);
      DOM.laborMetricOutstanding.textContent = formatCurrency(outstandingVal);
    }

    // Populate Attendance Table
    const laborers = window.db.getLaborers();
    DOM.attendanceTableBody.innerHTML = '';

    laborers.forEach(lab => {
      const status = activeLog && activeLog.records[lab.id] ? activeLog.records[lab.id] : 'Absent';
      
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: 600; color: var(--text-white);">${lab.name}</td>
        <td style="font-weight: 500;">₹${lab.dailyRate}/day</td>
        <td>
          <div class="attendance-toggle" data-labor-id="${lab.id}">
            <button class="attendance-toggle-btn present ${status === 'Present' ? 'active' : ''}" data-status="Present">Present</button>
            <button class="attendance-toggle-btn half ${status === 'Half-Day' ? 'active' : ''}" data-status="Half-Day">Half Day</button>
            <button class="attendance-toggle-btn absent ${status === 'Absent' ? 'active' : ''}" data-status="Absent">Absent</button>
          </div>
        </td>
      `;
      DOM.attendanceTableBody.appendChild(tr);
    });

    // Attach attendance toggle button click listeners
    document.querySelectorAll('.attendance-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const toggleContainer = e.target.parentElement;
        const laborId = toggleContainer.getAttribute('data-labor-id');
        const newStatus = e.target.getAttribute('data-status');

        // Update active class immediately
        toggleContainer.querySelectorAll('.attendance-toggle-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        // Write to database
        const records = {};
        records[laborId] = newStatus;
        window.db.logAttendance(state.activeSiteId, state.attendanceDate, records);

        // Recalculate labor details in background
        renderLaborAndWages();
        renderDashboard();
      });
    });

    // Render Historical Payroll Registry Ledger
    const payments = window.db.getPayments(state.activeSiteId);
    DOM.laborPaymentsBody.innerHTML = '';
    
    if (payments.length === 0) {
      DOM.laborPaymentsBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted);">No payroll registrations logged for this site.</td></tr>`;
    } else {
      payments.forEach(p => {
        const lab = laborers.find(l => l.id === p.laborerId);
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${formatDate(p.date)}</td>
          <td style="font-weight:600; color:var(--text-white);">${lab ? lab.name : 'Unknown Laborer'}</td>
          <td><span class="badge ${p.type === 'Wage Settlement' ? 'success' : 'info'}">${p.type}</span></td>
          <td style="font-weight:700;">${formatCurrency(p.amount)}</td>
          <td style="color: var(--text-secondary);">${formatCurrency(p.advance)}</td>
          <td><span class="badge ${p.outstanding > 0 ? 'danger' : 'success'}">${formatCurrency(p.outstanding)}</span></td>
        `;
        DOM.laborPaymentsBody.appendChild(tr);
      });
    }
  };

  DOM.attendanceDateSelect.addEventListener('change', (e) => {
    state.attendanceDate = e.target.value;
    renderLaborAndWages();
  });

  DOM.payrollForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const laborerId = DOM.payLaborerSelect.value;
    const type = DOM.payTypeSelect.value;
    const amount = parseFloat(DOM.payAmountInput.value);
    const outstanding = parseFloat(DOM.payOutstandingInput.value) || 0;

    let advance = 0;
    if (type === 'Advance Payment') {
      advance = amount;
    }

    window.db.addPayment(state.activeSiteId, laborerId, amount, type, advance, outstanding);
    DOM.payrollForm.reset();
    renderLaborAndWages();
    renderDashboard();
  });

  // ==========================================
  // 3. TOOLS & EQUIPMENT TRACKING
  // ==========================================
  const renderInventoryTracking = () => {
    populateInventoryDropdowns();

    const deployments = window.db.getDeployments(state.activeSiteId);
    const catalog = window.db.getInventoryCatalog();
    DOM.inventoryDeploymentsBody.innerHTML = '';

    if (deployments.length === 0) {
      DOM.inventoryDeploymentsBody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No tools dispatched or active on this site.</td></tr>`;
    } else {
      deployments.forEach(d => {
        const item = catalog.find(c => c.id === d.toolId);
        const nameDisplay = item ? `${item.name} (${d.size})` : 'Unknown Tool';
        const isAllReturned = d.quantityReturned >= d.quantitySent;
        
        // Calculate dynamic rental accrual
        const start = new Date(d.dispatchTime);
        const end = d.returnTime ? new Date(d.returnTime) : new Date();
        const activeDays = Math.max(1, Math.ceil(Math.abs(end - start) / (1000 * 60 * 60 * 24)));
        const totalRent = d.quantitySent * d.rentRate * activeDays;

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>
            <div style="font-weight: 600; color: var(--text-white);">${nameDisplay}</div>
            <span style="font-size: 0.78rem; color: var(--text-muted);">${item ? item.category : ''}</span>
          </td>
          <td style="font-weight: 700; color: var(--text-white);">${d.quantitySent} units</td>
          <td>
            <span class="badge ${isAllReturned ? 'success' : 'warning'}">
              ${d.quantityReturned} returned
            </span>
          </td>
          <td style="font-size:0.8rem; line-height: 1.4;">
            <div>📥 Disp: ${formatDate(d.dispatchTime)}</div>
            <div style="color:var(--text-secondary);">📤 Ret: ${d.returnTime ? formatDate(d.returnTime) : 'Active at Site'}</div>
          </td>
          <td style="font-weight: 700;">
            ${formatCurrency(totalRent)}<br>
            <span style="font-size: 0.75rem; font-weight: normal; color: var(--text-muted);">₹${d.rentRate}/day/item</span>
          </td>
          <td>
            <span style="color: var(--accent-pink); font-weight: 600;">${d.damagesCount} items damaged</span><br>
            <span style="font-size: 0.78rem; color: var(--text-muted);">Repair cost: ${formatCurrency(d.repairCost)}</span>
          </td>
          <td>
            <div class="card-actions">
              <button class="card-action-btn btn-return" data-id="${d.id}" ${isAllReturned ? 'disabled' : ''}>Return</button>
              <button class="card-action-btn btn-damage" data-id="${d.id}">Damages</button>
            </div>
          </td>
        `;
        DOM.inventoryDeploymentsBody.appendChild(tr);
      });
    }

    // Attach return & damages click action
    document.querySelectorAll('.btn-return').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const depId = e.currentTarget.getAttribute('data-id');
        openReturnModal(depId);
      });
    });

    document.querySelectorAll('.btn-damage').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const depId = e.currentTarget.getAttribute('data-id');
        openDamageModal(depId);
      });
    });

    // Populate Retro Terminal stream logs
    renderLogisticsTerminal();
  };

  const renderLogisticsTerminal = () => {
    const deployments = window.db.getAllDeployments();
    const catalog = window.db.getInventoryCatalog();
    const sites = window.db.getSites();

    // Collect all timeline logs
    const timeline = [];

    deployments.forEach(d => {
      const item = catalog.find(c => c.id === d.toolId);
      const site = sites.find(s => s.id === d.siteId);
      const toolName = item ? item.name : 'Unknown';
      const siteName = site ? site.name : 'Unknown';

      // Dispatch Log entry
      timeline.push({
        time: new Date(d.dispatchTime),
        text: `LOGISTICS DISPATCH: Sent ${d.quantitySent} units of ${toolName} (${d.size}) to [${siteName}]. Rental rate contracted at ₹${d.rentRate}/day per unit.`,
        type: 'success'
      });

      // Return Log entry
      if (d.quantityReturned > 0) {
        timeline.push({
          time: new Date(d.returnTime || new Date()),
          text: `LOGISTICS RETURN: Received ${d.quantityReturned} units of ${toolName} (${d.size}) from [${siteName}]. Checked back in inventory successfully.`,
          type: 'warning'
        });
      }

      // Damage & repairs log entry
      if (d.damagesCount > 0) {
        timeline.push({
          time: new Date(d.returnTime || new Date()),
          text: `INVENTORY ALERT: Recorded ${d.damagesCount} units damaged from ${toolName} (${d.size}) at [${siteName}]. Total maintenance repair bill invoiced: ₹${d.repairCost}.`,
          type: 'error'
        });
      }
    });

    // Sort timeline chronologically descending (newest at bottom of scroll, or latest logs shown)
    timeline.sort((a, b) => a.time - b.time);

    DOM.terminalBody.innerHTML = '';
    
    // Print lines
    timeline.forEach(log => {
      const line = document.createElement('div');
      line.className = 'terminal-line';
      
      const timeStr = log.time.toLocaleTimeString('en-US', { hour12: false });
      
      line.innerHTML = `
        <span class="terminal-prompt">$ [${timeStr}]</span>
        <span class="terminal-output ${log.type}">${log.text}</span>
      `;
      DOM.terminalBody.appendChild(line);
    });

    // Auto-scroll terminal to bottom
    DOM.terminalBody.scrollTop = DOM.terminalBody.scrollHeight;
  };

  DOM.dispatchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const toolId = DOM.dispatchToolSelect.value;
    let size = DOM.dispatchSizeSelect.value;
    if (size === 'Custom Size (Self Write)') {
      size = DOM.dispatchCustomSizeInput.value.trim() || 'Custom Size';
    }
    const quantity = parseInt(DOM.dispatchQtyInput.value);
    const rentRate = parseFloat(DOM.dispatchRentInput.value) || 0;

    window.db.dispatchTool(state.activeSiteId, toolId, size, quantity, rentRate);
    DOM.dispatchForm.reset();
    if (DOM.dispatchCustomSizeGroup) {
      DOM.dispatchCustomSizeGroup.style.display = 'none';
      DOM.dispatchCustomSizeInput.removeAttribute('required');
    }
    handleCatalogItemChange();
    renderInventoryTracking();
    renderDashboard();
  });

  // ==========================================
  // 4. MACHINERY & FUEL SECTION
  // ==========================================
  const renderMachineryAndMaterials = () => {
    // 4A. Materials usage rendering
    const materials = window.db.getMaterialLogs(state.activeSiteId);
    DOM.materialsLogBody.innerHTML = '';

    if (materials.length === 0) {
      DOM.materialsLogBody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No materials volume logged yet.</td></tr>`;
    } else {
      materials.forEach(m => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${formatDate(m.timestamp)}</td>
          <td style="font-weight:600; color:var(--text-white);">${m.type}</td>
          <td style="font-weight:700;">${m.quantityUsed} units</td>
          <td>${formatCurrency(m.cost)}</td>
        `;
        DOM.materialsLogBody.appendChild(tr);
      });
    }

    // 4B. Machinery & Fuel logs timeline rendering
    const machLogs = window.db.getMachineryLogs(state.activeSiteId);
    DOM.machineryTimelineContainer.innerHTML = '';

    if (machLogs.length === 0) {
      DOM.machineryTimelineContainer.innerHTML = `<div style="text-align: center; padding: 40px 0; color: var(--text-muted);">No machinery operational or fuel logs recorded yet.</div>`;
    } else {
      // Sort newest logs first for visual timeline
      const sortedLogs = [...machLogs].sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp));
      
      sortedLogs.forEach(log => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        
        let iconSymbol = '⚙️';
        if (log.machineryType === 'Tractor') iconSymbol = '🚜';
        else if (log.machineryType === 'Concrete Mixer') iconSymbol = '⚙️';
        else if (log.machineryType === 'Tanker') iconSymbol = '🚒';
        else iconSymbol = '🛠️'; // Accessories/Custom name

        const totalLogCost = log.fuelCost + log.runningCost;

        const descHtml = log.description 
          ? `<div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed var(--border-glass); color: var(--text-secondary); font-size: 0.85rem;">
               <strong style="color:var(--primary);">Description:</strong> ${log.description}
             </div>`
          : '';

        div.innerHTML = `
          <div class="timeline-icon">${iconSymbol}</div>
          <div class="timeline-content">
            <div class="timeline-title-row">
              <div class="timeline-title">${log.machineryType} Fleet Unit</div>
              <div class="timeline-time">${formatDate(log.timestamp)}</div>
            </div>
            <div class="timeline-details">
              <span>Fuel Consumed: <strong>${log.fuelLiters}L (${formatCurrency(log.fuelCost)})</strong></span>
              <span>Running Time: <strong>${log.runningHours} hrs (${formatCurrency(log.runningCost)})</strong></span>
              <span style="text-align:right; font-weight:700; color: var(--primary);">Total Expense: ${formatCurrency(totalLogCost)}</span>
            </div>
            ${descHtml}
          </div>
        `;
        DOM.machineryTimelineContainer.appendChild(div);
      });
    }
  };

  DOM.materialForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = DOM.materialTypeSelect.value;
    const qty = parseFloat(DOM.materialQtyInput.value);
    const cost = parseFloat(DOM.materialCostInput.value);
    const dateVal = DOM.materialDateInput ? DOM.materialDateInput.value : '';

    window.db.addMaterialLog(state.activeSiteId, type, qty, cost, dateVal);
    DOM.materialForm.reset();
    if (DOM.materialDateInput) {
      DOM.materialDateInput.value = state.attendanceDate;
    }
    renderMachineryAndMaterials();
    renderDashboard();
  });

  DOM.machineryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let type = DOM.machineryTypeSelect.value;
    if (type === 'Accessories') {
      type = DOM.machCustomName.value.trim() || 'Accessory';
    }
    const liters = parseFloat(DOM.machineryFuelInput.value);
    const fuelCost = parseFloat(DOM.machineryFuelCostInput.value);
    const hours = parseFloat(DOM.machineryHoursInput.value);
    const runCost = parseFloat(DOM.machineryRunningCostInput.value);
    const desc = DOM.machineryDescInput ? DOM.machineryDescInput.value.trim() : '';

    window.db.addMachineryLog(state.activeSiteId, type, liters, fuelCost, hours, runCost, desc);
    DOM.machineryForm.reset();
    if (DOM.machCustomGroup) {
      DOM.machCustomGroup.style.display = 'none';
      DOM.machCustomName.removeAttribute('required');
    }
    renderMachineryAndMaterials();
    renderDashboard();
  });

  // ==========================================
  // 5. SITE COMPARISON ENGINE
  // ==========================================
  const renderSiteComparison = () => {
    const siteAId = DOM.compareSiteA.value;
    const siteBId = DOM.compareSiteB.value;

    if (!siteAId || !siteBId) return;

    renderComparisonPanel(siteAId, DOM.comparePanelA, siteBId);
    renderComparisonPanel(siteBId, DOM.comparePanelB, siteAId);
  };

  const renderComparisonPanel = (siteId, targetPanel, otherSiteId) => {
    const site = window.db.getSiteById(siteId);
    const fin = window.db.getSiteFinancials(siteId);
    const otherFin = window.db.getSiteFinancials(otherSiteId);

    if (!site || !fin) {
      targetPanel.innerHTML = '<div style="color:var(--text-muted);">Select site data to load.</div>';
      return;
    }

    // Determine winner metrics for highlights
    const isBudgetHigher = otherFin ? (site.budget > otherFin.budget) : false;
    const isInvestmentLower = otherFin ? (fin.overallInvestment < otherFin.overallInvestment) : false;
    const isProfitHigher = otherFin ? (fin.profit > otherFin.profit) : false;
    
    // Count active items sent
    const activeItems = window.db.getDeployments(siteId).reduce((acc, curr) => acc + (curr.quantitySent - curr.quantityReturned), 0);
    const damagedItems = window.db.getDeployments(siteId).reduce((acc, curr) => acc + curr.damagesCount, 0);

    targetPanel.innerHTML = `
      <div class="comparison-site-header">
        <h2 style="font-size: 1.3rem; color: var(--text-white); font-weight: 800;">${site.name}</h2>
        <span class="badge info" style="width:fit-content;">Type: ${site.projectType}</span>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">${site.location}</div>
      </div>

      <div class="comparison-stat-row">
        <span class="comparison-stat-label">Commencement Date</span>
        <span class="comparison-stat-val">${formatDate(site.startDate)}</span>
      </div>
      <div class="comparison-stat-row">
        <span class="comparison-stat-label">Project Target Duration</span>
        <span class="comparison-stat-val">${site.durationDays} Days Limit</span>
      </div>
      <div class="comparison-stat-row">
        <span class="comparison-stat-label">Contract Value Budget</span>
        <span class="comparison-stat-val" style="color: ${isBudgetHigher ? 'var(--accent-cyan)' : 'var(--text-white)'};">
          ${formatCurrency(site.budget)} ${isBudgetHigher ? '★' : ''}
        </span>
      </div>
      <div class="comparison-stat-row">
        <span class="comparison-stat-label">Overall Investments</span>
        <span class="comparison-stat-val" style="color: ${isInvestmentLower ? 'var(--accent-cyan)' : 'var(--text-white)'}; font-weight: 800;">
          ${formatCurrency(fin.overallInvestment)} ${isInvestmentLower ? '★' : ''}
        </span>
      </div>
      <div class="comparison-stat-row">
        <span class="comparison-stat-label">Labor payroll Cost</span>
        <span class="comparison-stat-val">${formatCurrency(fin.laborCost)}</span>
      </div>
      <div class="comparison-stat-row">
        <span class="comparison-stat-label">Materials Direct Cost</span>
        <span class="comparison-stat-val">${formatCurrency(fin.materialCost)}</span>
      </div>
      <div class="comparison-stat-row">
        <span class="comparison-stat-label">Machinery Fuel Outlay</span>
        <span class="comparison-stat-val">${formatCurrency(fin.fuelCost)}</span>
      </div>
      <div class="comparison-stat-row">
        <span class="comparison-stat-label">Tools & Scaffold Rent</span>
        <span class="comparison-stat-val">${formatCurrency(fin.rentCost)}</span>
      </div>
      <div class="comparison-stat-row">
        <span class="comparison-stat-label">Active Equipment Deployed</span>
        <span class="comparison-stat-val">${activeItems} units</span>
      </div>
      <div class="comparison-stat-row">
        <span class="comparison-stat-label">Broken/Damaged items count</span>
        <span class="comparison-stat-val" style="color: var(--accent-pink);">${damagedItems} damaged</span>
      </div>
      <div class="comparison-stat-row" style="border-bottom:none; margin-top:20px; background: rgba(0,0,0,0.2); padding: 12px; border-radius: var(--radius-sm);">
        <span class="comparison-stat-label" style="font-weight: 700; color: var(--text-white);">Net Project Margin</span>
        <span class="comparison-stat-val ${fin.profit > 0 ? 'profit' : 'loss'}" style="font-size: 1.15rem; font-weight: 800;">
          ${fin.profit > 0 ? '+' + formatCurrency(fin.profit) : '-' + formatCurrency(fin.loss)}
          ${isProfitHigher ? '👑' : ''}
        </span>
      </div>
    `;
  };

  DOM.compareSiteA.addEventListener('change', renderSiteComparison);
  DOM.compareSiteB.addEventListener('change', renderSiteComparison);

  // ==========================================
  // MODALS DIALOGS ACTIONS
  // ==========================================
  
  // Close Modals
  const closeModal = () => {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.classList.remove('active');
    });
  };

  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });
  });

  // Open: Add Site
  DOM.btnCreateSite.addEventListener('click', () => {
    DOM.modalCreateSite.classList.add('active');
    DOM.newSiteName.focus();
  });

  // Form Submit: Create Site
  DOM.formCreateSite.addEventListener('submit', (e) => {
    e.preventDefault();
    const siteData = {
      name: document.getElementById('new-site-name').value,
      location: document.getElementById('new-site-location').value,
      startDate: document.getElementById('new-site-date').value,
      projectType: document.getElementById('new-site-type').value,
      budget: document.getElementById('new-site-budget').value,
      durationDays: document.getElementById('new-site-duration').value
    };

    const newSite = window.db.addSite(siteData);
    state.activeSiteId = newSite.id;
    
    closeModal();
    DOM.formCreateSite.reset();
    populateSitesDropdowns();
  });

  // Open: Add Laborer
  DOM.btnRegisterWorker.addEventListener('click', () => {
    DOM.modalCreateLaborer.classList.add('active');
    document.getElementById('new-labor-name').focus();
  });

  // Form Submit: Create Laborer
  DOM.formCreateLaborer.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('new-labor-name').value;
    const rate = parseFloat(document.getElementById('new-labor-wage').value);

    window.db.addLaborer(name, rate);
    
    closeModal();
    DOM.formCreateLaborer.reset();
    renderLaborAndWages();
  });

  // Open: Add Catalog Item
  DOM.btnCreateCatalogItem.addEventListener('click', () => {
    DOM.modalCreateCatalog.classList.add('active');
    document.getElementById('new-catalog-name').focus();
  });

  // Form Submit: Create Catalog
  DOM.formCreateCatalog.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('new-catalog-name').value;
    const category = document.getElementById('new-catalog-cat').value;
    const sizes = document.getElementById('new-catalog-sizes').value;

    window.db.addCatalogItem(name, category, sizes);

    closeModal();
    DOM.formCreateCatalog.reset();
    populateInventoryDropdowns();
  });

  // Open Return Tool modal
  const openReturnModal = (depId) => {
    const dep = window.db.getAllDeployments().find(d => d.id === depId);
    const catalog = window.db.getInventoryCatalog();
    if (!dep) return;

    const item = catalog.find(i => i.id === dep.toolId);
    
    document.getElementById('return-dep-id').value = depId;
    document.getElementById('return-tool-title').textContent = `Returning: ${item ? item.name : 'Tool'} (${dep.size})`;
    
    const maxRet = dep.quantitySent - dep.quantityReturned;
    document.getElementById('return-tool-limits').textContent = `* Active dispatched items remaining: ${maxRet} units`;
    DOM.returnQtyInput.max = maxRet;
    DOM.returnQtyInput.value = maxRet;

    DOM.modalReturnTool.classList.add('active');
  };

  DOM.formReturnTool.addEventListener('submit', (e) => {
    e.preventDefault();
    const depId = document.getElementById('return-dep-id').value;
    const qty = parseInt(document.getElementById('return-qty-input').value);

    window.db.returnTool(depId, qty);
    
    closeModal();
    renderInventoryTracking();
    renderDashboard();
  });

  // Open Damage & Repairs modal
  const openDamageModal = (depId) => {
    const dep = window.db.getAllDeployments().find(d => d.id === depId);
    const catalog = window.db.getInventoryCatalog();
    if (!dep) return;

    const item = catalog.find(i => i.id === dep.toolId);
    
    document.getElementById('damage-dep-id').value = depId;
    document.getElementById('damage-tool-title').textContent = `Log maintenance details for: ${item ? item.name : 'Tool'} (${dep.size})`;
    
    DOM.modalDamageRepair.classList.add('active');
  };

  DOM.formDamageRepair.addEventListener('submit', (e) => {
    e.preventDefault();
    const depId = document.getElementById('damage-dep-id').value;
    const damages = parseInt(document.getElementById('damage-qty-input').value);
    const cost = parseFloat(document.getElementById('repair-cost-input').value);

    window.db.logDamageAndRepair(depId, damages, cost);
    
    closeModal();
    DOM.formDamageRepair.reset();
    renderInventoryTracking();
    renderDashboard();
  });

  // Setup generic listeners
  const setupEventListeners = () => {
    // Dynamic binding helpers for quick modal selectors
    DOM.newSiteName = document.getElementById('new-site-name');

    // Machinery custom field toggling
    if (DOM.machineryTypeSelect) {
      DOM.machineryTypeSelect.addEventListener('change', (e) => {
        if (e.target.value === 'Accessories') {
          DOM.machCustomGroup.style.display = 'block';
          DOM.machCustomName.setAttribute('required', 'true');
          DOM.machCustomName.focus();
        } else {
          DOM.machCustomGroup.style.display = 'none';
          DOM.machCustomName.removeAttribute('required');
        }
      });
    }
  };

  // Launch App!
  initApp();
});
