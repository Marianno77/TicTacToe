document.addEventListener('DOMContentLoaded', () => {

    const btns = document.querySelectorAll('.btn');
    const result_label = document.getElementById('result');
    const score_one_label = document.getElementById('score-one');
    const score_two_label = document.getElementById('score-two');
    const board_html = document.querySelector('.board');
    const history_label = document.getElementById('history');
    const player_one = document.getElementById('player_one');
    const player_two = document.getElementById('player_two');
    const game_mode_btn = document.getElementById('game_mode_btn');
    const points_reset_btn = document.getElementById('points_reset_btn');
    const imposible_btn = document.getElementById('imposible_btn');
    const rounds_label = document.getElementById('rounds');

    let imposible = false;
    let flag = true;
    let game_mode = true;
    let name_one = 'Gracz O';
    let name_two = 'Gracz X';
    let history = 'Historia ruchów tej gry:';
    let score_one = 0;
    let score_two = 0;
    let win = false;
    let move_count = 0;
    let board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    let board_prev;

    const reset = () => {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        btns.forEach(btn => {
            btn.textContent = ''
        });

        result_label.innerText = '';
        move_count = 0;
        win = false;
        console.clear()
        history = 'Historia ruchów tej gry:';
        history_label.innerText = history;
        flag = true;
    }

    imposible_btn.addEventListener('click', () => {
        imposible = !imposible;
        if (imposible == true) {
            imposible_btn.style.backgroundColor = 'rgba(178, 34, 34, 0.75)';
        } else {
            imposible_btn.style.backgroundColor = 'transparent';
        }
        reset();
    })

    game_mode_btn.addEventListener('click', () => {
        if (game_mode != true) {
            game_mode_btn.textContent = 'Gracz VS Gracz';
            imposible_btn.style.display = 'block';
        } else {
            game_mode_btn.textContent = 'Gracz VS Bot';
            imposible_btn.style.display = 'none';
        }
        reset();
        game_mode = !game_mode
    })

    points_reset_btn.addEventListener('click', () => {
        score_one = 0;
        score_two = 0;
        score_one_label.innerText = score_one;
        score_two_label.innerText = score_two;
    })

    player_one.addEventListener('input', () => {
        name_one = player_one.value.trim();
        if (name_one == '') {
            name_one = 'Gracz O';
        }
    })

    player_two.addEventListener('input', () => {
        name_two = player_two.value.trim();
        if (name_two == '') {
            name_two = 'Gracz X';
        }
    })

    const reset_btn = document.querySelector('.reset');
    reset_btn.addEventListener('click', reset);


    //main
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            let { row, col } = getGridPosition(btn.id);
            if (board[row][col] == '' && win == false) {
                if (game_mode == true) {

                    move_count++;
                    if (move_count < 10) {
                        rounds_label.textContent = `Runda: ${move_count}`;
                    }

                    btn.textContent = 'O';
                    board_prev = cloneBoard(board);
                    board[row][col] = 'O';

                    renderBoardHistory(board, move_count, name_one, board_prev);
                    win_check();

                    if (win == false) {
                        setTimeout(() => {
                            move_count++;
                            if (move_count < 10) {
                                rounds_label.textContent = `Runda: ${move_count}`;
                            }
                            board_prev = cloneBoard(board);
                            ai();
                            reloadBoard();

                            renderBoardHistory(board, move_count, name_two, board_prev);
                            win_check();

                            if (move_count >= 9 && win === false) {
                                result_label.innerText = 'Remis';
                            }
                        }, 200);
                    }
                } else {
                    if (flag == true) {
                        move_count++;

                        btn.textContent = 'O';
                        board_prev = cloneBoard(board);
                        board[row][col] = 'O';

                        renderBoardHistory(board, move_count, name_one, board_prev);
                        win_check();
                    } else {
                        move_count++;

                        btn.textContent = 'X';
                        board_prev = cloneBoard(board);
                        board[row][col] = 'X';

                        renderBoardHistory(board, move_count, name_two, board_prev);
                        win_check();
                    }

                    if (move_count >= 9 && win === false) {
                        result_label.innerText = 'Remis';
                    }
                }

                flag = !flag;
                console.log('Board: ', board);
            }
        })
    });


    const win_check = () => {

        // Rows check
        board.forEach(row => {
            if (row[0] != '') {
                if (row.every(field => field == row[0])) {
                    if (row[0] == 'O') {
                        result_label.innerText = 'Wygrywa ' + name_one + '!';
                        score_one += 1;
                    } else {
                        result_label.innerText = 'Wygrywa ' + name_two + '!';
                        score_two += 1;
                    }
                    win = true;
                }
            }
        });

        // Columns check
        if (win == false) {
            for (i = 0; i <= 2; i++) {
                const column = [board[0][i], board[1][i], board[2][i]];
                if (column[0] != '') {
                    if (column.every(field => field == column[0])) {
                        if (column[0] == 'O') {
                            result_label.innerText = 'Wygrywa ' + name_one + '!';
                            score_one += 1;
                        } else {
                            result_label.innerText = 'Wygrywa ' + name_two + '!';
                            score_two += 1;
                        }
                        win = true;
                    }
                }
            }
        }

        // Diagonals check
        if (win == false) {

            if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[1][1] != '') {
                if (board[0][0] == 'O') {
                    result_label.innerText = 'Wygrywa ' + name_one + '!';
                    score_one += 1;
                } else {
                    result_label.innerText = 'Wygrywa ' + name_two + '!';
                    score_two += 1;
                }
                win = true;
            }

            if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[1][1] != '') {
                if (board[0][2] == 'O') {
                    result_label.innerText = 'Wygrywa ' + name_one + '!';
                    score_one += 1;
                } else {
                    result_label.innerText = 'Wygrywa ' + name_two + '!';
                    score_two += 1;
                }
                win = true;
            }
        }

        if (win == true) {
            score_one_label.innerText = score_one;
            score_two_label.innerText = score_two;
        }
    }

    //ai moves
    const ai = () => {

        if (WinMove() == true) {
            return;
        }
        if (BlockMove() == true) {
            return;
        }

        if (imposible == true) {
            if (winSplit() == true) {
                return;
            }

            if (blockSplit() == true) {
                return;
            }
        }

        if (board[1][1] == '') {
            board[1][1] = 'X';
            return;
        }
        if (playOpositeCorner() == true) {
            return;
        }


        if (imposible == true) {
            if (playCorner() == true) {
                return;
            }
            if (playSide() == true) {
                return;
            }

        } else {

            if (playSide() == true) {
                return;
            }
            if (playCorner() == true) {
                return;
            }

        }

        reloadBoard();
    }

    const WinMove = () => {
        //rows 
        for (let row of board) {
            const x = getDiffrentField(row, 'X');
            if (x !== false && x !== undefined) {
                row[x] = 'X';
                reloadBoard();
                return true;
            }
        }

        //columns
        for (i = 0; i <= 2; i++) {
            const column = [board[0][i], board[1][i], board[2][i]];
            x = getDiffrentField(column, 'X')
            if (x !== false && x !== undefined) {
                board[x][i] = 'X';
                reloadBoard();
                return true;
            }
        }

        //Diagonals
        return MoveDiagonals('X');
    }

    const BlockMove = () => {
        //rows 
        for (let row of board) {
            let x = getDiffrentField(row, 'O');
            if (x !== false && x !== undefined) {
                row[x] = 'X';
                reloadBoard();
                return true;
            }
        }

        //columns
        for (i = 0; i <= 2; i++) {
            const column = [board[0][i], board[1][i], board[2][i]];
            let x = getDiffrentField(column, 'O')
            if (x !== false && x !== undefined) {
                board[x][i] = 'X';
                reloadBoard();
                return true;
            }
        }

        //Diagonals
        return MoveDiagonals('O');
    }

    const playCorner = () => {
        for (let row of board) {
            if (row != board[1]) {
                if (row[0] == '') {
                    row[0] = 'X';
                    reloadBoard();
                    return true;
                } else if (row[2] == '') {
                    row[2] = 'X';
                    reloadBoard();
                    return true;
                }
            }
        }
        return false;
    }

    const playSide = () => {
        for (let row of board) {
            if (row == board[1]) {
                if (row[0] == '') {
                    row[0] = 'X';
                    reloadBoard();
                    return true;
                } else if (row[2] == '') {
                    row[2] = 'X';
                    reloadBoard();
                    return true;
                }
            } else {
                if (row[1] == '') {
                    row[1] = 'X';
                    reloadBoard();
                    return true;
                }
            }
        }
        return false;
    }

    const reloadBoard = () => {
        btns.forEach(btn => {
            let { row, col } = getGridPosition(btn.id);
            btn.textContent = board[row][col];
        })
    }

    const MoveDiagonals = (a) => {
        //one
        if (board[0][0] == board[1][1] && board[1][1] == a && board[2][2] == '') {
            board[2][2] = 'X';
            reloadBoard();
            return true;
        }

        if (board[0][0] == board[2][2] && board[2][2] == a && board[1][1] == '') {
            board[1][1] = 'X';
            reloadBoard();
            return true;
        }

        if (board[1][1] == board[2][2] && board[2][2] == a && board[0][0] == '') {
            board[0][0] = 'X';
            reloadBoard();
            return true;
        }

        //two
        if (board[0][2] == board[1][1] && board[1][1] == a && board[2][0] == '') {
            board[2][0] = 'X';
            reloadBoard();
            return true;
        }

        if (board[0][2] == board[2][0] && board[2][0] == a && board[1][1] == '') {
            board[1][1] = 'X';
            reloadBoard();
            return true;
        }

        if (board[1][1] == board[2][0] && board[2][0] == a && board[0][2] == '') {
            board[0][2] = 'X';
            reloadBoard();
            return true;
        }

        return false;
    }

    const playOpositeCorner = () => {
        if (board[0][0] == 'O' && board[2][2] == '') {
            board[2][2] = 'X';
            reloadBoard()
            return true;
        } else if (board[0][2] == 'O' && board[2][0] == '') {
            board[2][0] = 'X';
            reloadBoard()
            return true;
        } else if (board[2][2] == 'O' && board[0][0] == '') {
            board[0][0] = 'X';
            reloadBoard()
            return true;
        } else if (board[2][0] == 'O' && board[0][2] == '') {
            board[0][2] = 'X';
            reloadBoard()
            return true;
        } else {
            return false;
        }
    }

    //imposible mode 

    const winSplit = () => {
        let rowsWithOneSign = [];
        let colsWithOneSign = [];
        for (let i = 0; i < board.length; i++) {
            if (getRowWithOneSign(board[i], 'X') == true) {
                rowsWithOneSign.push(i);
            }
        }

        for (i = 0; i <= 2; i++) {
            const column = [board[0][i], board[1][i], board[2][i]];
            if (getRowWithOneSign(column, 'X') == true) {
                colsWithOneSign.push(i);
            }
        }

        for (const row of rowsWithOneSign) {
            for (const col of colsWithOneSign) {
                if (board[row][col] === '') {
                    board[row][col] = 'X';
                    reloadBoard();
                    return true;
                }
            }
        }

        return false;
    }

    const blockSplit = () => {
        let rowsWithOneSign = [];
        let colsWithOneSign = [];
        for (let i = 0; i < board.length; i++) {
            if (getRowWithOneSign(board[i], 'O') == true) {
                rowsWithOneSign.push(i);
            }
        }

        for (i = 0; i <= 2; i++) {
            const column = [board[0][i], board[1][i], board[2][i]];
            if (getRowWithOneSign(column, 'O') == true) {
                colsWithOneSign.push(i);
            }
        }

        for (const row of rowsWithOneSign) {
            for (const col of colsWithOneSign) {
                if (board[row][col] === '') {
                    if (row != 0) {
                        if (board[row - 1][col] == '') {
                            board[row - 1][col] = 'X';
                            reloadBoard();
                            return true;
                        }

                    } else if (col != 0) {
                        if (board[row][col - 1] == '') {
                            board[row][col - 1] = 'X';
                            reloadBoard();
                            return true;
                        }
                    }
                }
            }
        }

        return false;
    }

});

