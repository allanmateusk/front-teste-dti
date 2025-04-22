import { useEffect, useState } from "react";
import api from "../services/api";

interface Estudante {
  id: number;
  nome: string;
  notas: number[];
  frequencia: number;
  media: number;
}

function StudentList({ refresh }: { refresh: boolean }) {
    const [students, setStudents] = useState<Estudante[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      async function fetchStudents() {
        setLoading(true);
        try {
          const response = await api.get<Estudante[]>("/api/estudantes");
          setStudents(response.data);
        } catch (error) {
          console.error("Erro ao buscar estudantes:", error);
        } finally {
          setLoading(false);
        }
      }

    fetchStudents();
  }, []);

  if (loading) {
    return <p>Carregando alunos...</p>;
  }

  return (
    <div>
      <h2>Alunos</h2>
      {students.length === 0 ? (
        <p>Nenhum aluno cadastrado ainda.</p>
      ) : (
        students.map((student) => (
          <div key={student.id} style={{ marginBottom: "1rem" }}>
            <p><strong>Nome:</strong> {student.nome}</p>
            <p><strong>Média:</strong> {student.media.toFixed(2)}</p>
            <p><strong>Frequência:</strong> {student.frequencia}%</p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default StudentList;
