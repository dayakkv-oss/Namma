/**
 * Mock Data for Namma Clean Bengaluru Application
 * Features Area-Based Collection Timetables, User Profiles, and Area Volunteer Representatives.
 */

let CURRENT_USER = {
    id: "USR-99201",
    name: "Dayakar Karunakaran",
    phone: "+91 98450 99882",
    email: "dayakar@bengaluru.org",
    area: "Indiranagar 10th Main",
    ward: "Ward 80 - Hoysala Nagar",
    isVolunteer: false,
    volunteerArea: "Indiranagar Ward 80",
    cleanPoints: 450,
    registeredComplaints: ["NCB-2026-8091", "NCB-2026-8095"]
};

const INITIAL_COMPLAINTS = [
    {
        id: "NCB-2026-8091",
        locationName: "10th Main Road, Indiranagar",
        landmark: "Near 100ft Rd Junction, opposite Metro Pillar 42",
        ward: "Ward 80 - Indiranagar",
        lat: 12.9784,
        lng: 77.6408,
        wasteType: "Wet & Plastic Waste",
        severity: "High",
        duration: "3 days",
        reportedBy: "Dayakar Karunakaran (You)",
        isUserReport: true,
        reportedAt: "2026-09-20T09:30:00",
        status: "Cleaning in progress", // Reported -> Assigned -> Cleaning in progress -> Cleaned -> Verified
        assignedCrew: {
            name: "BBMP Sanitation Squad 14",
            supervisor: "Ramesh Kumar (Ward Inspector)",
            truckNo: "KA-01-GA-4589",
            contact: "+91 98450 12345",
            eta: "Today, 4:30 PM"
        },
        beforeImage: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80",
        afterImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80",
        isHotspot: true,
        isEscalated: false,
        reportCountAtLocation: 7,
        cleanPointsEarned: 50,
        timeline: [
            { stage: "Reported", timestamp: "Sep 20, 09:30 AM", note: "Reported by citizen via Namma Clean App" },
            { stage: "Assigned", timestamp: "Sep 20, 11:15 AM", note: "Assigned to BBMP Sanitation Squad 14" },
            { stage: "Cleaning in progress", timestamp: "Sep 23, 02:00 PM", note: "Crew dispatched with compactor truck KA-01-GA-4589" }
        ]
    },
    {
        id: "NCB-2026-8092",
        locationName: "5th Block, Koramangala",
        landmark: "Behind Jyoti Nivas College Road",
        ward: "Ward 151 - Koramangala",
        lat: 12.9352,
        lng: 77.6245,
        wasteType: "Construction Debris & Dry Waste",
        severity: "Critical",
        duration: "> 1 week",
        reportedBy: "Ananya Sharma",
        isUserReport: false,
        reportedAt: "2026-09-18T14:20:00",
        status: "Cleaned",
        assignedCrew: {
            name: "Koramangala Green Team",
            supervisor: "Siddappa M (Marshal)",
            truckNo: "KA-05-EZ-1102",
            contact: "+91 94480 88210",
            eta: "Completed"
        },
        beforeImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80",
        afterImage: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=800&q=80",
        isHotspot: true,
        isEscalated: false,
        reportCountAtLocation: 12,
        cleanPointsEarned: 100,
        timeline: [
            { stage: "Reported", timestamp: "Sep 18, 02:20 PM", note: "Flagged as high severity hazard" },
            { stage: "Assigned", timestamp: "Sep 18, 03:00 PM", note: "Assigned to Koramangala Green Team" },
            { stage: "Cleaning in progress", timestamp: "Sep 19, 10:00 AM", note: "Debris clearance JCB machine deployed" },
            { stage: "Cleaned", timestamp: "Sep 19, 04:45 PM", note: "Photographic proof uploaded by Supervisor Siddappa" }
        ]
    },
    {
        id: "NCB-2026-8093",
        locationName: "Whitefield Main Rd, Garudacharpalya",
        landmark: "Near Hoodi Metro Station Exit B",
        ward: "Ward 85 - Whitefield",
        lat: 12.9912,
        lng: 77.7161,
        wasteType: "Plastic Packaging & Wet Waste",
        severity: "Medium",
        duration: "1 day",
        reportedBy: "Meera Nair",
        isUserReport: false,
        reportedAt: "2026-09-22T18:10:00",
        status: "Assigned",
        assignedCrew: {
            name: "Whitefield Clean Task Force",
            supervisor: "Venkatesh B",
            truckNo: "KA-53-MC-8833",
            contact: "+91 98860 33411",
            eta: "Tomorrow, 8:00 AM"
        },
        beforeImage: "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80",
        afterImage: null,
        isHotspot: false,
        isEscalated: false,
        reportCountAtLocation: 2,
        cleanPointsEarned: 50,
        timeline: [
            { stage: "Reported", timestamp: "Sep 22, 06:10 PM", note: "Reported by resident Meera Nair" },
            { stage: "Assigned", timestamp: "Sep 23, 08:30 AM", note: "Routed to Whitefield Clean Task Force" }
        ]
    },
    {
        id: "NCB-2026-8094",
        locationName: "8th Cross, Malleshwaram",
        landmark: "Adjacent to Sampige Theatre Lane",
        ward: "Ward 45 - Malleshwaram",
        lat: 13.0031,
        lng: 77.5694,
        wasteType: "Vegetable Market Organic Dump",
        severity: "High",
        duration: "2 days",
        reportedBy: "Srinivas Rao",
        isUserReport: false,
        reportedAt: "2026-09-17T11:00:00",
        status: "Verified",
        assignedCrew: {
            name: "West Zone Express Cleaners",
            supervisor: "Nanjunda Swamy",
            truckNo: "KA-02-GB-9901",
            contact: "+91 94800 77123",
            eta: "Verified Clean"
        },
        beforeImage: "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=800&q=80",
        afterImage: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
        isHotspot: true,
        isEscalated: false,
        reportCountAtLocation: 9,
        cleanPointsEarned: 150,
        timeline: [
            { stage: "Reported", timestamp: "Sep 17, 11:00 AM", note: "Market waste dump flagged" },
            { stage: "Assigned", timestamp: "Sep 17, 11:30 AM", note: "Special sanitation vehicle dispatched" },
            { stage: "Cleaning in progress", timestamp: "Sep 17, 02:00 PM", note: "Manual & mechanical sweeping done" },
            { stage: "Cleaned", timestamp: "Sep 17, 05:30 PM", note: "Before/After proof submitted" },
            { stage: "Verified", timestamp: "Sep 18, 09:00 AM", note: "Community verification confirmed clean status" }
        ]
    },
    {
        id: "NCB-2026-8095",
        locationName: "Sector 1, HSR Layout",
        landmark: "27th Main Rd, Near Agara Lake Park",
        ward: "Ward 174 - HSR Layout",
        lat: 12.9121,
        lng: 77.6445,
        wasteType: "E-Waste & Cardboard",
        severity: "Low",
        duration: "< 24 hrs",
        reportedBy: "Dayakar Karunakaran (You)",
        isUserReport: true,
        reportedAt: "2026-09-23T11:45:00",
        status: "Reported",
        assignedCrew: null,
        beforeImage: "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&w=800&q=80",
        afterImage: null,
        isHotspot: false,
        isEscalated: false,
        reportCountAtLocation: 1,
        cleanPointsEarned: 50,
        timeline: [
            { stage: "Reported", timestamp: "Sep 23, 11:45 AM", note: "Ticket opened via mobile report wizard" }
        ]
    }
];

