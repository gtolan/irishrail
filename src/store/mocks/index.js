import Vue from 'vue';
import Vuex from 'vuex';
const currentTrainsArray = [{"TrainStatus":["N"],"TrainLatitude":["51.9018"],"TrainLongitude":["-8.4582"],"TrainCode":["D245"],"TrainDate":["01 Apr 2020"],"PublicMessage":["D245\\nCork to Cobh\\nExpected Departure 13:00"],"Direction":["To Cobh"]},{"TrainStatus":["N"],"TrainLatitude":["51.9018"],"TrainLongitude":["-8.4582"],"TrainCode":["D281"],"TrainDate":["01 Apr 2020"],"PublicMessage":["D281\\nCork to Midleton\\nExpected Departure 13:15"],"Direction":["To Midleton"]},{"TrainStatus":["N"],"TrainLatitude":["52.2531"],"TrainLongitude":["-6.33493"],"TrainCode":["A609"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A609\\nRosslare Europort to Dublin Connolly\\nExpected Departure 13:05"],"Direction":["Northbound"]},{"TrainStatus":["N"],"TrainLatitude":["53.3531"],"TrainLongitude":["-6.24591"],"TrainCode":["D916"],"TrainDate":["01 Apr 2020"],"PublicMessage":["D916\\nDublin Connolly to Maynooth\\nExpected Departure 13:17"],"Direction":["Northbound"]},{"TrainStatus":["N"],"TrainLatitude":["53.378"],"TrainLongitude":["-6.58993"],"TrainCode":["P745"],"TrainDate":["01 Apr 2020"],"PublicMessage":["P745\\nMaynooth to Dublin Connolly\\nExpected Departure 13:10"],"Direction":["Southbound"]},{"TrainStatus":["N"],"TrainLatitude":["53.7955"],"TrainLongitude":["-9.50885"],"TrainCode":["A809"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A809\\nWestport to Dublin Heuston\\nExpected Departure 13:10"],"Direction":["To Dublin Heuston"]},{"TrainStatus":["N"],"TrainLatitude":["54.1085"],"TrainLongitude":["-9.16146"],"TrainCode":["A865"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A865\\nBallina to Manulla Junction\\nExpected Departure 13:00"],"Direction":["To Manulla Junction"]},{"TrainStatus":["N"],"TrainLatitude":["54.6123"],"TrainLongitude":["-5.91744"],"TrainCode":["A145"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A145\\nBelfast to Dublin Connolly\\nExpected Departure 13:05"],"Direction":["Southbound"]},{"TrainStatus":["R"],"TrainLatitude":["0"],"TrainLongitude":["0"],"TrainCode":["A210"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A210\\n11:00 - Dublin Heuston to Cork (6 mins late)\\nDeparted LJ896 next stop Charleville"],"Direction":["To Cork"]},{"TrainStatus":["R"],"TrainLatitude":["0"],"TrainLongitude":["0"],"TrainCode":["A215"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A215\\n12:25 - Cork to Dublin Heuston (-5 mins late)\\nArrived LJ895 next stop Limerick Junction"],"Direction":["To Dublin Heuston"]},{"TrainStatus":["R"],"TrainLatitude":["52.5828"],"TrainLongitude":["-8.38682"],"TrainCode":["A433"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A433\\n12:50 - Limerick to Limerick Junction (1 mins late)\\nDeparted Drumkeen next stop Limerick Junction"],"Direction":["To Limerick Junction"]},{"TrainStatus":["R"],"TrainLatitude":["52.5828"],"TrainLongitude":["-8.38682"],"TrainCode":["A434"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A434\\n12:50 - Limerick Junction to Limerick (-2 mins late)\\nArrived Drumkeen next stop Limerick"],"Direction":["To Limerick"]},{"TrainStatus":["R"],"TrainLatitude":["53.1454"],"TrainLongitude":["-7.06361"],"TrainCode":["D207"],"TrainDate":["01 Apr 2020"],"PublicMessage":["D207\\n12:20 - Dublin Heuston to Portlaoise (-2 mins late)\\nArrived Monasterevin next stop Portarlington"],"Direction":["To Portlaoise"]},{"TrainStatus":["R"],"TrainLatitude":["53.1545"],"TrainLongitude":["-6.96542"],"TrainCode":["A711"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A711\\n11:00 - Galway to Dublin Heuston (0 mins late)\\nDeparted Cherryville Junction next stop Kildare"],"Direction":["To Dublin Heuston"]},{"TrainStatus":["R"],"TrainLatitude":["53.1855"],"TrainLongitude":["-6.80807"],"TrainCode":["A804"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A804\\n12:45 - Dublin Heuston to Westport (1 mins late)\\nDeparted Newbridge next stop Portarlington"],"Direction":["To Westport"]},{"TrainStatus":["R"],"TrainLatitude":["53.2043"],"TrainLongitude":["-6.10046"],"TrainCode":["E176"],"TrainDate":["01 Apr 2020"],"PublicMessage":["E176\\n11:55 - Malahide to Greystones (1 mins late)\\nArrived Bray next stop Greystones"],"Direction":["Southbound"]},{"TrainStatus":["R"],"TrainLatitude":["53.2557"],"TrainLongitude":["-6.11317"],"TrainCode":["E979"],"TrainDate":["01 Apr 2020"],"PublicMessage":["E979\\n13:00 - Bray to Howth (0 mins late)\\nDeparted Killiney next stop Dalkey"],"Direction":["Northbound"]},{"TrainStatus":["R"],"TrainLatitude":["53.2951"],"TrainLongitude":["-6.13498"],"TrainCode":["E282"],"TrainDate":["01 Apr 2020"],"PublicMessage":["E282\\n12:15 - Howth to Bray (3 mins late)\\nDeparted Dun Laoghaire next stop Sandycove"],"Direction":["Southbound"]},{"TrainStatus":["R"],"TrainLatitude":["53.3345"],"TrainLongitude":["-6.43038"],"TrainCode":["A211"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A211\\n10:25 - Cork to Dublin Heuston (6 mins late)\\nDeparted Kishogue next stop Dublin Heuston"],"Direction":["To Dublin Heuston"]},{"TrainStatus":["R"],"TrainLatitude":["53.3345"],"TrainLongitude":["-6.43038"],"TrainCode":["A214"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A214\\n13:00 - Dublin Heuston to Cork (0 mins late)\\nArrived Kishogue next stop Portlaoise"],"Direction":["To Cork"]},{"TrainStatus":["R"],"TrainLatitude":["53.3433"],"TrainLongitude":["-6.24829"],"TrainCode":["E878"],"TrainDate":["01 Apr 2020"],"PublicMessage":["E878\\n12:20 - Greystones to Malahide (0 mins late)\\nArrived Dublin Pearse next stop Tara Street"],"Direction":["Northbound"]},{"TrainStatus":["R"],"TrainLatitude":["53.3632"],"TrainLongitude":["-6.25908"],"TrainCode":["P409"],"TrainDate":["01 Apr 2020"],"PublicMessage":["P409\\n12:32 - Hazelhatch to Grand Canal Dock (3 mins late)\\nArrived Drumcondra next stop Dublin Connolly"],"Direction":["Northbound"]},{"TrainStatus":["R"],"TrainLatitude":["53.373"],"TrainLongitude":["-6.20442"],"TrainCode":["E177"],"TrainDate":["01 Apr 2020"],"PublicMessage":["E177\\n12:50 - Malahide to Greystones (1 mins late)\\nArrived Killester next stop Clontarf Road"],"Direction":["Southbound"]},{"TrainStatus":["R"],"TrainLatitude":["53.4855"],"TrainLongitude":["-6.15134"],"TrainCode":["D808"],"TrainDate":["01 Apr 2020"],"PublicMessage":["D808\\n12:50 - Dublin Connolly to Drogheda (-1 mins late)\\nArrived Donabate next stop Rush and Lusk"],"Direction":["Northbound"]},{"TrainStatus":["R"],"TrainLatitude":["53.4933"],"TrainLongitude":["-7.15576"],"TrainCode":["A907"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A907\\n11:05 - Sligo to Dublin Connolly (1 mins late)\\nDeparted Killucan next stop Enfield"],"Direction":["Southbound"]},{"TrainStatus":["R"],"TrainLatitude":["53.712"],"TrainLongitude":["-6.33538"],"TrainCode":["P708"],"TrainDate":["01 Apr 2020"],"PublicMessage":["P708\\n12:45 - Dundalk to Dublin Connolly (0 mins late)\\nArrived Drogheda next stop Laytown"],"Direction":["Southbound"]},{"TrainStatus":["R"],"TrainLatitude":["53.8591"],"TrainLongitude":["-7.9164"],"TrainCode":["A904"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A904\\n11:00 - Dublin Connolly to Sligo (0 mins late)\\nDeparted Dromod next stop Carrick on Shannon"],"Direction":["Northbound"]},{"TrainStatus":["R"],"TrainLatitude":["54.0007"],"TrainLongitude":["-6.41291"],"TrainCode":["A144"],"TrainDate":["01 Apr 2020"],"PublicMessage":["A144\\n12:00 - Dublin Connolly to Belfast (0 mins late)\\nDeparted Dundalk next stop Newry"],"Direction":["Northbound"]},{"TrainStatus":["T"],"TrainLatitude":["53.378"],"TrainLongitude":["-6.58993"],"TrainCode":["D914"],"TrainDate":["01 Apr 2020"],"PublicMessage":["D914\\n12:17 - Dublin Connolly to Maynooth(3 mins late)\\nTERMINATED Maynooth at 13:01"],"Direction":["Northbound"]},{"TrainStatus":["T"],"TrainLatitude":["53.3891"],"TrainLongitude":["-6.07401"],"TrainCode":["E978"],"TrainDate":["01 Apr 2020"],"PublicMessage":["E978\\n12:00 - Bray to Howth(0 mins late)\\nTERMINATED Howth at 13:07"],"Direction":["Northbound"]}]
Vue.use(Vuex);

