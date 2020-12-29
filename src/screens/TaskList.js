import React, { Component } from 'react';
import { View, 
         Text, 
         StyleSheet, 
         ImageBackground, 
         FlatList,
         TouchableOpacity,
         Platform
      } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

import todayImage from '../../assets/imgs/today.jpg'
import commomStyles from '../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'
import commonStyles from '../commonStyles';
import Task from '../components/Task'

export default class screens extends Component {

   state = {
      showDoneTasks: true,

      tasks:[{
         id: Math.random(),
         desc: 'Comprar livro',
         estimateAt: new Date(),
         doneAt: null,
      },
      {
         id: Math.random(),
         desc: 'Ler o livro',
         estimateAt: new Date(),
         doneAt: new Date(),
      },
      {
         id: Math.random(),
         desc: 'Estudar o livro',
         estimateAt: new Date(),
         doneAt: null,
      }]
   }

   toggleFilter = () => {
      this.setState({showDoneTasks : !this.state.showDoneTasks})
   }

   toggleTask = taskId => {
      const tasks = [...this.state.tasks]
      tasks.forEach(task => {
         if(task.id === taskId){
            task.doneAt = task.doneAt ? null : new Date()
         }
      })

      this.setState({tasks})
   }

  render() {
   const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

    return(
       <View style={styles.container}>
          <ImageBackground style={styles.background} source={todayImage}>
             <View style={styles.iconBar}>
               <TouchableOpacity onPress={this.toggleFilter}>
                  <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} 
                  size={20} 
                  color={commomStyles.colors.secondary}/>
               </TouchableOpacity>
             </View>
             <View style={styles.titleBar}>
               <Text style={styles.title}>Hoje</Text>
               <Text style={styles.subtitle}>{today}</Text>
             </View>
          </ImageBackground>
          <View style={styles.task}>
            <FlatList 
               data={this.state.tasks}
               keyExtractor={item => `${item.id}`}
               renderItem={({item}) => <Task {...item} toggleTask={this.toggleTask}/>}
            />
          </View>
       </View>
    )
  }
}
const styles = StyleSheet.create({
   container:{
      flex: 1
   },
   background:{
      flex: 3
   },
   task:{
      flex: 7
   },
   titleBar:{
      flex: 1,
      justifyContent: 'flex-end',
   },
   title:{
      fontFamily: commomStyles.fontFamily,
      color: commonStyles.colors.secondary,
      fontSize: 50,
      marginLeft: 20,
      marginBottom: 20
   },
   subtitle
   :{
      fontFamily: commomStyles.fontFamily,
      color: commonStyles.colors.secondary,
      fontSize: 25,
      marginLeft: 20,
      marginBottom: 30
   },
   iconBar:{
      flexDirection: 'row',
      marginHorizontal: 20,
      justifyContent: 'flex-end',
      marginTop: Platform.OS === 'ios' ? 30 : 10
   }
})