package br.com.fiap.baselunar.dto;

import jakarta.validation.constraints.NotNull;

// novo valor lido de um recurso
public class LeituraRequest {

    @NotNull
    private Double valorAtual;

    public Double getValorAtual() {
        return valorAtual;
    }

    public void setValorAtual(Double valorAtual) {
        this.valorAtual = valorAtual;
    }
}
