'use client'

import {useState, useEffect} from 'react'
import EstacionamentoService from '../service/estacionamentoService';
import './globals.css';
export default function Estacionamento() {

    const estacionamentoService = new EstacionamentoService();
    const [veiculo, setVeiculo] = useState<any[]>([]);
    const [filtro, setFiltro] = useState('');
    
    useEffect(() => {
        new EstacionamentoService().findAll().then(response => {
            setVeiculo(response.data);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    const registraVeiculo = (placa:any) => {
        
        const veiculoObj = { placaVeiculo: placa, ultimoRegistro:1 };
        estacionamentoService.saveRegistroVeiculo(veiculoObj)
        .then( () => {
            console.log("veiculo registrado com sucesso");
            location.reload();
        }).catch((error) => {
            console.error('Erro ao registrar o veiculo:', error);
        });

    }

    const deleteById = (id:any) => {
        if (window.confirm('Tem certeza de que deseja excluir este item?')) {
            estacionamentoService.deleteById(id);
            const dadosAtualizados = veiculo.filter((item) => item.id !== id);
            setVeiculo(dadosAtualizados);
          }
    }

    const updateRegistro = (placa:any, id:any) => {
          if (window.confirm('Deseja confirmar saída do veiculo correspondente a placa: '+ placa)) {
          estacionamentoService.updateRegistro(placa)
          .then((response) => {
            const dadosAtualizados = veiculo.map((item) => {
              if (item.id === id) {
                console.log(item)
                return { ...item, 
                    saida: response.data.saida,
                    valorTotal: response.data.valorTotal };
              }
              return item;
            });
            setVeiculo(dadosAtualizados);
          })
          .catch((error) => {
            console.error('Erro ao registrar a saida do veiculo:', error);
          });
        }
    }
    
    const filtrarDados = (event:any) => {
        setFiltro(event.target.value);
      };
    
      const dadosFiltrados = veiculo.filter((item) =>
        item.placaVeiculo.toLowerCase().includes(filtro.toLowerCase())
      );

    return (
      <>      
        <title>Estacionamento San Rock</title>
        <div className='container'>
            <div className='box'>
                <div className='searchMenu'>
                    <input type="text" value={filtro} onChange={filtrarDados} placeholder="Filtrar por nome" />
                    <button onClick={() => registraVeiculo(filtro)}>Adicionar</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Placa</th>
                            <th>Entrada</th>
                            <th>Saida</th>
                            <th>Valor</th>
                            <th>Dar saída</th>
                            <th>Deletar placa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dadosFiltrados.map(value => (
                                <tr key = {value.id}>
                                    <td>{value.placaVeiculo}</td>
                                    <td>{value.entrada}</td>
                                    <td>{value.saida}</td>
                                    <td>{value.valorTotal}</td>
                                    <td className='btn_table'><button onClick={() => updateRegistro(value.placaVeiculo, value.id)}>Saida</button></td>
                                    <td className='btn_table'><button onClick={() => deleteById(value.id)}>Deletar</button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
      </>
    )
  }