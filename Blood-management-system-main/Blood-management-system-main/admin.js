// Admin Panel JavaScript for Blood Management System

// Sample data (in real app, this would come from a database)
let patients = [
    {
        id: 1,
        name: "Sarah Johnson",
        age: 28,
        bloodGroup: "O+",
        hospital: "City General Hospital",
        urgency: "critical",
        urgencyText: "Critical",
        condition: "Severe blood loss from accident",
        unitsNeeded: 3,
        contact: "+1 (555) 123-4567"
    },
    {
        id: 2,
        name: "Michael Chen",
        age: 45,
        bloodGroup: "A-",
        hospital: "Memorial Medical Center",
        urgency: "high",
        urgencyText: "High",
        condition: "Surgery scheduled for tomorrow",
        unitsNeeded: 2,
        contact: "+1 (555) 234-5678"
    },
    {
        id: 3,
        name: "Emily Rodriguez",
        age: 32,
        bloodGroup: "B+",
        hospital: "St. Mary's Hospital",
        urgency: "medium",
        urgencyText: "Medium",
        condition: "Chemotherapy treatment",
        unitsNeeded: 1,
        contact: "+1 (555) 345-6789"
    },
    {
        id: 4,
        name: "David Thompson",
        age: 56,
        bloodGroup: "AB+",
        hospital: "Regional Medical Center",
        urgency: "high",
        urgencyText: "High",
        condition: "Heart surgery complications",
        unitsNeeded: 4,
        contact: "+1 (555) 456-7890"
    },
    {
        id: 5,
        name: "Lisa Wang",
        age: 29,
        bloodGroup: "O-",
        hospital: "University Hospital",
        urgency: "critical",
        urgencyText: "Critical",
        condition: "Emergency delivery complications",
        unitsNeeded: 2,
        contact: "+1 (555) 567-8901"
    },
    {
        id: 6,
        name: "Robert Davis",
        age: 38,
        bloodGroup: "A+",
        hospital: "Community Health Center",
        urgency: "low",
        urgencyText: "Low",
        condition: "Regular transfusion needed",
        unitsNeeded: 1,
        contact: "+1 (555) 678-9012"
    }
];

let donors = [
    {
        id: 1,
        name: "John Smith",
        email: "john.smith@email.com",
        phone: "+1 (555) 111-2222",
        bloodGroup: "O+",
        patientName: "Sarah Johnson",
        date: "2024-01-15",
        status: "completed"
    },
    {
        id: 2,
        name: "Maria Garcia",
        email: "maria.garcia@email.com",
        phone: "+1 (555) 222-3333",
        bloodGroup: "A-",
        patientName: "Michael Chen",
        date: "2024-01-16",
        status: "scheduled"
    }
];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    updateDashboardStats();
    renderPatientsTable();
    renderDonorsTable();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Add patient form
    const addPatientForm = document.getElementById('add-patient-form');
    if (addPatientForm) {
        addPatientForm.addEventListener('submit', handleAddPatient);
    }

    // Edit patient form
    const editPatientForm = document.getElementById('edit-patient-form');
    if (editPatientForm) {
        editPatientForm.addEventListener('submit', handleEditPatient);
    }
}

// Show different tabs
function showTab(tabName) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.add('hidden'));
    
    // Remove active class from all tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.classList.remove('active', 'border-primary-500', 'text-primary-600');
        btn.classList.add('border-transparent', 'text-gray-500');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.remove('hidden');
    }
    
    // Activate selected tab button
    const selectedBtn = event.target;
    selectedBtn.classList.add('active', 'border-primary-500', 'text-primary-600');
    selectedBtn.classList.remove('border-transparent', 'text-gray-500');
}

// Update dashboard statistics
function updateDashboardStats() {
    const totalPatients = patients.length;
    const totalDonors = donors.length;
    const criticalCases = patients.filter(p => p.urgency === 'critical').length;
    const unitsNeeded = patients.reduce((sum, p) => sum + p.unitsNeeded, 0);
    
    document.getElementById('total-patients').textContent = totalPatients;
    document.getElementById('total-donors').textContent = totalDonors;
    document.getElementById('critical-cases').textContent = criticalCases;
    document.getElementById('units-needed').textContent = unitsNeeded;
}

