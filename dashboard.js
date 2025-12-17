// Basic dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard loaded');
    
    // Update current time
    function updateTime() {
        const now = new Date();
        const timeStr = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        const dateStr = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Find or create time display
        let timeDisplay = document.querySelector('.time-display');
        if (!timeDisplay) {
            timeDisplay = document.createElement('div');
            timeDisplay.className = 'time-display';
            document.querySelector('.header-left p').after(timeDisplay);
        }
        timeDisplay.innerHTML = `<strong>${timeStr}</strong> • ${dateStr}`;
    }
    
    // Update time every minute
    updateTime();
    setInterval(updateTime, 60000);
    
    // Sidebar navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // Update page title based on selection
            const pageName = this.querySelector('span').textContent;
            document.title = `${pageName} | Workshop Dashboard`;
            
            // Show a simple alert for demo (replace with actual page load)
            console.log(`Navigating to: ${pageName}`);
        });
    });
    
    // Quick action buttons
    const actionButtons = document.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('span').textContent;
            console.log(`Action triggered: ${action}`);
            
            // Visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Simulate action completion
            const activityList = document.querySelector('.activity-list');
            const newActivity = document.createElement('div');
            newActivity.className = 'activity-item';
            newActivity.innerHTML = `
                <div class="activity-icon" style="background: #4caf50;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="activity-content">
                    <p><strong>${action}</strong> completed successfully</p>
                    <small>Just now</small>
                </div>
            `;
            
            activityList.prepend(newActivity);
            
            // Keep only 4 activities
            const activities = activityList.querySelectorAll('.activity-item');
            if (activities.length > 4) {
                activities[4].remove();
            }
        });
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-box input');
    searchInput.addEventListener('input', function() {
        if (this.value.length > 2) {
            console.log(`Searching for: ${this.value}`);
        }
    });
    
    // Temperature simulation (updates every 5 seconds)
    function simulateTemperature() {
        const tempElement = document.querySelector('.stat-value');
        if (!tempElement) return;
        
        const currentTemp = parseInt(tempElement.textContent);
        const change = (Math.random() - 0.5) * 2; // Random change between -1 and +1
        const newTemp = Math.max(65, Math.min(85, currentTemp + change));
        
        tempElement.textContent = `${newTemp.toFixed(1)}°F`;
        
        const changeElement = document.querySelector('.stat-change');
        const diff = (newTemp - 72).toFixed(1);
        const sign = diff >= 0 ? '+' : '';
        changeElement.textContent = `${sign}${diff}° from baseline`;
        changeElement.style.color = diff >= 0 ? '#ff9800' : '#4caf50';
    }
    
    // Start simulation after 3 seconds
    setTimeout(() => {
        setInterval(simulateTemperature, 5000);
    }, 3000);
    
    // Chart animation
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => {
        const originalHeight = bar.style.height;
        bar.style.height = '0%';
        
        setTimeout(() => {
            bar.style.height = originalHeight;
        }, 500);
    });
});