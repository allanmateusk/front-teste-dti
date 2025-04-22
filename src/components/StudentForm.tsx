import { useState } from "react";
import api from "../services/api";

interface StudentFormProps {
    onStudentAdded: () => void;
  }
  
  function StudentForm({ onStudentAdded }: StudentFormProps) {
    const [form, setForm] = useState({
      nome: "",
      notas: ["", "", "", "", ""],
      frequencia: "",
    });
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
      if (index !== undefined) {
        const newGrades = [...form.notas];
        newGrades[index] = e.target.value;
        setForm({ ...form, notas: newGrades });
      } else {
        setForm({ ...form, [e.target.name]: e.target.value });
      }
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await api.post("/api/estudantes", {
          nome: form.nome,
          notas: form.notas.map(Number),
          frequencia: Number(form.frequencia),
        });
        alert("Aluno cadastrado com sucesso!");
        setForm({ nome: "", notas: ["", "", "", "", ""], frequencia: "" });
  
        onStudentAdded(); 
      } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar aluno!");
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input name="nome" placeholder="Nome do aluno" value={form.nome} onChange={handleChange} />
        {form.notas.map((nota, index) => (
          <input
            key={index}
            placeholder={`Nota ${index + 1}`}
            value={nota}
            onChange={(e) => handleChange(e, index)}
          />
        ))}
        <input
          name="frequencia"
          placeholder="Frequência (%)"
          value={form.frequencia}
          onChange={handleChange}
        />
        <button type="submit">Cadastrar</button>
      </form>
    );
  }
  
  export default StudentForm;
  
