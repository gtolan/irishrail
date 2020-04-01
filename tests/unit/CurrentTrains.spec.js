import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import CurrentTrains from "@/components/CurrentTrains";
import VueRouter from "vue-router";
const localVue = createLocalVue();

import CurrentTrainsResponse from "../unit/test-data/";

localVue.use(Vuex);
localVue.use(VueRouter);

describe("CurrentTrains.vue", () => {
  const routes = [
    {
      path: "/"
    }
  ];
  const mockRouter = new VueRouter({
    routes
  });
  let mockMethods;
  let store;
  let wrapper;
  let mutations;
  let mockFilters;

  beforeEach(() => {
    mockMethods = {
      getMoreTrainInfo: jest.fn(),
      handleToggleExpand: jest.fn(),
      firstElement: jest.fn(),
      getMoreTrainInfo: jest
        .fn()
        .mockImplementation(() => mutations.updateSearchedTrainId()),
      closeCollapse: jest.fn()
    };

    mockFilters = {
        firstElement: (value) =>  {
            if(!value) return
            return value;}
    };

    mutations = {
      updateSearchedTrainId: jest.fn()
    };
    
    store = new Vuex.Store({
      state: {
        currentTrains: CurrentTrainsResponse,
        isHidden: false
      },
      getters: {
        currentTrains: state => state.currentTrains
      }
    });
    wrapper = mount(CurrentTrains, {
      store,
      localVue,
      router: mockRouter,
      methods: mockMethods,
      filters: mockFilters
    });
  });

  it("should mount", () => {
    expect(wrapper.is(CurrentTrains)).toBe(true);
  });

  it('should call "handleToggleExpand" on click .card-header', () => {
    wrapper.find(".card-header").trigger("click");
    expect(mockMethods.handleToggleExpand).toHaveBeenCalled();
  });

  it('should call "getMoreTrainInfo" on click button.more-info ', () => {
    wrapper.find(".more-info").trigger("click");
    expect(mockMethods.getMoreTrainInfo).toHaveBeenCalled();
  });

  it('should call store mutation "updateSearchedTrainId" on click button.more-info ', () => {
    wrapper.find(".more-info").trigger("click");
    expect(mutations.updateSearchedTrainId).toHaveBeenCalled();
  });
});