import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image, ScrollView } from 'react-native';

export default function App() {
  const nome = "";

  function alerta() {
    alert("Qué ota? vou da ota");
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.textoGrande}>Lucas1 Ex Jogador da Imortals csgo</Text>
        
        <Image 
          source={{ uri: 'https://s2-techtudo.glbimg.com/cthVyvR20caf9WSpwSsZN2qgq-I=/800x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2019/06/25/lucas12.jpg' }}
          style={styles.imagem}
        />
        
        <Text style={styles.texto}>
          Lucas "LUCAS1" Teles, nascido em 14 de julho de 1995, é um atleta profissional de Counter-Strike: Global Offensive (CS:GO). Em 2019, ele integrou a equipe da MIBR. Desde o começo de sua carreira, o jogador sempre jogou ao lado de Henrique "HEN1" Teles, seu irmão gêmeo e colega de equipe. LUCAS1 já integrou equipes como a KaBuM! Em e-Sports, atuou com Gabriel "FalleN" Toledo, Lincoln "fnx" Lau e Fernando "fer" Alvarenga, além de integrar a equipe Immortals, que conquistou o segundo lugar no PGL Krakow Major 2017.
        </Text>
        
        <Image 
          source={{ uri: 'https://s2-techtudo.glbimg.com/kIx5jj9v1NmsU0cGiAoW4cT4cQw=/800x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2019/06/25/lucas13.jpg' }}
          style={styles.imagem}
        />
        
        <Text style={styles.texto}>
          Lucas também é famoso por ser o criador de um dos mais famosos slogans da comunidade brasileira de Counter-Strike, o "qué ota?". O jogador, oriundo de Uberlândia, contou com o apoio da família para construir sua trajetória profissional. Seu pai, que também é um entusiasta do jogo de tiro, e seu outro irmão, Charles "pbf1" Teles, também são jogadores profissionais de CS:GO.
        </Text>
        
        <Image 
          source={{ uri: 'https://s2-techtudo.glbimg.com/RDnFcuix7e_yvX7dwn5MtJyOgkQ=/800x0/smart/filters:strip_icc()/s.glbimg.com/po/tt2/f/original/2019/06/25/lucas11.jpeg' }}
          style={styles.imagem}
        />
        
        <Text style={styles.texto}>
          Equipes iniciais: LUCAS1 e HEN1 ingressaram na KaBuM! em abril de 2014. e-Sports, juntando-se à equipe que já tinha FalleN, fer e fnx. Em conjunto, conquistaram competições nacionais como a BSOG 2014, a Masters League #1 da Games Academy e a BGS 2014. No entanto, em janeiro de 2015, os gêmeos deixaram a equipe ao lado de fnx para se juntar a Epitácio "TACO" de Melo e Gustavo "SHOOWTiME" Gonçalves na Dexterity, onde permaneceram até julho de 2015. A mesma formação começou a atuar sob a tag da Games Academy, até que a Luminosity Gaming contratou fnx e TACO em 2016. Lucas e seu irmão fizeram parte deste grupo até junho de 2016, quando foram contratados pela Immortals Productions.
        </Text>
        
        <Image 
          source={{ uri: 'https://cdn.ome.lt/mcgn00x_t2CDphgU2AzsYzen0S8=/1200x630/smart/extras/conteudos/luminosity-lucas1.jpg' }}
          style={styles.imagem}
        />
        
        <Text style={styles.texto}>
          Gaming Luminosity: LUCAS1, após deixar a Immortals, teve breves participações nas equipes 100 Thieves e Não Tem Como. Em junho de 2018, ele e seu irmão foram contratados pela Luminosity Gaming. De acordo com a organização, a dupla venceu o torneio GG.BET Summer Brazil 2018, qualificando-se para a final da ESL Pro League Season 9. Em junho de 2019, o jogador foi confirmado na equipe da MIBR, jogando pela primeira vez sem a companhia de seu irmão.
        </Text>
        
        <Image 
          source={{ uri: 'https://s2.glbimg.com/Jjr2Zr_gYsM5v0UJkYFXJMpekmA=/0x0:999x999/984x0/smart/filters:strip_icc()/s.glbimg.com/es/ge/f/original/2019/06/25/lucastelesf_62579643_691760997946678_2527096175527753796_n.jpg' }}
          style={styles.imagem}
        />
        
        <Text style={styles.texto}>
          Principais títulos: iBUYPOWER Masters 2016, Northern Arena 2016 - Toronto, DreamHack Open Summer 2016, CEVO Pro League Season 9.
        </Text>
        
        <View style={styles.botaoContainer}>
          <Button title="Botão do HS" onPress={alerta} color="#1E90FF" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA', // Fundo claro azulado
  },
  container: {
    width: '90%',
    alignItems: 'center',
    paddingVertical: 20,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00796B', // Verde-azulado escuro
  },
  textoGrande: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 20,
    color: '#01579B', // Azul escuro
  },
  imagem: {
    height: 300,
    width: '100%',
    borderRadius: 10,
    marginVertical: 20,
    borderWidth: 2,
    borderColor: '#B2EBF2', // Azul claro
  },
  texto: {
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 24,
    color: '#004D40', // Verde-azulado mais escuro
    marginBottom: 20,
  },
  botaoContainer: {
    width: '60%',
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden', // Para garantir que o botão respeite o border radius
  },
});