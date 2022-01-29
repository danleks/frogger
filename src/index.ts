document.addEventListener('DOMContentLoaded', () => {
    let grid = document.querySelector<HTMLElement>('.grid')
    let cells = document.querySelectorAll<HTMLElement>('.grid > div')
    let frogger = document.querySelector<HTMLElement>('.frogger')
    let button = document.querySelector<HTMLElement>('#btn')
    let timing = document.querySelector<HTMLElement>('#timing > span')
    let carsLeft = document.querySelectorAll<HTMLElement>('[data-direction="_left_"]')
    let carsRight = document.querySelectorAll<HTMLElement>('[data-direction="_right_"]')
    let logsLeft = document.querySelectorAll<HTMLElement>('[data-direction="_left"]')
    let logsRight = document.querySelectorAll<HTMLElement>('[data-direction="_right"]')

    let currentTime: number = 20
    let currentIndex: number = 76
    let width: number = 9
    let timerId: number
    
    // cells.forEach((cell: HTMLElement, i: number) => {
    //    cell.textContent = i.toString()
    // })

    // move frogger with keyboard 
    function moveFrog(e: KeyboardEvent):void {
        cells[currentIndex].classList.remove('frogger')
        switch(e.key) {
            case 'ArrowUp':
                if (currentIndex - width >= 0) currentIndex -=width
                break
            case 'ArrowDown':
                if(currentIndex + width < width * width) currentIndex +=width
                break
            case 'ArrowLeft':
                if(currentIndex % width > 0) currentIndex -=1
                break
            case 'ArrowRight':
                if(currentIndex % width < width - 1) currentIndex +=1
                break
        }
        cells[currentIndex].classList.add('frogger')
        win()
        lose()
    }

    // auto move cars
    function autoMoveCars():void {
        carsLeft.forEach((car: HTMLElement) => moveCarsLeft(car))
        carsRight.forEach((car: HTMLElement) => moveCarsRight(car))

    }

    // auto move logs
    function autoMoveLogs():void {
        logsLeft.forEach((log: HTMLElement) => moveLogsLeft(log))
        logsRight.forEach((log: HTMLElement) => moveLogsRight(log))

    }

    // move cars to the left
    function moveCarsLeft(car: HTMLElement):void {
        switch(true) {
            case car.classList.contains('c'):
                car.classList.remove('c')
                car.classList.add('r1')
                break
            case car.classList.contains('r1'):
                car.classList.remove('r1')
                car.classList.add('r2')
                break
            case car.classList.contains('r2'):
                car.classList.remove('r2')
                car.classList.add('c')
                break
        }
    }

    // move cars to the right
    function moveCarsRight(car: HTMLElement):void {
        switch(true) {
            case car.classList.contains('c'):
                car.classList.remove('c')
                car.classList.add('r2')
                break
            case car.classList.contains('r1'):
                car.classList.remove('r1')
                car.classList.add('c')
                break
            case car.classList.contains('r2'):
                car.classList.remove('r2')
                car.classList.add('r1')
                break
        }
    }

    // move logs to the right
    function moveLogsRight(car: HTMLElement):void {
        switch(true) {
            case car.classList.contains('w1'):
                car.classList.remove('w1')
                car.classList.add('l5')
                break
            case car.classList.contains('w2'):
                car.classList.remove('w2')
                car.classList.add('w1')
                break
            case car.classList.contains('l3'):
                car.classList.remove('l3')
                car.classList.add('w2')
                break
            case car.classList.contains('l4'):
                car.classList.remove('l4')
                car.classList.add('l3')
                break
            case car.classList.contains('l5'):
                car.classList.remove('l5')
                car.classList.add('l4')
                break
        }
    }

    // move logs to the left
    function moveLogsLeft(car: HTMLElement):void {
        switch(true) {
            case car.classList.contains('l5'):
                car.classList.remove('l5')
                car.classList.add('w1')
                break
            case car.classList.contains('w1'):
                car.classList.remove('w1')
                car.classList.add('w2')
                break
            case car.classList.contains('w2'):
                car.classList.remove('w2')
                car.classList.add('l3')
                break
            case car.classList.contains('l3'):
                car.classList.remove('l3')
                car.classList.add('l4')
                break
            case car.classList.contains('l4'):
                car.classList.remove('l4')
                car.classList.add('l5')
                break
        }
    }

    // move frogger with a log to the left
    function moveWithLogLeft():void {
        if (currentIndex > 27 && currentIndex <=35) {
            cells[currentIndex].classList.remove('frogger')
            currentIndex--
            cells[currentIndex].classList.add('frogger')
        }
    }

    // move frogger with a log to the right
    function moveWithLogRight():void {
        if (currentIndex >= 18 && currentIndex < 26) {
            cells[currentIndex].classList.remove('frogger')
            currentIndex++
            cells[currentIndex].classList.add('frogger')
        }
    }

    // detect win
    function win():void {
        if(currentIndex === 4) {
            clearInterval(timerId)
            document.removeEventListener('keydown', moveFrog)
            alert('You won!')
        }
    }

    // detec lose
    function lose():void {
        if (currentTime === 0 
            || cells[currentIndex].classList.contains('c')
            || cells[currentIndex].classList.contains('w1')
            || cells[currentIndex].classList.contains('w2')
            ) {
                clearInterval(timerId)
                document.removeEventListener('keydown', moveFrog)
                alert('You lost!')
            }
    }
  
    // run the game
    function play() {
        currentTime--
        if (timing) {
            timing.textContent = currentTime.toString()
        }
        autoMoveCars()
        autoMoveLogs()
        moveWithLogLeft()
        moveWithLogRight()
        lose()
    }

    // start / pause the game when button pressed
    button?.addEventListener('click', () => {
        if (timerId) {
            clearInterval(timerId)
            timerId = 0
        } else {
            timerId = setInterval(play, 1000)
            document.addEventListener('keydown', moveFrog)
        }
    })

   
})