// Area-Based Collection Timetables with Specific Morning & Afternoon Shifts
const AREA_COLLECTION_TIMETABLES = [
    {
        areaName: "Indiranagar (10th Main & 100ft Rd)",
        ward: "Ward 80 - Hoysala Nagar",
        morningShift: {
            time: "6:30 AM - 9:30 AM",
            type: "Wet Organic & Door-to-Door Household Waste",
            truckNo: "KA-01-GA-4589 (Compactor)",
            driver: "Manjunath S (+91 98450 11022)",
            status: "Active on 4th Main Rd",
            statusColor: "#059669"
        },
        afternoonShift: {
            time: "2:00 PM - 4:30 PM",
            type: "Dry Recyclables & Commercial Market Clearance",
            truckNo: "KA-01-AT-2210 (Auto Tipper)",
            driver: "Subramani (+91 94480 33901)",
            status: "Scheduled at 2:00 PM",
            statusColor: "#2563eb"
        }
    },
    {
        areaName: "Koramangala (5th Block & JNC Road)",
        ward: "Ward 151 - Koramangala",
        morningShift: {
            time: "6:00 AM - 9:00 AM",
            type: "Residential Wet Waste & Bio-degradable Scrap",
            truckNo: "KA-05-EZ-1102",
            driver: "Siddappa M (+91 94480 88210)",
            status: "Completed for Block 5",
            statusColor: "#059669"
        },
        afternoonShift: {
            time: "1:30 PM - 4:00 PM",
            type: "Restaurant & Commercial Dry Packaging Waste",
            truckNo: "KA-05-EZ-1108",
            driver: "Venkatesh (+91 98860 12099)",
            status: "Dispatched at 1:30 PM",
            statusColor: "#2563eb"
        }
    },
    {
        areaName: "Whitefield (Main Rd & Hoodi)",
        ward: "Ward 85 - Doddanekkundi",
        morningShift: {
            time: "7:00 AM - 10:00 AM",
            type: "Gated Community & Household Waste Collection",
            truckNo: "KA-53-MC-8833",
            driver: "Babu Gowda (+91 98860 33411)",
            status: "On Route (Hoodi Junction)",
            statusColor: "#059669"
        },
        afternoonShift: {
            time: "2:30 PM - 5:00 PM",
            type: "Bulk Dry Scrap & E-Waste Pickup",
            truckNo: "KA-53-MC-8840",
            driver: "Kiran R (+91 94490 55123)",
            status: "Upcoming Shift",
            statusColor: "#7c3aed"
        }
    },
    {
        areaName: "Malleshwaram (8th Cross & Sampige Rd)",
        ward: "Ward 45 - Malleshwaram",
        morningShift: {
            time: "6:30 AM - 9:30 AM",
            type: "Flower & Vegetable Market Waste Clearance",
            truckNo: "KA-02-GB-9901",
            driver: "Nanjunda Swamy (+91 94800 77123)",
            status: "Completed Shift",
            statusColor: "#059669"
        },
        afternoonShift: {
            time: "2:00 PM - 4:30 PM",
            type: "Street Sweeping & Dry Waste Collection",
            truckNo: "KA-02-GB-9915",
            driver: "Ganesh K (+91 98450 77811)",
            status: "In Progress (8th Cross)",
            statusColor: "#2563eb"
        }
    },
    {
        areaName: "HSR Layout (Sector 1 to 7)",
        ward: "Ward 174 - HSR Layout",
        morningShift: {
            time: "7:00 AM - 10:00 AM",
            type: "Segregated Household Wet & Garden Waste",
            truckNo: "KA-51-HS-4001",
            driver: "Ramesh P (+91 98450 44321)",
            status: "Active in Sector 2",
            statusColor: "#059669"
        },
        afternoonShift: {
            time: "2:00 PM - 4:00 PM",
            type: "Recyclable Plastics & Cardboard Pickup",
            truckNo: "KA-51-HS-4005",
            driver: "Shivakumar (+91 94480 22119)",
            status: "Scheduled at 2:00 PM",
            statusColor: "#2563eb"
        }
    },
    {
        areaName: "Jayanagar (4th Block & 11th Main)",
        ward: "Ward 153 - Jayanagar",
        morningShift: {
            time: "6:30 AM - 9:30 AM",
            type: "Shopping Complex & Household Waste",
            truckNo: "KA-05-JY-3301",
            driver: "Prasad Kumar (+91 98860 99012)",
            status: "On Route",
            statusColor: "#059669"
        },
        afternoonShift: {
            time: "2:30 PM - 5:00 PM",
            type: "Dry Recyclable Waste & Park Clearance",
            truckNo: "KA-05-JY-3310",
            driver: "Anand M (+91 94480 66782)",
            status: "Upcoming Shift",
            statusColor: "#7c3aed"
        }
    }
];

