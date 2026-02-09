$(document).ready(function() {
    // Heart emojis for floating animation
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💘', '💝', '💞', '💓', '💟', '🩷'];
    
    let clickCount = 0;
    const maxClicks = 8; // Number of clicks before hearts burst
    const moveDistancePercent = 12; // Percentage to move each click

    // Create floating hearts (existing background effect)
    function createFloatingHeart() {
        const heart = $('<div class="floating-heart"></div>');
        const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        const left = Math.random() * 100;
        const animationDuration = 4 + Math.random() * 4;
        const size = 16 + Math.random() * 24;

        heart.text(emoji);
        heart.css({
            left: left + '%',
            fontSize: size + 'px',
            animationDuration: animationDuration + 's'
        });

        $('#heartsContainer').append(heart);

        // Remove heart after animation
        setTimeout(function() {
            heart.remove();
        }, animationDuration * 1000);
    }

    // Start creating floating hearts continuously
    setInterval(createFloatingHeart, 300);

    // Create initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(createFloatingHeart, i * 200);
    }

    // Celebration hearts burst
    function createCelebrationBurst() {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const numberOfHearts = 50; // Create many hearts

        for (let i = 0; i < numberOfHearts; i++) {
            setTimeout(function() {
                const heart = $('<div class="celebration-heart"></div>');
                const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
                
                // Random direction for burst effect
                const angle = (Math.PI * 2 * i) / numberOfHearts;
                const distance = 200 + Math.random() * 300;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;

                heart.text(emoji);
                heart.css({
                    left: centerX + 'px',
                    top: centerY + 'px',
                    '--tx': tx + 'px',
                    '--ty': ty + 'px'
                });

                $('body').append(heart);

                // Remove heart after animation
                setTimeout(function() {
                    heart.remove();
                }, 2000);
            }, i * 30);
        }
    }

    // Move button click handler
    $('#moveBtn').on('click', function() {
        clickCount++;

        // Calculate new positions using viewport width percentages
        const windowWidth = $(window).width();
        const moveDistance = (windowWidth * moveDistancePercent) / 100;
        
        const currentPerson1Left = parseInt($('#person1').css('left')) || 50;
        const currentPerson2Right = parseInt($('#person2').css('right')) || 50;
        
        const newPerson1Left = currentPerson1Left + moveDistance;
        const newPerson2Right = currentPerson2Right + moveDistance;

        // Move the images closer with animation
        $('#person1').css('left', newPerson1Left + 'px');
        $('#person2').css('right', newPerson2Right + 'px');

        console.log(`Click ${clickCount}: Person1 at ${newPerson1Left}px, Person2 at ${newPerson2Right}px from right`);

        // Check if they've met
        if (clickCount >= maxClicks) {
            // Hide person images
            $('#person1').fadeOut(600);
            $('#person2').fadeOut(600);
            
            // Show together image after a delay
            setTimeout(function() {
                $('#together').addClass('show');
            }, 700);
            
            // Hide button
            $(this).fadeOut(800);

            // Wait for animation to complete, then burst hearts
            setTimeout(function() {
                createCelebrationBurst();
                
                // Create multiple bursts for extra effect
                setTimeout(createCelebrationBurst, 500);
                setTimeout(createCelebrationBurst, 1000);
            }, 1500);
        } else {
            // Update button text with progress
            const remaining = maxClicks - clickCount;
            $(this).text(`Bring Them Closer 💕 (${remaining} more)`);
        }
    });
});
