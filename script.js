let countingInterval = null;
let speed = 1000; // Tốc độ mặc định là Trung bình (1000ms)
let lastBeepNumber = null; // Lưu số đã phát âm thanh của vòng trước
let roundCount = 0; // Biến đếm số vòng

// Tham chiếu các phần tử HTML
const counterElement = document.getElementById("counter");
const roundCounterElement = document.getElementById("round-counter");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const speedButton = document.getElementById("speed-button");
const resetButton = document.getElementById("reset-button"); // Nút kết thúc

// Hàm phát âm thanh
function playSound() {
    const audio = document.getElementById("beep-sound");
    audio.currentTime = 0; // Đặt lại thời gian phát về 0 để có thể phát lại liên tục
    audio.play().catch((error) => {
        console.error("Lỗi khi phát âm thanh:", error);
    });
}

// Hàm lấy số ngẫu nhiên cho phát âm thanh
function getRandomBeepNumber() {
    let randomNum;

    // Tăng xác suất phát âm thanh ở các số lớn hơn nếu lần trước là số nhỏ
    if (lastBeepNumber === 1) {
        randomNum = Math.floor(Math.random() * 3) + 3; // Chọn từ 3-5
    } else if (lastBeepNumber === 2) {
        randomNum = Math.floor(Math.random() * 3) + 3; // Chọn từ 3-5
    } else if (lastBeepNumber === 5) {
        randomNum = Math.floor(Math.random() * 4) + 2; // Chọn từ 2-5
    } else {
        randomNum = Math.floor(Math.random() * 5) + 1; // Chọn từ 1-5
    }

    return randomNum;
}

// Hàm bắt đầu đếm
function startCounting() {
    let count = 1;
    const chosenNumber = getRandomBeepNumber();
    counterElement.innerText = count;

    countingInterval = setInterval(() => {
        counterElement.innerText = count;

        // Kiểm tra nếu đến số đã chọn để phát âm thanh
        if (count === chosenNumber) {
            playSound();
            lastBeepNumber = chosenNumber; // Cập nhật số đã phát âm thanh
        }

        count++;
        if (count > 5) {
            roundCount++; // Tăng số vòng mỗi khi đếm xong từ 1 đến 5
            roundCounterElement.innerText = `Số vòng: ${roundCount}`; // Cập nhật số vòng
            clearInterval(countingInterval);
            setTimeout(startCounting, 2000); // Dừng 2 giây trước khi bắt đầu vòng mới
        }
    }, speed);
}

// Nút bắt đầu
startButton.addEventListener("click", () => {
    if (countingInterval) {
        clearInterval(countingInterval);
    }
    startCounting();
});

// Nút dừng
stopButton.addEventListener("click", () => {
    if (countingInterval) {
        clearInterval(countingInterval);
        countingInterval = null;
        counterElement.innerText = "Dừng lại";
    }
});

// Nút điều chỉnh tốc độ
speedButton.addEventListener("click", () => {
    if (speed === 1000) {
        speed = 500; // Nhanh
        speedButton.innerText = "Tốc độ: Nhanh";
    } else if (speed === 500) {
        speed = 1500; // Chậm
        speedButton.innerText = "Tốc độ: Chậm";
    } else {
        speed = 1000; // Trung bình
        speedButton.innerText = "Tốc độ: Trung bình";
    }
});

// Nút kết thúc (reset) – Dừng và đưa số vòng về 0
resetButton.addEventListener("click", () => {
    // Dừng tất cả
    if (countingInterval) {
        clearInterval(countingInterval);
        countingInterval = null;
    }
    // Đặt lại số vòng về 0
    roundCount = 0;
    roundCounterElement.innerText = `Số vòng: ${roundCount}`;
    counterElement.innerText = "Bắt đầu"; // Đặt lại giá trị của đếm
});
