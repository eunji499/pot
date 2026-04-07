document.addEventListener

const canvas = document.getElementById('distortionCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let mouse = { x: -100, y: -100 };
let baseTexture;

// 1. 사용할 이미지 객체를 만들고 경로를 설정합니다.
const backgroundImage = new Image();
backgroundImage.src = 'image_7cca6e.png'; // 파일 이름이 다르다면 여기를 수정해 주세요!

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    
    // 이미지가 이미 로드된 상태라면 텍스처를 화면 크기에 맞게 다시 만듭니다.
    if (backgroundImage.complete) {
        createBaseTexture();
    }
}

// 2. 이미지를 캔버스에 그리는 함수
function createBaseTexture() {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');

    // 불러온 이미지를 캔버스의 너비와 높이에 꽉 차게 그립니다.
    tempCtx.drawImage(backgroundImage, 0, 0, width, height);

    // 그려진 이미지의 픽셀 데이터를 가져와 baseTexture에 저장합니다.
    baseTexture = tempCtx.getImageData(0, 0, width, height);
}

// 3. 이미지가 완전히 로드된 후에 애니메이션을 시작합니다.
backgroundImage.onload = () => {
    resize(); // 캔버스 크기를 맞추고 텍스처를 생성합니다.
    animate(); // 일렁임 효과 시작!
};

// 마우스 위치 추적
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// 왜곡 애니메이션 루프 (이전과 동일합니다)
function animate() {
    ctx.clearRect(0, 0, width, height);

    if (baseTexture) {
        const distortedImageData = ctx.createImageData(width, height);
        const sourceData = baseTexture.data;
        const destData = distortedImageData.data;

        const distortionRadius = 200; // 왜곡 반경
        const distortionStrength = 15; // 왜곡 강도

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const dx = x - mouse.x;
                const dy = y - mouse.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                let sourceX = x;
                let sourceY = y;

                if (distance < distortionRadius) {
                    const power = 1 - (distance / distortionRadius);
                    const angle = Math.atan2(dy, dx);

                    sourceX += Math.cos(angle) * distortionStrength * power;
                    sourceY += Math.sin(angle) * distortionStrength * power;

                    sourceX = Math.max(0, Math.min(width - 1, sourceX));
                    sourceY = Math.max(0, Math.min(height - 1, sourceY));
                }

                const sourceIdx = (Math.round(sourceY) * width + Math.round(sourceX)) * 4;
                const destIdx = (y * width + x) * 4;

                destData[destIdx] = sourceData[sourceIdx];
                destData[destIdx + 1] = sourceData[sourceIdx + 1];
                destData[destIdx + 2] = sourceData[sourceIdx + 2];
                destData[destIdx + 3] = sourceData[sourceIdx + 3];
            }
        }

        ctx.putImageData(distortedImageData, 0, 0);
    }

    requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);