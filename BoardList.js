import React, {Component} from 'react';
import {StyleSheet, FlatList, Text, TextInput, Button, View, Alert, Modal,
        TouchableHighlight, TouchableOpacity} from 'react-native';
import dateFormat from 'dateformat';

import { connect } from 'react-redux';        
import { board_save, board_read, board_remove } from './App_reducer';

class BoardList extends Component {
  state = {
    modalVisible: false,
  }

  componentWillReceiveProps(nextProps) {
    this.setState (nextProps.selectedBoard);
  }

  handleSave = () => {
    this.props.dispatch(board_save(this.state));
    this.setModalVisible(false);
  }

  handleRowClick = (item) => {
    this.props.dispatch(board_read(item.brdno));
    this.setModalVisible(true);
  }

  handleDelete = (brdno) => {
    Alert.alert(
      'Board delete',
      'Are you sure you want to delete?',
      [
        {text: 'Cancel'},
        {text: 'OK', onPress: () => this.props.dispatch(board_remove(brdno))   },
      ],
      { cancelable: false }
    )
  }

  handleNewClick = () => {
    this.props.dispatch(board_read());
    this.setModalVisible(true);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const { boards } = this.props;
 
    return (
      <View style={styles.container}>
        <View style={styles.appTitle}> 
          <Text style={styles.appText}>Boards</Text>
        </View>      
        <View style={{width: 100}}>
          <Button title="New" onPress={this.handleNewClick}/>
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
                <View style={styles.item2}><Text>{dateFormat(item.brddate, "yyyy-mm-dd")}</Text></View>
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
        <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => {}}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Write a post</Text>
              <TextInput name="brdtitle" value={this.state.brdtitle} onChangeText={brdtitle => this.setState({ ...this.state, brdtitle })} placeholder="Title" />
              <TextInput name="brdwriter" value={this.state.brdwriter} onChangeText={brdwriter => this.setState({ ...this.state, brdwriter })} placeholder="Name" />
              <View style={styles.listRow}>              
                <Button style={styles.item2} title="Save" onPress={this.handleSave}/>
                <Button style={styles.item2} title="Close" onPress={() => { this.setModalVisible(false); }}/>
              </View>
            </View>
          </View>
        </Modal>        
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

let mapStateToProps = (state) => {
  return {
      boards: state.boards,
      selectedBoard: state.selectedBoard
  };
}

export default connect(mapStateToProps)(BoardList);

