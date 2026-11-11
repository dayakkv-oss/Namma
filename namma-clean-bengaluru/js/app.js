/**
 * Namma Clean Bengaluru - Core Application Logic
 * Cyber-Bio Glassmorphism Theme, Floating Profile Drawer, Area Collection Schedules.
 */

let state = {
    user: CURRENT_USER,
    complaints: [...INITIAL_COMPLAINTS],
    areaTimetables: [...AREA_COLLECTION_TIMETABLES],
    hotspots: [...BANGALORE_HOTSPOTS],
    activeTab: 'tab-dashboard',
    map: null,
    markers: [],
    uploadedImage: null
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    renderSidebarComplaints();
    renderFullComplaints();
    renderMyRegisteredComplaints();
    renderAreaSchedules();
    renderHotspots();
    renderRewards();
    renderUserProfile();
    updatePointsDisplay();
    initMap();
});

/* ==========================================================================
   Tab Navigation System
   ========================================================================== */
function switchTab(tabId) {
    state.activeTab = tabId;

    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

    const activeNavBtn = document.querySelector(`.nav-btn[onclick="switchTab('${tabId}')"]`);
    if (activeNavBtn) activeNavBtn.classList.add('active');

    const targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.classList.add('active');

    if (tabId === 'tab-dashboard' && state.map) {
        setTimeout(() => state.map.invalidateSize(), 200);
    }
}

/* ==========================================================================
   Floating Profile Drawer Toggling
   ========================================================================== */
function toggleProfileDrawer() {
    const overlay = document.getElementById('profile-drawer-overlay');
    if (overlay) {
        overlay.classList.toggle('active');
        if (overlay.classList.contains('active')) {
            renderMyRegisteredComplaints();
            renderUserProfile();
        }
    }
}

function closeProfileDrawerOnOverlay(e) {
    if (e.target.id === 'profile-drawer-overlay') {
        toggleProfileDrawer();
    }
}

function renderUserProfile() {
    const u = state.user;

    const dInitials = document.getElementById('drawer-user-initials');
    const dName = document.getElementById('drawer-user-name');
    const dArea = document.getElementById('drawer-user-area');
    const dRoleBadge = document.getElementById('drawer-user-role-badge');
    const vInput = document.getElementById('volunteer-toggle-input');
    const vStatusText = document.getElementById('volunteer-status-text');

    if (dInitials) dInitials.textContent = getInitials(u.name);
    if (dName) dName.textContent = u.name;
    if (dArea) dArea.textContent = u.area;

    if (dRoleBadge) {
        if (u.isVolunteer) {
            dRoleBadge.innerHTML = `<span class="badge badge-cleaned" style="background: rgba(16,185,129,0.25); color: #34d399; border: 1px solid #10b981;"><i class="fa-solid fa-user-shield"></i> Area Volunteer Representative</span>`;
        } else {
            dRoleBadge.innerHTML = `<span class="badge badge-reported" style="background: rgba(255,255,255,0.1); color: white;">Standard Citizen Reporter</span>`;
        }
    }

    if (vInput) vInput.checked = u.isVolunteer;
    if (vStatusText) vStatusText.textContent = u.isVolunteer ? "🌟 Active Area Volunteer Representative (+20% Bonus Pts)" : "Standard Reporter";
}

function toggleVolunteerStatus(e) {
    state.user.isVolunteer = e.target.checked;
    renderUserProfile();

    if (state.user.isVolunteer) {
        showToast(`🎉 You are now an official Area Volunteer Representative for ${state.user.area}! +20% Points Boost active.`, 'success');
    } else {
        showToast(`You are now registered as a Standard Reporter. You can report dumps on the go!`, 'info');
    }
}

/* ==========================================================================
   Personal Registered Complaints inside Drawer
   ========================================================================== */
