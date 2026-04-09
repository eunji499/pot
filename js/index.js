document.addEventListener("DOMContentLoaded", () => {

// const canvas = document.getElementById('distortionCanvas');
// const ctx = canvas.getContext('2d');

// let width, height;
// let mouse = { x: -100, y: -100 };
// let baseTexture;

// // 1. 사용할 이미지 객체를 만들고 경로를 설정합니다.
// const backgroundImage = new Image();
// backgroundImage.src = 'image_7cca6e.png'; // 파일 이름이 다르다면 여기를 수정해 주세요!

// function resize() {
//     width = canvas.width = window.innerWidth;
//     height = canvas.height = window.innerHeight;
    
//     // 이미지가 이미 로드된 상태라면 텍스처를 화면 크기에 맞게 다시 만듭니다.
//     if (backgroundImage.complete) {
//         createBaseTexture();
//     }
// }

// // 2. 이미지를 캔버스에 그리는 함수
// function createBaseTexture() {
//     const tempCanvas = document.createElement('canvas');
//     tempCanvas.width = width;
//     tempCanvas.height = height;
//     const tempCtx = tempCanvas.getContext('2d');

//     // 불러온 이미지를 캔버스의 너비와 높이에 꽉 차게 그립니다.
//     tempCtx.drawImage(backgroundImage, 0, 0, width, height);

//     // 그려진 이미지의 픽셀 데이터를 가져와 baseTexture에 저장합니다.
//     baseTexture = tempCtx.getImageData(0, 0, width, height);
// }

// // 3. 이미지가 완전히 로드된 후에 애니메이션을 시작합니다.
// backgroundImage.onload = () => {
//     resize(); // 캔버스 크기를 맞추고 텍스처를 생성합니다.
//     animate(); // 일렁임 효과 시작!
// };

// // 마우스 위치 추적
// window.addEventListener('mousemove', (e) => {
//     mouse.x = e.clientX;
//     mouse.y = e.clientY;
// });

// // 왜곡 애니메이션 루프 (이전과 동일합니다)
// function animate() {
//     ctx.clearRect(0, 0, width, height);

//     if (baseTexture) {
//         const distortedImageData = ctx.createImageData(width, height);
//         const sourceData = baseTexture.data;
//         const destData = distortedImageData.data;

//         const distortionRadius = 200; // 왜곡 반경
//         const distortionStrength = 15; // 왜곡 강도

//         for (let y = 0; y < height; y++) {
//             for (let x = 0; x < width; x++) {
//                 const dx = x - mouse.x;
//                 const dy = y - mouse.y;
//                 const distance = Math.sqrt(dx * dx + dy * dy);

//                 let sourceX = x;
//                 let sourceY = y;

//                 if (distance < distortionRadius) {
//                     const power = 1 - (distance / distortionRadius);
//                     const angle = Math.atan2(dy, dx);

//                     sourceX += Math.cos(angle) * distortionStrength * power;
//                     sourceY += Math.sin(angle) * distortionStrength * power;

//                     sourceX = Math.max(0, Math.min(width - 1, sourceX));
//                     sourceY = Math.max(0, Math.min(height - 1, sourceY));
//                 }

//                 const sourceIdx = (Math.round(sourceY) * width + Math.round(sourceX)) * 4;
//                 const destIdx = (y * width + x) * 4;

//                 destData[destIdx] = sourceData[sourceIdx];
//                 destData[destIdx + 1] = sourceData[sourceIdx + 1];
//                 destData[destIdx + 2] = sourceData[sourceIdx + 2];
//                 destData[destIdx + 3] = sourceData[sourceIdx + 3];
//             }
//         }

//         ctx.putImageData(distortedImageData, 0, 0);
//     }

//     requestAnimationFrame(animate);
// }

// window.addEventListener('resize', resize);

 

    // 열쇠 두둥실 애니메이션
        
    const floatingKey = document.querySelector('.key');

        // 위아래 두둥실
        gsap.to(floatingKey, {
            duration: 3, 
            y: "-=20", 
            x: "-=10", 
            repeat: -1, 
            yoyo: true, 
            ease: "sine.inOut" 
            
        });

// 웰컴 버튼 
        const btnConcept = document.getElementById('btnConcept');
        const btnColorsFonts = document.getElementById('btnColorsFonts');
        
        const modalConcept = document.getElementById('modalConcept');
        const modalColorsFonts = document.getElementById('modalColorsFonts');
        
        const closeConcept = document.getElementById('closeConcept');
        const closeColorsFonts = document.getElementById('closeColorsFonts');

        // 2. 모달 열기 이벤트
        btnConcept.addEventListener('click', () => modalConcept.classList.add('active'));
        btnColorsFonts.addEventListener('click', () => modalColorsFonts.classList.add('active'));

        // 3. 모달 닫기 이벤트 (X 버튼)
        closeConcept.addEventListener('click', () => modalConcept.classList.remove('active'));
        closeColorsFonts.addEventListener('click', () => modalColorsFonts.classList.remove('active'));

        // 4. 모달 닫기 이벤트 (바깥 어두운 배경 클릭 시)
        window.addEventListener('click', (event) => {
            if (event.target === modalConcept) modalConcept.classList.remove('active');
            if (event.target === modalColorsFonts) modalColorsFonts.classList.remove('active');
        });


        // 팝업 영역

        // 1. 화면에 있는 모든 '클릭 가능한 포스터'를 찾아서 가져옴
        const posters = document.querySelectorAll('.clickable-poster');

        // 2. 각각의 포스터에 클릭 이벤트를 달아줌
        posters.forEach(poster => {
            poster.addEventListener('click', function() {
                
                // 3. 방금 클릭한 포스터에서 숨겨둔 제목과 설명글 데이터를 가져옴
                const newTitle = this.getAttribute('data-title');
                const newDesc = this.getAttribute('data-desc');

                // 4. 클릭한 포스터가 속해있는 '전체 블록(.portfolio-block)'을 찾음
                // (이렇게 해야 다른 블록의 텍스트가 실수로 바뀌는 걸 막을 수 있어!)
                const parentBlock = this.closest('.portfolio-block');

                // 5. 그 블록 안에 있는 제목과 설명글 태그를 찾음
                const titleText = parentBlock.querySelector('.info-title-text');
                const descText = parentBlock.querySelector('.info-desc-text');

                // 6. 찾은 태그의 텍스트를 새 데이터로 쓱 교체!
                titleText.textContent = newTitle;
                descText.innerHTML = newDesc; // <br> 태그가 작동하도록 innerHTML 사용

                // 7. 시각적 강조 효과 (테두리 이동)
                // 같은 블록 안에 있는 다른 포스터들의 'active' 상태를 다 지워주고...
                const siblingPosters = parentBlock.querySelectorAll('.clickable-poster');
                siblingPosters.forEach(p => p.classList.remove('active'));
                
                // 방금 클릭한 포스터에만 'active' 상태를 줌
                this.classList.add('active');
            });
        });





        // === ⭐️ 마우스에 반응하는 탄성 선 (Elastic Line) 효과 ===

        const container = document.getElementById('elasticLineContainer');
        const path = document.getElementById('elasticPath');

        // 컨테이너의 너비와 높이 설정
        let width = container.clientWidth;
        let height = 100;
        let centerY = height / 2; // 선이 평상시에 머무를 중앙 Y 좌표 (50)

        // 제어점 (현재 선이 구부러져 있는 위치)
        let cx = width / 2;
        let cy = centerY;

        // 목표점 (마우스가 있는 곳, 제어점이 따라가야 할 위치)
        let targetX = width / 2;
        let targetY = centerY;

        // 물리 엔진용 변수 (가속도, 탄성, 마찰)
        let vY = 0;
        const spring = 0.05;  // 탄성력 (높을수록 짱짱하게 튕김)
        const friction = 0.9; // 마찰력 (1에 가까울수록 오래 튕기고, 낮으면 금방 멈춤)

        // 브라우저 크기가 바뀔 때 선의 길이도 업데이트
        window.addEventListener('resize', () => {
            width = container.clientWidth;
        });

        // 1. 마우스가 영역 안에서 움직일 때 목표점(Target) 업데이트
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            targetX = e.clientX - rect.left; // 마우스의 X 위치
            targetY = e.clientY - rect.top;  // 마우스의 Y 위치
        });

        // 2. 마우스가 영역을 벗어나면 목표점을 다시 중앙으로 돌려보냄
        container.addEventListener('mouseleave', () => {
            targetX = width / 2; // X는 중앙으로
            targetY = centerY;   // Y도 원래 선 위치로
        });

        // 3. 1초에 60번씩 실행되며 선을 그리는 애니메이션 루프
        function animateLine() {
            // X축은 부드럽게 마우스를 따라감 (Lerp)
            cx += (targetX - cx) * 0.1;

            // Y축은 용수철(Spring) 물리 공식을 적용해 튕기게 함
            let dy = targetY - cy;
            vY += dy * spring; // 목표점과의 거리에 비례해 가속도 증가
            vY *= friction;    // 마찰력으로 점점 느려지게 함
            cy += vY;

            // SVG Path의 곡선 그리기 명령어 (M: 시작점, Q: 제어점, 도착점)
            // 양 끝은 고정되어 있고 중간(cx, cy)만 마우스를 따라 당겨짐
            const d = `M 0 ${centerY} Q ${cx} ${cy} ${width} ${centerY}`;
            path.setAttribute('d', d);

            // 다음 프레임 계속 호출
            requestAnimationFrame(animateLine);
        }

        // 애니메이션 시작!
        animateLine();



        });