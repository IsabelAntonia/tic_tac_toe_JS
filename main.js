function main() {

    // declare variables
    var clickedField = [];
    var arrayRows = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
        ['1', '5', '9'],
        ['3', '5', '7']
    ]
    var userXArray = {
        name: "userX",
        values: []
    };
    var userOArray = {
        name: 'userO',
        values: []
    };
    var winner = '';
    var user = 'X';

    // var fieldArea = document.getElementById('fieldArea')
    // var button = document.getElementById('button');

    //event listeners for button and field

    var newGame = function () {

        var elements = document.getElementsByClassName('singleField');
        for (var i = 0; i < elements.length; i++) {
            elements[i].innerHTML = '';
        }
        clickedField = [];
        userOArray.values = [];
        userXArray.values = [];
        user = 'X';
        winner = '';
    }

    var handleFieldArea = function () {



        if (clickedField.includes(event.target.id) && clickedField.length < 9 && winner === '') {
            alert('This field is already occupied!')
        } else if (winner === 'userO' || winner === 'userX') {
            alert('This Game is already won by' + '' + winner + '. Start a new game.')
        } else if (winner === '' && clickedField.length === 9) {
            alert('This Game is over. Start a new Game')

        } else {

            clickedField.push(event.target.id);



            var clickedElement = event.target.id;


            if (user === 'O') {
                userOArray.values.push(clickedElement);
                var circle = document.createElement('span');
                circle.classList.add('circle');
                event.target.append(circle);
                user = 'X'

            } else { // if it is X
                userXArray.values.push(clickedElement);
                user = 'O';
                var cross = document.createElement('span');
                cross.classList.add('cross');
                event.target.append(cross);
            }

            if (userXArray.values.length >= 3 && user === 'O') {
                checkForThree(userXArray);
            }

            if (userOArray.values.length >= 3 && user === 'X') {
                checkForThree(userOArray);
            }

        }

    }





    function checkForThree(userArray) {


        for (var i = 0; i < arrayRows.length; i++) {



            compare(arrayRows[i], userArray)

            if (winner === 'userO') {

                alert('O won!')
                break;

            } else if (winner === 'userX') {
                alert('X won!')
                break;
            } else if (winner === '' && clickedField.length === 9) {

                alert('Game Over! This Game ended in a draw.')
                break;

            }





        }
    }

    function compare(currentArray, userArray) {

        var matches = userArray.values.filter(element => currentArray.includes(element));


        if (matches.length === 3) {
            winner = userArray.name;

            return true;
        } else {
            winner = ''
        }





    }

    return {
        newGame,
        handleFieldArea
    }
}

var gameLogic = main();


document.getElementById('button').addEventListener('click', function (event) {

    gameLogic.newGame();
})

document.getElementById('fieldArea').addEventListener('click', function (event) {


    gameLogic.handleFieldArea();
})