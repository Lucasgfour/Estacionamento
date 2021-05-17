package com.libertas.estacionamento.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.libertas.estacionamento.controller.Veiculo;

@Repository
public interface VeiculoRepository extends JpaRepository<Veiculo, Integer> {
	
}
