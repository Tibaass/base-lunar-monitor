package br.com.fiap.baselunar.controller;

import br.com.fiap.baselunar.dto.LeituraRequest;
import br.com.fiap.baselunar.exception.RecursoNaoEncontradoException;
import br.com.fiap.baselunar.model.Recurso;
import br.com.fiap.baselunar.model.StatusOperacional;
import br.com.fiap.baselunar.repository.RecursoRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recursos")
public class RecursoController {

    private final RecursoRepository repository;

    public RecursoController(RecursoRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Recurso> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public Recurso buscar(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Recurso " + id + " nao encontrado"));
    }

    @PostMapping
    public ResponseEntity<Recurso> criar(@Valid @RequestBody Recurso recurso) {
        recurso.setId(null);
        Recurso salvo = repository.save(recurso);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    // atualiza o valor atual do recurso
    @PutMapping("/{id}/leitura")
    public Recurso atualizarLeitura(@PathVariable Long id, @Valid @RequestBody LeituraRequest leitura) {
        Recurso recurso = repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Recurso " + id + " nao encontrado"));
        recurso.setValorAtual(leitura.getValorAtual());
        return repository.save(recurso);
    }

    @GetMapping("/{id}/status")
    public Map<String, Object> status(@PathVariable Long id) {
        Recurso recurso = repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Recurso " + id + " nao encontrado"));
        Map<String, Object> resposta = new HashMap<>();
        resposta.put("id", recurso.getId());
        resposta.put("nome", recurso.getNome());
        resposta.put("valorAtual", recurso.getValorAtual());
        resposta.put("unidade", recurso.getUnidade());
        resposta.put("status", recurso.getStatus());
        return resposta;
    }
}
