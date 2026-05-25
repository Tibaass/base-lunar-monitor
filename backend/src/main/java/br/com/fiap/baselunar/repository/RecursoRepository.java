package br.com.fiap.baselunar.repository;

import br.com.fiap.baselunar.model.Recurso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecursoRepository extends JpaRepository<Recurso, Long> {
}