export const getters = {

      currentTrains: jest.fn().mockReturnValue(currentTrainsArray),
      trainMovementsLength: jest.fn().mockReturnValue(2),
      firstTrainId: jest.fn().mockReturnValue(["D245"]),
      filterTrainsById: jest.fn().mockReturnValue(currentTrainsArray),

};

export const mutations = {
  updateSearchedTrainId: jest.fn(),
  updateSearchedTrainDate: jest.fn(),
  updateCurrenTrains: jest.fn(),
  updateTrainMovements: jest.fn()
};

export const actions = {
  fetchTrainByIdAndDate: jest.fn(),
  fetchCurrentTrains:jest.fn()
};

export const state = {
    currentTrains:[],  //the current trains available
    trainMovements:[],  //By Train Id Movements - or using Date
    searchedTrainId:null,  //Current searched train
    searchedTrainDate:null //Current chosen date for search
};

// eslint-disable-next-line no-underscore-dangle
export function __createMocks(custom = { getters: {}, mutations: {}, actions: {}, state: {} }) {
  const mockGetters = Object.assign({}, getters, custom.getters);
  const mockMutations = Object.assign({}, mutations, custom.mutations);
  const mockActions = Object.assign({}, actions, custom.actions);
  const mockState = Object.assign({}, state, custom.state);

  return {
    getters: mockGetters,
    mutations: mockMutations,
    actions: mockActions,
    state: mockState,
    store: new Vuex.Store({
      getters: mockGetters,
      mutations: mockMutations,
      actions: mockActions,
      state: mockState,
    }),
  };
}

export const store = __createMocks().store;