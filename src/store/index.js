import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentTrains:[],
    trainMovements:[],
    searchedTrainId:null,
    searchedTrainDate:null

  },
  getters:{
    currentTrains: state => {
      return state.currentTrains;
    },
    trainMovements: state => {
      return state.trainMovements;
    },
    firstTrainId: state => {
      return state.currentTrains[0]['TrainCode'][0];
    },
    filterTrainsById: (state) => {
      const filt = state.currentTrains.filter(item => {
        console.log(item['TrainCode'][0],  "IREM", state.searchedTrainId, "Match")
        return item['TrainCode'][0] == state.searchedTrainId
      })
      console.log('filt', filt);
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
      console.log('state before CT mut-uptM', state.currentTrains);
      state.currentTrains = payload;
      console.log('state after CT mut-uptM', state.currentTrains);
    },
    updateTrainMovements(state, payload){
      console.log('state before TM mut-uptM', state.trainMovements, payload, "pay");
      state.trainMovements = payload;
      console.log('state after TM mut-uptM', state.trainMovements);
    }
  },
  actions: {
    fetchTrainByIdAndDate(context,payload){
      console.log(payload, "PAY");
      // let selected = "P405"
      const {selected = context.getters.firstTrainId, date = "01 apr 2020"} = payload;
      console.log(selected, "SELL")
      return fetch(`https://us-central1-rail-5f324.cloudfunctions.net/getTrainMovementsXML?trainid=${selected}&trainDate=${date}`
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log("action finished IDDate", data.objTrainMovements);
          const movements = data.objTrainMovements;
          return context.commit('updateTrainMovements',movements )

        });
    },
    fetchCurrentTrains(context){
      return fetch(
        "https://us-central1-rail-5f324.cloudfunctions.net/getCurrentTrainsXML"
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          context.commit('updateCurrenTrains', data);
          console.log("context.trainMovements", context.state.trainMovements.length, context);
          if(context.state.trainMovements.length == 0){
            context.dispatch('fetchTrainByIdAndDate')
          }
          return 
        });
    }
  },
  modules: {}
});
