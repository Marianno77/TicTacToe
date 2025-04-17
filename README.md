# Gra w Kółko-krzyżyk (Tic-Tac-Toe)

## Przegląd
Gra w Kółko-krzyżyk z możliwością gry w trybie **Gracz vs Gracz** lub **Gracz vs AI**. Gra zawiera podstawową logikę wykrywania zwycięzcy, a także możliwość resetowania wyniku i wyświetlania historii ruchów.

## Funkcje

### Struktura HTML:
- **Układ gry**: Zawiera tytuł, planszę gry (siatka 3x3), sekcję wyników graczy oraz opcje takie jak resetowanie wyniku lub przełączanie trybów gry.
- **Historia ruchów**: Wyświetlanie stanu gry po każdym ruchu.

### Style CSS:
- **Podstawowe stylowanie**: Stylowanie komponentów UI takich jak nagłówek, przyciski, plansza gry oraz sekcja wyników graczy.
- **Responsywność**: Projekt responsywny, dostosowujący się do różnych rozmiarów ekranów (w tym urządzeń mobilnych).
- **Efekty hover**: Dynamiczny efekt najechania na przyciski, poprawiający interakcję z użytkownikiem.

### Logika JavaScript:
- **Przełączanie trybu gry**: Umożliwia przełączanie między trybem **Gracz vs Gracz** oraz **Gracz vs AI**.
- **Resetowanie gry**: Opcja resetowania planszy gry oraz wyników.
- **Obsługa ruchów**: Gracze wykonują ruchy poprzez kliknięcie na odpowiedni przycisk w siatce. Gra zmienia gracza (lub AI, jeśli jest aktywowane) po każdym ruchu.
- **Zachowanie AI**: AI wykonuje ruchy opierając się na podstawowych strategiach, takich jak wygrywanie, blokowanie oraz zajmowanie strategicznych pozycji (rogi, środek, boki).
- **Wykrywanie zwycięzcy**: Sprawdzanie, czy któryś z graczy (lub AI) wygrał po każdym ruchu poprzez analizowanie wierszy, kolumn i przekątnych.
- **Historia ruchów**: Wyświetlanie historii ruchów z dokładnym stanem planszy po każdym ruchu.

# Tic-Tac-Toe Game

## Overview
Tic-Tac-Toe game with the option to play in **Player vs Player** or **Player vs AI** modes. The game includes basic logic for detecting a winner, as well as the ability to reset the score and display the move history.

## Features

### HTML Structure:
- **Game Layout**: Contains the title, game board (3x3 grid), player score section, and options such as resetting the score or toggling between game modes.
- **Move History**: Displays the state of the game after each move.

### CSS Styles:
- **Basic Styling**: Styles UI components like the header, buttons, game board, and player score section.
- **Responsiveness**: A responsive design that adapts to various screen sizes, including mobile devices.
- **Hover Effects**: Dynamic hover effect on buttons, enhancing the user interaction experience.

### JavaScript Logic:
- **Game Mode Toggle**: Allows switching between **Player vs Player** and **Player vs AI** modes.
- **Game Reset**: Option to reset the game board and scores.
- **Move Handling**: Players make moves by clicking on the appropriate button in the grid. The game alternates between players (or AI, if activated) after each move.
- **AI Behavior**: The AI makes moves based on basic strategies such as winning, blocking, and occupying strategic positions (corners, center, sides).
- **Winner Detection**: Checks whether a player (or AI) has won after each move by analyzing rows, columns, and diagonals.
- **Move History**: Displays the move history with the exact state of the board after each move.
