const axios = require("axios");
link='https://tecweb-js.insper-comp.com.br'


const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
  }

const data ={
  username:'keiyan',
}

axios.post(link+'/token', data,{
  headers : headers
})
  .then((response)=>{
    console.log(response.data);
    token = response.data.accessToken;
    headers['Authorization']=`Bearer ${token}`;
    axios.get('https://tecweb-js.insper-comp.com.br/exercicio',{headers : headers})
    .then((response)=>{
      const ex = response.data;
      //console.log(ex['conta-palindromos'])
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/soma', soma(ex.soma.entrada.a, ex.soma.entrada.b), {headers:headers})
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/tamanho-string', tamanho(ex['tamanho-string'].entrada.string), {headers:headers})
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/nome-do-usuario', usuario(ex['nome-do-usuario'].entrada.email), {headers:headers})
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/jaca-wars', jaca(ex['jaca-wars'].entrada.v, ex['jaca-wars'].entrada.theta), {headers:headers})
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/ano-bissexto', ano(ex['ano-bissexto'].entrada.ano), {headers:headers})
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/volume-da-pizza', pizza(ex['volume-da-pizza'].entrada.z, ex['volume-da-pizza'].entrada.a), {headers:headers})
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/mru', mru(ex.mru.entrada.s0, ex.mru.entrada.v, ex.mru.entrada.t), {headers:headers})
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/inverte-string', inverse(ex['inverte-string'].entrada.string), {headers:headers})
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/soma-valores', valores(ex['soma-valores'].entrada.objeto), {headers:headers})
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/n-esimo-primo', primo(ex['n-esimo-primo'].entrada.n), {headers:headers})
      //axios.post('https://tecweb-js.insper-comp.com.br/exercicio/maior-prefixo-comum', prefixo(ex['maior-prefixo-comum'].entrada.strings), {headers:headers})
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/soma-segundo-maior-e-menor-numeros', soma2(ex['soma-segundo-maior-e-menor-numeros'].entrada.numeros), {headers:headers})
      axios.post('https://tecweb-js.insper-comp.com.br/exercicio/conta-palindromos', palindromo(ex['conta-palindromos'].entrada.palavras), {headers:headers})
    })
    
    console.log(headers);
    
  }, (error) => {
    console.log(error);
})



function soma(a, b){
  s=a+b;
  return {"resposta":s}
}

function tamanho(string){
  tam = string.length;
  return {"resposta": tam}
}

function usuario(email){
  nome = email.split('@');
  first = nome[0]
  return {'resposta': first}
}

function jaca(v, theta){
  g = 9.8;
  radiano = (theta/180)*Math.PI;
  dis=(((v**2)*Math.sin(2*radiano))/g);
  if (dis<98){
    res=-1;
  }else if(dis>102){
    res=1; 
  }else{
    res = 0;
  }
  return {'resposta': res}
}

function ano(ano){
  if ((ano % 4 == 0) && (ano % 100 != 0 || ano % 400 == 0)){
    return {'resposta': true}
  }else{
    return {'resposta': false}
  }
}


function pizza(z, a){
  v=Math.PI*(z**2)*a;
  return {'resposta': Math.round(v)}
}

function mru(s0, v, t){
  s=s0+(v*t);
  return {'resposta': s}
}

function inverse(string){
  return {'resposta': string.split("").reverse().join("")}
}

function valores(objeto){
  total = 0;
  for (const value of Object.values(objeto)) {
    total+=value;
  }
  return {'resposta': total}
}


function detecta_primo(num){
  prime = true;
  for (let i = 2; i < num; i++) {
    if (num % i == 0) {
        prime = false;
    }
  }
  return prime
}


function primo(n){
  const primos=[];
  i=2;
  while (primos.length!=n){
    if (detecta_primo(i)){
      primos.push(i);
    }
    i++;
  }
  return {'resposta':primos[n-1]}
}


// function prefixo(strings){
//   var lista =[];
//   console.log(strings.length)
//   var a=strings.splice(0,strings.length-1) 
//   console.log(a)
//   for (let i =0 ;i<strings.length;i++){
//     const str1=a[i].split("");
//     console.log(a[i])
//     const str2=a[i+1].split("");
//     for (var j=0; j<str1.length;j++){
//       if (str1[j]==str2[j]){
//         letra=str1[j];
//         lista.push(letra);

//       }
//     }
//   }

//   console.log(lista)
//   return {'resposta': lista.join("")}
// }

function soma2(numeros){
  numeros.sort(function(a, b) {
    return a - b;
  });

  menor=numeros[1];
  maior=numeros[numeros.length-2];

  total=maior+menor;
  
  return {'resposta':total}

  
}

function palindromo(palavras){
  total=0;
  for (var i=0;i<palavras.length;i++){
    reverso = palavras[i].split("").reverse().join('');
    if (palavras[i]==reverso){
      total++;
    }
  }
  return {'resposta':total}
}