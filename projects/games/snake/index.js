import * as React from 'react'
import useInterval from './useInterval'
import styles from './Snake.module.css'
let gridSize = 30, hasBoost = false
const makeFoodCoordinates = () => ({ row: Math.floor(Math.random() * (gridSize - 1) + 1), column: Math.floor(Math.random() * (gridSize - 1) + 1)})
export default function Snake() {
  const gridRef = React.useRef(null)
  const [score, setScore] = React.useState(0)
  const [food, setFood] = React.useState(null)
  const [direction, setDirection] = React.useState('left')
  const [snakeCoords, setSnakeCoords] = React.useState([{row: gridSize - 3, column: gridSize - 5}, {row: gridSize - 3, column: gridSize - 4}, {row: gridSize - 3, column: gridSize - 3}])
  const [gameInterval, setGameInterval] = React.useState(100)
  const [foodInterval, setFoodInterval] = React.useState(5000)
  const handleKeyPress = event => {
    if (event.key === 'i' && direction !== 'down') setDirection('up')
    if (event.key === 'l' && direction !== 'left') setDirection('right')
    if (event.key === 'k' && direction !== 'up') setDirection('down')
    if (event.key === 'j' && direction !== 'right') setDirection('left')
  }
  const renderGrid = size => {
    const squares = []
    for (let row = 0; row < size; row++) {
      for (let column = 0; column < size; column++) {
        let activeClass = ''
        const foodClass = (food && food.coords.row === row && food.coords.column == column) ? ((food.type === 'apple') ? styles.apple : styles.boost ): ''
        for (let i = 0; i < snakeCoords.length; i++) {
          if (snakeCoords[i].row === row && snakeCoords[i].column == column) {
            activeClass = styles.active
            break
          }
        }
        squares.push(<div key={`${row}-${column}`} className={`${styles.space} ${activeClass} ${foodClass}`} data-row={row} data-column={column} />)
      }
    }
    return squares
  }
  const placeFood = () => {
    if (food) return
    const newFood = { coords: makeFoodCoordinates() }
    if (!snakeCoords.every(coord => coord.row !== newFood.coords.row && coord.column !== newFood.coords.column)) return placeFood()
    const odds = Math.random()
    odds < 0.6 || (odds > 0.59 && hasBoost) ? newFood.type = 'apple' : newFood.type = 'boost'
    setFood(newFood)
  }
  const moveSnake = () => {
    const newCoords = [...snakeCoords]
    switch(direction) {
      case 'up':
        snakeCoords[0].row > 0 ? newCoords.splice(0, 0, { row: snakeCoords[0].row - 1, column: snakeCoords[0].column }) : loseGame()
        break
      case 'right':
        snakeCoords[0].column < gridSize - 1 ? newCoords.splice(0, 0, {column: snakeCoords[0].column + 1, row: snakeCoords[0].row}) : loseGame()
        break
      case 'down':
        snakeCoords[0].row < gridSize - 1 ? newCoords.splice(0, 0, {row: snakeCoords[0].row + 1, column: snakeCoords[0].column}) : loseGame()
        break
      default: // left
        snakeCoords[0].column > 0 ? newCoords.splice(0, 0, {column: snakeCoords[0].column - 1, row: snakeCoords[0].row}) : loseGame()
    }
    for (let i = 1; i <= snakeCoords.length - 1; i++) {
      if (snakeCoords[0].row === snakeCoords[i].row && snakeCoords[0].column === snakeCoords[i].column) loseGame()
    }
    if (!food || (food.coords.row !== snakeCoords[0].row || food.coords.column !== snakeCoords[0].column)) {
      newCoords.pop()
    } else if (food && (food.coords.row === snakeCoords[0].row && food.coords.column === snakeCoords[0].column)) {
      if (food.type === 'apple') {
        setFood(null)
        setScore(score + 1)
      } else {
        boostSnake()
      }
    }
    setSnakeCoords(newCoords)
  }
  const boostSnake = () => {
    setFood(null)
    hasBoost = true
    setScore(score + 2)
    setGameInterval(50)
    setTimeout(() => {
      setGameInterval(100)
      hasBoost = false
    }, 7000)
  }
  const loseGame = () => {
    setGameInterval(null)
    setFoodInterval(null)
    if (window.confirm('You\'ve lost. Would you like to start a new game?')) newGame()
  }
  const newGame = () => {
    setScore(0)
    setFood(null)
    setDirection('left')
    setSnakeCoords([{row: gridSize - 3, column: gridSize - 5}, {row: gridSize - 3, column: gridSize - 4}, {row: gridSize - 3, column: gridSize - 3}])
    setGameInterval(gameInterval)
    setFoodInterval(foodInterval)
  }
  React.useEffect(() => {
    newGame()
    gridRef.current.focus()
  }, [])
  useInterval(placeFood, foodInterval)
  useInterval(moveSnake, gameInterval)
  return <div ref={gridRef} onKeyPress={handleKeyPress} tabIndex="0" className={styles.board}>{renderGrid(gridSize)}</div>
}
