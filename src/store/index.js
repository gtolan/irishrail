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
      console.log('state before mut-uptM', state.trainMovements);
      state.trainMovements = payload;
      console.log('state after mut-uptM', state.trainMovements);
    }
  },
  actions: {
    fetchTrainByIdAndDate({context},id, date){
      return fetch(`https://us-central1-rail-5f324.cloudfunctions.net/getTrainMovementsXML?trainid=${id}&trainDate=${date}`
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
        "https://us-central1-rail-5f324.cloudfunctions.net/getCurrentTrainsXML",
        {}
      )
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log("action finished CT", data);
          return context.commit('updateCurrenTrains', data)
        });
    }
  },
  modules: {}
});
