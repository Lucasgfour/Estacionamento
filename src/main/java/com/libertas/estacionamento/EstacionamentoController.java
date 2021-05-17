package com.libertas.estacionamento;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.libertas.estacionamento.controller.Resultado;
import com.libertas.estacionamento.controller.Veiculo;
import com.libertas.estacionamento.model.VeiculoRepository;

@RestController
public class EstacionamentoController {

	@Autowired
	private VeiculoRepository _VeiculoRepository;
	
	@RequestMapping(value="/Veiculo", method=RequestMethod.GET)
	public ResponseEntity<Resultado> GetVeiculo() {
		try {
			return new ResponseEntity<Resultado>(new Resultado(true, "OK", _VeiculoRepository.findAll()), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Resultado>(new Resultado(false, e.getMessage()), HttpStatus.OK);
		}
	}
	
	@RequestMapping(value="/Veiculo/{codigo}", method=RequestMethod.GET)
	public ResponseEntity<Resultado> GetVeiculoCodigo(@PathVariable(value="codigo") int codigo) {
		Optional<Veiculo> veiculo = _VeiculoRepository.findById(codigo);
		if(veiculo.isPresent()) {
			return new ResponseEntity<Resultado>(new Resultado(true, "OK", veiculo.get()), HttpStatus.OK);
		} else {
			return new ResponseEntity<Resultado>(new Resultado(false, "Não encontrado."), HttpStatus.OK);
		}
	}
	
	@RequestMapping(value="/Veiculo", method=RequestMethod.POST)
	public ResponseEntity<Resultado> PostVeiculo(@Validated @RequestBody Veiculo veiculo) {
		try {
			_VeiculoRepository.save(veiculo);
			return new ResponseEntity<Resultado>(new Resultado(true, "Inserido com sucesso."), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Resultado>(new Resultado(false, e.getMessage()), HttpStatus.OK);
		}
	}
	
	@RequestMapping(value="/Veiculo", method=RequestMethod.PUT)
	public ResponseEntity<Resultado> PutVeiculo(@Validated @RequestBody Veiculo veiculo) {
		try {
			_VeiculoRepository.save(veiculo);
			return new ResponseEntity<Resultado>(new Resultado(true, "Alterado com sucesso."), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<Resultado>(new Resultado(false, e.getMessage()), HttpStatus.OK);
		}
	}
	
	@RequestMapping(value="/Veiculo/{codigo}", method=RequestMethod.DELETE)
	public ResponseEntity<Resultado> DeleteVeiculo(@PathVariable(value="codigo") int codigo) {
		Optional<Veiculo> veiculo = _VeiculoRepository.findById(codigo);
		if(veiculo.isPresent()) {
			try {
				_VeiculoRepository.delete(veiculo.get());
				return new ResponseEntity<Resultado>(new Resultado(true, "Alterado com sucesso."), HttpStatus.OK);
			} catch (Exception e) {
				return new ResponseEntity<Resultado>(new Resultado(false, e.getMessage()), HttpStatus.OK);
			}
		} else {
			return new ResponseEntity<Resultado>(new Resultado(false, "Veiculo não encontrado !"), HttpStatus.OK);
		}
	}
}