const BANGALORE_HOTSPOTS = [
    {
        id: "HS-01",
        name: "Koramangala 5th Block Junction",
        ward: "Ward 151",
        reportsThisMonth: 14,
        status: "Active Hotspot",
        adoptedBy: "St. John's Youth Eco Club",
        primaryCause: "Late night commercial restaurant dumping",
        lat: 12.9352,
        lng: 77.6245
    },
    {
        id: "HS-02",
        name: "Indiranagar 10th Main",
        ward: "Ward 80",
        reportsThisMonth: 8,
        status: "Under Monitoring",
        adoptedBy: null,
        primaryCause: "Footpath litter & uncollected dry waste",
        lat: 12.9784,
        lng: 77.6408
    },
    {
        id: "HS-03",
        name: "Malleshwaram 8th Cross Flower Market",
        ward: "Ward 45",
        reportsThisMonth: 11,
        status: "Cleaned & Transformed",
        adoptedBy: "Malleshwaram Resident Welfare Assoc (MRWA)",
        primaryCause: "Perishable organic market waste",
        lat: 13.0031,
        lng: 77.5694
    },
    {
        id: "HS-04",
        name: "Silk Board Underpass Flyover Side",
        ward: "Ward 172",
        reportsThisMonth: 19,
        status: "Critical Hotspot",
        adoptedBy: null,
        primaryCause: "Transit passenger littering & construction runoff",
        lat: 12.9172,
        lng: 77.6228
    }
];

