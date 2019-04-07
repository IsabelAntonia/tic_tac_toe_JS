function main() {

    // declare variables
    var clickedFields = [];
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
        name: "X",
        values: []
    };
    var userOArray = {
        name: 'O',
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
        clickedFields = [];
        userOArray.values = [];
        userXArray.values = [];
        user = 'X';
        winner = '';
        results.style.display = 'none';
    }

    var handleFieldArea = function () {

        var occupiedCircle = false;
        var occupiedCross = false;
        var cross = document.getElementsByClassName('cross');
        var circle = document.getElementsByClassName('circle');

        for (var i = 0; i < circle.length; i++) {
            if (event.target.contains(circle[i])) {
                occupiedCircle = true;
                break;
            } else {
                occupiedCircle = false;
            }
        }

        for (var i = 0; i < cross.length; i++) {
            if (event.target.contains(cross[i])) {
                occupiedCross = true;
                break;
            } else {
                occupiedCross = false;
            }
        }

        // check if the field is already occupied while the game is not over yet
        if (clickedFields.length < 9 && winner === '' && (occupiedCircle || occupiedCross || clickedFields.includes(event.target))) {
            alert('This field is already occupied!')
        } else if (winner === 'O' || winner === 'X') {
            alert('This Game is already won by' + ' ' + winner + '. Start a new game.')
        } else if (winner === '' && clickedFields.length === 9) {
            alert('This Game is over. Start a new Game')

        } else {

            // clickedField.push(event.target.id);
            clickedFields.push(event.target);



            var clickedElement = event.target.id;



            if (user === 'O') {
                userOArray.values.push(clickedElement);
                var circle = document.createElement('span');
                circle.classList.add('circle');
                event.target.append(circle);
                user = 'X'
                if (userOArray.values.length >= 3) {
                    checkForThree(userOArray);
                }

            } else { // if it is X
                userXArray.values.push(clickedElement);
                user = 'O';
                var cross = document.createElement('span');
                cross.classList.add('cross');
                event.target.append(cross);
                if (userXArray.values.length >= 3) {
                    checkForThree(userXArray);
                }
            }




        }

    }





    function checkForThree(userArray) {


        for (var i = 0; i < arrayRows.length; i++) {



            compare(arrayRows[i], userArray)



            if (winner === 'O') {
                var results = document.getElementById('results');
                results.innerHTML = 'O won!';
                results.style.display = 'block';

                // alert('O won!')
                break;

            } else if (winner === 'X') {

                var results = document.getElementById('results');
                results.innerHTML = 'X won!'
                results.style.display = 'block';

                // alert('X won!')
                break;
            }





        }

        if (winner === '' && clickedFields.length === 9) {
            var results = document.getElementById('results');
            results.innerHTML = 'This Game ended in a draw.'
            results.style.display = 'block';
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