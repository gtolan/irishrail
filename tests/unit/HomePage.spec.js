import Vuex from 'vuex';
import { createLocalVue, mount, RouterLinkStub } from 'vue-test-utils';

import { __createMocks as createStoreMocks } from '../../src/store/mocks'


import Homepage from "../../src/views/Homepage";


// Tell Jest to use the mock
// implementation of the store.
jest.mock('../../src/store/');

const localVue = createLocalVue();

localVue.use(Vuex);



describe('Homepage.vue', () => {
  let storeMocks;
  let wrapper;

    
    storeMocks = createStoreMocks();
    wrapper = mount(Homepage, {
      store: storeMocks.store,
      localVue,
     
    });


 
    it("has a Show Current trains / Search by Train Code CTAs", () => {
          const showCurrentTrains = "Show Current trains";
          expect(wrapper.text()).toMatch(showCurrentTrains);

          const searchByTrainCode = "Search by Train Code";
          expect(wrapper.text()).toMatch(searchByTrainCode);
    })

    test('Test Click Navigation of current trains.', () => {
        const b = wrapper.find('.route.current').attributes('href').to;
        expect(b).toBe('/current-trains')
    });

    test('Test Click of Form Submit.', () => {
      const c = wrapper.find('form button.btn.search-train-code').attributes('type').type;
      expect(c).toBe('submit')

    });


    it("The select drop down should be set to start", () => {
      expect(wrapper.vm.$data.selected).toBe('start')
    })

    
 
});
