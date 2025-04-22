import { useEffect, useState } from "react";
import api from "../services/api";

interface Estudante {
  id: number;
  nome: string;
  notas: number[];
  frequencia: number;
  media: number;
}

interface AttentionListProps {
  refresh: boolean;
}

function AttentionList({ refresh }: AttentionListProps) {
  const [lowAttendanceStudents, setLowAttendanceStudents] = useState<Estudante[]>([]);
  const [lowGradesStudents, setLowGradesStudents] = useState<Estudante[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [turmaMedia, setTurmaMedia] = useState<number>(0);

  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      try {
        const response = await api.get<Estudante[]>("/api/estudantes");
        const students = response.data;

        if (students.length > 0) {
          
          const totalMedia = students.reduce((sum, student) => sum + student.media, 0);
          const mediaTurma = totalMedia / students.length;
          setTurmaMedia(mediaTurma);

          
          const attentionByAttendance = students.filter(student => student.frequencia < 75);
          const attentionByGrades = students.filter(student => student.media < mediaTurma);

          setLowAttendanceStudents(attentionByAttendance);
          setLowGradesStudents(attentionByGrades);
        } else {
          setTurmaMedia(0);
          setLowAttendanceStudents([]);
          setLowGradesStudents([]);
        }
      } catch (error) {
        console.error("Erro ao buscar estudantes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, [refresh]); 
  if (loading) {
    return <p>Carregando alunos que precisam de atenção...</p>;
  }

  return (
    <div>
      <h2>Alunos que precisam de atenção</h2>

      <h3>Por Frequência abaixo de 75%</h3>
      {lowAttendanceStudents.length === 0 ? (
        <p>Todos os alunos estão com boa frequência!</p>
      ) : (
        lowAttendanceStudents.map((student) => (
          <div key={student.id} className="card attention-frequency">
            <p><strong>Nome:</strong> {student.nome}</p>
            <p><strong>Frequência:</strong> {student.frequencia}%</p>
          </div>
        ))
      )}

      <h3>Por Média abaixo da média da turma ({turmaMedia.toFixed(2)})</h3>
      {lowGradesStudents.length === 0 ? (
        <p>Todos os alunos estão acima ou na média da turma!</p>
      ) : (
        lowGradesStudents.map((student) => (
          <div key={student.id} className="card attention-grade">
            <p><strong>Nome:</strong> {student.nome}</p>
            <p><strong>Média:</strong> {student.media.toFixed(2)}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AttentionList;
