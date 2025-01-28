// JavaScript to toggle dark/light mode
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

modeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Toggle the icon text between moon and sun
    if (body.classList.contains('dark-mode')) {
        modeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        modeToggle.innerHTML = '<i class="fa-solid fa-moon fa-rotate-by" style="--fa-rotate-angle: -20deg;"></i>';
    }
});

$(document).ready(function () {
    function displayTime() {
        let date = new Date();

        // Local time calculations
        let hh = date.getHours();
        let mm = date.getMinutes();
        let ss = date.getSeconds();
        let ampm = hh >= 12 ? 'PM' : 'AM';
        hh = hh % 12 || 12; // Convert 24-hour time to 12-hour format
        let time = `${hh.toString().padStart(2, '0')}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
        let time_between = `${ampm}`;
        $('#time').text(time);
        $('#time_between').text(time_between);

        // Update the analog clock
        let hRotation = 30 * hh + mm / 2;
        let mRotation = 6 * mm;
        let sRotation = 6 * ss;
        $('#hour').css('transform', `rotate(${hRotation}deg)`);
        $('#min').css('transform', `rotate(${mRotation}deg)`);
        $('#sec').css('transform', `rotate(${sRotation}deg)`);

        // Update the date
        const options = { day: '2-digit', month: 'short', year: 'numeric' };
        let currentDate = date.toLocaleDateString(undefined, options);
        $('#date').text(currentDate);
    }
    // Initial call to display time
    setInterval(displayTime, 1000);

    displayTime();
    const timezones = [
        // Africa
        "Africa/Cairo", "Africa/Nairobi", "Africa/Johannesburg", "Africa/Lagos", "Africa/Algiers", "Africa/Accra", "Africa/Abidjan",
        
        // America
        "America/New_York", "America/Los_Angeles", "America/Chicago", "America/Denver", "America/Argentina/Buenos_Aires", "America/Mexico_City",
        "America/Toronto", "America/Sao_Paulo", "America/Caracas", "America/Lima", "America/Chicago", "America/Edmonton",
        
        // Europe
        "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Rome", "Europe/Moscow", "Europe/Amsterdam", "Europe/Madrid",
        "Europe/Brussels", "Europe/Stockholm", "Europe/Zurich", "Europe/Vienna", "Europe/Oslo",
        
        // Asia
        "Asia/Kolkata", "Asia/Tokyo", "Asia/Seoul", "Asia/Shanghai", "Asia/Singapore", "Asia/Hong_Kong", "Asia/Kuala_Lumpur", 
        "Asia/Baghdad", "Asia/Dubai", "Asia/Jakarta", "Asia/Manila", "Asia/Karachi", "Asia/Taipei",
        
        // Australia
        "Australia/Sydney", "Australia/Melbourne", "Australia/Perth", "Australia/Brisbane",
        
        // Pacific
        "Pacific/Auckland", "Pacific/Fiji", "Pacific/Honolulu"
    ];
    
    

    // Populate the dropdown
    const timezoneDropdown = $('#timezone');
    timezones.forEach(zone => {
        timezoneDropdown.append(new Option(zone, zone));
    });

    // Function to update the time based on the selected timezone
    function updateOtherTimezoneTime() {
        const timezone = timezoneDropdown.val();
        const date = new Date().toLocaleDateString('en-US', { 
            timeZone: timezone, 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          });
          
        const times = new Date().toLocaleTimeString('en-US', { 
            timeZone: timezone, 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: true 
        });

        $('#location').html(`${timezone}</br>${date}`);
        $('#otherTime').html(`${times}`);
        

    }

    // Initial update and periodic updates
    timezoneDropdown.on('change', updateOtherTimezoneTime);
    setInterval(updateOtherTimezoneTime, 1000);

    // Trigger an initial time display
    updateOtherTimezoneTime();
    
});
