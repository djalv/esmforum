const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  //console.log(perguntas);
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando cadastro de três respostas', () => {
  const pergunta_1 = modelo.cadastrar_pergunta('O que veio antes do Big Bang?');
  const pergunta_2 = modelo.cadastrar_pergunta('Qual o significado da vida, do universo e tudo mais');
  const pergunta_3 = modelo.cadastrar_pergunta('Qual piloto de F1 e o melhor ?');

  modelo.cadastrar_resposta(pergunta_1, 'So Deus sabe irmao');
  modelo.cadastrar_resposta(pergunta_2, '42');
  modelo.cadastrar_resposta(pergunta_3, 'Ayrton Senna era o bixo');
  
  const resposta_1 = modelo.get_respostas(pergunta_1);
  const resposta_2 = modelo.get_respostas(pergunta_2);
  const resposta_3 = modelo.get_respostas(pergunta_3);
  
  expect(resposta_1[0].texto).toBe('So Deus sabe irmao');
  expect(resposta_2[0].texto).toBe('42');
  expect(resposta_3[0].texto).toBe('Ayrton Senna era o bixo');
});

test('Testando pegar pergunta', () => {
  const pergunta_id = modelo.cadastrar_pergunta('Somos realmente livres ou nossas escolhas são determinadas?');
  pergunta = modelo.get_pergunta(pergunta_id);
  console.log(pergunta.texto);
  expect(pergunta.texto).toBe('Somos realmente livres ou nossas escolhas são determinadas?');

});