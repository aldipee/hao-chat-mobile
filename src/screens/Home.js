import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {ListItem, SearchBar, Header} from 'react-native-elements';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';

const data = [
  {
    id: 1,
    name: 'Ronaldo',
    phone: '+6282185142048',
  },
];

export default function Home() {
  return (
    <>
      <ScrollView>
        <Header
          leftComponent={{icon: 'menu', color: '#000'}}
          centerComponent={{
            text: 'Home',
            style: {color: '#000', fontSize: 17, fontWeight: 'bold'},
          }}
          rightComponent={{icon: 'home', color: '#000'}}
          containerStyle={{
            height: 50,
            paddingBottom: 20,
            backgroundColor: '#fff',
          }}
        />
        <View style={{paddingHorizontal: 0, backgroundColor: '#fefefe'}}>
          <SearchBar
            placeholder="Type Here..."
            lightTheme={true}
            inputContainerStyle={{
              backgroundColor: '#eee',
              paddingVertical: 1,
              marginVertical: 0,
              borderWidth: 0,
              borderColor: '#fff',
            }}
            inputStyle={{
              paddingVertical: 0,
              marginVertical: 0,
              fontSize: 15,
              borderWidth: 0,
            }}
            containerStyle={{
              backgroundColor: '#fff',
              borderWidth: 0,
              borderColor: '#fff',
            }}
          />

          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={[1, 2, 3, 4, 5, 6, 9, 1, 1, 1, 1, 1]}
            renderItem={({item, index}) => (
              <ListItem
                key={index}
                containerStyle={{
                  backgroundColor: '#fefefe',
                  paddingHorizontal: 20,
                  paddingVertical: 11,
                }}
                cont
                leftAvatar={{
                  rounded: true,
                }}
                title={'Aldi Pranata'}
                titleStyle={{fontWeight: '700'}}
                rightSubtitle={'09:30 PM'}
                subtitle={'Hey, sup!'}
                bottomDivider
              />
            )}
          />
        </View>
      </ScrollView>
    </>
  );
}
