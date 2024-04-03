import { ToDo } from './ToDo';

function App() {
  return (
    // we can do inline CSS, numbers are automatically considered pixels
    <main style={{ padding: 40 }}>
      <h1>Hello, React</h1>
      <ul>
        {/* ToDo is a component. This one has no props. */}
        <ToDo />

        {/* This instance of ToDo has props : title, description, and complete */}
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
