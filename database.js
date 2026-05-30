/**
 * Construction Site Management System - LocalStorage Database Layer
 */

const DB_KEY = 'construction_site_mgmt_db_v1';

// Seed data for immediate visual fidelity
const DEFAULT_SEED_DATA = {
  users: [
    { emailOrPhone: 'admin@site.com', password: 'password', role: 'Master', name: 'Vishu (Admin)' },
    { emailOrPhone: '9876543210', password: 'password', role: 'Master', name: 'Master Supervisor' },
    { emailOrPhone: 'supervisor@site.com', password: 'password', role: 'Supervisor', name: 'Ramesh Kumar' }
  ],
  sites: [
    {
      id: 'site-ganges-dam',
      name: 'Ganges River Diversion Dam',
      location: 'Haridwar Sector 4, Uttarakhand',
      startDate: '2026-01-10',
      budget: 8500000,
      projectType: 'Dam',
      durationDays: 180,
      status: 'Ongoing'
    },
    {
      id: 'site-nh44-bridge',
      name: 'NH-44 Highway Overpass',
      location: 'Outer Ring Road, Bengaluru',
      startDate: '2026-03-01',
      budget: 4200000,
      projectType: 'Bridge',
      durationDays: 120,
      status: 'Ongoing'
    },
    {
      id: 'site-smart-drainage',
      name: 'City Smart Drainage Phase 2',
      location: 'Indiranagar Main, Bengaluru',
      startDate: '2025-11-15',
      budget: 1500000,
      projectType: 'Drain',
      durationDays: 90,
      status: 'Completed'
    },
    {
      id: 'site-greenfield-road',
      name: 'Greenfield Industrial Expressway',
      location: 'Pune-Chakan Link, Maharashtra',
      startDate: '2026-05-15',
      budget: 6500000,
      projectType: 'Road',
      durationDays: 200,
      status: 'Ongoing'
    }
  ],
  laborers: [
    { id: 'lab-1', name: 'Rajesh Sharma', dailyRate: 650 },
    { id: 'lab-2', name: 'Amit Verma', dailyRate: 600 },
    { id: 'lab-3', name: 'Sanjay Yadav', dailyRate: 550 },
    { id: 'lab-4', name: 'Sunita Devi', dailyRate: 500 },
    { id: 'lab-5', name: 'Manoj Paswan', dailyRate: 600 },
    { id: 'lab-6', name: 'Pooja Singh', dailyRate: 500 },
    { id: 'lab-7', name: 'Vijay Rathore', dailyRate: 700 },
    { id: 'lab-8', name: 'Deepak Patel', dailyRate: 650 }
  ],
  attendance: [
    // Ganges Dam Attendance Logs
    {
      id: 'att-1',
      siteId: 'site-ganges-dam',
      date: '2026-05-28',
      records: { 'lab-1': 'Present', 'lab-2': 'Present', 'lab-3': 'Half-Day', 'lab-4': 'Present', 'lab-5': 'Absent' }
    },
    {
      id: 'att-2',
      siteId: 'site-ganges-dam',
      date: '2026-05-29',
      records: { 'lab-1': 'Present', 'lab-2': 'Present', 'lab-3': 'Present', 'lab-4': 'Present', 'lab-5': 'Present' }
    },
    {
      id: 'att-3',
      siteId: 'site-ganges-dam',
      date: '2026-05-30',
      records: { 'lab-1': 'Present', 'lab-2': 'Present', 'lab-3': 'Present', 'lab-4': 'Half-Day', 'lab-5': 'Present' }
    },
    // NH-44 Overpass Attendance Logs
    {
      id: 'att-4',
      siteId: 'site-nh44-bridge',
      date: '2026-05-29',
      records: { 'lab-6': 'Present', 'lab-7': 'Present', 'lab-8': 'Present', 'lab-2': 'Present' }
    },
    {
      id: 'att-5',
      siteId: 'site-nh44-bridge',
      date: '2026-05-30',
      records: { 'lab-6': 'Present', 'lab-7': 'Present', 'lab-8': 'Absent', 'lab-2': 'Present' }
    }
  ],
  laborPayments: [
    // Wages logged, advances paid, outstanding balances calculated
    { id: 'pay-1', siteId: 'site-ganges-dam', laborerId: 'lab-1', date: '2026-05-20', amount: 3900, type: 'Wage Settlement', advance: 0, outstanding: 0 },
    { id: 'pay-2', siteId: 'site-ganges-dam', laborerId: 'lab-2', date: '2026-05-22', amount: 1500, type: 'Advance Payment', advance: 1500, outstanding: 1200 },
    { id: 'pay-3', siteId: 'site-ganges-dam', laborerId: 'lab-3', date: '2026-05-25', amount: 2000, type: 'Wage Settlement', advance: 500, outstanding: 300 },
    { id: 'pay-4', siteId: 'site-nh44-bridge', laborerId: 'lab-7', date: '2026-05-28', amount: 3500, type: 'Wage Settlement', advance: 1000, outstanding: 0 }
  ],
  inventoryCatalog: [
    { id: 'tool-scaffolding', name: 'Steel Scaffolding', category: 'Catering & Scaffolding', sizes: ['6 feet', '10 feet', '15 feet'] },
    { id: 'tool-centering', name: 'Metal Centering Plate', category: 'Centering Plates', sizes: ['3x2 feet', '4x3 feet', '5x3 feet'] },
    { id: 'tool-crane', name: 'Tower Crane Element', category: 'Tower Cranes', sizes: ['Jib Section 10m', 'Mast Section 3m'] },
    { id: 'tool-hammer', name: 'Sledge Hammer', category: 'Hand Tools', sizes: ['5 kg', '10 kg'] },
    { id: 'tool-screwdriver', name: 'Industrial Screwdriver Set', category: 'Hand Tools', sizes: ['Standard Kit'] },
    { id: 'tool-axe', name: 'Wood Cutting Axe', category: 'Hand Tools', sizes: ['Heavy Duty'] }
  ],
  inventoryDeployments: [
    {
      id: 'dep-1',
      siteId: 'site-ganges-dam',
      toolId: 'tool-centering',
      size: '3x2 feet',
      quantitySent: 150,
      quantityReturned: 120,
      dispatchTime: '2026-05-10T08:30:00',
      returnTime: '2026-05-25T17:00:00',
      rentRate: 5, // ₹5 per plate per day
      damagesCount: 4,
      repairCost: 800
    },
    {
      id: 'dep-2',
      siteId: 'site-ganges-dam',
      toolId: 'tool-scaffolding',
      size: '10 feet',
      quantitySent: 80,
      quantityReturned: 0, // Still deployed
      dispatchTime: '2026-05-12T09:15:00',
      returnTime: null,
      rentRate: 15, // ₹15 per frame per day
      damagesCount: 0,
      repairCost: 0
    },
    {
      id: 'dep-3',
      siteId: 'site-nh44-bridge',
      toolId: 'tool-centering',
      size: '4x3 feet',
      quantitySent: 200,
      quantityReturned: 180,
      dispatchTime: '2026-05-14T07:45:00',
      returnTime: '2026-05-29T16:30:00',
      rentRate: 8,
      damagesCount: 8,
      repairCost: 2000
    },
    {
      id: 'dep-4',
      siteId: 'site-nh44-bridge',
      toolId: 'tool-crane',
      size: 'Mast Section 3m',
      quantitySent: 12,
      quantityReturned: 12,
      dispatchTime: '2026-05-01T10:00:00',
      returnTime: '2026-05-28T18:00:00',
      rentRate: 120,
      damagesCount: 1,
      repairCost: 4500
    },
    {
      id: 'dep-5',
      siteId: 'site-ganges-dam',
      toolId: 'tool-hammer',
      size: '10 kg',
      quantitySent: 15,
      quantityReturned: 15,
      dispatchTime: '2026-05-18T08:00:00',
      returnTime: '2026-05-30T17:30:00',
      rentRate: 2,
      damagesCount: 2,
      repairCost: 350
    }
  ],
  materials: [
    { id: 'mat-1', siteId: 'site-ganges-dam', type: 'Cement (bags)', quantityUsed: 500, cost: 215000, timestamp: '2026-05-25T11:00:00' },
    { id: 'mat-2', siteId: 'site-ganges-dam', type: 'Sand (brass)', quantityUsed: 40, cost: 160000, timestamp: '2026-05-26T14:30:00' },
    { id: 'mat-3', siteId: 'site-ganges-dam', type: 'Steel (tons)', quantityUsed: 12, cost: 720000, timestamp: '2026-05-28T09:00:00' },
    { id: 'mat-4', siteId: 'site-nh44-bridge', type: 'Cement (bags)', quantityUsed: 350, cost: 150500, timestamp: '2026-05-27T10:15:00' },
    { id: 'mat-5', siteId: 'site-nh44-bridge', type: 'Gravel (brass)', quantityUsed: 30, cost: 135000, timestamp: '2026-05-28T15:00:00' }
  ],
  machineryLogs: [
    {
      id: 'mach-1',
      siteId: 'site-ganges-dam',
      machineryType: 'Concrete Mixer',
      fuelLiters: 45,
      fuelCost: 4500,
      runningHours: 12,
      runningCost: 3600,
      timestamp: '2026-05-28T18:00:00'
    },
    {
      id: 'mach-2',
      siteId: 'site-ganges-dam',
      runningHours: 16,
      machineryType: 'Tractor',
      fuelLiters: 90,
      fuelCost: 9000,
      runningCost: 6400,
      timestamp: '2026-05-29T17:30:00'
    },
    {
      id: 'mach-3',
      siteId: 'site-nh44-bridge',
      machineryType: 'Concrete Mixer',
      fuelLiters: 35,
      fuelCost: 3500,
      runningHours: 8,
      runningCost: 2400,
      timestamp: '2026-05-29T18:00:00'
    }
  ]
};

