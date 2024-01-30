import React, { Component } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

import pokemon from 'pokemon';
import Pokemon from './components/Pokemon';
const POKE_API_BASE_URL =  "https://pokeapi.co/api/v2";

export default class App extends Component {

  state = {
    isLoading: false, 
    searchInput: '',
    name: '', 
    pic: '', 
    types: [], 
    desc: ''
  }


  render() {
    const { name, pic, types, desc, searchInput, isLoading } = this.state; 
    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.headContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                onChangeText={(searchInput) => this.setState({searchInput})}
                onKeyPress={ (e) => this.handleEnterPress(e)}
                value={this.state.searchInput}
                placeholder={"Search Pokemon"}
				accessibilityLabel="SearchPokemon button accessibility label"
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button
			    onPress={this.searchPokemon}
				title="Search"
                color="#0064e1"
              />
            </View>
          </View>
          
          <View style={styles.mainContainer}>
            {
              isLoading && 
              <ActivityIndicator size="large" color="#0064e1" />
            }
            
            {
              !isLoading &&
              <Pokemon 
                name={name} 
                pic={pic} 
                types={types} 
                desc={desc} />
            }
          </View>
        </View>
      </SafeAreaView>
    );
  }

  handleEnterPress(e) {
    console.log( 'handleEnterPress starting '  + Object.keys(e)   );
    if ( e.key === 'Enter' || e.nativeEvent.key === 'Enter') {
        console.log( e.key + 'Enter pressed, do search');
        this.searchPokemon();
    }
  }

searchPokemon = async () => {
    
   try {
	const pokemonID = pokemon.getId(this.state.searchInput); // check if the entered Pokemon name is valid
	const firstURL = `${POKE_API_BASE_URL}/pokemon/${pokemonID}`;
	console.log('Calling searchPokemon, hitting URL: ' + firstURL);

	/*   Alert.alert('you pressed the button and found pokemonid' + pokemonID + ', querying ' + firstURL); */
    this.setState({
      isLoading: true // show the loader while request is being performed
    });
	const { data: pokemonData } = await axios.get(firstURL);
    const { data: pokemonSpecieData } = await axios.get(`${POKE_API_BASE_URL}/pokemon-species/${pokemonID}`);

    const { name, sprites, types } = pokemonData;
    const { flavor_text_entries } = pokemonSpecieData;
	console.log( "description:"  + this.getDescription(flavor_text_entries));
    this.setState({
      name,
      pic: sprites.front_default,
      types: this.getTypes(types),
      desc: this.getDescription(flavor_text_entries),
      isLoading: false // hide loader
    });

  } catch (err) {
   Alert.alert(err, "Pokemon not found at: " + firstURL);
  }
  console.log('searchPokemon ending');
}


getTypes = (types) => {
  return types.map(({ slot, type }) => {
    return {
      "id": slot,
      "name": type.name
    }
  });
}


getDescription = (entries) => {
  return entries.find(item => item.language.name === 'en').flavor_text;
}

}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    padding: 20,
//    backgroundColor: '#F5FCFF',
    backgroundColor: 'alice-blue',
  },
  headContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 100
  },
  textInputContainer: {
    flex: 2
  },
  buttonContainer: {
    flex: 1
  },
  mainContainer: {
    flex: 9,
    flexDirection: "column",
  },
  textInput: {
    height: 35,
    marginBottom: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    backgroundColor: "#eaeaea",
    padding: 5
  }
});