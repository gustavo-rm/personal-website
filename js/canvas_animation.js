var canvas = document.getElementById('canvas-anim'),
    ctx = canvas.getContext('2d');

var BALL_NUM = 40;
var R = 3;
var balls = [];
var alpha_f = 0.03;
var link_line_width = 0.8;
var dis_limit = 300;
var mouse_in = false;
var mouse_ball = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 0,
    type: 'mouse'
};

// Função para redimensionar o canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (window.innerWidth <= 768) { // Tamanho típico para smartphones
        BALL_NUM = 30;
        dis_limit = 150;
    } else if (window.innerWidth <= 1024) { // Tamanho típico para tablets
        BALL_NUM = 35;
        dis_limit = 220;
    } else { // Para telas maiores (desktops)
        BALL_NUM = 45;
        dis_limit = 320;
    }
}

resizeCanvas(); // Chama a função uma vez ao carregar a página
window.addEventListener('resize', resizeCanvas); // Redimensiona ao mudar o tamanho da janela

// Funções auxiliares
function getRandomSpeed(pos) {
    var min = -1, max = 1;
    switch (pos) {
        case 'top': return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
        case 'right': return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
        case 'bottom': return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
        case 'left': return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
    }
}

function randomArrayItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumFrom(min, max) {
    return Math.random() * (max - min) + min;
}

function randomSidePos(length) {
    return Math.ceil(Math.random() * length);
}

// Função para criar bolas aleatórias
function getRandomBall() {
    var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
    switch (pos) {
        case 'top': return { x: randomSidePos(canvas.width), y: -R, vx: getRandomSpeed('top')[0], vy: getRandomSpeed('top')[1], r: R, alpha: 1, phase: randomNumFrom(0, 10) };
        case 'right': return { x: canvas.width + R, y: randomSidePos(canvas.height), vx: getRandomSpeed('right')[0], vy: getRandomSpeed('right')[1], r: R, alpha: 1, phase: randomNumFrom(0, 10) };
        case 'bottom': return { x: randomSidePos(canvas.width), y: canvas.height + R, vx: getRandomSpeed('bottom')[0], vy: getRandomSpeed('bottom')[1], r: R, alpha: 1, phase: randomNumFrom(0, 10) };
        case 'left': return { x: -R, y: randomSidePos(canvas.height), vx: getRandomSpeed('left')[0], vy: getRandomSpeed('left')[1], r: R, alpha: 1, phase: randomNumFrom(0, 10) };
    }
}

// Função para desenhar bolas
function renderBalls() {
    balls.forEach(function (b) {
        if (!b.hasOwnProperty('type')) {
            ctx.fillStyle = `rgba(63, 58, 100, ${b.alpha})`;
            ctx.beginPath();
            ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
    });
}

// Função para atualizar as bolas
function updateBalls() {
    var new_balls = [];
    balls.forEach(function (b) {
        b.x += b.vx;
        b.y += b.vy;
        if (b.x > -50 && b.x < canvas.width + 50 && b.y > -50 && b.y < canvas.height + 50) {
            new_balls.push(b);
        }
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
    });
    balls = new_balls;
}

// Função para desenhar linhas entre as bolas
function renderLines() {
    for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {
            var fraction = getDisOf(balls[i], balls[j]) / dis_limit;
            if (fraction < 1) {
                var alpha = (1 - fraction).toString();
                ctx.strokeStyle = `rgba(150, 150, 150, ${alpha})`;
                ctx.lineWidth = link_line_width;
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// Função para calcular a distância entre dois pontos
function getDisOf(b1, b2) {
    var delta_x = Math.abs(b1.x - b2.x),
        delta_y = Math.abs(b1.y - b2.y);
    return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
}

// Adiciona novas bolas se necessário
function addBallIfy() {
    if (balls.length < BALL_NUM) {
        balls.push(getRandomBall());
    }
}

// Função principal de renderização
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderBalls();
    renderLines();
    updateBalls();
    addBallIfy();
    window.requestAnimationFrame(render);
}

// Inicializa as bolas
function initBalls(num) {
    for (var i = 0; i < num; i++) {
        balls.push(getRandomBall());
    }
}

// Inicia a animação
function goMovie() {
    resizeCanvas();
    initBalls(BALL_NUM);
    window.requestAnimationFrame(render);
}

goMovie();

// Efeitos do mouse
canvas.addEventListener('mouseenter', function () {
    mouse_in = true;
    balls.push(mouse_ball);
});

canvas.addEventListener('mouseleave', function () {
    mouse_in = false;
    balls = balls.filter(b => !b.hasOwnProperty('type'));
});

canvas.addEventListener('mousemove', function (e) {
    mouse_ball.x = e.pageX;
    mouse_ball.y = e.pageY;
});
