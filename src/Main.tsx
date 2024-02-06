import React,  { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  ActivityIndicator,
  TextInputComponent
} from 'react-native';
import axios from 'axios';

import pokemon from 'pokemon';
import Pokemon from './components/Pokemon';
import DropDownPicker from 'react-native-dropdown-picker';
import { AutocompleteDropdown, TAutocompleteDropdownItem } from 'react-native-autocomplete-dropdown';
import {useState} from 'react';
import {placeholder} from "@babel/types";

const POKE_API_BASE_URL =  "https://pokeapi.co/api/v2";

let pokeArray = new Array<{id: string, title: string}>();
let pokeArray2 = new Array<{label: string, value: string}>();

function initializePokemon() {
 const allPokemonNames = pokemon.all('en');

  let pokeMap = new Map<number, string>();

  allPokemonNames.forEach( (name) => {
    const id = pokemon.getId(name, 'en');
    pokeMap.set( id, name );
    // pokeArray.push( {"id": id.toString(), "title": name });
    pokeArray2.push( {"value": id.toString(), "label": name});
  });

}
initializePokemon();


export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      selectedItem: null,
      name: '',
      pic: '',
      types: [],
      desc: '',
      open: false,
      value: null,
      items: []
    };
    this.setValue = this.setValue.bind(this);
  }

  setOpen(open) {
    this.setState({
      open
    });
  }

  setValue(callback) {
    this.setState(state => ({
      value: callback(this.state.value)
    }));
  }

  setItems(callback) {
    this.setState(state => ({
      items: callback(this.state.items)
    }));
  }


render() {

    const {
      name,
      pic,
      types,
      desc,
      selectedItem,
      isLoading,
      open,
      value,
      items,
    } = this.state;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.headContainer}>
            <View style={styles.textInputContainer}>
              {/*<TextInput
                style={styles.textInput}
                onChangeText={(searchInput) => this.setState({searchInput})}
                onKeyPress={ (e) => this.handleEnterPress(e)}
                value={this.state.searchInput}
                placeholder={"Search Pokemon"}
				accessibilityLabel="SearchPokemon button accessibility label"
              />*/}
              {/*<AutocompleteDropdown
                  clearOnFocus={false}
                  closeOnBlur={true}
                  closeOnSubmit={true}
                  // inputContainerStyle={styles.textInput}
                  // onKeyPress={ (e) => this.handleEnterPress(e)}
                  // initialValue={{ id: '2' }} // or just '2'
                  InputComponent={TextInputComponent}
                  onSelectItem={item => {
                    console.log('selectedItem: ' + JSON.stringify(item));
                    this.setState({selectedItem: item});
                  }}
                  dataSet={pokeArray}
              />*/}
              <DropDownPicker items={items}
                              open={open}
                              setOpen={setOpen}
                              setValue={setValue}
                              value={value}/>
            </View>
            <View style={styles.buttonContainer}>
              <Button
			    onPress={this.searchPokemon}
				title="Search"
                color="#0064e1"
              />
            </View>

          </View>
          <View>
            { this.state.value !== '' &&
              <Text>{'Selected Value: ' + JSON.stringify(this.state.value)}</Text>
            }
          </View>
          <View style={styles.mainContainer}>
            {
              isLoading &&
              <ActivityIndicator size="large" color="#0064e1" />
            }

            {
              !isLoading &&
              <View>
                <Pokemon
                name={name}
                pic={pic}
                types={types}
                desc={desc} />
                <Button title="Move {name}"/>
              </View>
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
  const pokemonID = pokemon.getId(this.state.value); // check if the entered Pokemon name is valid
  const firstURL = `${POKE_API_BASE_URL}/pokemon/${pokemonID}`;

  console.log('Calling searchPokemon, hitting URL: ' + firstURL);
  try {
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
    flex: 1,
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