// Render patients table
function renderPatientsTable() {
    const tbody = document.getElementById('patients-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = patients.map(patient => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <i class="fas fa-user text-primary-600"></i>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${patient.name}</div>
                        <div class="text-sm text-gray-500">Age: ${patient.age}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="blood-group ${getBloodGroupClass(patient.bloodGroup)}">${patient.bloodGroup}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${patient.hospital}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="urgency-${patient.urgency}">
                    <i class="fas fa-exclamation-triangle mr-1"></i>${patient.urgencyText}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${patient.unitsNeeded}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="editPatient(${patient.id})" class="text-primary-600 hover:text-primary-900 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletePatient(${patient.id})" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Render donors table
function renderDonorsTable() {
    const tbody = document.getElementById('donors-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = donors.map(donor => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <i class="fas fa-heart text-green-600"></i>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${donor.name}</div>
                        <div class="text-sm text-gray-500">${donor.email}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="blood-group ${getBloodGroupClass(donor.bloodGroup)}">${donor.bloodGroup}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${donor.phone}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${donor.patientName}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(donor.date)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(donor.status)}">
                    ${donor.status}
                </span>
            </td>
        </tr>
    `).join('');
}

// Get CSS class for blood group styling
function getBloodGroupClass(bloodGroup) {
    const group = bloodGroup.toLowerCase().replace('+', '-positive').replace('-', '-negative');
    return group;
}

// Get CSS class for status styling
function getStatusClass(status) {
    switch(status) {
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'scheduled':
            return 'bg-yellow-100 text-yellow-800';
        case 'pending':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Handle add patient form submission
function handleAddPatient(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newPatient = {
        id: patients.length + 1,
        name: formData.get('name'),
        age: parseInt(formData.get('age')),
        bloodGroup: formData.get('bloodGroup'),
        hospital: formData.get('hospital'),
        urgency: formData.get('urgency'),
        urgencyText: formData.get('urgency').charAt(0).toUpperCase() + formData.get('urgency').slice(1),
        condition: formData.get('condition'),
        unitsNeeded: parseInt(formData.get('unitsNeeded')),
        contact: formData.get('contact')
    };
    
    patients.push(newPatient);
    updateDashboardStats();
    renderPatientsTable();
    
    // Show success message
    showNotification('Patient added successfully!', 'success');
    
    // Reset form
    e.target.reset();
}

// Handle edit patient form submission
function handleEditPatient(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const patientId = parseInt(formData.get('id'));
    
    const patientIndex = patients.findIndex(p => p.id === patientId);
    if (patientIndex !== -1) {
        patients[patientIndex] = {
            ...patients[patientIndex],
            name: formData.get('name'),
            age: parseInt(formData.get('age')),
            bloodGroup: formData.get('bloodGroup'),
            hospital: formData.get('hospital'),
            urgency: formData.get('urgency'),
            urgencyText: formData.get('urgency').charAt(0).toUpperCase() + formData.get('urgency').slice(1),
            condition: formData.get('condition'),
            unitsNeeded: parseInt(formData.get('unitsNeeded')),
            contact: formData.get('contact')
        };
        
        updateDashboardStats();
        renderPatientsTable();
        closeEditModal();
        
        showNotification('Patient updated successfully!', 'success');
    }
}

// Edit patient
function editPatient(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;
    
    // Populate edit form
    document.getElementById('edit-patient-id').value = patient.id;
    document.getElementById('edit-patient-name').value = patient.name;
    document.getElementById('edit-patient-age').value = patient.age;
    document.getElementById('edit-patient-blood-group').value = patient.bloodGroup;
    document.getElementById('edit-patient-urgency').value = patient.urgency;
    document.getElementById('edit-patient-hospital').value = patient.hospital;
    document.getElementById('edit-patient-condition').value = patient.condition;
    document.getElementById('edit-patient-units').value = patient.unitsNeeded;
    document.getElementById('edit-patient-contact').value = patient.contact;
    
    // Show modal
    document.getElementById('edit-patient-modal').classList.remove('hidden');
}

// Close edit modal
function closeEditModal() {
    document.getElementById('edit-patient-modal').classList.add('hidden');
}

// Delete patient
function deletePatient(patientId) {
    if (confirm('Are you sure you want to delete this patient? This action cannot be undone.')) {
        patients = patients.filter(p => p.id !== patientId);
        updateDashboardStats();
        renderPatientsTable();
        showNotification('Patient deleted successfully!', 'success');
    }
}

// Reset patient form
function resetPatientForm() {
    document.getElementById('add-patient-form').reset();
}

// Export patients data
function exportPatients() {
    const csvContent = "data:text/csv;charset=utf-8," + 
        "ID,Name,Age,Blood Group,Hospital,Urgency,Condition,Units Needed,Contact\n" +
        patients.map(p => 
            `${p.id},"${p.name}",${p.age},"${p.bloodGroup}","${p.hospital}","${p.urgencyText}","${p.condition}",${p.unitsNeeded},"${p.contact}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "patients_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Patients data exported successfully!', 'success');
}

// Export donors data
function exportDonors() {
    const csvContent = "data:text/csv;charset=utf-8," + 
        "ID,Name,Email,Phone,Blood Group,Patient Name,Date,Status\n" +
        donors.map(d => 
            `${d.id},"${d.name}","${d.email}","${d.phone}","${d.bloodGroup}","${d.patientName}","${d.date}","${d.status}"`
        ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "donors_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('Donors data exported successfully!', 'success');
}

// Show notification
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 z-50 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`;
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Add sample donor (for demonstration)
function addSampleDonor() {
    const newDonor = {
        id: donors.length + 1,
        name: "Sample Donor",
        email: "sample@email.com",
        phone: "+1 (555) 999-8888",
        bloodGroup: "O+",
        patientName: "Sample Patient",
        date: new Date().toISOString().split('T')[0],
        status: "pending"
    };
    
    donors.push(newDonor);
    updateDashboardStats();
    renderDonorsTable();
    showNotification('Sample donor added!', 'success');
}

// Search functionality
function searchPatients(query) {
    const filteredPatients = patients.filter(patient => 
        patient.name.toLowerCase().includes(query.toLowerCase()) ||
        patient.hospital.toLowerCase().includes(query.toLowerCase()) ||
        patient.bloodGroup.toLowerCase().includes(query.toLowerCase())
    );
    
    renderFilteredPatients(filteredPatients);
}

function renderFilteredPatients(filteredPatients) {
    const tbody = document.getElementById('patients-table-body');
    if (!tbody) return;
    
    if (filteredPatients.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="px-6 py-4 text-center text-gray-500">
                    No patients found matching your search criteria.
                </td>
            </tr>
        `;
        return;
    }
    
    // Render filtered results
    tbody.innerHTML = filteredPatients.map(patient => `
        <tr class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                        <div class="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <i class="fas fa-user text-primary-600"></i>
                        </div>
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">${patient.name}</div>
                        <div class="text-sm text-gray-500">Age: ${patient.age}</div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="blood-group ${getBloodGroupClass(patient.bloodGroup)}">${patient.bloodGroup}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${patient.hospital}</td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="urgency-${patient.urgency}">
                    <i class="fas fa-exclamation-triangle mr-1"></i>${patient.urgencyText}
                </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${patient.unitsNeeded}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button onclick="editPatient(${patient.id})" class="text-primary-600 hover:text-primary-900 mr-3">
                    <i class="fas fa-edit"></i>
                </button>
                <button onclick="deletePatient(${patient.id})" class="text-red-600 hover:text-red-900">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case '1':
                e.preventDefault();
                showTab('patients');
                break;
            case '2':
                e.preventDefault();
                showTab('donors');
                break;
            case '3':
                e.preventDefault();
                showTab('add-patient');
                break;
        }
    }
    
    if (e.key === 'Escape') {
        closeEditModal();
    }
});

// Add some demo data periodically (for demonstration purposes)
setInterval(() => {
    if (Math.random() < 0.1) { // 10% chance every interval
        addSampleDonor();
    }
}, 30000); // Every 30 seconds 