import * as house from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    sidos: [{ value: null, text: "선택하세요" }],
    guguns: [{ value: null, text: "선택하세요" }],
    dongs: [{ value: null, text: "선택하세요" }],
    houses: [],
    house: null,
  },

  getters: {},

  mutations: {
    SET_SIDO_LIST: (state, sidos) => {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST: (state, guguns) => {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST: (state, dongs) => {
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dong });
      });
    },
    CLEAR_SIDO_LIST: (state) => {
      state.sidos = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_GUGUN_LIST: (state) => {
      state.guguns = [{ value: null, text: "선택하세요" }];
    },
    CLEAR_DONG_LIST: (state) => {
      state.dongs = [{ value: null, text: "선택하세요" }];
    },
    SET_HOUSE_LIST: (state, houses) => {
      //   console.log(houses);
      state.houses = houses;
    },
    SET_DETAIL_HOUSE: (state, house) => {
      state.house = house;
    },
  },

  actions: {
    getSido: ({ commit }) => {
      house.sidoList(
        ({ data }) => {
          commit("SET_SIDO_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getGugun: ({ commit }, sidoCode) => {
      const params = {
        sido: sidoCode,
      };
      house.gugunList(
        params,
        ({ data }) => {
          commit("SET_GUGUN_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getDong: ({ commit }, gugunCode) => {
      const params = {
        gugun: gugunCode,
      };
      house.dongList(
        params,
        ({ data }) => {
          console.log(commit, data);
          commit("SET_DONG_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseListByGugun: ({ commit, state }, gugunCode) => {
      console.log(gugunCode);

      const params = {
        gugun: gugunCode,
      };

      house.houseListByGugun(
        params,
        (response) => {
          console.log(response.data);
          state.gugun = gugunCode;
          commit("SET_HOUSE_LIST", response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseListByDong: ({ commit, state }, dongCode) => {
      console.log(dongCode);
      const params = {
        dong: dongCode,
      };
      house.houseListByDong(
        params,
        (response) => {
          console.log(response.data);
          state.dong = dongCode;
          commit("SET_HOUSE_LIST", response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    getHouseListByAptName: ({ commit, state }, aptName) => {
      console.log(aptName);
      let gugunTemp = state.gugun;
      let dongTemp = state.dong;
      if (gugunTemp == null) {
        gugunTemp = "";
      }
      if (dongTemp == null) {
        dongTemp = "";
      }
      console.log(gugunTemp);
      console.log(dongTemp);
      const params = {
        aptName: aptName,
        gugun: gugunTemp,
        dong: dongTemp,
      };
      house.houseListByAptName(
        params,
        (response) => {
          console.log(response.data);
          commit("SET_HOUSE_LIST", response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    // getHouseList: ({ commit }, gugunCode) => {
    //   // vue cli enviroment variables 검색
    //   //.env.local file 생성.
    //   // 반드시 VUE_APP으로 시작해야 한다.
    //   const SERVICE_KEY = process.env.VUE_APP_APT_DEAL_API_KEY;
    //   //   const SERVICE_KEY =
    //   //     "9Xo0vlglWcOBGUDxH8PPbuKnlBwbWU6aO7%2Bk3FV4baF9GXok1yxIEF%2BIwr2%2B%2F%2F4oVLT8bekKU%2Bk9ztkJO0wsBw%3D%3D";
    //   const params = {
    //     LAWD_CD: gugunCode,
    //     DEAL_YMD: "202110",
    //     serviceKey: decodeURIComponent(SERVICE_KEY),
    //   };
    //   house.houseList(
    //     params,
    //     (response) => {
    //       //   console.log(response.data.response.body.items.item);
    //       commit("SET_HOUSE_LIST", response.data.response.body.items.item);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // },
    detailHouse: ({ commit }, house) => {
      // 나중에 house.일련번호를 이용하여 API 호출
      commit("SET_DETAIL_HOUSE", house);
    },
  },
};

export default houseStore;
