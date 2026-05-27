package br.com.fiap.baselunar.repository;

import br.com.fiap.baselunar.model.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SensorRepository extends JpaRepository<Sensor, Long> {
}
