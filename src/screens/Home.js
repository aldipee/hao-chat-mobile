import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';

const data = [
  {
    id: 1,
    name: 'Ronaldo',
    phone: '+6282185142048',
  },
];

export default function Home() {
  return (
    <View style={{paddingHorizontal: 10}}>
      <FlatList
        keyExtractor={item => item.toString()}
        data={[1, 2, 3, 4, 5, 6, 9]}
        renderItem={({item, index}) => (
          <TouchableOpacity>
            <ListItem
              key={index}
              containerStyle={{backgroundColor: '#ebebeb'}}
              leftAvatar={{
                rounded: true,
                source: {uri: 'https://randomuser.me/api/portraits/men/75.jpg'},
              }}
              title={'Aldi Pranata'}
              titleStyle={{fontWeight: 'bold'}}
              rightSubtitle={'09:30 PM'}
              subtitle={'+6282185142048'}
              bottomDivider
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
