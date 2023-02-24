import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import { atualizarRepositoriosDoUsuario } from '../../services/request/repositorios';
import { deletarRepositoriosDoUsuario } from '../../services/request/repositorios';

export default function InfoRepositorio({ route, navigation }) {
    const [nome, setNome] = useState(route.params.item.name);
    const [data, setData] = useState(route.params.item.data);

    async function salvar(){
        const atualizar = await atualizarRepositoriosDoUsuario(
            route.params.item.postId,
            nome,
            data,
            route.params.item.id
        )

        if(atualizar === 'sucesso'){
            Alert.alert('Repositório atualizado com sucesso!')
            navigation.goBack();
        }else {
            Alert.alert('Não foi possivel atualizar o repositório.')
        }
    }

    async function deletar(){
        const deleta = await deletarRepositoriosDoUsuario(route.params.item.id)

        if(deleta === 'sucesso'){
            Alert.alert('Repositório deletado com sucesso!')
            navigation.goBack();
        }else {
            Alert.alert('Não foi possivel deletar o repositório.')
        }
    }

    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                style={estilos.entrada}
                value={data}
                onChangeText={setData}
            />
            <TouchableOpacity 
                style={estilos.botao}
                onPress={salvar} 
            >
                <Text style={estilos.textoBotao}>
                    Salvar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[estilos.botao, {backgroundColor: '#DD2B2B', marginTop: 10}]} 
                onPress={deletar}
            >
                <Text style={estilos.textoBotao}>
                    Deletar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
