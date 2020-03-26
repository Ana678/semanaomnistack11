import React, { useState, useEffect }from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import {Feather} from '@expo/vector-icons';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';

import { useNavigation } from '@react-navigation/native';

//VIEW
export default function Incidents() {

    const navigation =  useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState([]);

    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigationToDetail(incident){
        navigation.navigate('Detail',{ incident });
    }

    async function loadIncidents(){
        if(loading){
            retur; 
        }if (total > 0 && incidents.length == total){
            return;
        }
        setLoading(true);

        const response = await api.get('incidents', {
            params: { page }
        });


        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);

    }

    useEffect(() => {
        loadIncidents();
    },[]);

  return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/> 
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}> bem vindo! </Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
        
            <FlatList
                data ={incidents}
                style={styles.incidentList}

                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}

                renderItem={({item: incident}) => ( //funcao responsavel por renderizar as informacoes ()->jxs

                    <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(incident.value)}</Text>

                    <TouchableOpacity style={styles.ditailsButton}
                    onPress={() => navigationToDetail(incident) 
                    /*sempre que precisar passar parÊmetro para a funçao, usa-se uma arrow function */}> 
                        
                        <Text style={styles.detailsButtonText}>ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#E02041"/>

                    </TouchableOpacity>

                </View>


                )}
            />
        </View>
  );
}