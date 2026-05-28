package br.com.fiap.baselunar.config;

import br.com.fiap.baselunar.model.*;
import br.com.fiap.baselunar.repository.RecursoRepository;
import br.com.fiap.baselunar.repository.SensorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// popula o banco com alguns dados de exemplo quando a aplicacao sobe
@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner seed(RecursoRepository recursos, SensorRepository sensores) {
        return args -> {
            if (recursos.count() > 0) {
                return;
            }

            Recurso agua = recursos.save(new Recurso(
                    "Reservatorio de Agua", TipoRecurso.AGUA, "%", 78.0, 20.0, DirecaoCritica.ABAIXO));
            Recurso energia = recursos.save(new Recurso(
                    "Banco de Baterias", TipoRecurso.ENERGIA, "%", 15.0, 25.0, DirecaoCritica.ABAIXO));
            Recurso temperatura = recursos.save(new Recurso(
                    "Climatizacao Modulo A", TipoRecurso.CLIMATIZACAO, "Celsius", 24.0, 30.0, DirecaoCritica.ACIMA));
            Recurso oxigenio = recursos.save(new Recurso(
                    "Reserva de Oxigenio", TipoRecurso.OXIGENIO, "%", 92.0, 30.0, DirecaoCritica.ABAIXO));

            sensores.save(new Sensor("Sensor de Nivel A1", "Modulo A - Tanque 1", true, agua));
            sensores.save(new Sensor("Medidor de Carga B2", "Sala de Energia", true, energia));
            sensores.save(new Sensor("Termometro T1", "Modulo A", true, temperatura));
            sensores.save(new Sensor("Sensor O2 - Hab", "Habitacao Principal", true, oxigenio));
        };
    }
}