class ConstructionDatabase {
  constructor() {
    this.data = null;
    this.init();
  }

  init() {
    try {
      const stored = localStorage.getItem(DB_KEY);
      if (stored) {
        this.data = JSON.parse(stored);
        // Ensure any new categories or schema features are retrofitted
        this.retrofit();
      } else {
        this.data = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
        this.save();
      }
    } catch (e) {
      console.error("Failed to initialize database, using memory-fallback.", e);
      this.data = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
    }
  }

  retrofit() {
    // Schema retrofitting if we expand arrays in future updates
    const keys = Object.keys(DEFAULT_SEED_DATA);
    let changed = false;
    keys.forEach(key => {
      if (!this.data[key]) {
        this.data[key] = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA[key]));
        changed = true;
      }
    });
    if (changed) this.save();
  }

  save() {
    try {
      localStorage.setItem(DB_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("LocalStorage write failed", e);
    }
  }

  // --- Auth API ---
  authenticate(emailOrPhone, password) {
    const user = this.data.users.find(u => 
      (u.emailOrPhone.toLowerCase() === emailOrPhone.toLowerCase().trim()) && 
      u.password === password
    );
    return user ? { emailOrPhone: user.emailOrPhone, name: user.name, role: user.role } : null;
  }

  // --- Sites API ---
  getSites() {
    return this.data.sites;
  }

  getSiteById(id) {
    return this.data.sites.find(s => s.id === id);
  }

  addSite(siteData) {
    const newSite = {
      id: 'site-' + Date.now(),
      name: siteData.name,
      location: siteData.location,
      startDate: siteData.startDate,
      budget: parseFloat(siteData.budget) || 0,
      projectType: siteData.projectType, // Dam, Road, Bridge, Drain
      durationDays: parseInt(siteData.durationDays) || 0,
      status: 'Ongoing'
    };
    this.data.sites.push(newSite);
    this.save();
    return newSite;
  }

  // --- Laborers & Attendance API ---
  getLaborers() {
    return this.data.laborers;
  }

  addLaborer(name, dailyRate) {
    const newLaborer = {
      id: 'lab-' + Date.now(),
      name,
      dailyRate: parseFloat(dailyRate) || 0
    };
    this.data.laborers.push(newLaborer);
    this.save();
    return newLaborer;
  }

  getAttendanceLogs(siteId) {
    return this.data.attendance.filter(a => a.siteId === siteId);
  }

  logAttendance(siteId, date, records) {
    // records is an object: { laborerId: 'Present'|'Absent'|'Half-Day' }
    let log = this.data.attendance.find(a => a.siteId === siteId && a.date === date);
    if (log) {
      log.records = { ...log.records, ...records };
    } else {
      log = {
        id: 'att-' + Date.now(),
        siteId,
        date,
        records
      };
      this.data.attendance.push(log);
    }
    this.save();
    return log;
  }

  // --- Payroll API ---
  getPayments(siteId) {
    return this.data.laborPayments.filter(p => p.siteId === siteId);
  }

  addPayment(siteId, laborerId, amount, type, advance, outstanding) {
    const newPay = {
      id: 'pay-' + Date.now(),
      siteId,
      laborerId,
      date: new Date().toISOString().split('T')[0],
      amount: parseFloat(amount) || 0,
      type, // 'Wage Settlement' or 'Advance Payment'
      advance: parseFloat(advance) || 0,
      outstanding: parseFloat(outstanding) || 0
    };
    this.data.laborPayments.push(newPay);
    this.save();
    return newPay;
  }

  // --- Tools & Equipment API ---
  getInventoryCatalog() {
    return this.data.inventoryCatalog;
  }

  addCatalogItem(name, category, sizes) {
    const item = {
      id: 'tool-' + Date.now(),
      name,
      category,
      sizes: sizes ? sizes.split(',').map(s => s.trim()) : ['Standard']
    };
    this.data.inventoryCatalog.push(item);
    this.save();
    return item;
  }

  getDeployments(siteId) {
    return this.data.inventoryDeployments.filter(d => d.siteId === siteId);
  }

  getAllDeployments() {
    return this.data.inventoryDeployments;
  }

  dispatchTool(siteId, toolId, size, quantitySent, rentRate) {
    const dispatch = {
      id: 'dep-' + Date.now(),
      siteId,
      toolId,
      size,
      quantitySent: parseInt(quantitySent) || 0,
      quantityReturned: 0,
      dispatchTime: new Date().toISOString().slice(0, 19),
      returnTime: null,
      rentRate: parseFloat(rentRate) || 0,
      damagesCount: 0,
      repairCost: 0
    };
    this.data.inventoryDeployments.push(dispatch);
    this.save();
    return dispatch;
  }

  returnTool(deploymentId, quantityToReturn, returnTime = null) {
    const dep = this.data.inventoryDeployments.find(d => d.id === deploymentId);
    if (!dep) return null;

    const limit = dep.quantitySent - dep.quantityReturned;
    const returning = Math.min(parseInt(quantityToReturn) || 0, limit);
    dep.quantityReturned += returning;

    if (dep.quantityReturned >= dep.quantitySent) {
      dep.returnTime = returnTime || new Date().toISOString().slice(0, 19);
    }
    this.save();
    return dep;
  }

  logDamageAndRepair(deploymentId, damagesCount, repairCost) {
    const dep = this.data.inventoryDeployments.find(d => d.id === deploymentId);
    if (!dep) return null;

    dep.damagesCount += parseInt(damagesCount) || 0;
    dep.repairCost += parseFloat(repairCost) || 0;
    this.save();
    return dep;
  }

  // --- Materials API ---
  getMaterialLogs(siteId) {
    return this.data.materials.filter(m => m.siteId === siteId);
  }

  addMaterialLog(siteId, type, quantityUsed, cost, date) {
    const log = {
      id: 'mat-' + Date.now(),
      siteId,
      type,
      quantityUsed: parseFloat(quantityUsed) || 0,
      cost: parseFloat(cost) || 0,
      timestamp: date ? new Date(date).toISOString().slice(0, 19) : new Date().toISOString().slice(0, 19)
    };
    this.data.materials.push(log);
    this.save();
    return log;
  }

  // --- Machinery & Fuel API ---
  getMachineryLogs(siteId) {
    return this.data.machineryLogs.filter(m => m.siteId === siteId);
  }

  addMachineryLog(siteId, machineryType, fuelLiters, fuelCost, runningHours, runningCost, description) {
    const log = {
      id: 'mach-' + Date.now(),
      siteId,
      machineryType, // 'Tractor', 'Concrete Mixer', 'Tanker', etc.
      fuelLiters: parseFloat(fuelLiters) || 0,
      fuelCost: parseFloat(fuelCost) || 0,
      runningHours: parseFloat(runningHours) || 0,
      runningCost: parseFloat(runningCost) || 0,
      description: description || '',
      timestamp: new Date().toISOString().slice(0, 19)
    };
    this.data.machineryLogs.push(log);
    this.save();
    return log;
  }

  // --- Financial Overview Calculator per Site ---
  getSiteFinancials(siteId) {
    const site = this.getSiteById(siteId);
    if (!site) return null;

    // Calculate labor wages earned (outstanding and paid)
    // To estimate wages, let's look at attendance records
    let totalLaborCost = 0;
    const attendanceLogs = this.getAttendanceLogs(siteId);
    const laborers = this.getLaborers();

    attendanceLogs.forEach(log => {
      Object.entries(log.records).forEach(([labId, status]) => {
        const lab = laborers.find(l => l.id === labId);
        if (lab) {
          if (status === 'Present') {
            totalLaborCost += lab.dailyRate;
          } else if (status === 'Half-Day') {
            totalLaborCost += (lab.dailyRate / 2);
          }
        }
      });
    });

    // Add manual wages logged via payments just in case they represent off-books settlements
    const payments = this.getPayments(siteId);
    let wagesSettled = 0;
    let advancesPaid = 0;
    payments.forEach(p => {
      wagesSettled += p.amount;
      advancesPaid += p.advance;
    });

    // Equipment Rent, Repairs, Damages
    const deployments = this.getDeployments(siteId);
    let totalRentCost = 0;
    let totalRepairCost = 0;

    deployments.forEach(d => {
      // Calculate active days
      const start = new Date(d.dispatchTime);
      const end = d.returnTime ? new Date(d.returnTime) : new Date();
      const diffTime = Math.abs(end - start);
      const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
      
      // Rent = active items * rate * days
      // For items returned, they rented up to return day. Simplified: rent based on sent quantity for active days
      totalRentCost += d.quantitySent * d.rentRate * diffDays;
      totalRepairCost += d.repairCost;
    });

    // Material cost
    const materials = this.getMaterialLogs(siteId);
    let totalMaterialCost = 0;
    materials.forEach(m => {
      totalMaterialCost += m.cost;
    });

    // Machinery & Fuel
    const machinery = this.getMachineryLogs(siteId);
    let totalFuelCost = 0;
    let totalMachineryRunningCost = 0;
    machinery.forEach(m => {
      totalFuelCost += m.fuelCost;
      totalMachineryRunningCost += m.runningCost;
    });

    // Overall investment = Labor Costs + Rent + Repairs + Materials + Fuel + Running costs
    const overallInvestment = totalLaborCost + totalRentCost + totalRepairCost + totalMaterialCost + totalFuelCost + totalMachineryRunningCost;
    
    // Profit & Loss calculation:
    // Profit = Budget - Overall Investment
    // Loss = Overall Investment > Budget ? (Investment - Budget) : 0
    let profit = 0;
    let loss = 0;
    if (site.budget > overallInvestment) {
      profit = site.budget - overallInvestment;
    } else {
      loss = overallInvestment - site.budget;
    }

    return {
      siteId,
      siteName: site.name,
      projectType: site.projectType,
      budget: site.budget,
      laborCost: totalLaborCost,
      wagesSettled,
      advancesPaid,
      rentCost: totalRentCost,
      repairCost: totalRepairCost,
      materialCost: totalMaterialCost,
      fuelCost: totalFuelCost,
      machineryRunningCost: totalMachineryRunningCost,
      overallInvestment,
      profit,
      loss
    };
  }

  // Clear data
  reset() {
    this.data = JSON.parse(JSON.stringify(DEFAULT_SEED_DATA));
    this.save();
  }
}

// Export database
window.db = new ConstructionDatabase();
