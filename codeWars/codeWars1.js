function squareDigits(num){
  let largoDelNumeroIngresado = num.length;
  const numeroBase = 10;
  const desplazamiento = 0;
  let array = []
  for (i=0; i < num.length; i++){
    desplazamiento = (num / numeroBase.toExponencial(largoDelNumeroIngresado-i));
    array.push(desplazamiento);
    }
  result = array.join('');
  result.parseInt;
  return result;
}

console.log(squareDigits(91));