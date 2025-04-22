import { useState } from "react";
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import AttentionList from './components/AttentionList';

function App() {
  const [refreshStudents, setRefreshStudents] = useState(false);

  const handleStudentAdded = () => {
    setRefreshStudents(!refreshStudents); 
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Controle de Alunos</h1>
      <StudentForm onStudentAdded={handleStudentAdded} />
      <StudentList refresh={refreshStudents} />
      <AttentionList refresh={refreshStudents} />
    </div>
  );
}

export default App;
