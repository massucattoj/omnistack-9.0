/*
    Como a estilizacao eh feita no proprio arquivo .js nao ha necessidade de criar
    uma pasta para cada tela como feito na versao web

    -> useState armazena a informacao (valor de um input) contida pelo componente
*/

import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login ({ navigation }) {

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(() => {
        // verificar se o usuario ja ta logado na aplicacao
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                //AsyncStorage.removeItem("user");
                navigation.navigate('List');
            }
        }) 
    }, []);

    async function handleSubmit(){
        // email, techs
        const response = await api.post('/sessions', {
            email
        })

        const { _id } = response.data;
        //console.log(_id);

        // esperar salvar o ID do usuario
        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        // direcionar o usuario para a outra tela
        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView enabled={Platform.OS === 'ios' } behavior="padding" style={styles.container}>
            <Image source={logo} />

            <View style={styles.form}>
                <Text style={styles.label}>SEU E-MAIL *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#999"
                    keyboardType="email-address" // mudar teclado para apresentar @ logo no comeco
                    autoCapitalize="words" // nao mudar a primeira letra para maiusculo
                    autoCorrect={false} // nao corrigir emails doidos
                    value={email}
                    onChangeText={setEmail}
                />
                
                <Text style={styles.label}>TECNOLOGIAS *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Tecnologias de Interesse"
                    placeholderTextColor="#999"                      
                    autoCapitalize="words"         // nao mudar a primeira letra para maiusculo                    
                    autoCorrect={false}             // nao corrigir emails doidos
                    value={techs}
                    onChangeText={setTechs}                    
                />

                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Encontrar spots</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

});


// Cade elemento no aplicativo usando eh importado ali no react-native como View, Text
// React Native nao tem encadeamento de estilos, como no css
// cada estilizacao eh propria