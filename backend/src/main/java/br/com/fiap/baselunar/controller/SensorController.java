package br.com.fiap.baselunar.controller;

import br.com.fiap.baselunar.dto.SensorRequest;
import br.com.fiap.baselunar.exception.RecursoNaoEncontradoException;
import br.com.fiap.baselunar.model.Recurso;
import br.com.fiap.baselunar.model.Sensor;
import br.com.fiap.baselunar.repository.RecursoRepository;
import br.com.fiap.baselunar.repository.SensorRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sensores")
public class SensorController {

    private final SensorRepository sensorRepository;
    private final RecursoRepository recursoRepository;

    public SensorController(SensorRepository sensorRepository, RecursoRepository recursoRepository) {
        this.sensorRepository = sensorRepository;
        this.recursoRepository = recursoRepository;
    }

    @GetMapping
    public List<Sensor> listar() {
        return sensorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Sensor buscar(@PathVariable Long id) {
        return sensorRepository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Sensor " + id + " nao encontrado"));
    }

    @PostMapping
    public ResponseEntity<Sensor> criar(@Valid @RequestBody SensorRequest req) {
        Recurso recurso = recursoRepository.findById(req.getRecursoId())
                .orElseThrow(() -> new RecursoNaoEncontradoException(
                        "Recurso " + req.getRecursoId() + " nao encontrado"));
        Sensor sensor = new Sensor(req.getNome(), req.getLocalizacao(), req.isAtivo(), recurso);
        Sensor salvo = sensorRepository.save(sensor);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }
}