function renderMyRegisteredComplaints() {
    const container = document.getElementById('my-registered-complaints-list');
    const badge = document.getElementById('my-ticket-count-badge');
    if (!container) return;

    const myTickets = state.complaints.filter(c => c.isUserReport);

    if (badge) badge.textContent = `${myTickets.length} Ticket${myTickets.length === 1 ? '' : 's'}`;

    if (myTickets.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 0.85rem;">
                No registered complaints yet. Click "Report Garbage" to file a ticket!
            </div>
        `;
        return;
    }

    container.innerHTML = myTickets.map(item => `
        <div style="background: rgba(9,13,22,0.8); border: 1px solid var(--border-glass); border-radius: var(--radius-md); padding: 12px; font-size: 0.85rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                <span style="font-family: monospace; font-size: 0.75rem; color: var(--text-muted);">${item.id}</span>
                <span class="badge ${getBadgeClass(item.status)}" style="font-size: 0.725rem;">${item.status}</span>
            </div>
            <strong style="color: white; display: block; font-size: 0.9rem;">${item.locationName}</strong>
            <p style="color: var(--text-muted); font-size: 0.775rem;">${item.ward}</p>
            <div style="margin-top: 8px; display: flex; justify-content: space-between; align-items: center;">
                <span style="font-size: 0.75rem; color: #34d399;">+${item.cleanPointsEarned} Pts</span>
                <button class="btn-secondary" style="padding: 3px 10px; font-size: 0.75rem;" onclick="openDetailModal('${item.id}')">View Details</button>
            </div>
        </div>
    `).join('');
}

/* ==========================================================================
   Area Collection Timetables
   ========================================================================== */
function renderAreaSchedules(filterQuery = 'all') {
    const container = document.getElementById('area-schedule-container');
    if (!container) return;

    let items = state.areaTimetables;
    if (filterQuery !== 'all') {
        items = items.filter(t => t.areaName.toLowerCase().includes(filterQuery.toLowerCase()));
    }

    container.innerHTML = items.map(item => `
        <div class="area-schedule-card">
            <div class="area-header">
                <div>
                    <h3 class="area-name">${item.areaName}</h3>
                    <p style="font-size: 0.8rem; color: var(--text-muted);">${item.ward}</p>
                </div>
                <button class="btn-secondary" style="padding: 4px 10px; font-size: 0.75rem;" onclick="toggleAreaReminder('${item.areaName}')">
                    <i class="fa-solid fa-bell" style="color: #67e8f9;"></i> Alert
                </button>
            </div>

            <!-- Morning Shift -->
            <div class="shift-box">
                <div class="shift-title">
                    <span><i class="fa-solid fa-sun" style="color: #fbbf24;"></i> Morning Shift</span>
                    <span style="color: ${item.morningShift.statusColor}; font-weight: 700;">● ${item.morningShift.status}</span>
                </div>
                <div class="shift-time">${item.morningShift.time}</div>
                <p style="font-size: 0.8rem; color: white; margin-top: 4px;">${item.morningShift.type}</p>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px; display: flex; justify-content: space-between;">
                    <span>Truck: <strong>${item.morningShift.truckNo}</strong></span>
                    <span>Driver: ${item.morningShift.driver}</span>
                </div>
            </div>

            <!-- Afternoon Shift -->
            <div class="shift-box" style="margin-bottom: 0;">
                <div class="shift-title">
                    <span><i class="fa-solid fa-cloud-sun" style="color: #60a5fa;"></i> Afternoon Shift</span>
                    <span style="color: ${item.afternoonShift.statusColor}; font-weight: 700;">● ${item.afternoonShift.status}</span>
                </div>
                <div class="shift-time" style="color: #60a5fa;">${item.afternoonShift.time}</div>
                <p style="font-size: 0.8rem; color: white; margin-top: 4px;">${item.afternoonShift.type}</p>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 6px; display: flex; justify-content: space-between;">
                    <span>Truck: <strong>${item.afternoonShift.truckNo}</strong></span>
                    <span>Driver: ${item.afternoonShift.driver}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function filterAreaSchedules() {
    const val = document.getElementById('area-filter-select').value;
    renderAreaSchedules(val);
}

function toggleAreaReminder(area) {
    showToast(`🔔 Truck alert active for ${area}! You will receive SMS updates.`, 'success');
}

/* ==========================================================================
   Complaints & Steppers
   ========================================================================== */
function renderSidebarComplaints() {
    const container = document.getElementById('sidebar-complaints-list');
    if (!container) return;

    container.innerHTML = state.complaints.slice(0, 5).map(item => `
        <div class="area-schedule-card" style="padding: 12px; cursor: pointer;" onclick="openDetailModal('${item.id}')">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                <strong style="font-size: 0.9rem; color: white;">${item.locationName}</strong>
                <span class="badge ${getBadgeClass(item.status)}">${item.status}</span>
            </div>
            <p style="font-size: 0.775rem; color: var(--text-muted);">${item.ward}</p>
        </div>
    `).join('');
}

function renderFullComplaints() {
    const container = document.getElementById('full-complaints-list');
    if (!container) return;

    container.innerHTML = state.complaints.map(item => `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
                <div>
                    <span style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">${item.id}</span>
                    <h4 style="font-size: 1.1rem; font-weight: 700; margin-top: 2px;">${item.locationName}</h4>
                    <p style="font-size: 0.85rem; color: var(--text-muted);">${item.landmark} (${item.ward})</p>
                </div>
                <div style="text-align: right;">
                    <span class="badge ${getBadgeClass(item.status)}">${item.status}</span>
                    ${item.isEscalated ? '<div style="margin-top:4px;"><span class="badge badge-escalated">🚨 ESCALATED TO COMMISSIONER</span></div>' : ''}
                    ${item.isHotspot ? '<div style="margin-top:4px;"><span class="badge badge-hotspot">🔥 Garbage Hotspot</span></div>' : ''}
                </div>
            </div>

            <!-- Stepper Pipeline -->
            ${renderStepperHTML(item.status)}

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; background: rgba(9,13,22,0.6); padding: 12px 16px; border-radius: var(--radius-md); flex-wrap: wrap; gap: 10px;">
                <div style="font-size: 0.85rem;">
                    <strong>Assigned Crew:</strong> ${item.assignedCrew ? item.assignedCrew.name : 'Pending Assignment'}<br/>
                    <span style="color: var(--text-muted);">Supervisor: ${item.assignedCrew ? item.assignedCrew.supervisor : 'N/A'}</span>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn-secondary" style="padding: 6px 14px; font-size: 0.85rem;" onclick="openDetailModal('${item.id}')">
                        <i class="fa-solid fa-sliders"></i> ${item.afterImage ? 'View Before & After Proof' : 'View Tracking Details'}
                    </button>
                    ${!item.isEscalated && item.status !== 'Verified' ? `
                        <button class="btn-secondary" style="padding: 6px 14px; font-size: 0.85rem; border-color: rgba(239,68,68,0.4); color: #fca5a5;" onclick="openEscalateModal('${item.id}')">
                            <i class="fa-solid fa-triangle-exclamation"></i> Escalate Issue
                        </button>
                    ` : ''}
                    ${item.status !== 'Verified' ? `
                        <button class="btn-primary" style="padding: 6px 14px; font-size: 0.85rem;" onclick="advanceComplaintStatus('${item.id}')">
                            <i class="fa-solid fa-forward"></i> Demo Next Stage
                        </button>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

function renderStepperHTML(currentStatus) {
    const stages = ['Reported', 'Assigned', 'Cleaning in progress', 'Cleaned', 'Verified'];
    const icons = ['fa-flag', 'fa-user-check', 'fa-truck-pickup', 'fa-broom', 'fa-certificate'];
    const currentIndex = stages.indexOf(currentStatus);

    return `
        <div style="display: flex; justify-content: space-between; position: relative; margin: 20px 0;">
            ${stages.map((stage, idx) => {
                let colorStyle = 'color: var(--text-muted); background: rgba(9,13,22,0.8); border: 1px solid var(--border-glass);';
                if (idx < currentIndex) colorStyle = 'color: white; background: #10b981; border: 1px solid #10b981; box-shadow: var(--glow-emerald);';
                else if (idx === currentIndex) colorStyle = 'color: white; background: #f59e0b; border: 1px solid #f59e0b;';

                return `
                    <div style="display: flex; flex-direction: column; align-items: center; width: 18%; text-align: center; z-index: 1;">
                        <div style="width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; ${colorStyle}">
                            <i class="fa-solid ${icons[idx]}"></i>
                        </div>
                        <span style="font-size: 0.75rem; font-weight: 600; margin-top: 4px; color: ${idx <= currentIndex ? 'white' : 'var(--text-muted)'};">${stage}</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

/* ==========================================================================
   Detail Modal & Before/After Slider
   ========================================================================== */
function openDetailModal(id) {
    const complaint = state.complaints.find(c => c.id === id);
    if (!complaint) return;

    const modalTitle = document.getElementById('modal-detail-title');
    const modalBody = document.getElementById('modal-detail-body');

    modalTitle.innerHTML = `<i class="fa-solid fa-clipboard-check" style="color: #67e8f9;"></i> Ticket ${complaint.id} - ${complaint.locationName}`;

    modalBody.innerHTML = `
        <div style="margin-bottom: 16px;">
            <p style="color: var(--text-muted); font-size: 0.875rem;">${complaint.landmark} | ${complaint.ward}</p>
        </div>

        ${complaint.afterImage ? `
            <div style="margin-bottom: 20px;">
                <h4 style="font-size: 0.95rem; margin-bottom: 8px; color: #34d399; font-weight: 700;">
                    <i class="fa-solid fa-arrows-left-right"></i> Interactive Before & After Cleanup Proof
                </h4>
                <div class="ba-slider-container" id="ba-slider-box">
                    <img src="${complaint.afterImage}" class="ba-image" alt="After Cleaned">
                    <span style="position: absolute; top: 10px; right: 10px; background: #10b981; color: white; padding: 2px 10px; border-radius: 12px; font-weight: 700; font-size: 0.75rem; z-index: 4;">CLEANED</span>

                    <div class="ba-before-wrapper" id="ba-before-wrapper">
                        <img src="${complaint.beforeImage}" class="ba-image" alt="Before Dump">
                        <span style="position: absolute; top: 10px; left: 10px; background: #ef4444; color: white; padding: 2px 10px; border-radius: 12px; font-weight: 700; font-size: 0.75rem;">BEFORE REPORT</span>
                    </div>

                    <div class="ba-handle" id="ba-handle">
                        <div class="ba-handle-button"><i class="fa-solid fa-code-compare"></i></div>
                    </div>
                </div>
            </div>
        ` : `
            <div style="margin-bottom: 20px; text-align: center; background: rgba(9,13,22,0.8); padding: 20px; border-radius: var(--radius-md);">
                <img src="${complaint.beforeImage}" style="max-height: 220px; border-radius: 8px; margin-bottom: 10px;" alt="Before Dump">
                <p style="font-size: 0.85rem; color: #fbbf24;"><i class="fa-solid fa-spinner fa-spin"></i> Cleaning team in transit. Proof photo will upload upon completion.</p>
            </div>
        `}

        <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
            <button class="btn-primary" onclick="closeDetailModal()">Close</button>
        </div>
    `;

    document.getElementById('detail-modal').classList.add('active');
    if (complaint.afterImage) initBeforeAfterSlider();
}

function closeDetailModal() {
    document.getElementById('detail-modal').classList.remove('active');
}

function initBeforeAfterSlider() {
    const container = document.getElementById('ba-slider-box');
    const beforeWrapper = document.getElementById('ba-before-wrapper');
    const handle = document.getElementById('ba-handle');

    if (!container || !beforeWrapper || !handle) return;
    let isDragging = false;

    const setPosition = (x) => {
        const rect = container.getBoundingClientRect();
        let offsetX = x - rect.left;
        if (offsetX < 0) offsetX = 0;
        if (offsetX > rect.width) offsetX = rect.width;
        const percentage = (offsetX / rect.width) * 100;
        beforeWrapper.style.width = `${percentage}%`;
        handle.style.left = `${percentage}%`;
    };

    container.addEventListener('mousedown', (e) => { isDragging = true; setPosition(e.clientX); });
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mousemove', (e) => { if (isDragging) setPosition(e.clientX); });
}

/* ==========================================================================
   Report Garbage & Escalations
   ========================================================================== */
function openReportModal() { document.getElementById('report-modal').classList.add('active'); }
function closeReportModal() { document.getElementById('report-modal').classList.remove('active'); }

function loadSamplePreset(idx) {
    const preset = SAMPLE_PHOTO_PRESETS[idx];
    document.getElementById('input-location').value = preset.label;
    showToast(`Loaded sample scenario: ${preset.label}`, 'info');
}

function handleFormSubmit(e) {
    e.preventDefault();
    const loc = document.getElementById('input-location').value;
    const ward = document.getElementById('input-ward').value;

    const ptsEarned = state.user.isVolunteer ? 60 : 50;

    const newTicket = {
        id: `NCB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        locationName: loc,
        landmark: 'Reported by Citizen',
        ward: ward,
        lat: 12.9716 + (Math.random() - 0.5) * 0.05,
        lng: 77.5946 + (Math.random() - 0.5) * 0.05,
        wasteType: 'Wet & Plastic Waste',
        severity: 'High',
        duration: '< 24 hrs',
        reportedBy: `${state.user.name} (You)`,
        isUserReport: true,
        reportedAt: new Date().toISOString(),
        status: 'Reported',
        assignedCrew: { name: 'BBMP Sanitation Squad', supervisor: 'Assigned automatically' },
        beforeImage: 'https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80',
        afterImage: null,
        isHotspot: false,
        isEscalated: false,
        cleanPointsEarned: ptsEarned,
        timeline: [{ stage: 'Reported', timestamp: 'Just now', note: 'Ticket filed via Namma Clean App' }]
    };

    state.complaints.unshift(newTicket);
    state.user.cleanPoints += ptsEarned;

    closeReportModal();
    renderSidebarComplaints();
    renderFullComplaints();
    renderMyRegisteredComplaints();
    updatePointsDisplay();

    showToast(`🎉 Complaint Submitted! You earned +${ptsEarned} Clean Points.`, 'success');
}

function openEscalateModal(id) {
    document.getElementById('escalate-ticket-id').value = id;
    document.getElementById('escalate-ticket-display').value = id;
    document.getElementById('escalate-modal').classList.add('active');
}
function closeEscalateModal() { document.getElementById('escalate-modal').classList.remove('active'); }

function handleEscalationSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('escalate-ticket-id').value;
    const complaint = state.complaints.find(c => c.id === id);
    if (!complaint) return;

    complaint.isEscalated = true;
    complaint.assignedCrew = { name: '🔥 BBMP Emergency Task Force & Zonal Commissioner', supervisor: 'Sri R. Manjunath' };

    closeEscalateModal();
    renderFullComplaints();
    renderMyRegisteredComplaints();
    showToast(`🚨 Ticket ${id} escalated to BBMP Zonal Commissioner! Emergency clearance in 4 hours.`, 'error');
}

function advanceComplaintStatus(id) {
    const complaint = state.complaints.find(c => c.id === id);
    if (!complaint) return;

    const stages = ['Reported', 'Assigned', 'Cleaning in progress', 'Cleaned', 'Verified'];
    const idx = stages.indexOf(complaint.status);

    if (idx < stages.length - 1) {
        complaint.status = stages[idx + 1];
        if (complaint.status === 'Cleaned' && !complaint.afterImage) {
            complaint.afterImage = 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80';
        }
        renderSidebarComplaints();
        renderFullComplaints();
        renderMyRegisteredComplaints();
        showToast(`Status updated to: ${complaint.status}`, 'info');
    }
}

/* ==========================================================================
   Leaflet Map Initialization
   ========================================================================== */
function initMap() {
    const bangaloreCenter = [12.9716, 77.5946];
    state.map = L.map('map').setView(bangaloreCenter, 12);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', { maxZoom: 19 }).addTo(state.map);

    state.complaints.forEach(item => {
        const marker = L.marker([item.lat, item.lng]).addTo(state.map);
        marker.bindPopup(`<strong>${item.locationName}</strong><br/>${item.status}`);
    });
}

/* ==========================================================================
   Hotspots & Rewards
   ========================================================================== */
function renderHotspots() {
    const container = document.getElementById('hotspots-container');
    if (!container) return;

    container.innerHTML = state.hotspots.map(hs => `
        <div class="area-schedule-card">
            <h4 style="font-size: 1.1rem; font-weight: 700; color: white;">${hs.name}</h4>
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 10px;">${hs.ward} • ${hs.reportsThisMonth} Reports</p>
            <p style="font-size: 0.85rem; color: #f87171; margin-bottom: 14px;"><strong>Cause:</strong> ${hs.primaryCause}</p>
            <button class="btn-primary" style="width: 100%; justify-content: center; font-size: 0.85rem;" onclick="adoptHotspot('${hs.id}')">
                Adopt Hotspot (+250 Pts)
            </button>
        </div>
    `).join('');
}

function adoptHotspot(id) {
    state.user.cleanPoints += 250;
    updatePointsDisplay();
    showToast(`🎉 You adopted this hotspot! +250 Clean Points awarded.`, 'success');
}

function renderRewards() {
    const container = document.getElementById('rewards-cards-container');
    if (!container) return;

    container.innerHTML = REWARDS_CATALOG.map(rwd => `
        <div class="area-schedule-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
                <div style="font-size: 2rem; margin-bottom: 8px;">${rwd.logo}</div>
                <h4 style="font-size: 1.05rem; font-weight: 700; color: white;">${rwd.title}</h4>
                <p style="font-size: 0.8rem; color: #34d399; font-weight: 600;">${rwd.partner}</p>
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 6px;">${rwd.description}</p>
            </div>
            <button class="btn-primary" style="width: 100%; justify-content: center; font-size: 0.85rem; margin-top: 14px;" onclick="redeemReward(${rwd.pointsCost})">
                Redeem (${rwd.pointsCost} Pts)
            </button>
        </div>
    `).join('');
}

function redeemReward(cost) {
    if (state.user.cleanPoints < cost) {
        showToast(`⚠️ Insufficient points! Need ${cost - state.user.cleanPoints} more Clean Points.`, 'error');
        return;
    }
    state.user.cleanPoints -= cost;
    updatePointsDisplay();
    alert(`🎉 Voucher Redeemed! Code: CLEAN-BLR-${Math.floor(100000 + Math.random() * 900000)}`);
    showToast(`Voucher redeemed successfully!`, 'success');
}

function updatePointsDisplay() {
    const p1 = document.getElementById('user-points-display');
    const p2 = document.getElementById('rewards-balance-display');
    if (p1) p1.textContent = state.user.cleanPoints;
    if (p2) p2.textContent = state.user.cleanPoints;
}

function getInitials(name) { return name.split(' ').map(n => n[0]).join('').toUpperCase(); }

function getBadgeClass(status) {
    switch (status) {
        case 'Reported': return 'badge-reported';
        case 'Assigned': return 'badge-assigned';
        case 'Cleaning in progress': return 'badge-progress';
        case 'Cleaned': return 'badge-cleaned';
        case 'Verified': return 'badge-verified';
        default: return 'badge-progress';
    }
}

function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="font-size: 1.2rem; color: #34d399;"></i> <span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
}
