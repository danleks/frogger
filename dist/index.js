"use strict";
document.addEventListener('DOMContentLoaded', () => {
    let grid = document.querySelector('.grid');
    let cells = document.querySelectorAll('.grid > div');
    let frogger = document.querySelector('.frogger');
    let button = document.querySelector('#btn');
    let timing = document.querySelector('#timing > span');
    let carsLeft = document.querySelectorAll('[data-direction="_left_"]');
    let carsRight = document.querySelectorAll('[data-direction="_right_"]');
    let logsLeft = document.querySelectorAll('[data-direction="_left"]');
    let logsRight = document.querySelectorAll('[data-direction="_right"]');
    let currentTime = 20;
    let currentIndex = 76;
    let width = 9;
    let timerId;
    // cells.forEach((cell: HTMLElement, i: number) => {
    //    cell.textContent = i.toString()
    // })
    // move frogger with keyboard 
    function moveFrog(e) {
        cells[currentIndex].classList.remove('frogger');
        switch (e.key) {
            case 'ArrowUp':
                if (currentIndex - width >= 0)
                    currentIndex -= width;
                break;
            case 'ArrowDown':
                if (currentIndex + width < width * width)
                    currentIndex += width;
                break;
            case 'ArrowLeft':
                if (currentIndex % width > 0)
                    currentIndex -= 1;
                break;
            case 'ArrowRight':
                if (currentIndex % width < width - 1)
                    currentIndex += 1;
                break;
        }
        cells[currentIndex].classList.add('frogger');
        win();
        lose();
    }
    // auto move cars
    function autoMoveCars() {
        carsLeft.forEach((car) => moveCarsLeft(car));
        carsRight.forEach((car) => moveCarsRight(car));
    }
    // auto move logs
    function autoMoveLogs() {
        logsLeft.forEach((log) => moveLogsLeft(log));
        logsRight.forEach((log) => moveLogsRight(log));
    }
    // move cars to the left
    function moveCarsLeft(car) {
        switch (true) {
            case car.classList.contains('c'):
                car.classList.remove('c');
                car.classList.add('r1');
                break;
            case car.classList.contains('r1'):
                car.classList.remove('r1');
                car.classList.add('r2');
                break;
            case car.classList.contains('r2'):
                car.classList.remove('r2');
                car.classList.add('c');
                break;
        }
    }
    // move cars to the right
    function moveCarsRight(car) {
        switch (true) {
            case car.classList.contains('c'):
                car.classList.remove('c');
                car.classList.add('r2');
                break;
            case car.classList.contains('r1'):
                car.classList.remove('r1');
                car.classList.add('c');
                break;
            case car.classList.contains('r2'):
                car.classList.remove('r2');
                car.classList.add('r1');
                break;
        }
    }
    // move logs to the right
    function moveLogsRight(car) {
        switch (true) {
            case car.classList.contains('w1'):
                car.classList.remove('w1');
                car.classList.add('l5');
                break;
            case car.classList.contains('w2'):
                car.classList.remove('w2');
                car.classList.add('w1');
                break;
            case car.classList.contains('l3'):
                car.classList.remove('l3');
                car.classList.add('w2');
                break;
            case car.classList.contains('l4'):
                car.classList.remove('l4');
                car.classList.add('l3');
                break;
            case car.classList.contains('l5'):
                car.classList.remove('l5');
                car.classList.add('l4');
                break;
        }
    }
    // move logs to the left
    function moveLogsLeft(car) {
        switch (true) {
            case car.classList.contains('l5'):
                car.classList.remove('l5');
                car.classList.add('w1');
                break;
            case car.classList.contains('w1'):
                car.classList.remove('w1');
                car.classList.add('w2');
                break;
            case car.classList.contains('w2'):
                car.classList.remove('w2');
                car.classList.add('l3');
                break;
            case car.classList.contains('l3'):
                car.classList.remove('l3');
                car.classList.add('l4');
                break;
            case car.classList.contains('l4'):
                car.classList.remove('l4');
                car.classList.add('l5');
                break;
        }
    }
    // move frogger with a log to the left
    function moveWithLogLeft() {
        if (currentIndex > 27 && currentIndex <= 35) {
            cells[currentIndex].classList.remove('frogger');
            currentIndex--;
            cells[currentIndex].classList.add('frogger');
        }
    }
    // move frogger with a log to the right
    function moveWithLogRight() {
        if (currentIndex >= 18 && currentIndex < 26) {
            cells[currentIndex].classList.remove('frogger');
            currentIndex++;
            cells[currentIndex].classList.add('frogger');
        }
    }
    // detect win
    function win() {
        if (currentIndex === 4) {
            clearInterval(timerId);
            document.removeEventListener('keydown', moveFrog);
            alert('You won!');
        }
    }
    // detec lose
    function lose() {
        if (currentTime === 0
            || cells[currentIndex].classList.contains('c')
            || cells[currentIndex].classList.contains('w1')
            || cells[currentIndex].classList.contains('w2')) {
            clearInterval(timerId);
            document.removeEventListener('keydown', moveFrog);
            alert('You lost!');
        }
    }
    // run the game
    function play() {
        currentTime--;
        if (timing) {
            timing.textContent = currentTime.toString();
        }
        autoMoveCars();
        autoMoveLogs();
        moveWithLogLeft();
        moveWithLogRight();
        lose();
    }
    // start / pause the game when button pressed
    button === null || button === void 0 ? void 0 : button.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId);
            timerId = 0;
        }
        else {
            timerId = setInterval(play, 1000);
            document.addEventListener('keydown', moveFrog);
        }
    });
});
