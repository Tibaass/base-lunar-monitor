package br.com.fiap.baselunar.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "recurso")
public class Recurso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String nome;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoRecurso tipo;

    // unidade exibida no app: %, kWh, L, Celsius
    @Column(nullable = false)
    private String unidade;

    @NotNull
    @Column(nullable = false)
    private Double valorAtual;

    @NotNull
    @Column(nullable = false)
    private Double limiteCritico;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DirecaoCritica direcaoCritica;

    private LocalDateTime atualizadoEm = LocalDateTime.now();

    public Recurso() {
    }

    public Recurso(String nome, TipoRecurso tipo, String unidade, Double valorAtual,
                   Double limiteCritico, DirecaoCritica direcaoCritica) {
        this.nome = nome;
        this.tipo = tipo;
        this.unidade = unidade;
        this.valorAtual = valorAtual;
        this.limiteCritico = limiteCritico;
        this.direcaoCritica = direcaoCritica;
        this.atualizadoEm = LocalDateTime.now();
    }

    // status calculado: ATENCAO quando esta a menos de 10% do limite, CRITICO ao passar dele
    @Transient
    public StatusOperacional getStatus() {
        if (valorAtual == null || limiteCritico == null || direcaoCritica == null) {
            return StatusOperacional.NORMAL;
        }
        double margem = Math.abs(limiteCritico) * 0.10;
        if (direcaoCritica == DirecaoCritica.ABAIXO) {
            if (valorAtual <= limiteCritico) {
                return StatusOperacional.CRITICO;
            }
            if (valorAtual <= limiteCritico + margem) {
                return StatusOperacional.ATENCAO;
            }
        } else {
            if (valorAtual >= limiteCritico) {
                return StatusOperacional.CRITICO;
            }
            if (valorAtual >= limiteCritico - margem) {
                return StatusOperacional.ATENCAO;
            }
        }
        return StatusOperacional.NORMAL;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public TipoRecurso getTipo() {
        return tipo;
    }

    public void setTipo(TipoRecurso tipo) {
        this.tipo = tipo;
    }

    public String getUnidade() {
        return unidade;
    }

    public void setUnidade(String unidade) {
        this.unidade = unidade;
    }

    public Double getValorAtual() {
        return valorAtual;
    }

    public void setValorAtual(Double valorAtual) {
        this.valorAtual = valorAtual;
        this.atualizadoEm = LocalDateTime.now();
    }

    public Double getLimiteCritico() {
        return limiteCritico;
    }

    public void setLimiteCritico(Double limiteCritico) {
        this.limiteCritico = limiteCritico;
    }

    public DirecaoCritica getDirecaoCritica() {
        return direcaoCritica;
    }

    public void setDirecaoCritica(DirecaoCritica direcaoCritica) {
        this.direcaoCritica = direcaoCritica;
    }

    public LocalDateTime getAtualizadoEm() {
        return atualizadoEm;
    }

    public void setAtualizadoEm(LocalDateTime atualizadoEm) {
        this.atualizadoEm = atualizadoEm;
    }
}
