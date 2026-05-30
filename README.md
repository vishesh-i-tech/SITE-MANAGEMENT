# INDORKAR Construction Site & Logistics Management System

A premium, state-of-the-art Single Page Application (SPA) designed to solve core operational complexities in construction logistics. Built with an elegant **Obsidian Dark & Industrial Amber** aesthetic, this tool delivers comprehensive, high-fidelity tracking of multi-site projects, equipment dispatches, labor payrolls, machinery fuel logs, and side-by-side financial analytical comparisons.

---

## ⚡ Operational Feature Set

### 1. Site Metadata & Specifications Hub
- **Precise Metadata**: Track site locations, commencement dates, project types (Dams, Roads, Bridges, Drains), and overall contract budgets.
- **Duration Elapsed Tracker**: Monitors elapsed project days against targets.
- **Financial Allocation Indicators**: Dynamically calculates aggregated outlays (Payroll, Equipment Rent, Repairs, Material acquisitions, Fuel operations) and reveals immediate Project Net Profit or Loss.

### 2. Labor & Wage Payroll Ledger
- **Daily Attendance Sheet**: An interactive check-in console to log crew logs (`Present`, `Half Day`, or `Absent`) with headcount aggregations.
- **Comprehensive Payments Ledger**: Log disbursements, advances, and track outstanding balances due.

### 3. Tools & Equipment Inventory Tracker
- **Smart Catalog**: Pre-populated with centering plates, steel scaffolding, cranes, and hand tools (screwdrivers, hammers, axes) with size parameters (e.g. `3x2 feet`, `10 feet`, `heavy duty`).
- **Dispatch & Return Ledger**: Records precise logistics timestamps of dispatches and check-ins, remaining active counts, and accrues rental charges.
- **Broken Item Logs & Maintenance Billing**: Keeps a dedicated invoice log of damaged items per site, mapping out repair costs.
- **Live Logistics Terminal console**: A retro-style monospace event log displaying chronological streams of dispatches, returns, and damages.

### 4. Machinery & Material volume Logger
- **Volume Log**: Track volume and purchase costs for cement bags, sand, gravel, and steel bars.
- **Machinery Operational Timelines**: Logs runtime hours, fuel volume consumption (Liters), running costs, and fuel costs for Concrete Mixers and Tractors.

### 5. Multi-Site Comparison Engine
- A beautiful comparison screen to pick any two sites (A vs B) and do a side-by-side comparison of budget values, overall investments, labor expenses, rent fees, machine operation counts, and net margin outcomes.

### 6. Authentication Gateway
- Multi-user authentication portal using a phone number or email ID.
- Seamlessly switches to Master or Supervisor administrative layouts.

---

## 🏗️ Architecture & Stack

To guarantee absolute speed, high fidelity, and zero dependencies or compile steps on your machine, this app is built using a modern web architecture:
1. **Structure (`index.html`)**: Semantic HTML5 markup configured as a Single-Page Application (SPA) with responsive viewport configurations.
2. **Visual Styling (`style.css`)**: Premium Dark Theme utilizing dynamic CSS Custom Properties (variables), CSS Grid, and custom animations.
3. **Data Model (`database.js`)**: A local-storage database engine seeded with mock projects, laborers, and inventories.
4. **Controller (`app.js`)**: Coordinates user inputs, page navigation states, data rendering, checkbox controls, and calculations.

---

## 🚀 Getting Started

Since the application requires no compilers or npm modules, you can launch it immediately:

1. Double-click on `index.html` to open it in any modern web browser (Chrome, Edge, Firefox, Safari).
2. Enter the demonstration credentials on the splash screen:
   - **Master Account Email**: `admin@site.com` (Password: `password`)
   - **Master Account Phone**: `9876543210` (Password: `password`)
3. Explore the pre-seeded sites ("Ganges River Diversion Dam", "NH-44 Highway Overpass") and modify records to see real-time localStorage persistence.
