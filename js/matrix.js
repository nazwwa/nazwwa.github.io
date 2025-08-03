let canvas = document.getElementById('canvas-matrix');
let ctx = canvas.getContext('2d');
let fontSize = 10;
let columns = canvas.width / fontSize;
let letters = 'HAPPY BIRTHDAY TO YOU ❤'.split('');
let drops = [];
let animationInterval = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = canvas.width / fontSize;
    drops = Array.from({ length: columns }, () => 1);
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < drops.length; i++) {
        let text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = '#ff5ba5';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
            drops[i] = 0;
        }
    }
}

function startMatrixAnimation() {
    if (animationInterval) return; // biar ga dobel
    resizeCanvas();
    animationInterval = setInterval(drawMatrix, 56);
}

function stopMatrixAnimation() {
    clearInterval(animationInterval);
    animationInterval = null;
}

// Auto-resize pas layar diganti
window.addEventListener('resize', () => {
    resizeCanvas();
});
