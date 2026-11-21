// ===========================
// NAVIGATION AND SIDEBAR
// ===========================

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

// Close sidebar when clicking on a link (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const sidebar = document.querySelector('.sidebar');
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
        }
    });
});

// ===========================
// SETTINGS PAGE
// ===========================

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.settings-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all links
    document.querySelectorAll('.settings-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }

    // Set active link
    event.target.closest('.settings-link')?.classList.add('active');
}

// ===========================
// STUDENT MODAL FUNCTIONS
// ===========================

function openAddStudent() {
    window.location.href = 'add-student.html';
}

function editStudent(id) {
    window.location.href = 'add-student.html';
}

function viewStudent(id) {
    window.location.href = 'student-details.html';
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete this student?')) {
        alert('Student deleted successfully!');
        // In a real app, you would make an API call here
    }
}

// ===========================
// FORM VALIDATION AND SUBMISSION
// ===========================

// Form submission handlers
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        // Allow default form submission for login
        if (!this.classList.contains('login-form') && !this.classList.contains('modal-form')) {
            e.preventDefault();
            
            // Basic validation
            const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (isValid) {
                alert('Form submitted successfully!');
                // In a real app, you would send the data to a server
            } else {
                alert('Please fill in all required fields!');
            }
        }
    });
});

// ===========================
// SEARCH FUNCTIONALITY
// ===========================

document.querySelectorAll('.search-box').forEach(searchBox => {
    searchBox.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        // Search in tables
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            const rows = table.querySelectorAll('tbody tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    });
});

// ===========================
// FILTER FUNCTIONALITY
// ===========================

document.querySelectorAll('.filter-select').forEach(select => {
    select.addEventListener('change', function() {
        // In a real app, this would filter the data
        console.log('Filter changed:', this.value);
    });
});

// ===========================
// ATTENDANCE CHART
// ===========================

function drawAttendanceChart() {
    const circles = document.querySelectorAll('.progress-ring circle');
    
    circles.forEach(circle => {
        const circumference = 2 * Math.PI * circle.r.baseVal.value;
        const strokeDasharray = circumference;
        const strokeDashoffset = circumference - (0.94 * circumference);
        
        circle.style.strokeDasharray = strokeDasharray;
        circle.style.strokeDashoffset = strokeDashoffset;
    });
}

// ===========================
// GRADE INPUT HANDLERS
// ===========================

document.querySelectorAll('.grade-input').forEach(input => {
    input.addEventListener('change', function() {
        const value = parseFloat(this.value);
        
        // Validate grade range
        if (value < 0 || value > 100) {
            alert('Grade must be between 0 and 100');
            this.value = '';
        }
    });
});

// Calculate total and average for grades
function calculateGradesTotals() {
    const rows = document.querySelectorAll('.grades-table tbody tr');
    
    rows.forEach(row => {
        const inputs = row.querySelectorAll('.grade-input');
        const totalCell = row.cells[6];
        const averageCell = row.cells[7];
        
        if (inputs.length > 0 && totalCell && averageCell) {
            let total = 0;
            inputs.forEach(input => {
                total += parseFloat(input.value) || 0;
            });
            
            const average = (total / inputs.length).toFixed(2);
            totalCell.textContent = total;
            averageCell.textContent = average + '%';
        }
    });
}

// Event listeners for grade inputs
document.querySelectorAll('.grade-input').forEach(input => {
    input.addEventListener('input', calculateGradesTotals);
});

// ===========================
// RESPONSIVE SIDEBAR
// ===========================

window.addEventListener('resize', function() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth > 768) {
        sidebar.classList.remove('active');
    }
});

// ===========================
// TAB NAVIGATION (if needed)
// ===========================

function openTab(event, tabName) {
    const tabContent = document.querySelectorAll('.tabcontent');
    tabContent.forEach(tab => {
        tab.style.display = 'none';
    });

    const tabButtons = document.querySelectorAll('.tablink');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    const tab = document.getElementById(tabName);
    if (tab) {
        tab.style.display = 'block';
    }
    
    event.currentTarget.classList.add('active');
}

// ===========================
// DATE RANGE PICKER
// ===========================

function updateDateRange() {
    const fromDate = document.querySelector('input[type="date"]');
    if (fromDate) {
        const toDateInputs = document.querySelectorAll('input[type="date"]');
        if (toDateInputs.length > 1) {
            toDateInputs[1].min = fromDate.value;
        }
    }
}

document.addEventListener('change', function(e) {
    if (e.target.type === 'date') {
        updateDateRange();
    }
});

// ===========================
// EXPORT FUNCTIONALITY
// ===========================

function exportToCSV() {
    const table = document.querySelector('table');
    if (!table) return;

    let csv = [];
    const rows = table.querySelectorAll('tr');
    
    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        let csvRow = [];
        
        cols.forEach(col => {
            csvRow.push('"' + col.textContent + '"');
        });
        
        csv.push(csvRow.join(','));
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + csv.join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', 'export_' + new Date().getTime() + '.csv');
    link.click();
}

// ===========================
// NOTIFICATION ALERTS
// ===========================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 3000;
        padding: 15px 20px;
        border-radius: 8px;
        background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-in-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================
// DATA TABLE SORTING
// ===========================

function sortTable(columnIndex, tableSelector = 'table') {
    const table = document.querySelector(tableSelector);
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const isAscending = tbody.dataset.sortAscending === 'true';

    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();

        if (!isNaN(aValue) && !isNaN(bValue)) {
            return isAscending ? bValue - aValue : aValue - bValue;
        } else {
            return isAscending ? bValue.localeCompare(aValue) : aValue.localeCompare(bValue);
        }
    });

    rows.forEach(row => tbody.appendChild(row));
    tbody.dataset.sortAscending = !isAscending;
}

// ===========================
// PERFORMANCE CHART
// ===========================

function drawPerformanceChart() {
    // This is a simple implementation. For more complex charts, use a library like Chart.js
    const items = document.querySelectorAll('.performance-item');
    
    items.forEach(item => {
        const percent = 75 + Math.random() * 20; // Random value between 75-95
        const progressFill = item.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = percent + '%';
        }
    });
}

// ===========================
// FORM AUTO-SAVE DRAFT
// ===========================

const autoSaveForms = document.querySelectorAll('form');

autoSaveForms.forEach(form => {
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Load saved values
        const savedValue = localStorage.getItem('form_' + input.name);
        if (savedValue) {
            input.value = savedValue;
        }

        // Save on input
        input.addEventListener('change', () => {
            localStorage.setItem('form_' + input.name, input.value);
        });
    });

    // Clear auto-saved data on form submit
    form.addEventListener('submit', () => {
        inputs.forEach(input => {
            localStorage.removeItem('form_' + input.name);
        });
    });
});

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    drawAttendanceChart();
    drawPerformanceChart();
    updateDateRange();

    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchBox = document.querySelector('.search-box');
            if (searchBox) searchBox.focus();
        }
    });
});

// ===========================
// PRINT FUNCTIONALITY
// ===========================

function printPage() {
    window.print();
}

// ===========================
// EXPORT TO PDF (Simple implementation)
// ===========================

function exportToPDF() {
    alert('PDF export functionality would be implemented with a library like jsPDF');
    // In production, use: https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js
}
