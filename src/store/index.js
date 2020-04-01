import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentTrains:[],  //the current trains available
    trainMovements:[],  //By Train Id Movements - or using Date
    searchedTrainId:null,  //Current searched train
    searchedTrainDate:null //Current chosen date for search

  },
  getters:{
    currentTrains: state => {
      return state.currentTrains;
    },
    trainMovementsLength: state => {
      return state.trainMovements ? state.trainMovements.length : 0;
    },
    trainMovements: state => {
      return state.trainMovements;
    },
    firstTrainId: state => {
      return state.currentTrains[0]['TrainCode'][0];
    },
    filterTrainsById: (state) => {
      const filt = state.currentTrains.filter(item => {
        return item['TrainCode'][0] == state.searchedTrainId
      })
      return filt;
    },
    searchedTrainId:(state) =>{
      return state.searchedTrainId;
    }
  },
  mutations: {
    updateSearchedTrainId(state, payload){
      state.searchedTrainId = payload;
    },
    updateSearchedTrainDate(state, payload){
      state.searchedTrainDate = payload;
    },
    updateCurrenTrains(state, payload){
      state.currentTrains = payload;
    },
    updateTrainMovements(state, payload){
      state.trainMovements = payload;
    }
  },
  actions: {
    //fetch firebase cloud function for Json on individual trains
    fetchTrainByIdAndDate(context,payload){
      let selectedFallback = context.getters.firstTrainId
        const {selected = selectedFallback, date = "01 apr 2020"} = payload;
      //destructure but also provide defaults just in case - cloud function already has default fallbacks also
      return fetch(`https://us-central1-rail-5f324.cloudfunctions.net/getTrainMovementsXML?trainid=${selected}&trainDate=${date}`
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          const movements = data.objTrainMovements;
          return context.commit('updateTrainMovements',movements )

        });
    },

    //fetch firebase cloud function for Json of current Train
    fetchCurrentTrains(context){
      return fetch(
        "https://us-central1-rail-5f324.cloudfunctions.net/getCurrentTrainsXML"
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          context.commit('updateCurrenTrains', data);
          console.log(context.getters.trainMovementsLength)
          if(context.getters.trainMovementsLength == 0){ //If no train Movements, get the movements of the first train to populate the page = not neccessary - better UX 
            context.dispatch('fetchTrainByIdAndDate', {selected:null})
          }
          return 
        });
    }
  },
  modules: {}
});
