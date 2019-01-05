import React, {Component} from 'react';
import {StyleSheet, FlatList, Text, TextInput, Button, View, Alert,
        TouchableHighlight, TouchableOpacity} from 'react-native';

export default class App extends Component {
  state = {
    maxNo: 3,
    boards: [
        {
          brdno: 1,
          brdwriter: 'Lee SunSin',
          brdtitle: 'If you intend to live then you die',
          brddate: new Date()
        },
        {
          brdno: 2,
          brdwriter: 'So SiNo',
          brdtitle: 'Founder for two countries',
          brddate: new Date()
        }
    ],
    selectedBoard: {}
  }

  handleSave = () => {
    const { boards, selectedBoard } = this.state;

    if (!selectedBoard.brdno) { // new : Insert
      this.setState({
        maxNo: this.state.maxNo+1,
        boards: boards.concat({...selectedBoard, brdno: this.state.maxNo, brddate: new Date() })
      });    
    }else {                     // update
      this.setState({
        boards: boards.map(row => selectedBoard.brdno === row.brdno ? {...selectedBoard }: row)
      })       
    }
    this.setState({selectedBoard: {}});
  }

  handleRowClick = (item) => {
    this.setState({selectedBoard: item});
  }

  handleDelete = (brdno) => {
    Alert.alert(
      'Board delete',
      'Are you sure you want to delete?',
      [
        {text: 'Cancel'},
        {text: 'OK', onPress: () => this.setState({boards: this.state.boards.filter(row => row.brdno !== brdno)})    },
      ],
      { cancelable: false }
    )
  }

  render() {
    const { boards, selectedBoard } = this.state;
 
    return (
      <View style={styles.container}>
        <View style={styles.appTitle}> 
          <Text style={styles.appText}>Boards</Text>
        </View>      
        <View>
          <TextInput name="brdtitle" value={selectedBoard.brdtitle} onChangeText={brdtitle => this.setState({ selectedBoard: {...selectedBoard, brdtitle} })} placeholder="Title" />
          <TextInput name="brdwriter" value={selectedBoard.brdwriter} onChangeText={brdwriter => this.setState({ selectedBoard: {...selectedBoard, brdwriter} })} placeholder="Name" />
          <Button title="Save" onPress={this.handleSave}
          />
        </View>      
        <FlatList
          data={boards}
          renderItem={({item}) =>
            <TouchableHighlight onPress={() => this.handleRowClick(item)}>
              <View style={styles.listRow}>
                <View style={styles.item5} >
                  <Text numberOfLines={1} ellipsizeMode='tail'>{item.brdtitle}</Text>
                </View>
                <View style={styles.item2}><Text>{item.brdwriter}</Text></View>
                <View style={styles.item2}><Text>{item.brddate.toDateString()}</Text></View>
                <View style={styles.item1}>
                  <TouchableOpacity onPress={() => this.handleDelete(item.brdno)}>
                    <Text>X</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableHighlight>
          }
          keyExtractor={item => item.brdno.toString()}
        />
      </View>  
    );
  }
}

const styles = StyleSheet.create({
  appTitle: {
    justifyContent: 'center',
    alignItems: 'center',
  },  
  appText: {
    color: 'black',
    fontSize: 30,
    fontFamily: 'bold',
  },
  listRow: {
    flexDirection: 'row',
  },
  item1: {
    flex: 0.1,
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'black',    
  },  
  item2: {
    flex: 0.2,
    padding: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: 'black',    
  },
  item5: {
    flex: 0.5,
    padding: 10,
    borderWidth: 1,
  },
});
