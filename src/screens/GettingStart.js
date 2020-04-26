import * as React from 'react';
import {
  View,
  ImageBackground,
  FlatList,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {Card} from 'react-native-elements';

const eventslist = [
  {
    src:
      'https://image.freepik.com/free-photo/fried-eggs-drinks-breakfast_23-2147758279.jpg',
    title: 'Breakfast',
  },
  {
    src:
      'https://image.freepik.com/free-photo/indian-masala-egg-omelet_136595-191.jpg',
    title: 'Brunch',
  },
  {
    src:
      'https://image.freepik.com/free-photo/north-indian-thali-tipical-meal-served-stainless-steel-plate-blue-table_107467-1331.jpg',
    title: 'Lunch',
  },
  {
    src:
      'https://image.freepik.com/free-photo/club-sandwich-with-ham-lettuce-tomato-cheese-fries-wooden-board_140725-196.jpg',
    title: 'Snacks',
  },
  {
    src:
      'https://image.freepik.com/free-photo/national-uzbek-pilaf-with-meat-cast-iron-skillet-wooden-table_127425-8.jpg',
    title: 'Dinner',
  },
];

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: '',
    };
  }

  keyExtractor = (item, index) => index.toString();
  renderCarousel = ({item}) => (
    <Card style={styles.cardContainerStyle}>
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({
            data: item.title,
          });
          this.props.onCarouselPress;
        }}>
        <ImageBackground
          source={{uri: item.src}}
          style={styles.imageBackgroundStyle}>
          <View style={styles.titleView}>
            <Text style={styles.titleStyle}>{item.title}</Text>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </Card>
  );

  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={this.keyExtractor}
          data={eventslist}
          renderItem={this.renderCarousel}
        />
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
  },
  cardContainerStyle: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
    margin: 5,
    width: 220,
  },
  imageBackgroundStyle: {
    width: '100%',
    height: 160,
    justifyContent: 'center',
  },
  titleView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  titleStyle: {
    color: '#fff',
    fontSize: 30,
    marginVertical: 10,
  },
};
