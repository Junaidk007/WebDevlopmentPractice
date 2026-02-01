import LikeButton from './activity/LikeButton'
import TodoList from './activity/TodoList'
import './App.css'
import Button from './eventHandling/Button'
import Card from './props/Card'
import Counter from './states/Counter'

function App() {
  let keywordArr = ['react', 'javaScript', 'props', 'components']

  return (
    <>
      <h1>React Practice</h1>
      <div className="card-container">
        {/* Use the Card component here with different props */}
        <Card name="Product A" price={29.99} />
        <Card name="Product B" price={49.99} />
        <Card name="Product C" price={19.99} />
        <Card name="Product D" price={99.99} keyword={keywordArr} />
      </div>
      <hr />
      <Button/>
      <hr />
      <Counter/>
      <hr />
      <LikeButton/>
      <hr /><br />
      <TodoList/>
    </>
  )
}

export default App
