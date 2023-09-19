{
    let i = 0;
  
    function* getChar() {
      while (true) {
          yield String.fromCharCode(i);
          i++;
      }
    }
    let charGenerator = getChar();
  
    setInterval(() => {
        console.log(i, charGenerator.next().value)
      },
      10)
  }