import { ToDo } from './ToDo';

function App() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Hello, React</h1>
      <ul>
        <ToDo />
        <ToDo
          title="Title Prop"
          description="Description Prop"
          complete={true}
        />
      </ul>
    </main>
  );
}

export default App;
