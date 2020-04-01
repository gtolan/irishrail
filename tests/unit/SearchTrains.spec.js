import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
// import SearchTrainById from "@/components/SearchTrainById";

import VueRouter from "vue-router";
const localVue = createLocalVue();

import SearchTrainById from "@/components/SearchTrainById";

// let CurrentTrainsResponse = require("../unit/test-data/").default;
// let TrainMovementsResponse = require()
import CurrentTrainsResponse from "../unit/test-data/";
import TrainMovementsResponse from "../unit/test-data/movements.js"
// console.log(CurrentTrainsResponse`, "CTR")
localVue.use(Vuex);
localVue.use(VueRouter);

describe("SearchTrainById.vue", () => {
  const routes = [
    {
      path: "/trains"
    }
  ];
  const mockRouter = new VueRouter({
    routes
  });
  let mockMethods;
  let store;
  let wrapper;
  let mutations;
  let actions;
  let mockFilters;

  

  beforeEach(() => {
    mockMethods = {
        openCollapse: jest.fn(),
        dateFormat: jest.fn(),
        closeCollapse: jest.fn(),
        handleFormSubmit: jest.fn(),
        handleFormSubmit: jest.fn().mockImplementation(() => actions.fetchTrainByIdAndDate()),
        firstElement: jest.fn(),
        handleToggleExpand: jest.fn()

    };

    mockFilters = {
        firstElement: (value) =>  {
            if(!value) return
            return value;}
    };
    actions = {
      fetchTrainByIdAndDate: jest.fn()
    }
    mutations = {
      updateSearchedTrainId: jest.fn()
    };
    store = new Vuex.Store({
      state: {
        currentTrains: CurrentTrainsResponse,
        trainMovements: TrainMovementsResponse,  //By Train Id Movements - or using Date
        searchedTrainId:null,  //Current searched train
        searchedTrainDate:null //Current chosen date for search
      },
      actions :{
        fetchTrainByIdAndDate: jest.fn()
      },
      getters: {
        currentTrains: state => state.currentTrains,
        filterTrainsById: state => {
            const filt = state.currentTrains.filter(item => {
            return item['TrainCode'][0] == state.searchedTrainId
          })
          return filt;
        },
        trainMovements:state => state.trainMovements,
        firstTrainId:state => state.currentTrains[0]['TrainCode'][0]
      }
    });

    wrapper = mount(SearchTrainById, {
      store,
      localVue,
      router: mockRouter,
      methods: mockMethods,
      filters: mockFilters
    });
  });

  it("should mount", () => {
    expect(wrapper.is(SearchTrainById)).toBe(true);
  });

  it('should call "handleToggleExpand" on click .card-title', () => {
    wrapper.find(".card-title").trigger("click");
    expect(mockMethods.handleToggleExpand).toHaveBeenCalled();
  });

  it('should call "fetchTrainByCodeAndDate" on click button.search-date form submit ', () => {

    wrapper.find("form").trigger("submit");
    expect(actions.fetchTrainByIdAndDate).toHaveBeenCalled();
  });


});