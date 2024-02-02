import React from 'react';
import Main from './src/Main';
import {AutocompleteDropdownContextProvider} from "react-native-autocomplete-dropdown";

function App() {
  return <AutocompleteDropdownContextProvider><Main /></AutocompleteDropdownContextProvider>
}


export default App;

/*

import React from 'react';
import {Text, View, TextInput, FlatList, StyleSheet} from 'react-native';

type Data = {
    title: string,
    blah?: string,
    cxt?: string
}

let LISTDATA: Data[] = [
    {"title": "Cat", "cxt": "c"},
    {"title": "xyz", "blah": "blah"},
];
console.log(LISTDATA);

const UpperCaseList = ({listData}) => {
    return (
        <FlatList
            data={listData}
            renderItem={({item}) => (
                <View style={{
                    flex: 1,
                    width: 200,
                    backgroundColor: 'lightblue',
                }}>
                    <Text style={styles.listTextStyle}>{item.title.toUpperCase()}</Text>
                </View>
            )}
        />
    );
};


const YourApp = () => {
    return (
        <View>
            <Text>
                Hello world ! 🎉
            </Text>

            <TextInput
                style={{
                    height: 100,
                    borderColor: 'gray',
                    borderWidth: 1
                }}
                defaultValue="You can type in me"
            />

            <FlatList
                data={
                    [
                        {"title": "a", "b": "b"},
                        {"title": "xyz", "blah": "blah"}
                    ]
                }
                renderItem={({item}) => (
                    <View style={
                        {
                            flex: 1,
                            width: 100,
                            backgroundColor: "lightgreen",
                        }
                    }>
                        <Text style={styles.listTextStyle}>{item.title}</Text>
                    </View>
                )}
            />
            <UpperCaseList listData={LISTDATA}/>
            <UpperCaseList listData={LISTDATA2}/>

        </View>
    );
};

const styles = StyleSheet.create({
    listTextStyle: {
        fontSize: 50,
        fontFamily: 'Sans-Serif'
    }
});

const LISTDATA2 : Data[] = [
    { "title": "Cat", "cxt": "c" },
    { "title": "xyz", "blah": "blah" },
];


export default YourApp;

*/
