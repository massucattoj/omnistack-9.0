import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);


export default function App() {
  return <Routes />   
}




// yarn add react-navigation -> controlar as rotas no aplicativo
// yarn add axios -> comunicacao com backend
  // cricar uma pasta services