const REWARDS_CATALOG = [
    {
        id: "RWD-01",
        partner: "Corner House Ice Cream",
        title: "₹150 Voucher off Death By Chocolate",
        pointsCost: 200,
        category: "Food & Desserts",
        logo: "🍦",
        description: "Valid across all Bangalore Corner House branches (Indiranagar, Jayanagar, Koramangala)."
    },
    {
        id: "RWD-02",
        partner: "MTR (Mavalli Tiffin Room)",
        title: "Free Rava Idli & Filter Coffee Combo",
        pointsCost: 150,
        category: "Dining",
        logo: "☕",
        description: "Enjoy iconic South Indian breakfast at MTR Lalbagh or Whitefield."
    },
    {
        id: "RWD-03",
        partner: "BigBasket Namma Grocery",
        title: "₹250 Off Instant Grocery Order",
        pointsCost: 350,
        category: "Groceries",
        logo: "🛒",
        description: "Applicable on orders above ₹799 on organic fresh produce."
    },
    {
        id: "RWD-04",
        partner: "Namma Metro (BMRCL)",
        title: "10 Free Metro Rides Pass",
        pointsCost: 500,
        category: "Transport",
        logo: "🚇",
        description: "Top up your Namma Metro smartcard for green urban transit."
    },
    {
        id: "RWD-05",
        partner: "Third Wave Coffee",
        title: "Buy 1 Get 1 Artisanal Brewed Coffee",
        pointsCost: 180,
        category: "Cafe",
        logo: "☕",
        description: "Valid at 100ft Road Indiranagar & Church Street outlets."
    },
    {
        id: "RWD-06",
        partner: "BBMP Lalbagh Nursery",
        title: "2 Native Flower/Neem Plant Saplings",
        pointsCost: 100,
        category: "Eco & Garden",
        logo: "🌱",
        description: "Collect native saplings from Lalbagh Botanical Garden nursery to green your home."
    }
];

const SAMPLE_PHOTO_PRESETS = [
    { label: "Roadside Dump (Indiranagar)", url: "https://images.unsplash.com/photo-1605600659873-d808a13e4d2a?auto=format&fit=crop&w=800&q=80", waste: "Wet & Plastic Waste", severity: "High" },
    { label: "Construction Rubble (Koramangala)", url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80", waste: "Construction Debris & Dry Waste", severity: "Critical" },
    { label: "Market Waste (Malleshwaram)", url: "https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=800&q=80", waste: "Organic Produce Dump", severity: "Medium" }
];
