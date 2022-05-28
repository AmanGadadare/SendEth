//https://eth-ropsten.alchemyapi.io/v2/mpthyBUWdqb1YBHOl9knGIzgk6QhXYwi  

//wss://eth-ropsten.alchemyapi.io/v2/mpthyBUWdqb1YBHOl9knGIzgk6QhXYwi  websockets


require('@nomiclabs/hardhat-waffle');



module.exports={
  solidity:'0.8.0',

  networks:{
    ropsten:{
      url:'https://eth-ropsten.alchemyapi.io/v2/mpthyBUWdqb1YBHOl9knGIzgk6QhXYwi',  //http web key
      accounts:['4ed6167e9ec66e77e8b45ccc6bae8683745e8642a789bcf66896406bcd6fea91' ],  //acc key

    },
  },
 
};


