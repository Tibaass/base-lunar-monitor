package br.com.fiap.baselunar.controller;

import br.com.fiap.baselunar.model.Recurso;
import br.com.fiap.baselunar.model.StatusOperacional;
import br.com.fiap.baselunar.repository.RecursoRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// retorna so os recursos em ATENCAO ou CRITICO
@RestController
@RequestMapping("/api/alertas")
public class AlertaController {

    private final RecursoRepository repository;

    public AlertaController(RecursoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Recurso> alertas() {
        return repository.findAll().stream()
                .filter(r -> r.getStatus() != StatusOperacional.NORMAL)
                .toList();
    }
}