const getRowWithOneSign = (arr, a) => {
    if (arr.length != 3) {
        return false;
    }

    if (arr[0] == a && arr[1] == '' && arr[2] == '') {
        return true;
    } else if (arr[0] == '' && arr[1] == a && arr[2] == '') {
        return true;
    } else if (arr[0] == '' && arr[1] == '' && arr[2] == a) {
        return true;
    } else {
        return false
    }
}

const getDiffrentField = (arr, a) => {
    if (arr.length != 3) {
        return false;
    }

    if (arr[0] == arr[1] && arr[0] == a && arr[2] == '') {
        return 2;
    } else if (arr[0] == arr[2] && arr[0] == a && arr[1] == '') {
        return 1;
    } else if (arr[1] == arr[2] && arr[1] == a && arr[0] == '') {
        return 0;
    } else {
        return false;
    }
}

const getGridPosition = (id) => {
    const index = parseInt(id) - 1;
    const row = Math.floor(index / 3);
    const col = index % 3;
    return { row, col };
}

const boardToString = (board) => {
    return board
        .map(row =>
            row
                .map(cell => (cell === '' ? ' ' : cell).padStart(2, ' ').padEnd(3, ' '))
                .join('|')
        )
        .join('\n');
};

const renderBoardHistory = (board, count, player, board_prev) => {
    if (count > 9) {
        return;
    }
    const historyContainer = document.getElementById('history');

    const moveWrapper = document.createElement('div');
    moveWrapper.style.marginBottom = '20px';

    const title = document.createElement('p');
    title.textContent = `Ruch ${count}`;
    title.style.fontWeight = 'bold';

    const player_label = document.createElement('p');
    player_label.textContent = `${player}:`;
    player_label.style.fontWeight = 'bold';

    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';

    const changedCell = checkUpdateBoard(board, board_prev);
    board.forEach((row, i) => {
        const tr = document.createElement('tr');

        row.forEach((cell, j) => {
            const td = document.createElement('td');
            td.textContent = cell === '' ? ' ' : cell;
            td.style.border = '1px solid black';
            td.style.width = '40px';
            td.style.height = '40px';
            td.style.textAlign = 'center';
            td.style.fontSize = '20px';
            td.style.padding = '10px';
            tr.appendChild(td);

            if (changedCell && changedCell.row === i && changedCell.col === j) {
                td.style.backgroundColor = 'orange';
            }
        });

        table.appendChild(tr);
    });

    moveWrapper.appendChild(title);
    moveWrapper.appendChild(player_label);
    moveWrapper.appendChild(table);
    historyContainer.appendChild(moveWrapper);
};

const checkUpdateBoard = (board, board_prev) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] !== board_prev[i][j]) {
                return { row: i, col: j };
            }
        }
    }
    return null;
}

const cloneBoard = (board) => {
    return board.map(row => [...row]);
};