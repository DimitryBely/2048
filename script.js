"use strict";
window.addEventListener( 'DOMContentLoaded', () => {
    const   canvas = document.querySelector('#canvas'),
            canvasScore = document.querySelector('#score'),
            ctx = canvas.getContext('2d'),
            ctxScore = canvasScore.getContext('2d'),
            colors = ['#4AD043', '#287A29', '#15473D', '#274379', '#192369',
                      '#4D1C7D', '#863980', '#5E1A2F', '#7A1818', '#A8320D',
                      '#D56E23', '#BEB709', '#9FAB11', '#010116'];

    let score = 0,
        numbers = [[0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0]],
        mouseX_start, mouseY_start,
        mouseX_end, mouseY_end;

    let scoreCounterInterval = setInterval(setScore, 100);

    spawnNumber();
    spawnNumber();
    spawnNumber();
    spawnNumber();

    document.querySelector('body').addEventListener( 'mousedown', function (event) {
      mouseX_start = event.screenX;
      mouseY_start = event.screenY;
    });

    document.querySelector('body').addEventListener( 'mouseup', function (event) {
      mouseX_end = event.screenX;
      mouseY_end = event.screenY;

      if( (mouseX_start - mouseX_end > 100) && ( (mouseY_start - mouseY_end < 100) && (mouseY_start - mouseY_end > -100) ) ){
        moveLeft();
      } else if( (mouseX_start - mouseX_end < -100) && ( (mouseY_start - mouseY_end < 100) && (mouseY_start - mouseY_end > -100) ) ){
        moveRight();
      } else if( ( (mouseX_start - mouseX_end < 100) && (mouseX_start - mouseX_end > -100) ) && (mouseY_start - mouseY_end > 100) ){
        moveUp();
      } else if( ( (mouseX_start - mouseX_end < 100) && (mouseX_start - mouseX_end > -100) ) && (mouseY_start - mouseY_end < -100) ){
        moveDown();
      }
    });

    document.querySelector('body').addEventListener( 'touchstart', function (event) {
      event.preventDefault();
      event.stopPropagation();
      mouseX_start = event.changedTouches[0].pageX;
      mouseY_start = event.changedTouches[0].pageY;
    });

    document.querySelector('body').addEventListener( 'touchend', function (event) {
      event.preventDefault();
      event.stopPropagation();
      mouseX_end = event.changedTouches[0].pageX;
      mouseY_end = event.changedTouches[0].pageY;

      if( (mouseX_start - mouseX_end > 100) && ( (mouseY_start - mouseY_end < 100) && (mouseY_start - mouseY_end > -100) ) ){
        moveLeft();
      } else if( (mouseX_start - mouseX_end < -100) && ( (mouseY_start - mouseY_end < 100) && (mouseY_start - mouseY_end > -100) ) ){
        moveRight();
      } else if( ( (mouseX_start - mouseX_end < 100) && (mouseX_start - mouseX_end > -100) ) && (mouseY_start - mouseY_end > 100) ){
        moveUp();
      } else if( ( (mouseX_start - mouseX_end < 100) && (mouseX_start - mouseX_end > -100) ) && (mouseY_start - mouseY_end < -100) ){
        moveDown();
      }
    });

    function moveLeft () {
      ctx.beginPath();
        ctx.clearRect(0, 0, 250, 250);
      ctx.closePath();

      for(let row = 0; row < numbers.length; row++){
        for(let i = 0; i < numbers.length - 1; i++){
          for(let column = 0; column < numbers.length - 1; column++){
            if(numbers[column][row] != 0){
              if(numbers[column][row] == numbers[column + 1][row]){
                numbers[column][row] *= 2;
                numbers[column + 1][row] = 0;
              }
            } else {
              numbers[column][row] = numbers[column + 1][row];
              numbers[column + 1][row] = 0;
            }
          }
        }
      }

      for(let row = 0; row < numbers.length; row++){
        for(let column = 0; column < numbers.length; column++){
          if(numbers[row][column] != 0){
            drawNumber(row, column, numbers[row][column]);
          }
        }
      }

      spawnNumber();
    }

    function moveRight () {
      ctx.beginPath();
        ctx.clearRect(0, 0, 250, 250);
      ctx.closePath();

      for(let row = 0; row < numbers.length; row++){
        for(let i = 0; i < numbers.length - 1; i++){
          for(let column = numbers.length - 1; column > 0; column--){
            if(numbers[column][row] != 0){
              if(numbers[column][row] == numbers[column - 1][row]){
                numbers[column][row] *= 2;
                numbers[column - 1][row] = 0;
              }
            } else {
              numbers[column][row] = numbers[column - 1][row];
              numbers[column - 1][row] = 0;
            }
          }
        }
      }

      for(let row = 0; row < numbers.length; row++){
        for(let column = 0; column < numbers.length; column++){
          if(numbers[row][column] != 0){
            drawNumber(row, column, numbers[row][column]);
          }
        }
      }

      spawnNumber();
    }

    function moveUp () {
      ctx.beginPath();
        ctx.clearRect(0, 0, 250, 250);
      ctx.closePath();

      for(let row = 0; row < numbers.length; row++){
        for(let j = 0; j < numbers.length - 1; j++){
          for(let i = 0; i < numbers.length - 1; i++){
            if(numbers[row][i] != 0){
              if(numbers[row][i] == numbers[row][i + 1]){
                numbers[row][i] *= 2;
                numbers[row][i + 1] = 0;
              }
            } else {
              numbers[row][i] = numbers[row][i + 1];
              numbers[row][i + 1] = 0;
            }
          }
        }
      }

      for(let row = 0; row < numbers.length; row++){
        for(let column = 0; column < numbers.length; column++){
          if(numbers[row][column] != 0){
            drawNumber(row, column, numbers[row][column]);
          }
        }
      }

      spawnNumber();
    }

    function moveDown () {
      ctx.beginPath();
        ctx.clearRect(0, 0, 250, 250);
      ctx.closePath();

      for(let row = 0; row < numbers.length; row++){
        for(let j = 0; j < numbers.length - 1; j++){
          for(let i = numbers.length; i > 0; i--){
            if(numbers[row][i] != 0){
              if(numbers[row][i] == numbers[row][i - 1]){
                numbers[row][i] *= 2;
                numbers[row][i - 1] = 0;
              }
            } else {
              numbers[row][i] = numbers[row][i - 1];
              numbers[row][i - 1] = 0;
            }
          }
        }
      }

      for(let row = 0; row < numbers.length; row++){
        for(let column = 0; column < numbers.length; column++){
          if(numbers[row][column] != 0){
            drawNumber(row, column, numbers[row][column]);
          }
        }
      }

      spawnNumber();
    }

    function drawNumber (row, column, num) {
      let x = 50 * row,
          y = 50 * column;

      let counter = 0;
      for(let i = 2; i < num; i *= 2){
        counter++;
      }

      let paddingX = 20,
          paddingY = 32,
          fontSize = '20px';

      if(num.toString().length == 2){
        paddingX = 14;
        paddingY = 32;
        fontSize = '18px';
      } else if(num.toString().length == 3){
        paddingX = 11;
        paddingY = 32;
        fontSize = '16px';
      } else if(num.toString().length == 4){
        paddingX = 9;
        paddingY = 30;
        fontSize = '14px';
      } else if(num.toString().length == 5){
        paddingX = 8;
        paddingY = 30;
        fontSize = '12px';
      } else if(num.toString().length == 6){
        paddingX = 5;
        paddingY = 30;
        fontSize = '12px';
      }

      ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.fillStyle = colors[counter];
        ctx.fillRect(x + 1, y + 1, 50 - 2, 50 - 2);
        ctx.fillStyle = '#ffffff';
        ctx.font = `${fontSize} sans-serif`;
        ctx.fillText(num, x + paddingX, y + paddingY);
      ctx.closePath();
    }

    function spawnNumber () {
      let row, column;
      while(true){
        row = randomInteger(0, 4);
        column = randomInteger(0, 4);

        if(numbers[row][column] === 0) break;
      }
      let num;
      while(true){
        num = randomInteger(2, 16);
        if(num === 2) break;
        else if(num === 4) break;
        else if(num === 8) break;
        else if(num === 16) break;
      }

      numbers[row][column] = num;
      score += num;
      drawNumber(row, column, num);
    }

    function randomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    }

    function setScore () {
      ctxScore.beginPath();
        ctxScore.fillStyle = '#000000';
        ctxScore.font = '20px sans-serif';
        ctxScore.clearRect(0, 0, 250, 30);
        ctxScore.fillText(`Score: ${score}`, 0, 25);
      ctxScore.closePath();
    }

});
